import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { Image } from 'expo-image';
import { CirclePlus, Trash2, X, Pencil } from 'lucide-react-native';
import { ProdutoService } from '@/src/services/produtos';
import { AuthService } from '@/src/services/storage';
import { Produto } from '@/src/interfaces/produtos/request';
import { styles } from './style';
import { CreateProduto } from '@/src/components/CreateProduto';
import { EditProduto } from '../EditProduto/EditProduto';
interface ProductDisplay extends Produto {
  imageSource: any;
}

export const ProductList = () => {
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal de criar
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);

  // Modal de editar
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);

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
            headers: { Authorization: `Bearer ${token}` },
          },
        };
      });

      setProducts(displayProducts);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreateSuccess = () => {
    setCreateModalVisible(false);
    fetchProducts();
  };

  const handleEditSuccess = () => {
    setEditModalVisible(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  const handleOpenEdit = (produto: Produto) => {
    setSelectedProduct(produto);
    setEditModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Confirmação', 'Deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await ProdutoService.apagarProduto(id);
              Alert.alert('Sucesso', 'Produto excluído!');
              fetchProducts();
            } catch (error) {
              console.error('Erro exclusão:', error);
              Alert.alert('Erro', 'Falha ao excluir produto.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Produtos Disponíveis</Text>
        </View>
        <TouchableOpacity onPress={() => setCreateModalVisible(true)} activeOpacity={0.7}>
          <CirclePlus size={30} color="#C23B6B" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#C23B6B" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        ) : products.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            {products.map((item) => (
              <View key={item.id} style={styles.itemWrapper}>
                <View style={styles.itemCard}>
                  <Image
                    source={item.imageSource}
                    style={styles.itemImage}
                    contentFit="cover"
                    transition={500}
                  />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{item.nome}</Text>
                    <Text style={styles.itemDesc} numberOfLines={2}>{item.descricao}</Text>
                    <Text style={[styles.itemDesc, { marginTop: 4, fontFamily: 'Inter_700Bold', color: '#C23B6B' }]}>
                      R$ {item.preco?.toFixed(2).replace('.', ',')}
                    </Text>
                  </View>
                </View>

                {/* Botões de ação: editar + excluir */}
                <View style={localStyles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.deleteButton, localStyles.editButton]}
                    onPress={() => handleOpenEdit(item)}
                    activeOpacity={0.7}
                  >
                    <Pencil size={18} color="#C23B6B" strokeWidth={1.8} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                    activeOpacity={0.7}
                  >
                    <Trash2 size={20} color="#D37A7A" strokeWidth={1.8} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Modal — Criar Produto */}
      <Modal visible={isCreateModalVisible} transparent animationType="fade" onRequestClose={() => setCreateModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setCreateModalVisible(false)}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContentContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Produto</Text>
              <TouchableOpacity onPress={() => setCreateModalVisible(false)} activeOpacity={0.7}>
                <X size={24} color="#999" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: '90%' }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator keyboardShouldPersistTaps="handled">
              <CreateProduto onSuccess={handleCreateSuccess} />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Modal — Editar Produto */}
      <Modal visible={isEditModalVisible} transparent animationType="fade" onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setEditModalVisible(false)}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContentContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Produto</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} activeOpacity={0.7}>
                <X size={24} color="#999" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: '90%' }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator keyboardShouldPersistTaps="handled">
              {selectedProduct && (
                <EditProduto produto={selectedProduct} onSuccess={handleEditSuccess} />
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'column',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#FFF0F3',
  },
});
