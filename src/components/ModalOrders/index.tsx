import React from "react";
import { 
    Modal, 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Image,
    TouchableWithoutFeedback 
} from "react-native";
import { styles } from "./style"; 


interface OrderItem {
    id: string;
    name: string;
    qty: number;
    price: string; 
    image: any; 
}

interface OrderData {
    id: string;
    date: string;
    items: OrderItem[];
    total: string;
}

interface OrderDetailsModalProps {
    visible: boolean;          
    onClose: () => void;       
    order: OrderData | null;    
}

export const OrderDetailsModal = ({ visible, onClose, order }: OrderDetailsModalProps) => {
    if (!order) return null; 

    return (
        <Modal
            animationType="fade"
            transparent={true} 
            visible={visible}
            onRequestClose={onClose}
        >
           
            <TouchableOpacity 
                style={styles.modalOverlay} 
                activeOpacity={1} 
                onPressOut={onClose}
            >
            
                <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                        
                        {/* Cabeçalho */}
                        <Text style={styles.modalTitle}>Detalhes do pedido #{order.id}</Text>

                        <View style={styles.dateRow}>
                            <Text style={styles.dateLabel}>Data de pedido</Text>
                            <Text style={styles.dateValue}>{order.date}</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Itens do pedido</Text>

                       
                        <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={true}>
                            {order.items.map((item, index) => (
                                <View key={index} style={styles.itemCard}>
                                    <Image source={item.image} style={styles.itemImage} />
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemQty}>Qtd: {item.qty}</Text>
                                    </View>
                                    <Text style={styles.itemPrice}>{item.price}</Text>
                                </View>
                            ))}
                        </ScrollView>

                        
                        <View style={styles.footer}>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Total:</Text>
                                <Text style={styles.totalValue}>{order.total}</Text>
                            </View>

                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};