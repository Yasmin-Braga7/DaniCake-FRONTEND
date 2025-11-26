import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";
import { styles } from "./style";

export const CartCards = () => {
    const name = "Bombom de pote";
  const qty = 2;
  const price = 28.0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Image
          source={require('@/assets/imagens/BombomPote.jpg')}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.center}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.qty}>Qtd: {qty}</Text>
        </View>

        <View style={styles.right}>
          <TouchableOpacity style={styles.trashBtn} activeOpacity={0.7}>
            <Trash2 size={20} color="#D37A7A" />
          </TouchableOpacity>

          <Text style={styles.price}>
            R$ {price.toFixed(2).replace(".", ",")}
          </Text>
        </View>
      </View>
    </View>
  );
};