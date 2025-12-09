import { StyleSheet, Dimensions } from 'react-native';
import { FONTS } from '@/src/constants/fonts';

const { width, height } = Dimensions.get('window'); // Pegamos height também

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1, 
    borderBottomColor: 'transparent', 
  },
  
  headerTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    paddingBottom: 2,
    flex: 1,
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 16,
    fontFamily: FONTS.inter.regular,
    color: '#000',
  },

  // --- ALTERAÇÃO AQUI ---
  listContainer: {
    // Aumentado para exibir mais itens (aprox 4.5 itens visíveis)
    height: 480, 
    // Opção responsiva: height: height * 0.55, 
  },
  
  scrollContent: {
    paddingBottom: 10,
  },

  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  itemCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo escuro transparente
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    padding: 20,
  },
  modalContentContainer: {
  width: '90%',
  maxHeight: '85%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
},
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 12,
  },

  itemInfo: {
    flex: 1,
    paddingRight: 20,
  },

  itemTitle: {
    fontSize: 14,
    fontFamily: FONTS.inter.regular,
    color: '#000',
    marginBottom: 2,
  },

  itemDesc: {
    fontSize: 12,
    fontFamily: FONTS.inter.regular,
    color: '#333',
  },

  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  deleteButton: {
    padding: 5,
  },
  loadingText: {
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 16,
    fontFamily: FONTS.inter.regular,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 16,
    fontFamily: FONTS.inter.regular,
    color: '#999',
  },
});