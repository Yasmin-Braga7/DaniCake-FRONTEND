import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

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
    paddingVertical: 12,
  },

  headerTitle: {
    fontSize: 13,
    color: "#8E8E8E",
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6B6B6B",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 14,
  },
});
