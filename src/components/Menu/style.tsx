import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,//Remover a linha
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
    alignItems: 'flex-start',
    marginTop: 4,
    height: 80,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },

  // 🔹 Curva superior ajustada
  topCurve: {
    backgroundColor: "transparent",
    position: "absolute",
    top: -38, // Ajustando para ficar melhor integrado
    left: "50%",
    marginLeft: -36,
    width: 80,
    height: 35,
    borderTopWidth: 0, // Remover linha
    borderTopColor: "transparent", 
    borderTopLeftRadius: 110,
    borderTopRightRadius: 110,
    zIndex: 1,
  },

  // 🔹 Aba comum (sem alteração)
  tab: {
    alignItems: "center",
    justifyContent: "center",
    width: (width - 80) / 5,
    paddingVertical: 8,
    zIndex: 2,
  },

  // 🔹 Botão flutuante central
  centerTab: {
    position: "absolute",
    top: -35, // Mantendo o botão acima da barra
    left: "50%",
    marginLeft: -22,
    width: 64,
    height: 64,
    borderRadius: 80,
    backgroundColor: "#f7b6c34d",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ffffffff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: "transparent",
    zIndex: 3, // Garante que o botão fique sobre a barra
  },

  activeTab: {
    backgroundColor: "#ffffffff",
    borderColor: "transparent",
  },

  icon: {
    color: "#cfcfcfff",
  },

  activeIcon: {
    color: "#0A84FF",
  },

  label: {
    fontSize: 11,
    marginTop: 2,
    color: "#828181",
  },

  labelActive: {
    color: "#0A84FF",
    fontWeight: "600",
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -6,
    backgroundColor: '#D37A7A',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
    paddingHorizontal: 2
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  }
});
