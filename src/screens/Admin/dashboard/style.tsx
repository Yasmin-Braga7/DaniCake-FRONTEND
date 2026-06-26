import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";
import { normalize, wp, hp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF6F7"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // --- Header ---
    headerWrapper: {
        backgroundColor: '#FFF',
        paddingBottom: normalize(14),
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
        zIndex: 1,
    },
    header: {
        paddingHorizontal: wp(5),
        paddingTop: normalize(12),
    },
    headerTitle: {
        fontSize: normalize(22),
        fontFamily: FONTS.inter.bold,
        color: '#1a1a1a',
    },
    headerSubtitle: {
        fontSize: normalize(13),
        fontFamily: FONTS.inter.regular,
        color: '#888',
        marginTop: normalize(3),
    },

    // --- Content ---
    content: {
        padding: normalize(18),
        paddingBottom: normalize(60),
    },

    // --- Seção título ---
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalize(14),
        marginTop: normalize(8),
    },
    sectionIcon: {
        width: normalize(36),
        height: normalize(36),
        borderRadius: normalize(10),
        backgroundColor: '#FFF0F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: normalize(10),
    },
    subTitleSection: { 
        fontSize: normalize(16),
        fontFamily: FONTS.inter.semiBold,
        color: '#333',
    },

    // --- Gráfico ---
    chartContainer: {
        backgroundColor: '#FFF',
        borderRadius: normalize(20),
        padding: normalize(16),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        marginBottom: normalize(22),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFF0F3',
    },
    chart: {
        borderRadius: normalize(16),
        marginVertical: normalize(6),
    },

    // --- Cards de estatísticas ---
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: normalize(12),
    },
    card: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: normalize(20),
        borderRadius: normalize(18),
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: '#FFF0F3',
    },
    cardIconContainer: {
        width: normalize(48),
        height: normalize(48),
        borderRadius: normalize(14),
        backgroundColor: '#FFF0F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: normalize(12),
    },
    cardLabel: {
        fontSize: normalize(12),
        color: '#888',
        fontFamily: FONTS.inter.semiBold,
        marginBottom: normalize(6),
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cardValue: {
        fontSize: normalize(22),
        fontFamily: FONTS.inter.bold,
        color: '#C23B6B', 
        textAlign: 'center',
    },
});