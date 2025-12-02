import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style"
import { CartCards } from "@/src/components/CardCart";
import { ProductList } from "@/src/components/ProductList";
import { ReusableButton } from "@/src/components/Button";
import { useNavigation } from "@/src/constants/router";


export const CartScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
        <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meus Pedidos</Text>
                <Text style={styles.headerSubtitle}>Acompanhe seus pedidos</Text>
            </View>
        </SafeAreaView>
        {/* <CartCards /> */}
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <ReusableButton 
                    title="Ir para Criar Produto" 
                    onPress={navigation.adminDashboard} 
                />
            </View>
        {/* <ProductList /> */}
        </View>
    )
}