import { Dimensions, StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  containerGeral: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  principal: {
    alignItems: "center",
    // justifyContent: "center",
    // padding: 20,
    paddingTop:30,
  },
  banner: {
    backgroundColor: "#FFF6F7",
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: 200,
    paddingTop: 25,
    marginTop: 20
  },
  img: {
    width: 190,
    height: 190,
    resizeMode: "contain",
    marginBottom: 20,
  },
  // imgCategoria: {
  //     borderRadius: 5,
  //     width: 40,
  //     height: 40,
  // },
  Containertitle: {
    width: width,
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 30
  },
  title: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 27,
  },
  linha: {
    width: "25%",
    height: 1,
    backgroundColor: "#F7B6C3",
    marginTop: 5,
    // marginBottom: 10,
  },
  linha2: {
    width: "100%",
    height: 1,
    backgroundColor: "#E8E8E8",
    marginBottom: 18,

    // marginBottom: 10,
  },
  categorias: {
    width: width,
    // marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  destaque: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 0,
    marginTop: 10,
    marginBottom: 20,
  },
  destaque2: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 0,
    marginTop: 15,
  },
});