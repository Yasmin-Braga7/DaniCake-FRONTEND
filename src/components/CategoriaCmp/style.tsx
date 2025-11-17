import { StyleSheet } from 'react-native'
import { FONTS } from "@/src/constants/fonts";


export const styles = StyleSheet.create({
  categoriaItem: {
    alignItems: "center",
  },
  categoria123: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: 75,
    height: 75,
    backgroundColor: "#fff0f1",
  },
  imgCategoria: {
    borderRadius: 5,
    width: 60,
    height: 60,
  },
  textCategoria: {
    fontSize: 18,
    marginTop: 5,
    fontFamily: FONTS.inter.semiBold,
    textAlign: "center",
  },
});