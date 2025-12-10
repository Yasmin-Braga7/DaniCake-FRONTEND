import { View, Text } from "react-native"; // Removi ScrollView daqui se não for usar mais nada
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import { ProductList } from "@/src/components/ProductList";
import { CategoryList } from "@/src/components/categoryList";

export const ProductCreate = () => {

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meus Pedidos</Text>
          <Text style={styles.headerSubtitle}>Acompanhe seus pedidos</Text>
        </View>
      </SafeAreaView>
      <View style={[styles.List, { flex: 1, paddingBottom: 20 }]}>
          <ProductList />
          <View style={{ height: 20 }} /> 
          <CategoryList />
      </View>
    </View>
  );
};