import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";
import { normalize, wp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 

    borderWidth: 1,
    borderColor: "#D37A7A",
    borderRadius: normalize(32),
    backgroundColor: '#ffffffff',

    paddingVertical: normalize(10),
    marginHorizontal: wp(4), 
    marginTop: normalize(28),
    marginBottom: normalize(36),
  },

  logoutIcon: {
    marginRight: normalize(10),
  },

  logoutText: {
    color: "#D37A7A",
    fontSize: normalize(20),
    fontFamily: FONTS.inter.semiBold, 
  },
})