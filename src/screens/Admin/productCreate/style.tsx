import { FONTS } from "@/src/constants/fonts";
import { StyleSheet } from "react-native";
import { normalize, wp, hp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF6F7",
    },
    
    headerWrapper: {
        width: '100%',
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
        elevation: 6,
        zIndex: 999,
    },
    
    header: {
        paddingHorizontal: wp(5),
        paddingVertical: normalize(14),
    },
    
    headerTitle: {
        fontFamily: FONTS.inter.bold,
        fontSize: normalize(22),
        color: "#1a1a1a",
        marginBottom: normalize(3),
    },
    
    headerSubtitle: {
        fontFamily: FONTS.inter.regular,
        fontSize: normalize(13),
        color: "#888",
    },
    List: {
        width: '100%',
        paddingTop: normalize(18),
    }
})