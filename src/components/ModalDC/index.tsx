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
import { styles } from './style'; 
import { Produto } from '@/src/interfaces/produtos/request';

interface ModalDCProps {
  visible: boolean;
  onClose: () => void;
  produto: Produto | null;
  imagemSource: any;
}

export default function ProductModal({ visible, onClose, produto, imagemSource }: ModalDCProps) {
  // Se não tiver produto selecionado, não renderiza nada (segurança extra)
  if (!produto && visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true} 
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* 1. Camada escura - Clique fora fecha */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          
          {/* 2. Card do Produto - Clique dentro NÃO fecha */}
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              
              <View style={styles.imageContainer}>
                <Image 
                  // Usa a imagem passada ou um placeholder
                  source={imagemSource || { uri: 'https://via.placeholder.com/300x200' }} 
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>

              {/* Título Dinâmico */}
              <Text style={styles.title}>{produto?.nome}</Text>

              {/* Descrição Dinâmica (com fallback caso não tenha descrição) */}
              <Text style={styles.description}>
                {produto?.descricao || 'Sem descrição disponível.'}
              </Text>
              
              {/* Preço (Opcional, se tiver no objeto produto) */}
              {/* <Text style={styles.price}>R$ {produto?.preco}</Text> */}

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