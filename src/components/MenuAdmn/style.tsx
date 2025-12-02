import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    position: "relative",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center', // Centralizado verticalmente
    height: 70, // Altura um pouco menor que o menu curvo do cliente
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
    // Dividimos por 4 pois são 4 itens no menu admin. 
    // Se quiser que ocupem espaço igual, pode usar flex: 1 também.
    width: width / 4, 
    paddingVertical: 10,
  },

  activeTab: {
    // Aqui você pode adicionar um estilo extra para o item ativo se quiser,
    // como uma borda inferior ou fundo sutil.
    // Por enquanto, mantive simples pois a cor do ícone já muda.
    backgroundColor: "#FFF6F7", // Um fundo rosa bem clarinho para indicar ativo (opcional)
    borderRadius: 16,
  },
});