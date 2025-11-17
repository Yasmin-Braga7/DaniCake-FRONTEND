import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderCard } from "@/src/components/PedidoCard";
import { OrderDetailsModal } from "@/src/components/ModalOrders";
import { styles } from "./style";

export const OrdersScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const openModal = (order: any) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meus Pedidos</Text>
          <Text style={styles.headerSubtitle}>Acompanhe seus pedidos</Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.listContent}>
        <OrderCard
          orderNumber="#001"
          date="10/11/2025"
          itemsCount={2}
          price="R$ 45,00"
          status="Pendente"
          onPress={() =>
            openModal({
              id: "001",
              orderNumber: "#001",
              date: "10/11/2025",
              price: "R$ 45,00",
              status: "Pendente",
              items: [
                {
                  id: "i1",
                  name: "Bolo de banana",
                  qty: 3,
                  price: "R$ 89,00",
                  image: require("@/assets/imagens/BoloBanana.jpg"),
                },
              ],
            })
          }
        />

        <OrderCard
          orderNumber="#002"
          date="09/11/2025"
          itemsCount={1}
          price="R$ 22,00"
          status="Enviado"
          onPress={() =>
            openModal({
              id: "002",
              orderNumber: "#002",
              date: "09/11/2025",
              price: "R$ 22,00",
              status: "Enviado",
              items: [
                {
                  id: "i2",
                  name: "Bolo de cenoura",
                  qty: 1,
                  price: "R$ 22,00",
                  image: require("@/assets/imagens/BoloBanana.jpg"),
                },
              ],
            })
          }
        />

        <OrderCard
          orderNumber="#003"
          date="08/11/2025"
          itemsCount={3}
          price="R$ 89,00"
          status="Entregue"
          onPress={() =>
            openModal({
              id: "003",
              orderNumber: "#003",
              date: "08/11/2025",
              price: "R$ 89,00",
              status: "Entregue",
              items: [
                {
                  id: "i3",
                  name: "Bolo de banana",
                  qty: 3,
                  price: "R$ 89,00",
                  image: require("@/assets/imagens/BoloBanana.jpg"),
                },
                {
                  id: "i4",
                  name: "Biscoito",
                  qty: 2,
                  price: "R$ 20,00",
                  image: require("@/assets/imagens/BoloBanana.jpg"),
                },
                {
                  id: "i5",
                  name: "Doce",
                  qty: 1,
                  price: "R$ 15,00",
                  image: require("@/assets/imagens/BoloBanana.jpg"),
                },
              ],
            })
          }
        />

        <OrderCard
          orderNumber="#004"
          date="07/11/2025"
          itemsCount={5}
          price="R$ 120,00"
          status="Cancelado"
          onPress={() =>
            openModal({
              id: "004",
              orderNumber: "#004",
              date: "07/11/2025",
              price: "R$ 120,00",
              status: "Cancelado",
              items: [
                {
                  id: "i6",
                  name: "Torta de maçã",
                  qty: 5,
                  price: "R$ 120,00",
                  image: require("@/assets/imagens/BoloBanana.jpg"),
                },
              ],
            })
          }
        />
      </ScrollView>

      <OrderDetailsModal visible={modalVisible} order={selectedOrder} onClose={closeModal} />
    </View>
  );
};
