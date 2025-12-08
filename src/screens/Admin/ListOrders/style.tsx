import { FONTS } from "@/src/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF6F7"
    },
    headerWrapper: { 
        backgroundColor: "#fff", 
        elevation: 4, 
        zIndex: 10 
    },
    header: { 
        padding: 20 
    },
    headerTitle: { 
        fontFamily: FONTS.inter.light, 
        fontSize: 14, 
        color: "#666" },
    headerSubtitle: { 
        fontFamily: FONTS.inter.semiBold, 
        fontSize: 18, 
        color: "#333" 
    },
    cardWrapper: { 
        marginBottom: 15 
    },
    actionBtn: {
        padding: 12,
        borderRadius: 8,
        marginTop: -8, // Cola no card de cima
        marginHorizontal: 4,
        alignItems: 'center',
        elevation: 2,
        marginBottom: 5
    },
    btnText: { 
        color: 'white', 
        fontFamily: FONTS.inter.bold, 
        fontSize: 14 
    }
});