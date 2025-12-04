import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Fundo escuro transparente
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 60% de opacidade preto
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // O Card branco
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    // Sombras
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#1a1a1a',
    lineHeight: 22,
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: '#FBCBCB', // Rosa original
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 50,
    gap: 12,
  },
  addButtonText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '400',
  },
});