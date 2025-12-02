import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
    zIndex: 10, // Importante para o container pai
  },
  
  // O Botão Rosa (Header)
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FBCBC9',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FBCBC9',
  },
  
  // Estilo quando o dropdown está aberto
  headerOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#FBCBC9', 
  },

  headerTitle: {
    fontSize: 16,
    fontFamily: FONTS.inter.semiBold,
    color: '#000',
  },

  listContainer: {
    position: 'absolute', // Faz a lista flutuar
    top: '100%',
    width: '100%', //Aqui ele fica com o mesmo tamanho do botão
    zIndex: 9999, // Garante que fique acima de tudo
    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden',
    maxHeight: 150, 
  },

  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  itemText: {
    fontSize: 15,
    fontFamily: FONTS.inter.regular,
    color: '#333',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: FONTS.inter.regular,
    color: '#A0A0A0',
    paddingVertical: 14,
    paddingHorizontal: 20,
    textAlign: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
  }
});