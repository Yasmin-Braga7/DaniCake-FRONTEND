import { View, Text } from "react-native"
import { useNavigation } from "@/src/constants/router";
import { ReusableButton } from "@/src/components/Button";


export const CalendarScreen = () => {

    const navigation = useNavigation();
    return(
        <View>
            <View>
                <Text>Em breve será implementado o caléndario</Text>
            </View>
        </View>
    )
}