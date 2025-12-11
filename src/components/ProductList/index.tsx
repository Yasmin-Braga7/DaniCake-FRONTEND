import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, StyleSheet } from 'react-native';
// REMOVA o Image do import do react-native acima ^

import { Image } from 'expo-image'; // <--- ADICIONE ISSO
import { PlusCircle, Trash2, X } from 'lucide-react-native';
import { ProdutoService } from '@/src/services/produtos';
import { AuthService } from '@/src/services/storage';
import { Produto } from '@/src/interfaces/produtos/request';
import { styles } from './style';
import { CreateProduto } from '@/src/components/CreateProduto';

interface ProductDisplay extends Produto {
  imageSource: any;
}

export const ProductList = () => {
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AuthService.getToken();
      const rawData: Produto[] = await ProdutoService.listarProdutos();

      const displayProducts: ProductDisplay[] = rawData.map((p) => {
        return { 
            ...p, 
            imageSource: { 
                uri: `http://academico3.rj.senac.br/receitix/api/v1/images/foto/${p.id}`,
                headers: { Authorization: `Bearer ${token}` }
            }
        };
      });

      setProducts(displayProducts);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreateSuccess = () => {
    setModalVisible(false);
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Confirmação", "Deseja excluir este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await ProdutoService.apagarProduto(id);
              Alert.alert("Sucesso", "Produto excluído!");
              fetchProducts();
            } catch (error) {
              console.error("Erro exclusão:", error);
              Alert.alert("Erro", "Falha ao excluir produto.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Produtos Disponíveis</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <PlusCircle size={28} color="#000" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      <View style={[styles.listContainer, {height: 300}]}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#D4A574" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        ) : products.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true} nestedScrollEnabled={true}>
            {products.map((item) => (
              <View key={item.id} style={styles.itemWrapper}>
                <View style={styles.itemCard}>
                  
                  {/* --- MUDANÇA AQUI: Componente expo-image --- */}
                  <Image 
                    source={item.imageSource} 
                    style={styles.itemImage} 
                    contentFit="cover" // Em vez de resizeMode
                    transition={1000}  // Efeito suave igual ao da Home
                  />
                  {/* ------------------------------------------- */}

                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{item.nome}</Text>
                    <Text style={styles.itemDesc} numberOfLines={2}>{item.descricao}</Text>
                    <Text style={[styles.itemDesc, { marginTop: 4, fontWeight: 'bold' }]}>
                      R$ {item.preco?.toFixed(2).replace('.', ',')}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                  <Trash2 size={24} color="#000" strokeWidth={1.5} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.modalContentContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Produto</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: '90%' }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator keyboardShouldPersistTaps="handled">
              <CreateProduto onSuccess={handleCreateSuccess} />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}; 