import { FONTS } from "@/src/constants/fonts";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  // ... (overlay e card continuam iguais)
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  // AQUI ESTÁ A MUDANÇA PRINCIPAL
  imageContainer: {
    width: "100%", // Fixa na largura total disponível do card
    height: 300, // Aumentei de 150 para 300 (agora fica bem maior/quadrado)
    backgroundColor: "#ffffffff", // Cor de fundo suave caso a imagem demore ou seja transparente
    overflow: "hidden", // OBRIGATÓRIO: Corta qualquer parte da imagem que tentar "fugir"
    marginBottom: 12,
    justifyContent: "center", // Centraliza o conteúdo
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  // ... (restante dos estilos: title, description, addButton...)
  title: {
    fontSize: 25,
    fontFamily: FONTS.inter.bold,
    marginBottom: 5,
    color: "#000000ff",
  },

  iconX: {
    alignItems: 'flex-end',
    marginBottom: 14,
  },

  description: {
    fontSize: 18,
    fontFamily: FONTS.inter.regular,
    color: "#333333ff",
    marginBottom: 20,
    lineHeight: 20,
    marginLeft: 20,
  },
  addButton: {
    backgroundColor: "#C23B6B",
    borderRadius: 35,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    width: "60%",
    height: 60,
    alignSelf: "center",
    gap: 12,
  },
  addButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffffff",
  },
});
