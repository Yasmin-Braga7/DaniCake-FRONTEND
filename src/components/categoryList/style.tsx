import { StyleSheet } from 'react-native';
import { FONTS } from '@/src/constants/fonts';
import { normalize, wp, hp } from '@/src/constants/responsive';

export const styles = StyleSheet.create({
    container: {
        width: wp(92),
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: normalize(22),
        paddingHorizontal: normalize(18),
        paddingTop: normalize(18),
        paddingBottom: normalize(14),

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
        marginBottom: normalize(20),
        borderWidth: 1,
        borderColor: '#FFF0F3',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: normalize(16),
        paddingBottom: normalize(12),
        borderBottomWidth: 1.5,
        borderBottomColor: '#FFF0F3',
    },

    headerTitleContainer: {
        flex: 1,
        marginRight: normalize(10),
    },

    headerTitle: {
        fontSize: normalize(17),
        fontFamily: FONTS.inter.semiBold,
        color: '#1a1a1a',
    },

    listContainer: {
        minHeight: normalize(100),
    },

    listContent: {
        paddingBottom: normalize(10), 
    },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalize(10), 
        paddingHorizontal: normalize(2), 
    },

    nameBox: {
        flex: 1,
        backgroundColor: '#FFF6F7', 
        borderWidth: 1.5,
        borderColor: '#F7B6C3',
        borderRadius: normalize(14),
        paddingVertical: normalize(14), 
        paddingHorizontal: normalize(18),
        marginRight: normalize(10),
    },

    nameText: {
        fontSize: normalize(14),
        color: '#1a1a1a',
        fontFamily: FONTS.inter?.regular || 'System',
    },

    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
    },

    actionBtn: {
        width: normalize(38),
        height: normalize(38),
        borderRadius: normalize(12),
        justifyContent: 'center',
        alignItems: 'center',
    },

    editBtn: {
        backgroundColor: '#FFF0F3',
    },

    deleteBtn: {
        backgroundColor: '#FFF0F3',
    },

    emptyText: {
        textAlign: 'center',
        color: '#aaa',
        marginTop: normalize(20),
        fontFamily: FONTS.inter?.regular || 'System',
        fontSize: normalize(14),
    },

    // --- Estilos do Modal ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: wp(88),
        backgroundColor: '#fff',
        borderRadius: normalize(24),
        padding: normalize(24),
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: normalize(22),
        paddingBottom: normalize(12),
        borderBottomWidth: 1.5,
        borderBottomColor: '#FFF0F3',
    },
    modalTitle: {
        fontSize: normalize(17),
        fontFamily: FONTS.inter.bold,
        color: '#1a1a1a',
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#F7B6C3',
        borderRadius: normalize(14),
        padding: normalize(14),
        fontSize: normalize(15),
        fontFamily: FONTS.inter?.regular || 'System',
        marginBottom: normalize(22),
        backgroundColor: '#FFF6F7',
        color: '#1a1a1a',
    },
    
    saveButton: {
        backgroundColor: '#C23B6B',
        borderRadius: normalize(28),
        paddingVertical: normalize(14),
        alignItems: 'center',
        marginTop: normalize(5),
        marginBottom: normalize(5),
        elevation: 3,
        shadowColor: '#C23B6B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    saveButtonText: {
        fontSize: normalize(15),
        fontFamily: FONTS.inter.bold,
        color: '#fff',
    },
});