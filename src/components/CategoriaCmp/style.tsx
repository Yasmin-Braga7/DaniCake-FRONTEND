import { StyleSheet } from 'react-native'
import { FONTS } from "@/src/constants/fonts";

export const styles = StyleSheet.create({
  categoriaItem: {
    alignItems: "center",
    // 💡 AQUI ESTÁ O TRUQUE:
    // Definimos uma largura fixa um pouco maior que o quadrado da imagem (75px).
    // Isso impede que textos longos estiquem o componente horizontalmente.
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
    width: 60,
    height: 60,
    // contentFit: 'contain', // Se usar expo-image, é bom para garantir que a imagem caiba
  },
  textCategoria: {
    fontSize: 18, // Nota: 18 é grande para um espaço pequeno, vai quebrar linha facilmente (ex: "Sobre\nmesas")
    marginTop: 5,
    fontFamily: FONTS.inter.semiBold,
    textAlign: "center",
    // Força o texto a preencher a largura de 90px e quebrar se passar disso
    width: '100%', 
  },
});