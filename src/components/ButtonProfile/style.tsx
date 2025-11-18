import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";

export const styles = StyleSheet.create({
 // Adicione isso dentro do seu StyleSheet.create({ ... }) no arquivo style.js

  logoutButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 

    borderWidth: 1,
    borderColor: "#D37A7A",
    borderRadius: 32,
    backgroundColor: '#ffffffff',

    paddingVertical: 10,
    marginHorizontal: 16, 
    marginTop: 30,
    marginBottom: 40,
  },

  // Novo estilo para dar um espacinho entre o ícone e o texto
  logoutIcon: {
    marginRight: 10,
  },

  logoutText: {
    color: "#D37A7A",
    fontSize: 22,
    fontFamily: FONTS.inter.semiBold, 
  },
})