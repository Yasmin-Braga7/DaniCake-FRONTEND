import { StyleSheet } from 'react-native';
import {FONTS} from '@/src/constants/fonts';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escuro transparente
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertContainer: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.inter.bold,
    color: '#333',
    textAlign: 'center',
  },
  body: {
    marginBottom: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    fontFamily: FONTS.inter.regular,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
});