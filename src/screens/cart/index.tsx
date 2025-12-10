import React, { useState } from "react";
import { View, Text, FlatList, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import { CartCards } from "@/src/components/CardCart";
import { ReusableButton } from "@/src/components/Button";
import { useNavigation } from "@/src/constants/router";
import { useCart } from "@/src/context/CartContext";
import { AuthService } from "@/src/services/storage";
import { OrderService } from "@/src/services/orders";

export const CartScreen = () => {
    const navigation = useNavigation();
    const { 
        cartItems, 
        incrementQuantity, 
        decrementQuantity, 
        removeFromCart, 
        totalValue, 
        clearCart 
    } = useCart();

    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        setLoading(true);
        try {
            // 1. Pegar o usuário logado para saber o ID
            const user = await AuthService.getUser();
            if (!user) {
                Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
                return;
            }

            const TAXA_ENTREGA = 3.00;
            const novoPedido = await OrderService.criarPedido({
                subtotal: totalValue,
                taxa: TAXA_ENTREGA,
                total: totalValue + TAXA_ENTREGA,
                idUsuario: user.id
            });

            if (novoPedido && novoPedido.id) {
                const promises = cartItems.map(item => {
                    return OrderService.criarItemPedido({
                        preco: item.preco,
                        quantidade: item.quantity,
                        subtotal: item.preco * item.quantity,
                        idProduto: item.id,
                        idPedido: novoPedido.id
                    });
                });

                await Promise.all(promises);

                Alert.alert("Sucesso!", "Seu pedido foi realizado. Acompanhe na aba Pedidos.");
                clearCart();
                navigation.orders();
            }

        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Falha ao finalizar pedido. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Meu Carrinho</Text>
                    <Text style={styles.headerSubtitle}>
                        {cartItems.length} itens adicionados
                    </Text>
                </View>
            </SafeAreaView>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
                renderItem={({ item }) => (
                    <CartCards
                        data={item}
                        onIncrement={() => incrementQuantity(item.id)}
                        onDecrement={() => decrementQuantity(item.id)}
                        onRemove={() => removeFromCart(item.id)}
                    />
                )}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: '#4e4e4eff' }}>Seu carrinho está vazio.</Text>
                    </View>
                )}
            />
            
            {cartItems.length > 0 && (
                <View style={{ padding: 20, backgroundColor: '#fff', elevation: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text style={{ fontSize: 16, color: '#4e4e4eff' }}>Subtotal</Text>
                        <Text style={{ fontSize: 16, color: '#4e4e4eff' }}>
                            R$ {totalValue.toFixed(2).replace('.', ',')}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total (+Taxa)</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#D4A574' }}>
                            R$ {(totalValue + 5).toFixed(2).replace('.', ',')}
                        </Text>
                    </View>
                    
                    {loading ? (
                        <ActivityIndicator size="large" color="#D4A574" />
                    ) : (
                        <ReusableButton 
                            title="Finalizar Pedido" 
                            onPress={handleCheckout} 
                        />
                    )}
                </View>
            )}
        </View>
    );
};