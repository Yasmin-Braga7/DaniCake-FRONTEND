import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { PlusCircle, Trash2, X } from 'lucide-react-native';
import { ProdutoService } from '@/src/services/produtos';
import { Produto } from '@/src/interfaces/produtos/request';
import { styles } from './style';

// Importa o componente de criar produto (que agora é só o conteúdo do form)
import { CreateProduto } from '@/src/components/CreateProduto';

interface ProductDisplay extends Produto {
  imageSource: any;
}

export const ProductList = () => {
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar a visibilidade do Modal
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const rawData: Produto[] = await ProdutoService.listarProdutos();
      
      const displayProducts: ProductDisplay[] = rawData.map((p) => {
        let finalImageSource = require('@/assets/imagens/BoloCenoura.jpg'); 
        const rawImage = p.imagem || p.imagemBase64;

        if (rawImage) {
          const base64String = rawImage.startsWith('data:') 
            ? rawImage 
            : `data:image/png;base64,${rawImage}`;
          finalImageSource = { uri: base64String };
        }

        return { ...p, imageSource: finalImageSource };
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

  // Função chamada quando o produto é criado com sucesso
  const handleCreateSuccess = () => {
    setModalVisible(false); // Fecha o modal
    fetchProducts(); // Atualiza a lista
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Confirmação",
      "Deseja excluir este produto?",
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
        
        {/* Abre o Modal ao clicar */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <PlusCircle size={28} color="#000" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
             <ActivityIndicator size="large" color="#D4A574" />
             <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        ) : products.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
        ) : (
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            {products.map((item) => (
              <View key={item.id} style={styles.itemWrapper}>
                <View style={styles.itemCard}>
                  <Image source={item.imageSource} style={styles.itemImage} resizeMode="cover" />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{item.nome}</Text>
                    <Text style={styles.itemDesc} numberOfLines={2}>{item.descricao}</Text>
                    <Text style={[styles.itemDesc, {marginTop: 4, fontWeight: 'bold'}]}>
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

      {/* --- MODAL CENTRALIZADO --- */}
      <Modal
        visible={isModalVisible}
        animationType="fade" // Fade fica mais elegante para centralizado
        transparent={true} // Importante para ver o fundo escuro
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Fundo escuro que fecha ao clicar */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            
            {/* Evita que o clique na caixa branca feche o modal */}
            <TouchableWithoutFeedback onPress={() => {}}>
               {/* KeyboardAvoidingView move a caixa branca para cima quando o teclado abre */}
               <KeyboardAvoidingView
                 behavior={Platform.OS === "ios" ? "padding" : "height"}
                 style={styles.modalContentContainer}
               >
                  {/* Cabeçalho do Modal com Título e botão Fechar (X) */}
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Novo Produto</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                      <X size={24} color="#666" />
                    </TouchableOpacity>
                  </View>

                  {/* O Formulário é renderizado aqui dentro.
                      Passamos a função para fechar após o sucesso. */}
                  <View style={{ flex: 1 }}>
                     <CreateProduto onSuccess={handleCreateSuccess} />
                  </View>

               </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </View>
  );
};