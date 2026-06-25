import { FONTS } from "@/src/constants/fonts";
import { StyleSheet } from "react-native";
import { normalize, wp, hp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F7",
  },
  headerWrapper: {
    width: '100%',
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 999,
  },

  header: {
    paddingHorizontal: wp(5),
    paddingVertical: normalize(15),
  },

  headerTitle: {
    fontFamily: FONTS.inter.light,
    fontSize: normalize(14),
    color: "#6e6e6eea",
    marginBottom: normalize(4),
  },

  headerSubtitle: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(15),
    color: "#6B6B6B",
  },

  scrollContent: {
    paddingTop: normalize(20),
    paddingBottom: normalize(40),
  },

  userCard: {
    minHeight: hp(30),
    backgroundColor: "#ffffffff",
    marginHorizontal: wp(4),
    marginBottom: normalize(15),
    borderRadius: normalize(18),
    justifyContent: 'center',
    alignItems: "center",
    paddingVertical: hp(2),
    elevation: 4,
  },
  photoCircle: {
    width: normalize(130),
    height: normalize(130),
    borderRadius: normalize(65),
    backgroundColor: "#DCDCDC",
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: {
    color: "#555",
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(16),
  },
  userName: {
    marginTop: normalize(12),
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(18),
    textAlign: 'center',
  },
  userType: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(13),
    color: "#777",
    textAlign: 'center',
  },

  infoCard: {
    backgroundColor: "#fff",
    marginHorizontal: wp(4),
    marginTop: normalize(15),
    borderRadius: normalize(18),
    padding: normalize(18),
    elevation: 4,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: normalize(16),
  },
  infoTitle: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(15),
    color: "#000000d8",
  },
  
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(16),
    color: "#6B3F31",
  },

  seguraLabel: {
    padding: normalize(6),
    marginBottom: normalize(8),
    justifyContent: 'center'
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(4),
  },

  itemLabel: {
    marginLeft: normalize(10),
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(13),
    color: "#686868de",
  },
  itemValue: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(15),
    color: "#000000ff",
  },

});