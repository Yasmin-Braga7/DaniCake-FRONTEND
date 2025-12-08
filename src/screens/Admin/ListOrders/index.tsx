import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderService } from "@/src/services/orders";
import { OrderCard } from "@/src/components/PedidoCard";

import { OrderStatus } from "@/src/enums/pedidos";
import { styles } from "./style";

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const data = await OrderService.listarMeusPedidos();
            const sorted = data.sort((a, b) => a.status - b.status);
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

    const advanceStatus = async (orderId: number, currentStatus: number) => {
        let nextStatus: number;
        let actionName: string;

        if (currentStatus === OrderStatus.PENDENTE) {
            nextStatus = OrderStatus.EM_PREPARO;
            actionName = "Aceitar e Preparar";
        } else if (currentStatus === OrderStatus.EM_PREPARO) {
            nextStatus = OrderStatus.ENVIADO;
            actionName = "Enviar para Entrega";
        } else {
            return;
        }

        try {
            await OrderService.atualizarStatus(orderId, nextStatus);
            Alert.alert("Sucesso", `Pedido atualizado: ${actionName}`);
            fetchOrders();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar o pedido.");
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Painel Admin</Text>
                    <Text style={styles.headerSubtitle}>Gerenciar Pedidos</Text>
                </View>
            </SafeAreaView>

            <FlatList
                data={orders}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchOrders} />}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <OrderCard
                            orderNumber={`#${String(item.id).padStart(3, '0')}`}
                            date={new Date(item.criado).toLocaleDateString('pt-BR')}
                            itemsCount={item.pedidoItems?.length || 0}
                            price={`R$ ${item.total}`}
                            status={item.status}
                        />

                        {item.status === OrderStatus.PENDENTE && (
                            <TouchableOpacity 
                                style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]}
                                onPress={() => advanceStatus(item.id, item.status)}
                            >
                                <Text style={styles.btnText}>ACEITAR (Iniciar Preparo)</Text>
                            </TouchableOpacity>
                        )}

                        {item.status === OrderStatus.EM_PREPARO && (
                            <TouchableOpacity 
                                style={[styles.actionBtn, { backgroundColor: '#2196F3' }]}
                                onPress={() => advanceStatus(item.id, item.status)}
                            >
                                <Text style={styles.btnText}>ENVIAR (Saiu para Entrega)</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />
        </View>
    );
}
