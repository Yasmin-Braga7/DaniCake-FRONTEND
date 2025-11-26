import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";


export const styles = StyleSheet.create({
  defaultButton: {
    width: '100%',
    backgroundColor: "#6c3f32ff",
    borderRadius: 32,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  defaultButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: FONTS.inter.bold,
  },
})