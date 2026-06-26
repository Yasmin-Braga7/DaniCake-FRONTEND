import { StyleSheet } from "react-native";
import { normalize, wp, SCREEN } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: normalize(62),
    paddingHorizontal: normalize(16),
    backgroundColor: "#FFFFFF",
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN.width / 5, 
    paddingVertical: normalize(8),
    position: "relative",
  },

  activeTab: {
    // Tab ativa não precisa de background, usa indicador
  },

  activeIndicator: {
    position: "absolute",
    bottom: normalize(-2),
    width: normalize(20),
    height: normalize(3),
    borderRadius: normalize(2),
    backgroundColor: "#C23B6B",
  },
});