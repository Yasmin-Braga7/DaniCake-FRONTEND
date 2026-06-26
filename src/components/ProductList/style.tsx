import { StyleSheet } from 'react-native';
import { FONTS } from '@/src/constants/fonts';
import { normalize, wp, hp } from '@/src/constants/responsive';

export const styles = StyleSheet.create({
  container: {
    width: wp(92),
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: normalize(22),
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(18),
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: normalize(20),
    borderWidth: 1,
    borderColor: '#FFF0F3',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(18),
    paddingBottom: normalize(12),
    borderBottomWidth: 1.5, 
    borderBottomColor: '#FFF0F3', 
  },
  
  headerTitleContainer: {
    flex: 1,
    marginRight: normalize(10),
  },

  headerTitle: {
    fontSize: normalize(17),
    fontFamily: FONTS.inter.semiBold,
    color: '#1a1a1a',
  },

  listContainer: {
    minHeight: hp(35), 
  },
  
  scrollContent: {
    paddingBottom: normalize(10),
  },

  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(12),
  },

  itemCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF6F7', 
    borderWidth: 1.5,
    borderColor: '#F7B6C3', 
    borderRadius: normalize(16),
    padding: normalize(12),
    alignItems: 'center',
    marginRight: normalize(10),
    position: 'relative',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(20),
  },
  modalContentContainer: {
    width: wp(90),
    maxHeight: hp(85),
    backgroundColor: '#fff',
    borderRadius: normalize(24),
    padding: normalize(22),
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(18),
    paddingHorizontal: normalize(4),
    paddingBottom: normalize(12),
    borderBottomWidth: 1.5,
    borderBottomColor: '#FFF0F3',
  },
  modalTitle: {
    fontSize: normalize(18),
    fontFamily: FONTS.inter.bold,
    color: '#1a1a1a',
  },

  itemImage: {
    width: normalize(65),
    height: normalize(65),
    borderRadius: normalize(12),
    backgroundColor: '#FFF0F3',
    marginRight: normalize(14),
  },

  itemInfo: {
    flex: 1,
    paddingRight: normalize(10),
  },

  itemTitle: {
    fontSize: normalize(14),
    fontFamily: FONTS.inter.semiBold,
    color: '#1a1a1a',
    marginBottom: normalize(3),
  },

  itemDesc: {
    fontSize: normalize(12),
    fontFamily: FONTS.inter.regular,
    color: '#666',
    lineHeight: normalize(16),
  },

  editButton: {
    position: 'absolute',
    top: normalize(10),
    right: normalize(10),
  },

  deleteButton: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(12),
    backgroundColor: '#FFF0F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    paddingVertical: normalize(20),
    fontSize: normalize(14),
    fontFamily: FONTS.inter.regular,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: normalize(30),
    fontSize: normalize(14),
    fontFamily: FONTS.inter.regular,
    color: '#aaa',
  },
});