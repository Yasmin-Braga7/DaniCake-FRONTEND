import { FONTS } from "@/src/constants/fonts";
import { StyleSheet } from "react-native";
import { normalize, wp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: wp(82),
    backgroundColor: "white",
    borderRadius: normalize(20),
    padding: normalize(18),
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  imageContainer: {
    width: "100%",
    height: normalize(260),
    backgroundColor: "#ffffffff",
    overflow: "hidden",
    marginBottom: normalize(12),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: normalize(22),
    fontFamily: FONTS.inter.bold,
    marginBottom: normalize(5),
    color: "#000000ff",
    textAlign: 'center',
  },

  iconX: {
    alignItems: 'flex-end',
    marginBottom: normalize(12),
  },

  description: {
    fontSize: normalize(16),
    fontFamily: FONTS.inter.regular,
    color: "#333333ff",
    marginBottom: normalize(18),
    lineHeight: normalize(22),
    paddingHorizontal: normalize(10),
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: "#C23B6B",
    borderRadius: normalize(35),
    paddingVertical: normalize(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    width: "60%",
    height: normalize(54),
    alignSelf: "center",
    gap: normalize(10),
  },
  addButtonText: {
    fontWeight: "bold",
    fontSize: normalize(15),
    color: "#ffffffff",
  },
});
