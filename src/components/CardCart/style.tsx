import { Dimensions, StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;

export const styles = StyleSheet.create({
    wrapper: {
    alignItems: "center",
    marginVertical: 8,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",

    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    // sombra Android
    elevation: 6,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  center: {
    flex: 1,
  },
  name: {
    fontFamily: FONTS.inter.bold,
    fontSize: 15,
  },
  qty: {
    marginTop: 4,
    fontFamily: FONTS.inter.regular,
    fontSize: 14,
    color: "#444",
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 64,
  },
  trashBtn: {
    padding: 4,
  },
  price: {
    fontFamily:FONTS.inter.semiBold,
    fontSize: 14,
  },
})