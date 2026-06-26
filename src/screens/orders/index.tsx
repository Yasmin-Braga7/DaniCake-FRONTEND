import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderCard } from "@/src/components/PedidoCard";
import { OrderDetailsModal } from "@/src/components/ModalOrders";
import { Toast } from "@/src/components/Toast";
import { styles } from "./style";
import { AuthService } from "@/src/services/storage";
import { Order } from "@/src/interfaces/pedidos";
import { OrderStatus } from "@/src/enums/pedidos";
import { groupOrdersByPeriod } from "@/src/utils/orderGroups";
import { normalize } from "@/src/constants/responsive";
import { FONTS } from "@/src/constants/fonts";
import { OrderService } from "@/src/services/orders";

export const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [canConfirm, setCanConfirm] = useState<{ [key: number]: boolean }>({});
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "error" | "warning" | "info" });

  const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "success") => {
    setToast({ visible: true, message, type });
  };

  useEffect(() => {
    const carregarUsuario = async () => {
      const t = await AuthService.getToken();
      setToken(t);
      const user = await AuthService.getUser();
      if (user) setUserId(user.id);
    };
    carregarUsuario();
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      // Passa o idUsuario para filtrar apenas os pedidos do usuário logado
      const data = await OrderService.listarMeusPedidos(userId ?? undefined);
      const sorted = data.sort((a, b) => new Date(b.criado).getTime() - new Date(a.criado).getTime());
      setOrders(sorted);
    } catch (error) {
      console.error("Erro ao carregar pedidos", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId !== null) {
      fetchOrders();
    }
  }, [fetchOrders, userId]);

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

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleConfirmReceipt = async (orderId: number) => {
    try {
      await OrderService.atualizarStatus(orderId, OrderStatus.ENTREGUE);
      showToast("Pedido confirmado! Obrigado 🎂", "success");
      setModalVisible(false);
      setSelectedOrder(null);
      fetchOrders();
    } catch (error) {
      showToast("Falha ao confirmar entrega.", "error");
    }
  };

  // Monta o objeto formatado para o modal a partir da order selecionada
  const selectedOrderForModal = selectedOrder
    ? {
        id: String(selectedOrder.id).padStart(3, "0"),
        date: new Date(selectedOrder.criado).toLocaleDateString("pt-BR"),
        total: `R$ ${selectedOrder.total.toFixed(2).replace(".", ",")}`,
        status: selectedOrder.status,
        rawId: selectedOrder.id,
        showConfirmButton: selectedOrder.status === OrderStatus.ENVIADO && canConfirm[selectedOrder.id],
        isWaiting: selectedOrder.status === OrderStatus.ENVIADO && !canConfirm[selectedOrder.id],
        items: selectedOrder.pedidoItems.map((item) => ({
          id: String(item.produto.id),
          name: item.produto.nome,
          qty: item.quantidade,
          price: `R$ ${item.preco.toFixed(2).replace(".", ",")}`,
          image: {
            uri: `http://academico3.rj.senac.br/receitix/api/v1/images/foto/${item.produto.id}`,
            headers: { Authorization: `Bearer ${token}` },
          },
        })),
      }
    : null;

  const groups = groupOrdersByPeriod(orders);

  return (
    <View style={styles.container}>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meus Pedidos</Text>
          <Text style={styles.headerSubtitle}>Acompanhe seus pedidos</Text>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={[styles.listContent, { paddingBottom: 40 }]}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchOrders} colors={["#C23B6B"]} />}
      >
        {!loading && orders.length === 0 && (
          <Text style={{ textAlign: "center", color: "#888", marginTop: 40 }}>
            Você ainda não fez nenhum pedido.
          </Text>
        )}

        {groups.map((group) => (
          <View key={group.label}>
            <View style={localStyles.periodRow}>
              <View style={localStyles.periodLine} />
              <Text style={localStyles.periodLabel}>{group.label}</Text>
              <View style={localStyles.periodLine} />
            </View>

            {group.data.map((order) => {
              const formattedDate = new Date(order.criado).toLocaleDateString("pt-BR");
              const totalItems = order.pedidoItems
                ? order.pedidoItems.reduce((acc, item) => acc + item.quantidade, 0)
                : 0;

              return (
                <View key={order.id} style={{ marginBottom: normalize(10) }}>
                  <OrderCard
                    orderNumber={String(order.id).padStart(3, "0")}
                    date={formattedDate}
                    itemsCount={totalItems}
                    price={`R$ ${order.total.toFixed(2).replace(".", ",")}`}
                    status={order.status}
                    onPress={() => handleOpenModal(order)}
                  />
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <OrderDetailsModal
        visible={modalVisible}
        order={selectedOrderForModal}
        onClose={() => {
          setModalVisible(false);
          setSelectedOrder(null);
        }}
        onConfirmReceipt={handleConfirmReceipt}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  periodRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalize(10),
    marginTop: normalize(6),
    paddingHorizontal: normalize(2),
  },
  periodLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#F0D6DC",
  },
  periodLabel: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(11),
    color: "#C23B6B",
    marginHorizontal: normalize(10),
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
});
