import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { ReusableButton } from '../Button';

interface AlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  confirmText?: string;
}

export const Alert = ({ visible, title, message, onClose, confirmText = "OK" }:AlertProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
          
          <View style={styles.body}>
            <Text style={styles.message}>{message}</Text>
          </View>
          
          <View style={styles.footer}>
            <ReusableButton
              title={confirmText}
              onPress={onClose}
              activeOpacity={0.9}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}