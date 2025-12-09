import { View, Text, FlatList } from "react-native";
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

      <FlatList
        data={[1]}   // truque: FlatList precisa de dados, mas só queremos usar como container
        renderItem={() => null}
        keyExtractor={() => "unique"}

        ListHeaderComponent={
          <View style={styles.List}>
            <ProductList />
            <CategoryList />
          </View>
        }

        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
