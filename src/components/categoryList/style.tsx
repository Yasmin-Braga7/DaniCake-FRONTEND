import { StyleSheet, Dimensions } from 'react-native';
import { FONTS } from '@/src/constants/fonts';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 15,

        // Altura fixa
        height: 220,

        // Remover paddingTop/paddingBottom do container
        paddingTop: 10,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },

    header: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    headerTitleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 4,
        flex: 1,
        marginRight: 15,
    },

    headerTitle: {
        fontSize: 16,
        fontFamily: FONTS.inter?.regular || 'System',
        color: '#000',
        fontWeight: '500',
    },

    listContent: {
        paddingBottom: 10, // Espaço extra no final do scroll
    },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12, // Espaço entre os itens
        paddingHorizontal: 2, // Para a sombra não cortar nas laterais se tiver
    },

    nameBox: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        borderRadius: 8,
        paddingVertical: 12, // Altura do retângulo cinza
        paddingHorizontal: 15,
        marginRight: 10,
    },

    nameText: {
        fontSize: 14,
        color: '#000',
        fontFamily: FONTS.inter?.regular || 'System',
    },

    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
        fontFamily: FONTS.inter?.regular || 'System',
    },

    // --- Estilos do Modal (sem alterações) ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#FAFAFA'
    },
    saveButton: {
        backgroundColor: '#000',
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});