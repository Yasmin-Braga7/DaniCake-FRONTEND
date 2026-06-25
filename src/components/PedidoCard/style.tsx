import { StyleSheet } from 'react-native';
import { normalize, wp } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(12),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(14),
    marginVertical: normalize(8),

    // sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,

    // sombra Android
    elevation: 4,
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
    fontWeight: '600',
    color: '#3B2F2F',
    marginBottom: normalize(4),
  },

  date: {
    fontSize: normalize(11),
    color: '#8E8E8E',
  },

  // ⭐ BASE DO BADGE
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(4),
    paddingHorizontal: normalize(8),
    borderRadius: normalize(12),
    borderWidth: 1,
  },

  // ⭐ COR DO BADGE ENTREGUE
  badgeDelivered: {
    backgroundColor: '#FFF0F6',
    borderColor: '#FFD6E6',
  },

  // ⭐ COR DEFAULT (pendente, enviado, etc)
  badgeDefault: {
    backgroundColor: '#F2F2F2',
    borderColor: '#E0E0E0',
  },

  badgeEnviado: {
    backgroundColor: '#E8F1FF',
    borderColor: '#B3D4FF',
  },
  badgeTextEnviado: {
    color: '#1E90FF',
  },

  // ⭐ PENDENTE
  badgePendente: {
    backgroundColor: '#FFF7E6',
    borderColor: '#FFE0A3',
  },
  badgeTextPendente: {
    color: '#F0A500',
  },

  // ⭐ CANCELADO
  badgeCancelado: {
    backgroundColor: '#FFECEC',
    borderColor: '#FFB3B3',
  },
  badgeTextCancelado: {
    color: '#FF4A4A',
  },

  badgeEmPreparo: {
    backgroundColor: '#F3E5F5',
    borderColor: '#E1BEE7',
  },
  badgeTextEmPreparo: {
    color: '#8E24AA',
  },

  badgeText: {
    fontSize: normalize(11),
    fontWeight: '600',
    color: '#6B6B6B',
  },

  badgeTextDelivered: {
    color: '#C81D63',
  },

  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: normalize(10),
    borderRadius: 1,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemsText: {
    fontSize: normalize(12),
    color: '#8E8E8E',
  },

  priceText: {
    fontSize: normalize(13),
    fontWeight: '700',
    color: '#111111',
  },
  
});
