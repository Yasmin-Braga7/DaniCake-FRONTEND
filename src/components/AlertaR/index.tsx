import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './style';

interface AlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const CustomAlert = ({ visible, title, message, onClose }: AlertProps) => {

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (visible) {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>

          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.alertContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
              </View>
              
              <View style={styles.body}>
                <Text style={styles.message}>{message}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};