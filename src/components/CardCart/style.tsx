import { Dimensions, StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginVertical: 8,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16, // Aumentei o padding interno
    flexDirection: "row",
    alignItems: "center",
    minHeight: 110, // <--- AQUI: Aumentei a altura mínima do card

    // Sombras
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 80, // Aumentei um pouco a imagem
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: '#f0f0f0'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  name: {
    fontFamily: FONTS.inter.bold,
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  unitPrice: {
    fontFamily: FONTS.inter.regular,
    fontSize: 14,
    color: "#888",
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 80, // Altura para alinhar os elementos verticalmente
    paddingLeft: 10,
  },
  trashBtn: {
    padding: 4,
  },
  quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 20,
      paddingHorizontal: 6,
      paddingVertical: 4,
      marginTop: 6,
  },
  qtdBtn: {
      padding: 4,
  },
  qtyText: {
      fontFamily: FONTS.inter.bold,
      fontSize: 14,
      marginHorizontal: 8,
      minWidth: 16,
      textAlign: 'center',
  },
  totalPrice: {
    fontFamily: FONTS.inter.bold,
    fontSize: 15,
    color: "#D4A574", // Cor de destaque (do seu tema)
    marginTop: 6,
  },
});