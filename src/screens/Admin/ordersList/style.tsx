import { FONTS } from "@/src/constants/fonts";
import { StyleSheet } from "react-native";
import { normalize, wp } from "@/src/constants/responsive";

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
        padding: normalize(20) 
    },
    headerTitle: { 
        fontFamily: FONTS.inter.light, 
        fontSize: normalize(13), 
        color: "#666" 
    },
    headerSubtitle: { 
        fontFamily: FONTS.inter.semiBold, 
        fontSize: normalize(16), 
        color: "#6B6B6B" 
    },
    cardWrapper: { 
        marginBottom: normalize(15) 
    },
    actionBtn: {
        padding: normalize(12),
        borderRadius: normalize(8),
        marginTop: normalize(-8),
        marginHorizontal: normalize(4),
        alignItems: 'center',
        elevation: 2,
        marginBottom: normalize(5)
    },
    btnText: { 
        color: 'white', 
        fontFamily: FONTS.inter.bold, 
        fontSize: normalize(13) 
    }
});