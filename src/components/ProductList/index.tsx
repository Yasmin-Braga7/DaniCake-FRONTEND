import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react-native';
import { styles } from './style';

// Interface do Produto (Estatica)
interface Product {
  id: string;
  name: string;
  description: string;
  image: any; // Usando 'any' para require(), mas pode ser string url
}

export const ProductList = () => {
  
  // Dados estáticos para simulação
  const products: Product[] = [
    {
      id: '1',
      name: 'Nome do produto',
      description: 'Descrição do produto... bolo de cenoura e calda de chocolate',
      image: require('@/assets/imagens/BoloCenoura.jpg'), // Ajuste para uma imagem que você tenha
    },
    {
      id: '2',
      name: 'Nome do produto',
      description: 'Descrição do produto... bolo de cenoura e calda de chocolate',
      image: require('@/assets/imagens/BoloCenoura.jpg'),
    },
    {
      id: '3',
      name: 'Bolo de Fubá',
      description: 'Bolo caseiro de fubá com goiabada cascão',
      image: require('@/assets/imagens/BoloCenoura.jpg'),
    },
    {
      id: '4',
      name: 'Torta de Limão',
      description: 'Massa crocante com recheio cremoso de limão',
      image: require('@/assets/imagens/BoloCenoura.jpg'),
    },
  ];

  const handleAddProduct = () => {
    console.log("Adicionar novo produto");
  };

  const handleEdit = (id: string) => {
    console.log("Editar produto", id);
  };

  const handleDelete = (id: string) => {
    console.log("Deletar produto", id);
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
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true} // Mostra a barra para indicar rolagem
          nestedScrollEnabled={true} // Importante se estiver dentro de outro ScrollView
        >
          {products.map((item) => (
            <View key={item.id} style={styles.itemWrapper}>
              
              {/* Card Cinza (Info + Edit) */}
              <View style={styles.itemCard}>
                <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
                
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemDesc} numberOfLines={3}>
                    {item.description}
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
      </View>

    </View>
  );
};