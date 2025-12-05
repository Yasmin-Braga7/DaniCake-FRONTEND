import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image"; // Recomendo usar expo-image já que seu projeto usa
import { Trash2, Plus, Minus } from "lucide-react-native";
import { styles } from "./style";
import { CartItem } from "@/src/context/CartContext";


interface CartCardsProps {
  data: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const CartCards = ({ data, onIncrement, onDecrement, onRemove }: CartCardsProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Imagem */}
        <Image
          source={data.imagemSource || require('@/assets/imagens/BombomPote.jpg')} // Fallback
          style={styles.image}
          contentFit="cover"
        />

        {/* Centro: Nome e Preço Unitário */}
        <View style={styles.center}>
          <Text style={styles.name} numberOfLines={2}>{data.nome}</Text>
          <Text style={styles.unitPrice}>
            R$ {data.preco.toFixed(2).replace(".", ",")}
          </Text>
        </View>

        {/* Direita: Controles de Quantidade e Total */}
        <View style={styles.right}>
            {/* Lixeira no topo à direita */}
           <TouchableOpacity onPress={onRemove} style={styles.trashBtn}>
                <Trash2 size={18} color="#D37A7A" />
           </TouchableOpacity>

           {/* Botões de + e - */}
           <View style={styles.quantityControl}>
              <TouchableOpacity style={styles.qtdBtn} onPress={onDecrement}>
                 <Minus size={16} color="#444" />
              </TouchableOpacity>
              
              <Text style={styles.qtyText}>{data.quantity}</Text>
              
              <TouchableOpacity style={styles.qtdBtn} onPress={onIncrement}>
                 <Plus size={16} color="#444" />
              </TouchableOpacity>
           </View>
           
           {/* Preço Total do Item */}
           <Text style={styles.totalPrice}>
             R$ {(data.preco * data.quantity).toFixed(2).replace(".", ",")}
           </Text>
        </View>
      </View>
    </View>
  );
};