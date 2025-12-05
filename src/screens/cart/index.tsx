import { View, Text, FlatList } from "react-native"; // Troquei ScrollView por FlatList para melhor performance
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import { CartCards } from "@/src/components/CardCart";
import { ReusableButton } from "@/src/components/Button";
import { useNavigation } from "@/src/constants/router";
import { useCart } from "@/src/context/CartContext";

export const CartScreen = () => {
    const navigation = useNavigation();
    const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, totalValue } = useCart();

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

            {/* Lista de Produtos */}
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
                        <Text style={{ color: '#888' }}>Seu carrinho está vazio.</Text>
                    </View>
                )}
            />

            {/* Rodapé com Total (Opcional) */}
            {cartItems.length > 0 && (
                <View style={{ padding: 20, backgroundColor: '#fff', elevation: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#D4A574' }}>
                            R$ {totalValue.toFixed(2).replace('.', ',')}
                        </Text>
                    </View>
                    <ReusableButton 
                        title="Finalizar Pedido" 
                        onPress={() => { /* Lógica de checkout */ }} 
                    />
                </View>
            )}
        </View>
    );
};