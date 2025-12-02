import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";


export const ProductCreate = () => {

    return(
        <View style={styles.container}>
              <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Meus Pedidos</Text>
                  <Text style={styles.headerSubtitle}>Acompanhe seus pedidos</Text>
                </View>
              </SafeAreaView>
        </View>
    )
}