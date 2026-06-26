import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Truck } from "lucide-react-native";
import { OrderCard } from "@/src/components/PedidoCard";
import { OrderDetailsModal } from "@/src/components/ModalOrders";
import { Toast } from "@/src/components/Toast";
import { styles } from "./style";
import { OrderService } from "@/src/services/orders";
import { AuthService } from "@/src/services/storage";
import { Order } from "@/src/interfaces/pedidos";
import { OrderStatus } from "@/src/enums/pedidos";
import { groupOrdersByPeriod } from "@/src/utils/orderGroups";
import { normalize, wp } from "@/src/constants/responsive";
import { FONTS } from "@/src/constants/fonts";

export const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<any>(null);

  const [canConfirm, setCanConfirm] = useState<{ [key: number]: boolean }>({});
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "error" | "warning" | "info" });

  const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "success") => {
    setToast({ visible: true, message, type });
  };

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

  const handleOpenModal = (order: Order) => {
    const formattedDate = new Date(order.criado).toLocaleDateString('pt-BR');
    const items = order.pedidoItems.map((item) => ({
      id: String(item.produto.id),
      name: item.produto.nome,
      qty: item.quantidade,
      price: `R$ ${item.preco.toFixed(2).replace('.', ',')}`,
      image: {
        uri: `http://academico3.rj.senac.br/receitix/api/v1/images/foto/${item.produto.id}`,
        headers: { Authorization: `Bearer ${token}` },
      },
    }));

    setSelectedOrderForModal({
      id: String(order.id).padStart(3, '0'),
      date: formattedDate,
      total: `R$ ${order.total.toFixed(2).replace('.', ',')}`,
      items,
    });
    setModalVisible(true);
  };

  const handleConfirmReceipt = async (orderId: number) => {
    try {
      await OrderService.atualizarStatus(orderId, OrderStatus.ENTREGUE);
      showToast("Pedido confirmado! Obrigado 🎂", "success");
      fetchOrders();
    } catch (error) {
      showToast("Falha ao confirmar entrega.", "error");
    }
  };

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
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>
            Você ainda não fez nenhum pedido.
          </Text>
        )}

        {groups.map((group) => (
          <View key={group.label}>
            {/* Separador de período */}
            <View style={localStyles.periodRow}>
              <View style={localStyles.periodLine} />
              <Text style={localStyles.periodLabel}>{group.label}</Text>
              <View style={localStyles.periodLine} />
            </View>

            {group.data.map((order) => {
              const formattedDate = new Date(order.criado).toLocaleDateString('pt-BR');
              const totalItems = order.pedidoItems
                ? order.pedidoItems.reduce((acc, item) => acc + item.quantidade, 0)
                : 0;
              const showConfirmButton = order.status === OrderStatus.ENVIADO && canConfirm[order.id];
              const isWaiting = order.status === OrderStatus.ENVIADO && !canConfirm[order.id];

              return (
                <View key={order.id} style={{ marginBottom: normalize(10) }}>
                  <OrderCard
                    orderNumber={String(order.id).padStart(3, '0')}
                    date={formattedDate}
                    itemsCount={totalItems}
                    price={`R$ ${order.total.toFixed(2).replace('.', ',')}`}
                    status={order.status}
                    onPress={() => handleOpenModal(order)}
                  />

                  {isWaiting && (
                    <View style={localStyles.waitingBanner}>
                      <Truck size={14} color="#1E90FF" style={{ marginRight: 6 }} />
                      <Text style={localStyles.waitingText}>
                        Pedido a caminho... Confirme quando chegar!
                      </Text>
                    </View>
                  )}

                  {showConfirmButton && (
                    <TouchableOpacity
                      onPress={() => handleConfirmReceipt(order.id)}
                      style={localStyles.confirmBtn}
                      activeOpacity={0.85}
                    >
                      <Truck size={16} color="#fff" style={{ marginRight: 8 }} />
                      <Text style={localStyles.confirmBtnText}>Chegou! Confirmar entrega</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <OrderDetailsModal
        visible={modalVisible}
        order={selectedOrderForModal}
        onClose={() => { setModalVisible(false); setSelectedOrderForModal(null); }}
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
  waitingBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF5FF",
    borderRadius: normalize(10),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(8),
    marginTop: normalize(-4),
    marginHorizontal: normalize(4),
    marginBottom: normalize(4),
  },
  waitingText: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(12),
    color: "#1E90FF",
    flex: 1,
  },
  confirmBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C23B6B",
    borderRadius: normalize(14),
    paddingVertical: normalize(14),
    marginTop: normalize(-4),
    marginHorizontal: normalize(4),
    elevation: 4,
    shadowColor: "#C23B6B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  confirmBtnText: {
    color: "#fff",
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(14),
  },
});
