import { Dimensions, StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6F7',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    paddingLeft: 30,
    paddingRight: 30,
    
  },
  seguraForm: {
      width: width * 0.9,
      alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  titulo: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 21,
    color: '#828181',
    marginBottom: 30,
  },
  form: {
    width: '100%',
    height: 390,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000000ff',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontFamily: FONTS.inter.regular,
    fontSize: 16,
    color: '#73443E',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#0000002d',
    borderRadius: 25,
    height: 58,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF6F7',
  },
  errorContainer: {
    borderWidth: 0.2,
    borderColor: '#cfcfcfff',
    borderRadius: 8,
  },
  errorText: {
    color: '#d8000c',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  button: {
    backgroundColor: 'hsla(14, 37%, 31%, 1.00)',
    width: '100%',
    height: 48,
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonC: {
    alignItems: 'center',
  },
  link: {
    color: '#6B3F31',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: FONTS.inter.regular,
    fontSize: 16,
  },
  footer: {
    marginTop: 30,
    fontFamily: FONTS.inter.regular,
    fontSize: 16,
    color: '#7E7E7E',
  },
  signup: {
    color: '#6B3F31',
    fontFamily: FONTS.inter.bold,
  },
});
