import { StyleSheet } from "react-native";
import { normalize, wp, hp, SCREEN } from "@/src/constants/responsive";

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
    alignItems: 'flex-start',
    marginTop: normalize(4),
    height: normalize(72),
    paddingHorizontal: normalize(10),
    backgroundColor: "#FFFFFF",
  },

  // 🔹 Curva superior ajustada
  topCurve: {
    backgroundColor: "transparent",
    position: "absolute",
    top: normalize(-35),
    left: "50%",
    marginLeft: normalize(-36),
    width: normalize(76),
    height: normalize(33),
    borderTopWidth: 0,
    borderTopColor: "transparent", 
    borderTopLeftRadius: normalize(110),
    borderTopRightRadius: normalize(110),
    zIndex: 1,
  },

  // 🔹 Aba comum
  tab: {
    alignItems: "center",
    justifyContent: "center",
    width: (SCREEN.width - normalize(80)) / 5,
    paddingVertical: normalize(8),
    zIndex: 2,
  },

  // 🔹 Botão flutuante central
  centerTab: {
    position: "absolute",
    top: normalize(-33),
    left: "50%",
    marginLeft: normalize(-22),
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(80),
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
    zIndex: 3,
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
    fontSize: normalize(10),
    marginTop: normalize(2),
    color: "#828181",
  },

  labelActive: {
    color: "#0A84FF",
    fontWeight: "600",
  },
  badge: {
    position: 'absolute',
    right: normalize(-8),
    top: normalize(-6),
    backgroundColor: '#D37A7A',
    borderRadius: normalize(10),
    minWidth: normalize(17),
    height: normalize(17),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
    paddingHorizontal: normalize(2)
  },
  badgeText: {
    color: 'white',
    fontSize: normalize(9),
    fontWeight: 'bold',
  }
});
