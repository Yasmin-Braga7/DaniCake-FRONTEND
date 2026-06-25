import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";
import { normalize, wp, hp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  safeArea:{
    flex: 1,
    backgroundColor: '#FFF6F7',
  },
  keyboardAvoiding:{
    flex:1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF6F7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(6),
  },
  seguraForm: {
      width: wp(88),
      alignItems: 'center',
  },
  img: {
    width: normalize(180),
    height: normalize(180),
    resizeMode: 'contain',
    marginBottom: hp(2),
  },
  titulo: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(20),
    color: '#828181',
    marginBottom: hp(3),
    textAlign: 'center',
  },
  form: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: normalize(22),
    borderRadius: normalize(20),
    shadowColor: '#000000ff',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  inputContainer:{
    width: '100%',
    marginBottom: normalize(5),
  },
  label: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(15),
    color: '#73443E',
    marginBottom: normalize(8),
  },
  input: {
    borderWidth: 1,
    borderColor: '#0000002d',
    borderRadius: normalize(25),
    height: normalize(52),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(8),
    marginBottom: normalize(12),
    backgroundColor: '#FFF6F7',
    fontSize: normalize(16),
  },
  errorContainer: {
    borderWidth: 0.2,
    borderColor: '#cfcfcfff',
    borderRadius: normalize(8),
  },
  inputError:{
      borderColor:'#f81345ff',
      borderWidth: 1.5,
  },

  errorText:{
        color:'#f81345ff',
        fontFamily:FONTS.inter.semiBold,
        fontSize: normalize(13),
        paddingLeft: normalize(12),
        height: normalize(18),
    },
  link: {
    color: '#6B3F31',
    textAlign: 'center',
    marginTop: normalize(10),
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(15),
  },
  footer: {
    marginTop: hp(3),
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(15),
    color: '#7E7E7E',
    textAlign: 'center',
  },
  signup: {
    color: '#6B3F31',
    fontFamily: FONTS.inter.bold,
  },
});
