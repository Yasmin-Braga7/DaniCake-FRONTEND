import React from 'react';
import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Check, Truck, Clock, X, ChefHat } from 'lucide-react-native'; // Importe o ChefHat
import { styles } from "./style";
import { OrderStatus } from '@/src/enums/pedidos';

type OrderCardProps = {
  orderNumber: string;
  date: string;
  itemsCount: number;
  price: string;
  status: number; // Agora recebe o número do Enum
  onPress?: (e: GestureResponderEvent) => void;
};

export const OrderCard = ({
  orderNumber,
  date,
  itemsCount,
  price,
  status,
  onPress,
}: OrderCardProps) => {

  // Função para pegar o Texto Baseado no Enum
  const getStatusLabel = (status: number) => {
    switch (status) {
        case OrderStatus.PENDENTE: return 'Pendente';
        case OrderStatus.EM_PREPARO: return 'Em Preparo';
        case OrderStatus.ENVIADO: return 'Enviado';
        case OrderStatus.ENTREGUE: return 'Entregue';
        case OrderStatus.CANCELADO: return 'Cancelado';
        default: return 'Desconhecido';
    }
  };

  const renderStatusIcon = () => {
    switch (status) {
      case OrderStatus.ENTREGUE:
        return <Check width={14} height={14} color="#C81D63" style={{ marginRight: 6 }} />;
      case OrderStatus.ENVIADO:
        return <Truck width={14} height={14} color="#1E90FF" style={{ marginRight: 6 }} />;
      case OrderStatus.PENDENTE:
        return <Clock width={14} height={14} color="#F0A500" style={{ marginRight: 6 }} />;
      case OrderStatus.CANCELADO:
        return <X width={14} height={14} color="#FF4A4A" style={{ marginRight: 6 }} />;
      case OrderStatus.EM_PREPARO:
        // Ícone novo para Status 1
        return <ChefHat width={14} height={14} color="#8E24AA" style={{ marginRight: 6 }} />;
      default:
        return null;
    }
  };

  const getBadgeStyle = () => {
    switch (status) {
      case OrderStatus.ENTREGUE: return styles.badgeDelivered;
      case OrderStatus.ENVIADO: return styles.badgeEnviado;
      case OrderStatus.PENDENTE: return styles.badgePendente;
      case OrderStatus.CANCELADO: return styles.badgeCancelado;
      case OrderStatus.EM_PREPARO: return styles.badgeEmPreparo; // Estilo novo
      default: return styles.badgeDefault;
    }
  };

  const getBadgeTextStyle = () => {
    switch (status) {
      case OrderStatus.ENTREGUE: return styles.badgeTextDelivered;
      case OrderStatus.ENVIADO: return styles.badgeTextEnviado;
      case OrderStatus.PENDENTE: return styles.badgeTextPendente;
      case OrderStatus.CANCELADO: return styles.badgeTextCancelado;
      case OrderStatus.EM_PREPARO: return styles.badgeTextEmPreparo; // Estilo novo
      default: return styles.badgeText;
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Pedido #{orderNumber}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={[styles.badge, getBadgeStyle()]}>
          {renderStatusIcon()}
          <Text style={[styles.badgeText, getBadgeTextStyle()]}>
            {getStatusLabel(status)}
          </Text>
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