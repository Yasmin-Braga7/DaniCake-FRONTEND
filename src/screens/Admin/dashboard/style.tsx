import { StyleSheet } from "react-native";

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
        paddingBottom: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        zIndex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    // ---------------------
    
    content: {
        padding: 20,
        paddingBottom: 50,
    },
    subTitleSection: { 
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        marginBottom: 10,
        marginTop: 10
    },
    chartContainer: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 25,
        alignItems: 'center',
        marginTop: 10
    },
    chart: {
        borderRadius: 16,
        marginVertical: 8,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#FFF',
        width: '48%', // Usamos porcentagem, não precisa do Dimensions aqui
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardLabel: {
        fontSize: 14,
        color: '#888',
        fontWeight: '600',
        marginBottom: 5,
    },
    cardValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF69B4', 
    },
});