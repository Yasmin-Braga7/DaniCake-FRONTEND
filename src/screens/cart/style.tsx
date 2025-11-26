import { Dimensions, StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF6F7",
      },
    
      headerWrapper: {
        width: width,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 6,
        zIndex: 999,
        marginBottom: 10,
      },
    
      header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
      },
    
      headerTitle: {
        fontFamily: FONTS.inter.light,
        fontSize: 15,
        color: "#6e6e6eea",
        marginBottom: 4,
      },
    
      headerSubtitle: {
        fontFamily: FONTS.inter.semiBold,
        fontSize: 16,
        color: "#6B6B6B",
      },
})