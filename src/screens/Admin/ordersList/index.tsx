import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderService } from "@/src/services/orders";
import { OrderCard } from "@/src/components/PedidoCard";
import { AdminOrderModal, AdminOrderData } from "@/src/components/AdminOrderModal";
import { Toast } from "@/src/components/Toast";
import { OrderStatus } from "@/src/enums/pedidos";
import { styles } from "./style";
import { groupOrdersByPeriod } from "@/src/utils/orderGroups";
import { normalize } from "@/src/constants/responsive";
import { FONTS } from "@/src/constants/fonts";

export default function ListOrdersScreen() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<AdminOrderData | null>(null);

    const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "error" | "warning" | "info" });

    const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "success") => {
        setToast({ visible: true, message, type });
    };

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const data = await OrderService.listarMeusPedidos();
            const sorted = data.sort((a, b) => new Date(b.criado).getTime() - new Date(a.criado).getTime());
            setOrders(sorted);
        } catch (error) {
            console.log("Erro ao buscar pedidos admin");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleOpenModal = (order: any) => {
        const modalData: AdminOrderData = {
            id: order.id,
            date: new Date(order.criado).toLocaleDateString('pt-BR'),
            clientName: order.usuario?.nome,
            items: order.pedidoItems?.map((item: any) => ({
                nome: item.produto.nome,
                quantidade: item.quantidade,
                preco: item.preco,
            })) || [],
            total: order.total,
            status: order.status,
        };
        setSelectedOrder(modalData);
        setModalVisible(true);
    };

    const advanceStatus = async (orderId: number, currentStatus: number) => {
        let nextStatus: number;
        let actionName: string;
        let emoji: string;

        if (currentStatus === OrderStatus.PENDENTE) {
            nextStatus = OrderStatus.EM_PREPARO;
            actionName = "Preparo iniciado!";
            emoji = "👨‍🍳";
        } else if (currentStatus === OrderStatus.EM_PREPARO) {
            nextStatus = OrderStatus.ENVIADO;
            actionName = "Pedido enviado para entrega!";
            emoji = "🚀";
        } else {
            return;
        }

        try {
            await OrderService.atualizarStatus(orderId, nextStatus);
            showToast(`${emoji} ${actionName}`, "success");
            setModalVisible(false);
            setSelectedOrder(null);
            fetchOrders();
        } catch (error) {
            showToast("Não foi possível atualizar o pedido.", "error");
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
                    <Text style={styles.headerTitle}>Painel Admin</Text>
                    <Text style={styles.headerSubtitle}>Gerenciar Pedidos</Text>
                </View>
            </SafeAreaView>

            <ScrollView
                contentContainerStyle={{ padding: normalize(16), paddingBottom: 50 }}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchOrders} colors={["#C23B6B"]} />}
            >
                {!loading && orders.length === 0 && (
                    <Text style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>
                        Nenhum pedido encontrado.
                    </Text>
                )}

                {groups.map((group) => (
                    <View key={group.label}>
                        <View style={localStyles.periodRow}>
                            <View style={localStyles.periodLine} />
                            <Text style={localStyles.periodLabel}>{group.label}</Text>
                            <View style={localStyles.periodLine} />
                        </View>

                        {group.data.map((item) => (
                            <View key={item.id} style={[styles.cardWrapper, { marginBottom: normalize(12) }]}>
                                <OrderCard
                                    orderNumber={String(item.id).padStart(3, '0')}
                                    date={new Date(item.criado).toLocaleDateString('pt-BR')}
                                    itemsCount={item.pedidoItems?.reduce((acc: number, i: any) => acc + i.quantidade, 0) || 0}
                                    price={`R$ ${Number(item.total).toFixed(2).replace('.', ',')}`}
                                    status={item.status}
                                    onPress={() => handleOpenModal(item)}
                                />
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>

            <AdminOrderModal
                visible={modalVisible}
                order={selectedOrder}
                onClose={() => { setModalVisible(false); setSelectedOrder(null); }}
                onAdvance={() => {
                    if (selectedOrder) advanceStatus(selectedOrder.id, selectedOrder.status);
                }}
            />
        </View>
    );
}

const localStyles = StyleSheet.create({
    periodRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: normalize(10),
        marginTop: normalize(6),
    },
    periodLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E0D0D5",
    },
    periodLabel: {
        fontFamily: FONTS.inter.semiBold,
        fontSize: normalize(11),
        color: "#888",
        marginHorizontal: normalize(10),
        textTransform: "uppercase",
        letterSpacing: 0.8,
    },
});
