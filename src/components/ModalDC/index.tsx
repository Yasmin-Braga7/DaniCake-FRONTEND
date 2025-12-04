import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Image 
} from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { styles } from './style'; // Importando do arquivo separado

interface ModalDC {
  visible: boolean;
  onClose: () => void;
}

export default function ProductModal({ visible, onClose }: ModalDC) {
  return (
    <Modal
      animationType="fade" // Efeito suave ao aparecer
      transparent={true}   // Permite ver o fundo escuro
      visible={visible}
      onRequestClose={onClose} // Obrigatório para o botão voltar do Android
      statusBarTranslucent // Cobre até a barra de status
    >
      {/* 1. Camada escura clicável (fecha o modal) */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          
          {/* 2. Bloqueia o clique para não fechar se clicar NO CARD */}
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              
              {/* Imagem Placeholder */}
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: 'https://via.placeholder.com/300x200' }} 
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>

              <Text style={styles.title}>Nome do produto</Text>

              <Text style={styles.description}>
                Descrição: ex; bolo de cenoura com calda cremosa de chocolate
              </Text>

              <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
                <Text style={styles.addButtonText}>Adicionar</Text>
                <ShoppingCart color="black" size={24} strokeWidth={2} />
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>

        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}