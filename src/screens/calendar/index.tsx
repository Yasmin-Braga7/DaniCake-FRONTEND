import { View, Text } from "react-native"
import { useNavigation } from "@/src/constants/router";
import { styles } from "./style";


export const CalendarScreen = () => {

    const navigation = useNavigation();
    return(
        <View style={styles.containerPai}>
            <View style={styles.container}>
                <Text style={styles.text}>Em breve será implementado o caléndario</Text>
            </View>
        </View>
    )
}