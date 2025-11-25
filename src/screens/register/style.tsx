import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF5F6', // Fundo rosa claro da tela inteira
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
    
    // Header
    header: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    logoCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#FFE4E9', // Fundo do circulo da logo
        borderWidth: 2,
        borderColor: '#F48FB1', // Borda rosa mais forte
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoText: {
        color: '#D81B60',
        fontWeight: 'bold',
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#8D8D8D', // Cinza escuro do título
        textTransform: 'uppercase',
    },

    // Card Branco
    cardForm: {
        backgroundColor: '#FFFFFF', // Branco puro
        width: '90%',
        borderRadius: 25,
        paddingVertical: 35,
        paddingHorizontal: 25,
        // Sombras
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        alignItems: 'center',
    },

    // Inputs
    inputContainer: {
        width: '100%',
        marginBottom: 18,
    },
    label: {
        fontSize: 15,
        color: '#4A4A4A', // Cinza quase preto para leitura
        marginBottom: 8,
        marginLeft: 5,
    },
    input: {
        width: '100%',
        height: 55,
        backgroundColor: '#FFF0F3', // Fundo rosa bem clarinho do input
        borderWidth: 1,
        borderColor: '#F8BBD0', // Borda rosa suave
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333333',
    },

    // Botão
    button: {
        width: '100%',
        height: 60,
        backgroundColor: '#6D4C41', // Marrom café/chocolate
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});