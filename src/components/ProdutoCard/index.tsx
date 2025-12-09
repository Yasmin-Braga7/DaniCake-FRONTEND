import React from "react";
// 1. Adicionei TouchableOpacity aqui nos imports
import { View, Text, ImageSourcePropType, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { styles, CARD_WIDTH } from "./style";
import { Produto } from "@/src/interfaces/produtos/request";

interface ProdutoCardProps {
  produto: Produto;
  imagemSource: ImageSourcePropType;
  onPress: () => void;
}

// 2. Adicionei o 'onPress' aqui nos parâmetros recebidos
export const ProdutoCard = ({ produto, imagemSource, onPress }: ProdutoCardProps) => {
  return (
    // 3. Troquei a View principal por TouchableOpacity e liguei o onPress
    <TouchableOpacity 
      style={[styles.cardContainer, { width: CARD_WIDTH }]} 
      onPress={onPress}
      activeOpacity={0.7} // Efeito visual ao clicar
    >
      <Image style={styles.cardImage} source={imagemSource} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardNome}>{produto.nome ?? ""}</Text>
        <Text style={styles.cardPreco}>
          R$ {produto.preco ? produto.preco.toFixed(2).replace('.', ',') : '0,00'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
