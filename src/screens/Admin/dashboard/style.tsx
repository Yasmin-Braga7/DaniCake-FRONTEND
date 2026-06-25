import { StyleSheet } from "react-native";
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
    // --- Header Styles ---
    headerWrapper: {
        backgroundColor: '#FFF',
        paddingBottom: normalize(10),
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        zIndex: 1,
    },
    header: {
        paddingHorizontal: wp(5),
        paddingTop: normalize(10),
    },
    headerTitle: {
        fontSize: normalize(24),
        fontWeight: 'bold',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: normalize(15),
        color: '#666',
        marginTop: normalize(4),
    },
    // ---------------------
    
    content: {
        padding: normalize(20),
        paddingBottom: normalize(50),
    },
    subTitleSection: { 
        fontSize: normalize(16),
        fontWeight: '600',
        color: '#444',
        marginBottom: normalize(10),
        marginTop: normalize(10)
    },
    chartContainer: {
        backgroundColor: '#FFF',
        borderRadius: normalize(16),
        padding: normalize(10),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: normalize(25),
        alignItems: 'center',
        marginTop: normalize(10)
    },
    chart: {
        borderRadius: normalize(16),
        marginVertical: normalize(8),
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#FFF',
        width: '48%',
        padding: normalize(18),
        borderRadius: normalize(12),
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardLabel: {
        fontSize: normalize(13),
        color: '#888',
        fontWeight: '600',
        marginBottom: normalize(5),
        textAlign: 'center',
    },
    cardValue: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: '#FF69B4', 
        textAlign: 'center',
    },
});