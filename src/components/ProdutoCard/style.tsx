import { StyleSheet, Dimensions } from "react-native";
import { FONTS } from "@/src/constants/fonts";

const { width } = Dimensions.get("window");
export const CARD_WIDTH = (width - 90) / 3;

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    marginHorizontal: 4,
  },
  cardImage: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 10,
    backgroundColor: "#ffffffff",
  },
  cardInfo: {
    paddingTop: 14,
    padding: 10,
  },
  cardPreco: {
    fontSize: 14,
    fontFamily: FONTS.inter.bold,
    color: "#000",
    marginBottom: 2,
  },
  cardNome: {
    fontSize: 16,
    fontFamily: FONTS.inter.light,
    color: "#000",
  },
});
