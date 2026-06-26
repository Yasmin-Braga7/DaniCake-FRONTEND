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
import { X, CalendarDays, ShoppingBag, Package, User, ChefHat, Truck, Check, Clock } from "lucide-react-native";
import { normalize } from "@/src/constants/responsive";
import { FONTS } from "@/src/constants/fonts";
import { OrderStatus } from "@/src/enums/pedidos";

export interface AdminOrderItem {
  nome: string;
  quantidade: number;
  preco: number;
}

export interface AdminOrderData {
  id: number;
  date: string;
  clientName?: string;
  items: AdminOrderItem[];
  total: number;
  status: number;
}

interface AdminOrderModalProps {
  visible: boolean;
  onClose: () => void;
  order: AdminOrderData | null;
  onAdvance?: () => void;
}

const STATUS_LABELS: Record<number, string> = {
  [OrderStatus.PENDENTE]:   "Pendente",
  [OrderStatus.EM_PREPARO]: "Em Preparo",
  [OrderStatus.ENVIADO]:    "Enviado",
  [OrderStatus.ENTREGUE]:   "Entregue",
  [OrderStatus.CANCELADO]:  "Cancelado",
};

const ADVANCE_LABEL: Record<number, string> = {
  [OrderStatus.PENDENTE]:   "Aceitar e Iniciar Preparo",
  [OrderStatus.EM_PREPARO]: "Enviar para Entrega",
};

const ADVANCE_COLOR: Record<number, string> = {
  [OrderStatus.PENDENTE]:   "#27AE60",
  [OrderStatus.EM_PREPARO]: "#2196F3",
};

const StatusIcon = ({ status }: { status: number }) => {
  const props = { size: 16, style: { marginRight: 6 } };
  switch (status) {
    case OrderStatus.ENTREGUE:   return <Check   {...props} color="#C81D63" />;
    case OrderStatus.ENVIADO:    return <Truck   {...props} color="#1E90FF" />;
    case OrderStatus.PENDENTE:   return <Clock   {...props} color="#F0A500" />;
    case OrderStatus.EM_PREPARO: return <ChefHat {...props} color="#8E24AA" />;
    default:                      return null;
  }
};

export const AdminOrderModal = ({ visible, onClose, order, onAdvance }: AdminOrderModalProps) => {
  if (!order) return null;

  const canAdvance = order.status === OrderStatus.PENDENTE || order.status === OrderStatus.EM_PREPARO;
  const orderId = String(order.id).padStart(3, "0");

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
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.sheetHeader}>
          <View>
            <Text style={styles.sheetTitle}>Detalhes do Pedido</Text>
            <Text style={styles.sheetSubtitle}>Nº {orderId}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <X size={18} color="#C23B6B" />
          </TouchableOpacity>
        </View>

        {/* Status badge */}
        <View style={styles.statusRow}>
          <StatusIcon status={order.status} />
          <Text style={styles.statusText}>{STATUS_LABELS[order.status] ?? "—"}</Text>
        </View>

        {/* Data */}
        <View style={styles.infoRow}>
          <CalendarDays size={16} color="#C23B6B" style={{ marginRight: 8 }} />
          <Text style={styles.infoLabel}>Data do pedido</Text>
          <Text style={styles.infoValue}>{order.date}</Text>
        </View>

        {/* Cliente */}
        {order.clientName ? (
          <View style={styles.infoRow}>
            <User size={16} color="#C23B6B" style={{ marginRight: 8 }} />
            <Text style={styles.infoLabel}>Cliente</Text>
            <Text style={styles.infoValue}>{order.clientName}</Text>
          </View>
        ) : null}

        {/* Itens */}
        <View style={styles.sectionHeader}>
          <ShoppingBag size={16} color="#C23B6B" style={{ marginRight: 8 }} />
          <Text style={styles.sectionTitle}>Itens do pedido</Text>
        </View>

        <FlatList
          data={order.items}
          keyExtractor={(_, i) => String(i)}
          scrollEnabled={order.items.length > 3}
          style={{ maxHeight: normalize(200), marginBottom: normalize(12) }}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.nome}</Text>
                <Text style={styles.itemQty}>Quantidade: {item.quantidade}</Text>
              </View>
              <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
            </View>
          )}
        />

        {/* Total */}
        <View style={styles.totalRow}>
          <Package size={18} color="#1a1a1a" style={{ marginRight: 8 }} />
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ {order.total.toFixed(2).replace('.', ',')}</Text>
        </View>

        {/* Botões de ação */}
        <View style={{ gap: normalize(10) }}>
          {canAdvance && onAdvance && (
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: ADVANCE_COLOR[order.status] }]}
              onPress={() => { onClose(); onAdvance(); }}
              activeOpacity={0.85}
            >
              <Text style={styles.actionBtnText}>{ADVANCE_LABEL[order.status]}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.closePillBtn} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.closePillText}>Fechar</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: normalize(14),
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
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalize(14),
  },
  statusText: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(13),
    color: "#555",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6F7",
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(10),
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
    marginTop: normalize(4),
  },
  sectionTitle: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(14),
    color: "#1a1a1a",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6F7",
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(8),
    borderWidth: 1,
    borderColor: "#FFF0F3",
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
    marginTop: normalize(2),
  },
  itemPrice: {
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(14),
    color: "#C23B6B",
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: normalize(14),
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
  actionBtn: {
    borderRadius: normalize(28),
    paddingVertical: normalize(15),
    alignItems: "center",
  },
  actionBtnText: {
    color: "#fff",
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(14),
  },
  closePillBtn: {
    backgroundColor: "#F5F5F5",
    borderRadius: normalize(28),
    paddingVertical: normalize(14),
    alignItems: "center",
  },
  closePillText: {
    color: "#555",
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(14),
  },
});
