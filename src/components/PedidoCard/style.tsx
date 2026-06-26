import { StyleSheet } from 'react-native';
import { normalize, wp } from "@/src/constants/responsive";
import { FONTS } from '@/src/constants/fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(18),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(18),
    marginVertical: normalize(6),
    marginHorizontal: normalize(2),

    // sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,

    // sombra Android
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FFF0F3',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleBlock: {
    flex: 1,
  },

  title: {
    fontSize: normalize(15),
    fontFamily: FONTS.inter.semiBold,
    color: '#1a1a1a',
    marginBottom: normalize(4),
  },

  date: {
    fontSize: normalize(11),
    fontFamily: FONTS.inter.regular,
    color: '#999',
  },

  // Badge base
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(20),
    borderWidth: 1,
  },

  // Badge Entregue
  badgeDelivered: {
    backgroundColor: '#FFF0F6',
    borderColor: '#FFD6E6',
  },

  // Badge Default
  badgeDefault: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E8E8E8',
  },

  badgeEnviado: {
    backgroundColor: '#EBF5FF',
    borderColor: '#B3D4FF',
  },
  badgeTextEnviado: {
    color: '#1E90FF',
  },

  // Pendente
  badgePendente: {
    backgroundColor: '#FFF8E6',
    borderColor: '#FFE0A3',
  },
  badgeTextPendente: {
    color: '#F0A500',
  },

  // Cancelado
  badgeCancelado: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FFB3B3',
  },
  badgeTextCancelado: {
    color: '#FF4A4A',
  },

  badgeEmPreparo: {
    backgroundColor: '#F5F0FF',
    borderColor: '#E1BEE7',
  },
  badgeTextEmPreparo: {
    color: '#8E24AA',
  },

  badgeText: {
    fontSize: normalize(11),
    fontFamily: FONTS.inter.semiBold,
    color: '#777',
  },

  badgeTextDelivered: {
    color: '#C23B6B',
  },

  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginVertical: normalize(12),
    borderRadius: 1,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemsText: {
    fontSize: normalize(12),
    fontFamily: FONTS.inter.regular,
    color: '#999',
  },

  priceText: {
    fontSize: normalize(14),
    fontFamily: FONTS.inter.bold,
    color: '#1a1a1a',
  },
  
});
