import React from "react";
import { Modal, View, Text, TouchableWithoutFeedback, Dimensions, FlatList } from "react-native";
import { Image } from "expo-image"; 
import { styles } from "./style";

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: string;
  // Agora o tipo 'any' vai aceitar o objeto { uri, headers }
  image: any; 
}

interface OrderData {
  id: string;
  date: string;
  items: OrderItem[];
  total: string;
}

interface OrderDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  order: OrderData | null;
}

export const OrderDetailsModal = ({ visible, onClose, order }: OrderDetailsModalProps) => {
  if (!order) return null;

  const screenHeight = Dimensions.get("window").height;
  const ITEM_HEIGHT = 80; 
  const VISIBLE_ITEMS = 3;

  const visibleCount = Math.min(order.items.length, VISIBLE_ITEMS);
  const itemsContainerHeight =
    order.items.length > VISIBLE_ITEMS ? ITEM_HEIGHT * VISIBLE_ITEMS : ITEM_HEIGHT * visibleCount;

  const totalDisplay = order.total;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalWrapper}>
        
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backgroundFill} />
        </TouchableWithoutFeedback>

        <View style={styles.centered}>
          <View style={[styles.modalContent, { maxHeight: screenHeight * 0.82 }]}>
            
            <Text style={styles.modalTitle}>Detalhes do pedido #{order.id}</Text>

            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Data de pedido</Text>
              <Text style={styles.dateValue}>{order.date}</Text>
            </View>

            <Text style={styles.sectionTitle}>Itens do pedido</Text>

            <View style={{ height: itemsContainerHeight, marginBottom: 16 }}>
              <FlatList
                data={order.items}
                keyExtractor={(item, index) => `${item.id ?? "item"}-${index}`}
                renderItem={({ item }) => (
                  <View style={styles.itemCard}>
                    
                    {/* AQUI ESTÁ O USO DO EXPO-IMAGE */}
                    <Image 
                        source={item.image} // Recebe o objeto com headers vindo da tela pai
                        style={styles.itemImage} 
                        contentFit="cover" 
                        transition={1000}
                    />

                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQty}>Qtd: {item.qty}</Text>
                    </View>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  </View>
                )}
                showsVerticalScrollIndicator
                nestedScrollEnabled
                contentContainerStyle={{ paddingBottom: 8 }}
                keyboardShouldPersistTaps="handled"
                getItemLayout={(_, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
              />
            </View>

            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>{totalDisplay}</Text>
              </View>

              <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};