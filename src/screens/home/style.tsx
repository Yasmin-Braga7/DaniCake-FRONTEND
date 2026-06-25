import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";
import { normalize, wp, hp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  containerGeral: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  principal: {
    alignItems: "center",
    paddingTop: hp(3),
  },
  banner: {
    backgroundColor: "#FFF6F7",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: hp(24),
    paddingTop: hp(3),
    marginTop: hp(2),
  },
  img: {
    width: normalize(170),
    height: normalize(170),
    resizeMode: "contain",
    marginBottom: hp(2),
  },
  Containertitle: {
    width: '100%',
    marginTop: hp(2),
    paddingLeft: wp(6),
    marginBottom: hp(3),
  },
  title: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(25),
  },
  linha: {
    width: "25%",
    height: 1,
    backgroundColor: "#F7B6C3",
    marginTop: normalize(5),
  },
  linha2: {
    width: "100%",
    height: 1,
    backgroundColor: "#E8E8E8",
    marginBottom: hp(2),
  },
  categorias: {
    width: '100%',
    marginBottom: hp(2),
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  destaque: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 0,
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  destaque2: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 0,
    marginTop: hp(1.5),
  },
});