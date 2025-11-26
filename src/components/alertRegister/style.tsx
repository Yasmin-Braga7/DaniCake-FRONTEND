import { FONTS } from "@/src/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  alertContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000000',
    shadowOffset: {width: 0,height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.80,
    elevation: 5,
  },

  header: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  title: {
    fontSize: 21,
    fontFamily:FONTS.inter.semiBold,
    textAlign: "center",
    color: '#D81B60',
  },

  body: {
    padding: 20,
    paddingVertical: 15,
  },

  message: {
    fontSize: 18,
    textAlign: "center",
    color: '#000000',
    fontFamily:FONTS.inter.bold,
  },

  footer: {
    padding: 20,
    paddingTop: 10,
  },

  confirmButton: {
    backgroundColor: '#009490',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  
});