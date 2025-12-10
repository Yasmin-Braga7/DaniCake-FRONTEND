import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // ... (overlay e card continuam iguais)
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  // AQUI ESTÁ A MUDANÇA PRINCIPAL
  imageContainer: {
    width: '100%',        // Fixa na largura total disponível do card
    height: 300,          // Aumentei de 150 para 300 (agora fica bem maior/quadrado)
    backgroundColor: '#ffffffff', // Cor de fundo suave caso a imagem demore ou seja transparente
    borderRadius: 12,
    overflow: 'hidden',   // OBRIGATÓRIO: Corta qualquer parte da imagem que tentar "fugir"
    marginBottom: 12,
    justifyContent: 'center', // Centraliza o conteúdo
    alignItems: 'center',
  },
  image: {
    width: '95%',  // Ocupa toda a largura do container
    height: '100%',
    borderRadius: 12, // Ocupa toda a altura do container
  },

  // ... (restante dos estilos: title, description, addButton...)
  title: {
    fontSize: 22, // Aumentei um pouco para combinar com a imagem maior
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
    textAlign: 'center', // Descrição centralizada também
  },
  addButton: {
    backgroundColor: '#D4A574',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  }
});