import { StyleSheet } from "react-native";
import { normalize, wp, SCREEN } from "@/src/constants/responsive";

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
    alignItems: 'center',
    height: normalize(64),
    paddingHorizontal: normalize(10),
    backgroundColor: "#FFFFFF",
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN.width / 4, 
    paddingVertical: normalize(10),
  },

  activeTab: {
    backgroundColor: "#FFF6F7",
    borderRadius: normalize(16),
  },
});