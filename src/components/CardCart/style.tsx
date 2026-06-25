import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";
import { normalize, wp } from "@/src/constants/responsive";

const CARD_WIDTH = wp(100) - normalize(32);

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginVertical: normalize(8),
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#ffffff",
    borderRadius: normalize(16),
    padding: normalize(14),
    flexDirection: "row",
    alignItems: "center",
    minHeight: normalize(120),

    // Sombras
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: normalize(72),
    height: normalize(72),
    borderRadius: normalize(12),
    marginRight: normalize(14),
    backgroundColor: '#f0f0f0'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(15),
    marginBottom: normalize(4),
    color: '#333',
  },
  unitPrice: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(13),
    color: "#888",
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: normalize(72),
    paddingLeft: normalize(8),
  },
  trashBtn: {
    padding: normalize(4),
  },
  quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: normalize(20),
      paddingHorizontal: normalize(6),
      paddingVertical: normalize(4),
      marginTop: normalize(6),
  },
  qtdBtn: {
      padding: normalize(4),
  },
  qtyText: {
      fontFamily: FONTS.inter.bold,
      fontSize: normalize(13),
      marginHorizontal: normalize(8),
      minWidth: normalize(16),
      textAlign: 'center',
  },
  totalPrice: {
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(14),
    color: "#D4A574",
    marginTop: normalize(6),
  },
});