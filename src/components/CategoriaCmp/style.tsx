import { StyleSheet } from 'react-native'
import { FONTS } from "@/src/constants/fonts";

export const styles = StyleSheet.create({
  categoriaItem: {
    alignItems: "center",
    width: 90, 
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
    width: 70,
    height: 70,
  },
  textCategoria: {
    fontSize: 15.7,
    marginTop: 5,
    fontFamily: FONTS.inter.semiBold,
    textAlign: "center",
    width: '100%', 
  },
});