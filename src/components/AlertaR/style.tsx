import { StyleSheet } from 'react-native';
import { FONTS } from '@/src/constants/fonts';
import { normalize, wp } from '@/src/constants/responsive';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(20),
  },
  alertContainer: {
    width: '100%',
    maxWidth: normalize(340),
    backgroundColor: '#fff',
    borderRadius: normalize(16),
    padding: normalize(20),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    marginBottom: normalize(10),
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(18),
    fontFamily: FONTS.inter.bold,
    color: '#333',
    textAlign: 'center',
  },
  body: {
    marginBottom: normalize(20),
    alignItems: 'center',
  },
  message: {
    fontSize: normalize(15),
    fontFamily: FONTS.inter.regular,
    color: '#666',
    textAlign: 'center',
    lineHeight: normalize(22),
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
});