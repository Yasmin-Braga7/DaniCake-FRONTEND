import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";
import { normalize, wp, hp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF5F6',
    },

    keyboardAvoiding: {
        flex: 1,
    },

    scrollView: {
        flex: 1,
        backgroundColor: '#FFF5F6',
    },

    scrollContent: {
        flexGrow: 1,
        paddingBottom: hp(3),
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    topHeader: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: wp(6),
        marginTop: normalize(10),
    },

    backButton: {
        padding: normalize(5),
    },

    header: {
        alignItems: 'center',
        marginTop: normalize(10),
        marginBottom: hp(2),
        paddingHorizontal: wp(8),
    },

    img: {
        width: normalize(150),
        height: normalize(130),
        resizeMode: 'contain',
        marginBottom: normalize(5),
    },

    pageTitle: {
        fontSize: normalize(20),
        fontFamily: FONTS.inter.bold,
        color: '#828181',
        textTransform: 'uppercase',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: normalize(14),
        fontFamily: FONTS.inter.regular,
        color: '#858587',
        textAlign: 'center',
        marginTop: normalize(8),
        lineHeight: normalize(20),
    },

    subtitleHighlight: {
        fontFamily: FONTS.inter.bold,
        color: '#6c3f32ff',
    },

    cardForm: {
        backgroundColor: '#FFFFFF',
        width: wp(88),
        borderRadius: normalize(25),
        paddingVertical: normalize(30),
        paddingHorizontal: normalize(22),
        elevation: 3,
        shadowColor: '#000000ff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        alignItems: 'center',
    },

    inputContainer: {
        width: '100%',
        marginBottom: normalize(14),
    },

    label: {
        fontSize: normalize(15),
        fontFamily: FONTS.inter.regular,
        color: '#73443E',
        marginBottom: normalize(6),
        marginLeft: normalize(5),
    },

    input: {
        borderWidth: 1,
        borderColor: '#0000002d',
        borderRadius: normalize(25),
        height: normalize(50),
        paddingHorizontal: normalize(14),
        paddingVertical: normalize(8),
        backgroundColor: '#FFF6F7',
        fontSize: normalize(16),
    },

    inputCodigo: {
        textAlign: 'center',
        letterSpacing: normalize(8),
        fontFamily: FONTS.inter.bold,
    },

    errorText: {
        color: '#f81345ff',
        fontFamily: FONTS.inter.light,
        fontSize: normalize(13),
        paddingLeft: normalize(12),
        height: normalize(18),
    },

    inputError: {
        borderColor: '#f81345ff',
        borderWidth: 1.5,
    },

    // ───────── Seleção de canal (e-mail / SMS) ─────────

    canalOption: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#0000002d',
        borderRadius: normalize(18),
        paddingVertical: normalize(14),
        paddingHorizontal: normalize(16),
        marginBottom: normalize(14),
        backgroundColor: '#FFF6F7',
    },

    canalOptionSelected: {
        borderColor: '#6c3f32ff',
        backgroundColor: '#FCEFEC',
    },

    canalOptionDisabled: {
        opacity: 0.5,
    },

    canalIconWrapper: {
        width: normalize(42),
        height: normalize(42),
        borderRadius: normalize(21),
        backgroundColor: '#6c3f32ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: normalize(14),
    },

    canalTextWrapper: {
        flex: 1,
    },

    canalTitle: {
        fontFamily: FONTS.inter.semiBold,
        fontSize: normalize(15),
        color: '#73443E',
    },

    canalSubtitle: {
        fontFamily: FONTS.inter.regular,
        fontSize: normalize(13),
        color: '#858587',
        marginTop: normalize(2),
    },

    // ───────── Links auxiliares ─────────

    link: {
        color: '#6B3F31',
        textAlign: 'center',
        marginTop: normalize(16),
        fontFamily: FONTS.inter.regular,
        fontSize: normalize(15),
    },

    linkBold: {
        color: '#6B3F31',
        fontFamily: FONTS.inter.bold,
    },
});
