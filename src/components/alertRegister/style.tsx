import { FONTS } from "@/src/constants/fonts";
import { StyleSheet } from "react-native";
import { normalize, wp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(20),
  },

  alertContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(12),
    width: '100%',
    maxWidth: normalize(320),
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.80,
    elevation: 5,
  },

  header: {
    padding: normalize(20),
    paddingBottom: normalize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  title: {
    fontSize: normalize(19),
    fontFamily: FONTS.inter.semiBold,
    textAlign: "center",
    color: '#D81B60',
  },

  body: {
    padding: normalize(20),
    paddingVertical: normalize(15),
  },

  message: {
    fontSize: normalize(16),
    textAlign: "center",
    color: '#000000',
    fontFamily: FONTS.inter.bold,
  },

  footer: {
    padding: normalize(20),
    paddingTop: normalize(10),
  },

  confirmButton: {
    backgroundColor: '#009490',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(24),
    borderRadius: normalize(8),
    alignItems: "center",
  },
  
});