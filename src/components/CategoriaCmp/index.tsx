import { Image } from "expo-image";
import React from "react";
import { styles } from "./style";
import { Text, View, ImageRequireSource } from "react-native";

interface CategoriaItemProps {
  title: string;
  imageSource: ImageRequireSource;
}

export const CategoriaItem = ({ title, imageSource }: CategoriaItemProps) => {
  return (
    <View style={styles.categoriaItem}>
      <View style={styles.categoria123}>
        <Image style={styles.imgCategoria} source={imageSource} />
      </View>
      <Text style={styles.textCategoria}>{title ?? ""}</Text>
    </View>
  );
};