import { StyleSheet } from 'react-native';
import { FONTS } from '@/src/constants/fonts';
import { normalize, wp, hp } from '@/src/constants/responsive';

export const styles = StyleSheet.create({
    container: {
        width: wp(90),
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: normalize(20),
        paddingHorizontal: normalize(15),
        paddingTop: normalize(10),

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: normalize(20),
    },

    header: {
        height: normalize(38),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: normalize(8),
    },

    headerTitleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        paddingBottom: normalize(2),
        flex: 1,
        marginRight: normalize(10),
    },

    headerTitle: {
        fontSize: normalize(16),
        fontFamily: FONTS.inter.regular,
        color: '#000',
    },

    listContainer: {
        height: hp(55),
    },

    listContent: {
        paddingBottom: normalize(10), 
    },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalize(12), 
        paddingHorizontal: normalize(2), 
    },

    nameBox: {
        flex: 1,
        backgroundColor: '#FFF6F7', 
        borderWidth: 1,
        borderColor: '#F7B6C3',
        
        borderRadius: normalize(8),
        paddingVertical: normalize(12), 
        paddingHorizontal: normalize(15),
        marginRight: normalize(10),
    },

    nameText: {
        fontSize: normalize(13),
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
        marginTop: normalize(20),
        fontFamily: FONTS.inter?.regular || 'System',
        fontSize: normalize(14),
    },

    // --- Estilos do Modal ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: wp(85),
        backgroundColor: '#fff',
        borderRadius: normalize(20),
        padding: normalize(20),
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: normalize(20),
    },
    modalTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: normalize(8),
        padding: normalize(12),
        fontSize: normalize(15),
        marginBottom: normalize(20),
        backgroundColor: '#FAFAFA'
    },
    
    saveButton: {
        backgroundColor: '#FBCBC9',
        borderRadius: normalize(25),
        paddingVertical: normalize(12),
        alignItems: 'center',
        marginTop: normalize(5),
        marginBottom: normalize(5),
    },
    saveButtonText: {
        fontSize: normalize(15),
        fontFamily: FONTS.inter.bold,
        color: '#000',
    },
});