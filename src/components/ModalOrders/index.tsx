import React from "react";
import { styles } from "./style";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: string;
  image?: any;
};

type Order = {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  price: string;
  status: string;
};

type Props = {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
};

export const OrderDetailsModal: React.FC<Props> = ({ visible, order, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Overlay - ao tocar fecha */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Modal centralizado */}
      <View style={styles.wrapper}>
        {/* Evita fechamento ao tocar dentro */}
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.modal}>
            {/* Cabeçalho */}
            <View style={styles.header}>
              <Text style={styles.title}>Detalhes do pedido {order?.orderNumber}</Text>
            </View>

            {/* Data de pedido */}
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Data de pedido</Text>
              <Text style={styles.dateValue}>{order?.date}</Text>
            </View>

            {/* Título fixo */}
            <View style={styles.itemsTitleRow}>
              <Text style={styles.itemsTitle}>Itens do pedido</Text>
            </View>

            {/* Lista rolável - limitar altura */}
            <View style={[styles.itemsContainer, { maxHeight: SCREEN_HEIGHT * 0.45 }]}>
              <ScrollView contentContainerStyle={styles.itemsList}>
                {order?.items?.map((it) => (
                  <View key={it.id} style={styles.itemRow}>
                    {it.image ? (
                      <Image source={it.image} style={styles.itemImage} />
                    ) : (
                      <View style={styles.itemImagePlaceholder} />
                    )}
                    <View style={styles.itemText}>
                      <Text style={styles.itemName}>{it.name}</Text>
                      <Text style={styles.itemQty}>Qtd: {it.qty}</Text>
                    </View>
                    <Text style={styles.itemPrice}>{it.price}</Text>
                  </View>
                ))}

                {/* Se não houver itens */}
                {(!order?.items || order.items.length === 0) && (
                  <View style={styles.emptyRow}>
                    <Text style={styles.emptyText}>Nenhum item</Text>
                  </View>
                )}
              </ScrollView>
            </View>

            {/* Footer com total */}
            <View style={styles.footer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{order?.price}</Text>
            </View>

            {/* Botão fechar */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};