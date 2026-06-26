import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { X, Package, CalendarDays, ShoppingBag, Truck } from "lucide-react-native";
import { normalize } from "@/src/constants/responsive";
import { FONTS } from "@/src/constants/fonts";

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: string;
  image: any;
}

export interface OrderData {
  id: string;
  date: string;
  items: OrderItem[];
  total: string;
  status?: number;
  rawId?: number;
  showConfirmButton?: boolean;
  isWaiting?: boolean;
}

interface OrderDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  order: OrderData | null;
  onConfirmReceipt?: (orderId: number) => void;
}

export const OrderDetailsModal = ({
  visible,
  onClose,
  order,
  onConfirmReceipt,
}: OrderDetailsModalProps) => {
  if (!order) return null;

  // Altura aumentada para mostrar mais itens
  const ITEM_HEIGHT = 90;
  const VISIBLE_ITEMS = 4;
  const visibleCount = Math.min(order.items.length, VISIBLE_ITEMS);
  const itemsContainerHeight =
    order.items.length > VISIBLE_ITEMS
      ? ITEM_HEIGHT * VISIBLE_ITEMS
      : ITEM_HEIGHT * visibleCount;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        {/* Handle */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.sheetHeader}>
          <View>
            <Text style={styles.sheetTitle}>Detalhes do Pedido</Text>
            <Text style={styles.sheetSubtitle}>Nº {order.id}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <X size={18} color="#C23B6B" />
          </TouchableOpacity>
        </View>

        {/* Data do pedido */}
        <View style={styles.infoRow}>
          <CalendarDays size={16} color="#C23B6B" style={{ marginRight: 8 }} />
          <Text style={styles.infoLabel}>Data do pedido</Text>
          <Text style={styles.infoValue}>{order.date}</Text>
        </View>

        {/* Itens */}
        <View style={styles.sectionHeader}>
          <ShoppingBag size={16} color="#C23B6B" style={{ marginRight: 8 }} />
          <Text style={styles.sectionTitle}>Itens do pedido</Text>
        </View>

        {/* Caixa de itens maior */}
        <View style={[styles.itemsContainer, { height: itemsContainerHeight }]}>
          <FlatList
            data={order.items}
            keyExtractor={(item, index) => `${item.id ?? "item"}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <Image
                  source={item.image}
                  style={styles.itemImage}
                  contentFit="cover"
                  transition={500}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQty}>Quantidade: {item.qty}</Text>
                </View>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={{ paddingBottom: 4 }}
            getItemLayout={(_, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
          />
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Package size={18} color="#1a1a1a" style={{ marginRight: 8 }} />
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{order.total}</Text>
        </View>

        {/* Banner: pedido a caminho (aguardando timer) */}
        {order.isWaiting && (
          <View style={styles.waitingBanner}>
            <Truck size={14} color="#1E90FF" style={{ marginRight: 6 }} />
            <Text style={styles.waitingText}>
              Pedido a caminho... Confirme quando chegar!
            </Text>
          </View>
        )}

        {/* Botão confirmar entrega (dentro do modal) */}
        {order.showConfirmButton && order.rawId !== undefined && onConfirmReceipt && (
          <TouchableOpacity
            onPress={() => onConfirmReceipt(order.rawId!)}
            style={styles.confirmBtn}
            activeOpacity={0.85}
          >
            <Truck size={16} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.confirmBtnText}>Chegou! Confirmar entrega</Text>
          </TouchableOpacity>
        )}

        {/* Botão Fechar */}
        {!order.showConfirmButton && (
          <TouchableOpacity style={styles.closePillBtn} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.closePillText}>Fechar</Text>
          </TouchableOpacity>
        )}

        {/* Se tem botão confirmar, adiciona botão fechar secundário */}
        {order.showConfirmButton && (
          <TouchableOpacity style={styles.closePillBtnSecondary} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.closePillTextSecondary}>Fechar</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: normalize(28),
    borderTopRightRadius: normalize(28),
    paddingHorizontal: normalize(22),
    paddingBottom: normalize(36),
    paddingTop: normalize(12),
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  handle: {
    width: normalize(40),
    height: normalize(4),
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginBottom: normalize(18),
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: normalize(18),
  },
  sheetTitle: {
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(18),
    color: "#1a1a1a",
  },
  sheetSubtitle: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(13),
    color: "#C23B6B",
    marginTop: normalize(2),
  },
  closeBtn: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: "#FFF0F3",
    alignItems: "center",
    justifyContent: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6F7",
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(18),
    borderWidth: 1,
    borderColor: "#FFF0F3",
  },
  infoLabel: {
    flex: 1,
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(13),
    color: "#555",
  },
  infoValue: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(13),
    color: "#1a1a1a",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalize(10),
  },
  sectionTitle: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(14),
    color: "#1a1a1a",
  },
  // Container de itens com borda e background para parecer uma "caixa"
  itemsContainer: {
    backgroundColor: "#FFF6F7",
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: "#F0D6DC",
    padding: normalize(8),
    marginBottom: normalize(16),
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: normalize(14),
    padding: normalize(10),
    marginBottom: normalize(8),
    minHeight: normalize(72),
    borderWidth: 1,
    borderColor: "#FFF0F3",
    elevation: 1,
    shadowColor: "#C23B6B",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  itemImage: {
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(10),
    marginRight: normalize(12),
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(13),
    color: "#1a1a1a",
  },
  itemQty: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(12),
    color: "#888",
    marginTop: normalize(3),
  },
  itemPrice: {
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(14),
    color: "#C23B6B",
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: normalize(14),
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    marginBottom: normalize(16),
  },
  totalLabel: {
    flex: 1,
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(16),
    color: "#1a1a1a",
  },
  totalValue: {
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(18),
    color: "#C23B6B",
  },
  // Banner "a caminho"
  waitingBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF5FF",
    borderRadius: normalize(10),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(10),
    marginBottom: normalize(12),
  },
  waitingText: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(12),
    color: "#1E90FF",
    flex: 1,
  },
  // Botão principal: confirmar entrega
  confirmBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C23B6B",
    borderRadius: normalize(28),
    paddingVertical: normalize(15),
    marginBottom: normalize(10),
    elevation: 4,
    shadowColor: "#C23B6B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  confirmBtnText: {
    color: "#fff",
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(15),
  },
  // Botão fechar principal (sem confirmar)
  closePillBtn: {
    backgroundColor: "#C23B6B",
    borderRadius: normalize(28),
    paddingVertical: normalize(15),
    alignItems: "center",
  },
  closePillText: {
    color: "#fff",
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(15),
  },
  // Botão fechar secundário (quando tem confirmar)
  closePillBtnSecondary: {
    backgroundColor: "transparent",
    borderRadius: normalize(28),
    paddingVertical: normalize(12),
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
  },
  closePillTextSecondary: {
    color: "#888",
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(14),
  },
});
