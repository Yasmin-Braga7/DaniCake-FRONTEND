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
        borderBottomColor: '#666',
        paddingBottom: 2,
        flex: 1,
        marginRight: 10,
    },

    headerTitle: {
        fontSize: 18,
        fontFamily: FONTS.inter.regular,
        color: '#000',
    },

    listContainer: {
        height: 480,
    },

    listContent: {
        paddingBottom: 10, 
    },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12, 
        paddingHorizontal: 2, 
    },

    nameBox: {
        flex: 1,
        // Fundo rosa claro do tema
        backgroundColor: '#FFF6F7', 
        // Borda rosa mais escura para destacar
        borderWidth: 1,
        borderColor: '#F7B6C3',
        
        borderRadius: 8,
        paddingVertical: 12, 
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

    // --- Estilos do Modal ---
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
    
    // Botão estilizado (Rosa e Redondinho)
    saveButton: {
        backgroundColor: '#FBCBC9',
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: FONTS.inter.bold,
        color: '#000',
    },
});