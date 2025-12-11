import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, RefreshControl, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderCard } from "@/src/components/PedidoCard";
import { OrderDetailsModal } from "@/src/components/ModalOrders";
import { styles } from "./style";
import { OrderService } from "@/src/services/orders";
import { AuthService } from "@/src/services/storage";
import { Order } from "@/src/interfaces/pedidos";
import { OrderStatus } from "@/src/enums/pedidos";

export const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<any>(null);

  const [canConfirm, setCanConfirm] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const carregarToken = async () => {
      const t = await AuthService.getToken();
      setToken(t);
    };
    carregarToken();
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await OrderService.listarMeusPedidos();
      const sorted = data.sort((a, b) => new Date(b.criado).getTime() - new Date(a.criado).getTime());
      setOrders(sorted);
    } catch (error) {
      console.error("Erro ao carregar pedidos", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    orders.forEach((order) => {
      if (order.status === OrderStatus.ENVIADO && !canConfirm[order.id]) {
        const timer = setTimeout(() => {
          setCanConfirm((prev) => ({ ...prev, [order.id]: true }));
        }, 15000); 
        return () => clearTimeout(timer);
      }
    });
  }, [orders]);

  // --- AQUI ESTÁ A MÁGICA QUE FALTAVA ---
  const handleOpenModal = (order: Order) => {
    const formattedDate = new Date(order.criado).toLocaleDateString('pt-BR');

    const items = order.pedidoItems.map((item) => ({
        id: String(item.produto.id),
        name: item.produto.nome,
        qty: item.quantidade,
        price: `R$ ${item.preco.toFixed(2).replace('.', ',')}`,
        // Recolocamos a imagem com a estrutura correta para o expo-image
        image: { 
            uri: `http://academico3.rj.senac.br/receitix/api/v1/images/foto/${item.produto.id}`, 
            headers: {
              Authorization: `Bearer ${token}`, // Passando o token salvo no state
            },
        }
    }));

    const modalData = {
        id: String(order.id).padStart(3, '0'),
        date: formattedDate,
        total: `R$ ${order.total.toFixed(2).replace('.', ',')}`,
        items: items
    };

    setSelectedOrderForModal(modalData);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrderForModal(null);
  };

  const handleConfirmReceipt = async (orderId: number) => {
    try {
      await OrderService.atualizarStatus(orderId, OrderStatus.ENTREGUE);
      Alert.alert("Obrigado!", "Ficamos felizes que seu pedido chegou.");
      fetchOrders();
    } catch (error) {
      Alert.alert("Erro", "Falha ao confirmar entrega.");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meus Pedidos</Text>
          <Text style={styles.headerSubtitle}>Acompanhe seus pedidos</Text>
        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchOrders} colors={["#D4A574"]} />}
      >
        {!loading && orders.length === 0 && (
            <Text style={{textAlign: 'center', color: '#888', marginTop: 20}}>
                Você ainda não fez nenhum pedido.
            </Text>
        )}

        {orders.map((order) => {
            const formattedDate = new Date(order.criado).toLocaleDateString('pt-BR');
            const totalItems = order.pedidoItems ? order.pedidoItems.reduce((acc, item) => acc + item.quantidade, 0) : 0;
            const showConfirmButton = order.status === OrderStatus.ENVIADO && canConfirm[order.id];
            const isWaiting = order.status === OrderStatus.ENVIADO && !canConfirm[order.id];

            return (
                <View key={order.id} style={{marginBottom: 15}}>
                    <OrderCard
                        orderNumber={String(order.id).padStart(3, '0')}
                        date={formattedDate}
                        itemsCount={totalItems}
                        price={`R$ ${order.total.toFixed(2).replace('.', ',')}`}
                        status={order.status}
                        onPress={() => handleOpenModal(order)}
                    />

                    {isWaiting && (
                        <Text style={{ textAlign: 'center', fontSize: 12, color: '#1E90FF', marginTop: -5, marginBottom: 5 }}>
                            Pedido a caminho... O botão de confirmação aparecerá em breve.
                        </Text>
                    )}

                    {showConfirmButton && (
                        <TouchableOpacity 
                            onPress={() => handleConfirmReceipt(order.id)}
                            style={{
                                backgroundColor: '#C81D63',
                                padding: 12,
                                borderRadius: 12,
                                marginTop: -8,
                                marginHorizontal: 4,
                                alignItems: 'center',
                                elevation: 3
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                CHEGOU! CONFIRMAR ENTREGA
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            );
        })}
      </ScrollView>

      <OrderDetailsModal 
        visible={modalVisible} 
        order={selectedOrderForModal} 
        onClose={closeModal}
      />
    </View>
  );
};