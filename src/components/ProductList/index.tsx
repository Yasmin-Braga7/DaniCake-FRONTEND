import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react-native';
import { ProdutoService } from '@/src/services/produtos';
import { Produto } from '@/src/interfaces/produtos/request';
import { styles } from './style';

// A interface Produto já está em '@/src/interfaces/produtos/request'
// A imagem será uma string Base64 (imagemBase64) ou URL.
interface ProductDisplay extends Produto {
  imageSource: any; // Para lidar com a exibição da imagem (Base64 ou URL)
}

export const ProductList = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedProducts = await ProdutoService.listarProdutos();
      
      // Mapeia os produtos para o formato de exibição
      const displayProducts: ProductDisplay[] = fetchedProducts.map(p => ({
        ...p,
        // Se a imagem for Base64, cria a source para o componente Image
        imageSource: p.imagemBase64 ? { uri: p.imagemBase64 } : require('@/assets/imagens/BoloCenoura.jpg'), // Fallback
      }));

      setProducts(displayProducts);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de produtos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = () => {
    // A navegação para criar produto será definida pelo usuário
    console.log("Navegar para tela de criação de produto");
    // Exemplo: navigation.navigate('CreateProdutoScreen');
  };

  const handleEdit = (id: number) => {
    // A navegação para editar produto será definida pelo usuário
    console.log("Navegar para tela de edição do produto", id);
    // Exemplo: navigation.navigate('EditProdutoScreen', { produtoId: id });
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir este produto?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Excluir", 
          onPress: async () => {
            try {
              await ProdutoService.apagarProduto(id);
              Alert.alert("Sucesso", "Produto excluído com sucesso!");
              // Atualiza a lista após a exclusão
              fetchProducts(); 
            } catch (error) {
              console.error("Erro ao excluir produto:", error);
              Alert.alert("Erro", "Não foi possível excluir o produto.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      {/* --- HEADER FIXO --- */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Fazer um novo produto</Text>
        </View>
        
        <TouchableOpacity onPress={handleAddProduct}>
          <PlusCircle size={28} color="#000" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      {/* --- LISTA ROLÁVEL COM ALTURA FIXA --- */}
	      <View style={styles.listContainer}>
	        {loading ? (
	          <Text style={styles.loadingText}>Carregando produtos...</Text>
	        ) : products.length === 0 ? (
	          <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
	        ) : (
	          <ScrollView 
	            contentContainerStyle={styles.scrollContent}
	            showsVerticalScrollIndicator={true} // Mostra a barra para indicar rolagem
	            nestedScrollEnabled={true} // Importante se estiver dentro de outro ScrollView
	          >
	            {products.map((item) => (
	              <View key={item.id} style={styles.itemWrapper}>
	                
	                {/* Card Cinza (Info + Edit) */}
	                <View style={styles.itemCard}>
	                  <Image source={item.imageSource} style={styles.itemImage} resizeMode="cover" />
	                  
	                  <View style={styles.itemInfo}>
	                    <Text style={styles.itemTitle}>{item.nome}</Text>
	                    <Text style={styles.itemDesc} numberOfLines={3}>
	                      {item.descricao}
	                    </Text>
	                  </View>
	
	                  {/* Ícone Editar (Absoluto no topo direita do card) */}
	                  <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
	                    <Pencil size={20} color="#000" strokeWidth={1.5} />
	                  </TouchableOpacity>
	                </View>
	
	                {/* Ícone Lixeira (Fora do card) */}
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