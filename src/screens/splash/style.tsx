import { FONTS } from "@/src/constants/fonts";
import { StyleSheet } from "react-native";
import { normalize, SCREEN } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    titulo: {
        fontSize: normalize(48),
        textAlign: 'center',
        fontFamily: FONTS.abel.regular,
        color: '#000000ff', 
        textShadowColor: '#ffffffff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
});
