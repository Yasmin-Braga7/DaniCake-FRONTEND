import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";
import { normalize } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  defaultButton: {
    width: '100%',
    backgroundColor: "#6c3f32ff",
    borderRadius: normalize(32),
    paddingVertical: normalize(13),
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize(18),
  },

  defaultButtonText: {
    color: "#FFFFFF",
    fontSize: normalize(18),
    fontFamily: FONTS.inter.bold,
  },
})