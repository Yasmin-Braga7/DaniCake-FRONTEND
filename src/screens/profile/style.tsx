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
    shadowRadius: 5,
    elevation: 6,
    zIndex: 999,
  },

  header: {
    paddingHorizontal: wp(5),
    paddingVertical: normalize(14),
  },

  headerTitle: {
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(22),
    color: "#1a1a1a",
    marginBottom: normalize(3),
  },

  headerSubtitle: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(13),
    color: "#888",
  },

  scrollContent: {
    paddingTop: normalize(20),
    paddingBottom: normalize(40),
  },

  // --- User Card ---
  userCard: {
    backgroundColor: "#fff",
    marginHorizontal: wp(4),
    marginBottom: normalize(15),
    borderRadius: normalize(22),
    justifyContent: 'center',
    alignItems: "center",
    paddingVertical: hp(3),
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#FFF0F3',
  },
  photoCircle: {
    width: normalize(110),
    height: normalize(110),
    borderRadius: normalize(55),
    backgroundColor: "#FFF0F3",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#F7B6C3",
  },
  userName: {
    marginTop: normalize(14),
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(20),
    color: "#1a1a1a",
    textAlign: 'center',
  },
  userType: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(13),
    color: '#C23B6B',
    textAlign: 'center',
    marginTop: normalize(2),
  },

  // --- Info Card ---
  infoCard: {
    backgroundColor: "#fff",
    marginHorizontal: wp(4),
    marginTop: normalize(10),
    borderRadius: normalize(22),
    padding: normalize(20),
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#FFF0F3',
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: normalize(18),
    paddingBottom: normalize(12),
    borderBottomWidth: 1.5,
    borderBottomColor: '#FFF0F3',
  },
  infoTitle: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(16),
    color: "#1a1a1a",
  },

  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F3',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(20),
  },
  editButton: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(13),
    color: "#C23B6B",
  },

  seguraLabel: {
    padding: normalize(6),
    marginBottom: normalize(8),
    justifyContent: 'center',
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(6),
  },

  itemLabel: {
    marginLeft: normalize(10),
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(13),
    color: "#888",
  },
  itemValue: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(15),
    color: "#1a1a1a",
    paddingLeft: normalize(30),
  },

  editInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#F7B6C3',
    flex: 1,
    paddingVertical: normalize(4),
    fontSize: normalize(15),
    fontFamily: FONTS.inter.regular,
    color: '#1a1a1a',
  },

  // --- Logout Button ---
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: "#D37A7A",
    borderRadius: normalize(28),
    backgroundColor: '#fff',
    paddingVertical: normalize(14),
    marginHorizontal: wp(4),
    marginTop: normalize(24),
    marginBottom: normalize(10),
    elevation: 2,
    shadowColor: '#D37A7A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutIcon: {
    marginRight: normalize(10),
  },
  logoutText: {
    color: "#D37A7A",
    fontSize: normalize(16),
    fontFamily: FONTS.inter.semiBold,
  },
});
