import { FONTS } from "@/src/constants/fonts";
import { StyleSheet } from "react-native";
import { normalize, wp, hp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContent: {
        width: wp(88),
        maxHeight: hp(80),
        backgroundColor: "#FFF",
        borderRadius: normalize(20),
        padding: normalize(18),
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
        paddingHorizontal: normalize(18),
    },

    modalTitle: {
        fontSize: normalize(18),
        fontFamily: FONTS.inter.bold,
        color: "#5F3A3A",
        textAlign: "center",
        marginBottom: normalize(18),
    },

    dateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFF0F0",
        padding: normalize(12),
        borderRadius: normalize(10),
        marginBottom: normalize(14),
    },
    dateLabel: {
        fontSize: normalize(13),
        color: "#333",
        fontFamily: FONTS.inter.regular,
    },
    dateValue: {
        fontSize: normalize(13),
        color: "#333",
        fontFamily: FONTS.inter.regular,
    },

    sectionTitle: {
        fontSize: normalize(15),
        fontFamily: FONTS.inter.bold,
        marginBottom: normalize(10),
        color: "#000",
    },

    itemsList: {
        marginBottom: normalize(18),
    },

    itemCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF0F0",
        borderRadius: normalize(12),
        padding: normalize(10),
        marginBottom: normalize(10),
        minHeight: normalize(65),
    },
    itemImage: {
        width: normalize(46),
        height: normalize(46),
        borderRadius: normalize(8),
        marginRight: normalize(12),
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: normalize(13),
        fontFamily: FONTS.inter.regular,
        color: "#000",
    },
    itemQty: {
        fontSize: normalize(11),
        color: "#666",
        marginTop: normalize(4),
    },
    itemPrice: {
        fontSize: normalize(13),
        fontFamily: FONTS.inter.semiBold,
        color: "#000",
    },

    footer: {
        borderTopWidth: 1,
        borderTopColor: "#EEE",
        paddingTop: normalize(14),
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: normalize(18),
    },
    totalLabel: {
        fontSize: normalize(16),
        fontFamily: FONTS.inter.regular,
    },
    totalValue: {
        fontSize: normalize(16),
        fontFamily: FONTS.inter.bold,
        color: "#000",
    },

    closeButton: {
        backgroundColor: "#C23B6B",
        borderRadius: normalize(25),
        paddingVertical: normalize(12),
        alignItems: "center",
        width: "50%",
        alignSelf: "center",
    },
    closeButtonText: {
        color: "#FFF",
        fontSize: normalize(15),
        fontFamily: FONTS.inter.regular,
    },
});
