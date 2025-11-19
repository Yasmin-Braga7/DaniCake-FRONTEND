// OrderCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Check, Truck, Clock, X, Hourglass } from 'lucide-react-native';
import { styles } from "./style";

type StatusType = 'Entregue' | 'Pendente' | 'Enviado' | 'Cancelado';

type OrderCardProps = {
  orderNumber: string;
  date: string;
  itemsCount: number;
  price: string;
  status?: StatusType | string;
  onPress?: (e: GestureResponderEvent) => void;
};

export const OrderCard = ({
  orderNumber,
  date,
  itemsCount,
  price,
  status = 'Pendente',
  onPress,
}: OrderCardProps) => {

  const normalizedStatus = status.toLowerCase();

  // 🔥 Retorna o ícone correto
  const renderStatusIcon = () => {
    switch (normalizedStatus) {
      case 'entregue':
        return <Check width={14} height={14} color="#C81D63" style={{ marginRight: 6 }} />;
      case 'enviado':
        return <Truck width={14} height={14} color="#1E90FF" style={{ marginRight: 6 }} />;
      case 'pendente':
        return <Clock width={14} height={14} color="#F0A500" style={{ marginRight: 6 }} />;
      case 'cancelado':
        return <X width={14} height={14} color="#FF4A4A" style={{ marginRight: 6 }} />;
      default:
        return null;
    }
  };

  // ⭐ Retorna a cor do badge conforme o status
  const getBadgeStyle = () => {
    switch (normalizedStatus) {
      case 'entregue':
        return styles.badgeDelivered;
      case 'enviado':
        return styles.badgeEnviado;
      case 'pendente':
        return styles.badgePendente;
      case 'cancelado':
        return styles.badgeCancelado;
      default:
        return styles.badgeDefault;
    }
  };

  // ⭐ Retorna a cor do texto conforme o status
  const getBadgeTextStyle = () => {
    switch (normalizedStatus) {
      case 'entregue':
        return styles.badgeTextDelivered;
      case 'enviado':
        return styles.badgeTextEnviado;
      case 'pendente':
        return styles.badgeTextPendente;
      case 'cancelado':
        return styles.badgeTextCancelado;
      default:
        return styles.badgeText;
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.header}>
        
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Pedido {orderNumber}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        {/* BADGE */}
        <View style={[styles.badge, getBadgeStyle()]}>
          {renderStatusIcon()}
          <Text style={[styles.badgeText, getBadgeTextStyle()]}>{status}</Text>
        </View>

      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.itemsText}>
          {itemsCount} {itemsCount === 1 ? 'item' : 'itens'}
        </Text>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};
