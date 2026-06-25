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
    },

    img: {
        width: normalize(170),
        height: normalize(150),
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

    errorText:{
        color:'#f81345ff',
        fontFamily:FONTS.inter.light,
        fontSize: normalize(13),
        paddingLeft: normalize(12), 
        height: normalize(18),
    },
    inputError:{
        borderColor:'#f81345ff',
        borderWidth: 1.5,
    },
});