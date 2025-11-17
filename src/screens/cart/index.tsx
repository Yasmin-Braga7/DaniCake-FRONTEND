import { View, Text, ScrollView } from "react-native"
import { styles } from "./style"


export const CartScreen = () => {
    return(
        <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <Text>Carrinho</Text>
        </View>
        </ScrollView>
    )
}