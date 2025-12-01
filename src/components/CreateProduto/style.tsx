import { StyleSheet } from 'react-native';
import { FONTS } from '@/src/constants/fonts'; // Ajuste o caminho se necessário

export const styles = StyleSheet.create({
  // Container principal com 80% de largura e centralizado
  container: {
    width: '80%', 
    alignSelf: 'center', 
    backgroundColor: '#fff',
    borderRadius: 20, 
    paddingVertical: 20,
    
    // Sombra para destacar o card do fundo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  
  scrollContainer: {
    paddingHorizontal: 20, 
    paddingBottom: 20,
    // Permite que o dropdown ultrapasse os limites do scroll se necessário (em alguns casos)
    overflow: 'visible', 
  },
  
  // --- Formulário ---
  formGroup: {
    marginBottom: 20,
  },

  // ESTILO NOVO: Use este para o container do Dropdown
  dropdownGroup: {
    marginBottom: 20,
    zIndex: 1000, // Garante que o container fique acima dos outros
    elevation: 1000, // Necessário para Android
  },

  label: {
    fontSize: 16,
    fontFamily: FONTS.inter.regular,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: FONTS.inter.regular,
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', 
  },

  // --- Campo de Preço com Prefixo R$ ---
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  pricePrefix: {
    fontSize: 16,
    fontFamily: FONTS.inter.regular,
    color: '#333',
    marginRight: 5,
  },
  priceInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: FONTS.inter.regular,
    color: '#333',
  },

  // --- Upload de Imagem ---
  imageUploadContainer: {
    alignItems: 'center',
    marginBottom: 30,
    zIndex: 1, // Menor que o dropdown
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#D9D9D9', 
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCE4EC', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  uploadButtonText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: FONTS.inter.regular,
    color: '#D81B60', 
  },

  // --- Botão Final ---
  submitButton: {
    backgroundColor: '#FBCBC9', 
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: FONTS.inter.bold,
    color: '#000',
  },
});