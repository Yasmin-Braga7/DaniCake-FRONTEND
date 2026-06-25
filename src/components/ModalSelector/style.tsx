import { StyleSheet } from "react-native";
import { FONTS } from "@/src/constants/fonts";
import { normalize } from "@/src/constants/responsive";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: normalize(20),
    zIndex: 10,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FBCBC9',
    paddingVertical: normalize(13),
    paddingHorizontal: normalize(18),
    borderRadius: normalize(25),
    borderWidth: 1,
    borderColor: '#FBCBC9',
  },
  
  headerOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#FBCBC9', 
  },

  headerTitle: {
    fontSize: normalize(15),
    fontFamily: FONTS.inter.semiBold,
    color: '#000',
  },

  listContainer: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    zIndex: 9999,
    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderBottomLeftRadius: normalize(15),
    borderBottomRightRadius: normalize(15),
    overflow: 'hidden',
    maxHeight: normalize(150), 
  },

  item: {
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(18),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  itemText: {
    fontSize: normalize(14),
    fontFamily: FONTS.inter.regular,
    color: '#333',
  },
  loadingText: {
    fontSize: normalize(15),
    fontFamily: FONTS.inter.regular,
    color: '#A0A0A0',
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(18),
    textAlign: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: normalize(25),
  }
});