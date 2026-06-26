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
        elevation: 6, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
        zIndex: 10 
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
        color: "#888" 
    },
    cardWrapper: { 
        marginBottom: normalize(12) 
    },
    actionBtn: {
        padding: normalize(14),
        borderRadius: normalize(14),
        marginTop: normalize(-6),
        marginHorizontal: normalize(4),
        alignItems: 'center',
        elevation: 3,
        marginBottom: normalize(5),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    btnText: { 
        color: 'white', 
        fontFamily: FONTS.inter.bold, 
        fontSize: normalize(13) 
    }
});