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
          {/* 2. Card do Produto - Clique dentro NÃO fecha */}
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View style={styles.iconX}>
                <TouchableOpacity onPress={onClose}>
                  <X color="black" size={28} strokeWidth={2} />
                </TouchableOpacity>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  // Usa a imagem passada ou um placeholder
                  source={imagemSource}
                  style={styles.image}
                  // 'cover' = preenche tudo (pode cortar bordas)
                  // 'contain' = mostra imagem inteira (pode sobrar espaço)
                  contentFit="contain"
                  transition={1000} // Efeito suave ao carregar
                />
              </View>

              {/* Título Dinâmico */}
              <Text style={styles.title}>{produto?.nome}</Text>

              {/* Descrição Dinâmica (com fallback caso não tenha descrição) */}
              <Text style={styles.description}>
                {produto?.descricao || "Sem descrição disponível."}
              </Text>

              {/* Preço (Opcional, se tiver no objeto produto) */}
              {/* <Text style={styles.price}>R$ {produto?.preco}</Text> */}

              <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.8}
                onPress={handleAddToCart}
              >
                <Text style={styles.addButtonText}>Adicionar</Text>
                <ShoppingCart color="white" size={24} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
