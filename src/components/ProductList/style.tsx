import { StyleSheet } from 'react-native';
import { FONTS } from '@/src/constants/fonts';
import { normalize, wp, hp } from '@/src/constants/responsive';

export const styles = StyleSheet.create({
  container: {
    width: wp(90),
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: normalize(20),
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(15),
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: normalize(20),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(15),
    paddingBottom: normalize(10),
    borderBottomWidth: 1, 
    borderBottomColor: 'transparent', 
  },
  
  headerTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    paddingBottom: normalize(2),
    flex: 1,
    marginRight: normalize(10),
  },

  headerTitle: {
    fontSize: normalize(16),
    fontFamily: FONTS.inter.regular,
    color: '#000',
  },

  listContainer: {
    height: hp(55), 
  },
  
  scrollContent: {
    paddingBottom: normalize(10),
  },

  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(15),
  },

  itemCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF6F7', 
    borderWidth: 1,
    borderColor: '#F7B6C3', 
    borderRadius: normalize(12),
    padding: normalize(10),
    alignItems: 'center',
    marginRight: normalize(10),
    position: 'relative',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(20),
  },
  modalContentContainer: {
    width: wp(88),
    maxHeight: hp(85),
    backgroundColor: '#fff',
    borderRadius: normalize(20),
    padding: normalize(20),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(15),
    paddingHorizontal: normalize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: normalize(10),
  },
  modalTitle: {
    fontSize: normalize(18),
    fontFamily: FONTS.inter.bold,
    color: '#000000ff',
  },

  itemImage: {
    width: normalize(55),
    height: normalize(55),
    borderRadius: normalize(8),
    backgroundColor: '#fff',
    marginRight: normalize(12),
  },

  itemInfo: {
    flex: 1,
    paddingRight: normalize(20),
  },

  itemTitle: {
    fontSize: normalize(13),
    fontFamily: FONTS.inter.regular,
    color: '#000',
    marginBottom: normalize(2),
  },

  itemDesc: {
    fontSize: normalize(11),
    fontFamily: FONTS.inter.regular,
    color: '#333',
  },

  editButton: {
    position: 'absolute',
    top: normalize(10),
    right: normalize(10),
  },

  deleteButton: {
    padding: normalize(5),
  },
  loadingText: {
    textAlign: 'center',
    paddingVertical: normalize(20),
    fontSize: normalize(15),
    fontFamily: FONTS.inter.regular,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: normalize(20),
    fontSize: normalize(15),
    fontFamily: FONTS.inter.regular,
    color: '#999',
  },
});