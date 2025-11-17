import { FONTS } from "@/src/constants/fonts";
import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  wrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    top: 40,
    bottom: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    // sombra
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },

  header: {
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontFamily: FONTS.abel.regular,
    fontSize: 27,
    color: "#6B3F31",
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff6f7ff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ffd3dbff',
    borderStyle: 'solid',
    marginBottom: 12,
  },
  dateLabel: {
    fontFamily: FONTS.abel.regular,
    fontSize: 18,
    color: "#4b4b4be5",
  },
  dateValue: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 14,
    color: "#4b4b4be5",
  },

  itemsTitleRow: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  itemsTitle: {
    fontFamily: FONTS.inter.bold,
    fontSize: 18,
    color: "#000000d8",
  },

  itemsContainer: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#ffffffff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  itemsList: {
    paddingBottom: 6,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffd3dbff',
    borderStyle: 'solid',
    backgroundColor: "#FFF6F7",
    marginBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 55,
    borderRadius: 8,
    resizeMode: "cover",
    marginRight: 12,
  },
  itemImagePlaceholder: {
    width: 56,
    height: 46,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginRight: 12,
  },
  itemText: {
    flex: 1,
  },
  itemName: {
    fontFamily:FONTS.inter.semiBold,
    fontSize: 15,
    color: "#000000d8",
  },
  itemQty: {
    fontFamily: FONTS.inter.light,
    fontSize: 14,
    color: "#8E8E8E",
    marginTop: 4,
  },
  itemPrice: {
    fontFamily: FONTS.inter.bold,
    fontSize: 14,
    color: "#000000d8",
    marginLeft: 10,
  },

  emptyRow: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#696969de",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
    borderTopWidth: 0.3,
    borderTopColor: "#c5c4c44f",
  },
  totalLabel: {
    fontFamily: FONTS.inter.light,
    fontSize: 18,
    color: "#696969de",
  },
  totalValue: {
    fontFamily: FONTS.inter.bold,
    fontSize: 16,
    color: "#000000d8",
  },

  closeBtn: {
    marginTop: 12,
    alignSelf: "center",
    backgroundColor: "#C81D63",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  closeBtnText: {
    fontFamily: FONTS.inter.bold,
    fontSize: 16,
    color: "#fff",
  },
});