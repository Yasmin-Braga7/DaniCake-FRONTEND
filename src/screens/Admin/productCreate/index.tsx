import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import { ProductList } from "@/src/components/ProductList/ProductList";
import { CategoryList } from "@/src/components/categoryList";

export const ProductCreate = () => {

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Gerenciar Produtos</Text>
          <Text style={styles.headerSubtitle}>Produtos e categorias</Text>
        </View>
      </SafeAreaView>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.List}>
            <ProductList />
            <View style={{ height: 16 }} /> 
            <CategoryList />
        </View>
      </ScrollView>
    </View>
  );
};