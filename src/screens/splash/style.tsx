import { FONTS } from "@/src/constants/fonts";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        // backgroundColor não é mais necessário, já que temos a imagem
    },

    titulo: {
        fontSize: 48,
        textAlign: 'center',
        fontFamily: FONTS.abel.regular,
        color: '#000000ff', 
        textShadowColor: '#ffffffff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        // width: width * 0.5,
    },
});
