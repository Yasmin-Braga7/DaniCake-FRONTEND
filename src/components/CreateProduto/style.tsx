import { StyleSheet } from 'react-native';
import { FONTS } from '@/src/constants/fonts';

export const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  
  scrollContainer: {
    paddingBottom: 10,
    overflow: 'visible',
  },
  
  // --- Formulário ---
  formGroup: {
    marginBottom: 12,
  },

  dropdownGroup: {
    marginBottom: 12,
    zIndex: 1000,
    elevation: 1000,
  },

  label: {
    fontSize: 14,
    fontFamily: FONTS.inter.regular,
    color: '#000',
    marginBottom: 4,
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    fontFamily: FONTS.inter.regular,
    color: '#333',
    backgroundColor: '#fff',
  },
  
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },

  // --- Campo de Preço ---
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    height: 45, 
  },
  pricePrefix: {
    fontSize: 15,
    fontFamily: FONTS.inter.regular,
    color: '#333',
    marginRight: 5,
  },
  priceInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 15,
    fontFamily: FONTS.inter.regular,
    color: '#333',
  },

  // --- Upload de Imagem Compacto ---
  imageUploadTouch: {
    width: '100%',
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Estilo para o conteúdo vazio (ícone + texto)
  uploadContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  uploadText: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
    fontFamily: FONTS.inter.regular,
  },

  // --- Botão Final ---
  submitButton: {
    backgroundColor: '#FBCBC9',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: FONTS.inter.bold,
    color: '#000',
  },
});