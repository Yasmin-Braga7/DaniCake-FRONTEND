import { StyleSheet } from 'react-native'
import { FONTS } from "@/src/constants/fonts";
import { normalize } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  categoriaItem: {
    alignItems: "center",
    width: normalize(90), 
  },
  categoria123: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(15),
    width: normalize(72),
    height: normalize(72),
    backgroundColor: "#fff0f1",
  },
  imgCategoria: {
    borderRadius: normalize(5),
    width: normalize(66),
    height: normalize(66),
  },
  textCategoria: {
    fontSize: normalize(14),
    marginTop: normalize(5),
    fontFamily: FONTS.inter.semiBold,
    textAlign: "center",
    width: '100%', 
  },
});