import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react-native';
import { ProdutoService } from '@/src/services/produtos';
import { Produto } from '@/src/interfaces/produtos/request';
import { styles } from './style';

// Importa o hook atualizado
import { useNavigation } from '@/src/constants/router'; 

interface ProductDisplay extends Produto {
  imageSource: any;
}

export const ProductList = () => {
  const navigation = useNavigation(); // Instancia o hook
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Função atualizada para navegar para edição
  // const handleEdit = (id: number) => {
  //   navigation.adminEditProduct(id);
  // };

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
          <Text style={styles.headerTitle}>Fazer um novo produto</Text>
        </View>
        
        {/* Navega para criar produto */}
        <TouchableOpacity onPress={navigation.adminCreateProduct}>
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
            nestedScrollEnabled={true}
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

                  {/* Botão de Editar Conectado */}
                  {/* <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
                    <Pencil size={20} color="#000" strokeWidth={1.5} />
                  </TouchableOpacity> */}
                </View>

                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                  <Trash2 size={24} color="#000" strokeWidth={1.5} />
                </TouchableOpacity>

              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};