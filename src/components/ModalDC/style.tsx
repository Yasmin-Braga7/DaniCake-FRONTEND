import { FONTS } from "@/src/constants/fonts";
import { StyleSheet } from "react-native";
import { normalize, wp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: wp(85),
    backgroundColor: "white",
    borderRadius: normalize(24),
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  // Imagem ocupa o topo do card, sem espaço em cima
  imageContainer: {
    width: "100%",
    height: normalize(240),
    backgroundColor: "#FFF6F7",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  // Botão X flutuante sobre a imagem no canto superior direito
  closeButton: {
    position: "absolute",
    top: normalize(12),
    right: normalize(12),
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: "rgba(255,255,255,0.92)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },

  // Conteúdo abaixo da imagem
  contentContainer: {
    padding: normalize(20),
    alignItems: "center",
  },

  title: {
    fontSize: normalize(20),
    fontFamily: FONTS.inter.bold,
    marginBottom: normalize(4),
    color: "#1a1a1a",
    textAlign: "center",
  },

  priceText: {
    fontSize: normalize(18),
    fontFamily: FONTS.inter.bold,
    color: "#C23B6B",
    marginBottom: normalize(8),
    textAlign: "center",
  },

  description: {
    fontSize: normalize(14),
    fontFamily: FONTS.inter.regular,
    color: "#555",
    marginBottom: normalize(20),
    lineHeight: normalize(20),
    textAlign: "center",
  },

  addButton: {
    backgroundColor: "#C23B6B",
    borderRadius: normalize(30),
    paddingVertical: normalize(13),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "65%",
    gap: normalize(10),
    elevation: 3,
    shadowColor: "#C23B6B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  addButtonText: {
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(15),
    color: "#fff",
  },
});
