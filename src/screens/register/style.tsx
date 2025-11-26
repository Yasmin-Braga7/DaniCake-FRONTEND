import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";

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
        paddingBottom: 20,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    topHeader: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 25,
        marginTop: 10,
    },

    backButton: {
        padding: 5,
    },

    
    header: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    img: {
        width: 200,
        height: 170,
        resizeMode: 'contain',
        marginBottom: 5,
    },

    pageTitle: {
        fontSize: 21,
        fontFamily: FONTS.inter.bold,
        color: '#828181',
        textTransform: 'uppercase',
    },

    cardForm: {
        backgroundColor: '#FFFFFF',
        width: '90%',
        borderRadius: 25,
        paddingVertical: 35,
        paddingHorizontal: 25,
        elevation: 3,
        shadowColor: '#000000ff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        alignItems: 'center',
    },

    inputContainer: {
        width: '100%',
        marginBottom: 18,
    },

    label: {
        fontSize: 16,
        fontFamily: FONTS.inter.regular,
        color: '#73443E',
        marginBottom: 8,
        marginLeft: 5,
    },

    input: {
        borderWidth: 1,
        borderColor: '#0000002d',
        borderRadius: 25,
        height: 55,
        padding: 10,
        backgroundColor: '#FFF6F7',
    },

    errorText:{
        color:'#f81345ff',
        fontFamily:FONTS.inter.light,
        fontSize:14,
        paddingLeft: 15, 
        height: 20,
    },
    inputError:{
        borderColor:'#f81345ff',
        borderWidth: 1.5,
    },
});