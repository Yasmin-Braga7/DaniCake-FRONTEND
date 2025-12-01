import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style"
import { CartCards } from "@/src/components/CardCart";
import { CreateProduto } from "@/src/components/CreateProduto";


export const CartScreen = () => {
    return (
        <View style={styles.container}>
        <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meus Pedidos</Text>
                <Text style={styles.headerSubtitle}>Acompanhe seus pedidos</Text>
            </View>
        </SafeAreaView>
        {/* <CartCards /> */}

        <CreateProduto />
        </View>
    )
}