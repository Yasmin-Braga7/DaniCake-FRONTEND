import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";
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
        shadowRadius: 4,
        elevation: 6,
        zIndex: 999,
        marginBottom: normalize(10),
      },
    
      header: {
        paddingHorizontal: wp(5),
        paddingVertical: normalize(15),
      },
    
      headerTitle: {
        fontFamily: FONTS.inter.light,
        fontSize: normalize(14),
        color: "#6e6e6eea",
        marginBottom: normalize(4),
      },
    
      headerSubtitle: {
        fontFamily: FONTS.inter.semiBold,
        fontSize: normalize(15),
        color: "#6B6B6B",
      },
})