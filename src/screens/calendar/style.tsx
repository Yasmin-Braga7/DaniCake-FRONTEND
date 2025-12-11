import { FONTS } from "@/src/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerPai: {
    flex: 1,
    backgroundColor: "#FFF6F7",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: FONTS.inter.bold,
    fontSize: 22,
  },
});
