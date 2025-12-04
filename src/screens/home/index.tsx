import { Image } from "expo-image";
import { ImageRequireSource, ScrollView, Text, View, ActivityIndicator } from "react-native";
import { CategoriaItem } from "../../components/CategoriaCmp";
import { ProdutoCard } from "../../components/ProdutoCard";
import { styles } from "./style";
import { useEffect, useState } from "react";
import { ProdutoService } from "@/src/services/produtos";
import { AuthService } from "@/src/services/storage";
import { Produto } from "@/src/interfaces/produtos/request";
import ProductModal from "@/src/components/ModalDC";


interface Categoria {
  title: string;
  image: ImageRequireSource;
}

// interface ProdutoLocal {
//   id: number;
//   nome: string;
//   preco: string;
//   imagem: string;
// }


export const HomeScreen = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProductImageSource, setSelectedProductImageSource] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const categoriasData: Categoria[] = [
    { title: "Bolos", image: require('../../../assets/imagens/BoloCategoria.png') },
    { title: "Sobremesas", image: require('../../../assets/imagens/BoloCategoria.png') },
    { title: "Encomenda", image: require('../../../assets/imagens/BoloCategoria.png') },
  ];

  useEffect(() => {
    carregarProdutos();
    var token: string;

    const carregarToken = async () => {
      const savedToken = await AuthService.getToken();
      setToken(savedToken);
    };

    carregarToken();

  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      setError(null);
      const produtosAPI = await ProdutoService.listarProdutos();
      
      // Filtrar apenas produtos ativos (status = 1)
      const produtosAtivos = produtosAPI.filter(p => p.status === 1);
      
      // Converter para o formato local
      const produtosFormatados = produtosAtivos.map(produto => {
    // 💡 Chame a nova função para obter a URL completa
    
    return produto;
});
      
      setProdutos(produtosFormatados);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Não foi possível carregar os produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Dividir produtos em duas listas para exibição
  const produtosDestaque = produtos.slice(0, 3);
  const produtosAdicionais = produtos.slice(3, 6);

  const handleProductPress = (produto: Produto) => {
    console.log("Clicou no produto:", produto.nome);
    setSelectedProduct(produto);
    setSelectedProductImageSource({ 
      uri: `http://academico3.rj.senac.br/receitix/api/v1/images/foto/${produto.id}`, 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
    setSelectedProductImageSource(null);
  };

  return (
    <View style={styles.containerGeral}>
      <ScrollView contentContainerStyle={styles.principal}
      showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Image style={styles.img} source={require('@/assets/imagens/LogoCake.png')} />
        </View>

        <View style={styles.Containertitle}>
          <Text style={styles.title}>Olá</Text>
          <View style={styles.linha} />
        </View>

        <View style={styles.categorias}>
          {categoriasData.map((item, index) => (
            <CategoriaItem key={index} title={item.title} imageSource={item.image} />
          ))}
        </View>


        <View style={styles.Containertitle}>
          <Text style={styles.title}>Destaque</Text>
          <View style={styles.linha} />
        </View>

        {loading ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#D4A574" />
            <Text style={{ marginTop: 10, color: '#666' }}>Carregando produtos...</Text>
          </View>
        ) : error ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</Text>
          </View>
        ) : produtos.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#666', textAlign: 'center' }}>Nenhum produto disponível no momento.</Text>
          </View>
        ) : (
          <>
            <View style={styles.destaque}>
              {produtosDestaque.map((produto) => (
                <ProdutoCard 
                  key={produto.id} 
                  produto={produto}
                  onPress={() => handleProductPress(produto)}
                  imagemSource={{ uri: `http://academico3.rj.senac.br/receitix/api/v1/images/foto/${produto.id}`, 
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                }} 
                />
              ))}
            </View>

            {produtosAdicionais.length > 0 && (
              <>
                <View style={styles.linha2}> </View>

                <View style={styles.destaque2}>
                  {produtosAdicionais.map((produto) => (
                    <ProdutoCard 
                      key={produto.id} 
                      produto={produto}
                      onPress={() => handleProductPress(produto)} 
                      imagemSource={{ uri: `http://academico3.rj.senac.br/receitix/api/v1/images/foto/${produto.id}`, 
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },                    
                    }}
                    />
                    
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
      <ProductModal
        produto={selectedProduct}
        visible={isModalVisible}
        onClose={handleCloseModal}
        
        imagemSource={selectedProductImageSource}
      />
    </View>
  );
};
