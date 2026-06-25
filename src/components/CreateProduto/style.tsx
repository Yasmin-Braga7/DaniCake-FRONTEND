import { StyleSheet } from 'react-native';
import { FONTS } from '@/src/constants/fonts';
import { normalize, wp } from '@/src/constants/responsive';

export const styles = StyleSheet.create({
  container: {
    width: wp(85),
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: normalize(20),
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(15),
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  
  scrollContainer: {
    paddingBottom: normalize(10),
    overflow: 'visible',
  },
  
  // --- Formulário ---
  formGroup: {
    marginBottom: normalize(12),
  },

  dropdownGroup: {
    marginBottom: normalize(12),
    zIndex: 1000,
    elevation: 1000,
  },

  label: {
    fontSize: normalize(13),
    fontFamily: FONTS.inter.regular,
    color: '#000',
    marginBottom: normalize(4),
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: normalize(8),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(8),
    fontSize: normalize(14),
    fontFamily: FONTS.inter.regular,
    color: '#333',
    backgroundColor: '#fff',
  },
  
  textArea: {
    height: normalize(70),
    textAlignVertical: 'top',
  },

  // --- Campo de Preço ---
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: normalize(8),
    paddingHorizontal: normalize(12),
    backgroundColor: '#fff',
    height: normalize(42), 
  },
  pricePrefix: {
    fontSize: normalize(14),
    fontFamily: FONTS.inter.regular,
    color: '#333',
    marginRight: normalize(5),
  },
  priceInput: {
    flex: 1,
    paddingVertical: normalize(8),
    fontSize: normalize(14),
    fontFamily: FONTS.inter.regular,
    color: '#333',
  },

  // --- Upload de Imagem ---
  imageUploadTouch: {
    width: '100%',
    height: normalize(110),
    backgroundColor: '#F5F5F5',
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(15),
    overflow: 'hidden',
  },
  
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  uploadContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  uploadText: {
    marginTop: normalize(5),
    fontSize: normalize(13),
    color: '#888',
    fontFamily: FONTS.inter.regular,
  },

  // --- Botão Final ---
  submitButton: {
    backgroundColor: '#FBCBC9',
    borderRadius: normalize(25),
    paddingVertical: normalize(12),
    alignItems: 'center',
    marginTop: normalize(5),
    marginBottom: normalize(5),
  },
  submitButtonText: {
    fontSize: normalize(15),
    fontFamily: FONTS.inter.bold,
    color: '#000',
  },
});