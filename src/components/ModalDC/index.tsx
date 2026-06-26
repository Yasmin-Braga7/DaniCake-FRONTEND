import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ShoppingCart, X } from "lucide-react-native";
import { Image } from "expo-image";
import { styles } from "./style";
import { Produto } from "@/src/interfaces/produtos/request";
import { useCart } from "@/src/context/CartContext";

interface ModalDCProps {
  visible: boolean;
  onClose: () => void;
  produto: Produto | null;
  imagemSource: any;
}

export default function ProductModal({
  visible,
  onClose,
  produto,
  imagemSource,
}: ModalDCProps) {
  const { addToCart } = useCart();
  if (!produto && visible) return null;

  const handleAddToCart = () => {
    if (produto) {
      addToCart(produto, imagemSource);
      onClose();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* Card do Produto - Clique dentro NÃO fecha */}
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              {/* Imagem no topo com X flutuante */}
              <View style={styles.imageContainer}>
                <Image
                  source={imagemSource}
                  style={styles.image}
                  contentFit="cover"
                  transition={500}
                />
                {/* X flutuante sobre a imagem */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <X color="#333" size={20} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              {/* Conteúdo */}
              <View style={styles.contentContainer}>
                {/* Título Dinâmico */}
                <Text style={styles.title}>{produto?.nome}</Text>

                {/* Preço */}
                <Text style={styles.priceText}>
                  R$ {produto?.preco?.toFixed(2).replace('.', ',')}
                </Text>

                {/* Descrição Dinâmica */}
                <Text style={styles.description}>
                  {produto?.descricao || "Sem descrição disponível."}
                </Text>

                <TouchableOpacity
                  style={styles.addButton}
                  activeOpacity={0.8}
                  onPress={handleAddToCart}
                >
                  <ShoppingCart color="white" size={20} strokeWidth={2} />
                  <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
