import { View, Text, ImageBackground } from "react-native";
import { styles } from "./style";

export const SplashScreen = () => {
    return(
        <ImageBackground
        source={require('@/assets/imagens/Fundo.jpg')}
        style={styles.container}
        resizeMode="cover"
        >
            <Text style={styles.titulo}>
                DaniCake
            </Text>
        </ImageBackground>
    )
}