import { FONTS } from "@/src/constants/fonts";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F7",
  },
  headerWrapper: {
    width: width,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 999,
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  headerTitle: {
    fontFamily: FONTS.inter.light,
    fontSize: 15,
    color: "#6e6e6eea",
    marginBottom: 4,
  },

  headerSubtitle: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 16,
    color: "#6B6B6B",
  },

  // seguraforms: {
  //   height: height * 0.73,
  //   justifyContent: 'center'
  // },

  scrollContent: {
    paddingTop: 20, // Espaço entre o header e o primeiro card
    paddingBottom: 40,
  },

  userCard: {
    height: 280,
    backgroundColor: "#ffffffff",
    marginHorizontal: 16,
    marginBottom: 15,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: "center",
    elevation: 4,
  },
  photoCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#DCDCDC",
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: {
    color: "#555",
    fontFamily: FONTS.inter.bold,
    fontSize: 18,
  },
  userName: {
    marginTop: 12,
    fontFamily: FONTS.inter.bold,
    fontSize: 19,
  },
  userType: {
    fontFamily: FONTS.inter.regular,
    fontSize: 14,
    color: "#777",
  },

  infoCard: {
    height: 430,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 15,
    borderRadius: 18,
    padding: 20,
    elevation: 4,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoTitle: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 16,
    color: "#000000d8",
  },
  
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    fontFamily: FONTS.inter.bold,
    fontSize: 17,
    color: "#6B3F31",
  },

  seguraLabel: {
    padding: 6,
    marginBottom: 8,
    justifyContent: 'center'
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  itemLabel: {
    marginLeft: 10,
    fontFamily: FONTS.inter.semiBold,
    fontSize: 14,
    color: "#686868de",
  },
  itemValue: {
    fontFamily: FONTS.inter.regular,
    fontSize: 16,
    color: "#000000ff",
  },

});