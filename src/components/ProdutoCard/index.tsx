import React from "react";
import { View, Text, ImageRequireSource } from "react-native";
import { Image } from "expo-image";
import { styles, CARD_WIDTH } from "./style";

interface ProdutoCardProps {
  nome: string;
  preco: string;
  imagemSource: ImageRequireSource;
}

export const ProdutoCard = ({ nome, preco, imagemSource }: ProdutoCardProps) => {
  return (
    <View style={[styles.cardContainer, { width: CARD_WIDTH }]}>
      <Image style={styles.cardImage} source={imagemSource} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardNome}>{nome}</Text>
        <Text style={styles.cardPreco}>{preco}</Text>
      </View>
    </View>
  );
};
