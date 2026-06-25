import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";
import { normalize, SCREEN } from "@/src/constants/responsive";

export const CARD_WIDTH = (SCREEN.width - normalize(80)) / 3;

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffff",
    borderRadius: normalize(10),
    overflow: "hidden",
    marginBottom: normalize(12),
    marginHorizontal: normalize(4),
  },
  cardImage: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: normalize(10),
    backgroundColor: "#ffffffff",
  },
  cardInfo: {
    paddingTop: normalize(12),
    padding: normalize(8),
  },
  cardPreco: {
    fontSize: normalize(13),
    fontFamily: FONTS.inter.bold,
    color: "#000",
    marginBottom: normalize(2),
  },
  cardNome: {
    fontSize: normalize(14),
    fontFamily: FONTS.inter.light,
    color: "#000",
  },
});
