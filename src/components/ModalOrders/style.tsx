import { FONTS } from "@/src/constants/fonts"; // Ajuste se necessário
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContent: {
        width: "90%",
        maxHeight: height * 0.8, // limite para o modal não ultrapassar a tela
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 20,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },

    modalWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    backgroundFill: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    centered: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 18,
    },

    modalTitle: {
        fontSize: 20,
        fontFamily: FONTS.inter.bold,
        color: "#5F3A3A",
        textAlign: "center",
        marginBottom: 20,
    },

    dateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFF0F0",
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
    },
    dateLabel: {
        fontSize: 14,
        color: "#333",
        fontFamily: FONTS.inter.regular,
    },
    dateValue: {
        fontSize: 14,
        color: "#333",
        fontFamily: FONTS.inter.regular,
    },

    sectionTitle: {
        fontSize: 16,
        fontFamily: FONTS.inter.bold,
        marginBottom: 10,
        color: "#000",
    },

    // itemsList removido (usamos wrapper inline para controlar height dinamicamente)
    itemsList: {
        marginBottom: 20,
    },

    itemCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF0F0",
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
        minHeight: 70, // garante altura mínima visual estável
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontFamily: FONTS.inter.regular,
        color: "#000",
    },
    itemQty: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
    itemPrice: {
        fontSize: 14,
        fontFamily: FONTS.inter.semiBold,
        color: "#000",
    },

    footer: {
        borderTopWidth: 1,
        borderTopColor: "#EEE",
        paddingTop: 15,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 18,
        fontFamily: FONTS.inter.regular,
    },
    totalValue: {
        fontSize: 18,
        fontFamily: FONTS.inter.bold,
        color: "#000",
    },

    closeButton: {
        backgroundColor: "#C23B6B",
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: "center",
        width: "50%",
        alignSelf: "center",
    },
    closeButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontFamily: FONTS.inter.regular,
    },
});
