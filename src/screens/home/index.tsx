import { Image } from "expo-image";
import { ImageRequireSource, ScrollView, Text, View, ActivityIndicator } from "react-native";
import { CategoriaItem } from "../../components/CategoriaCmp";
import { ProdutoCard } from "../../components/ProdutoCard";
import { styles } from "./style";
import { useEffect, useState } from "react";
import { ProdutoService } from "@/src/services/produtos";
import { CategoriaService } from "@/src/services/categoria"; //
import { AuthService } from "@/src/services/storage";
import { Produto } from "@/src/interfaces/produtos/request";
import { Categoria as CategoriaModel } from "@/src/interfaces/categoria/response"; //
import ProductModal from "@/src/components/ModalDC";

// Interface local para o componente visual (com imagem)
interface CategoriaView {
  title: string;
  image: ImageRequireSource;
}

export const HomeScreen = () => {
  // Estado para armazenar as categorias vindas da API
  const [categorias, setCategorias] = useState<CategoriaView[]>([]);
  
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProductImageSource, setSelectedProductImageSource] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    carregarToken();
    carregarCategorias(); // Chama a função de categorias
    carregarProdutos();
  }, []);

  const carregarToken = async () => {
    const savedToken = await AuthService.getToken();
    setToken(savedToken);
  };

  // Função para buscar e formatar as categorias
  const carregarCategorias = async () => {
    try {
      const listaCategorias = await CategoriaService.listarCategorias(); //
      
      // Filtra ativas (status 1), pega as 3 primeiras e formata para o componente
      const categoriasFormatadas = listaCategorias
        .filter((c: CategoriaModel) => c.status === 1)
        .slice(0, 3) // Limita a 3 categorias como pedido
        .map((c: CategoriaModel) => ({
          title: c.nome,
          // Como a API não retorna imagem, usamos a imagem padrão do seu projeto
          image: require('../../../assets/imagens/BoloCategoria.png') 
        }));

      setCategorias(categoriasFormatadas);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
      // Opcional: tratar erro de categoria visualmente se desejar
    }
  };

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      setError(null);
      const produtosAPI = await ProdutoService.listarProdutos();
      
      // Filtrar apenas produtos ativos (status = 1)
      const produtosAtivos = produtosAPI.filter(p => p.status === 1);
      
      setProdutos(produtosAtivos);
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

        {/* Renderização dinâmica das categorias vindas da API */}
        <View style={styles.categorias}>
          {categorias.length > 0 ? (
            categorias.map((item, index) => (
              <CategoriaItem key={index} title={item.title} imageSource={item.image} />
            ))
          ) : (
            // Fallback caso não carregue ou esteja vazio (opcional)
            <Text style={{color: '#ff7c96ff', padding: 10}}>Carregando categorias...</Text>
          )}
        </View>

        <View style={styles.Containertitle}>
          <Text style={styles.title}>Destaque</Text>
          <View style={styles.linha} />
        </View>

        {loading ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#F7B6C3" />
            <Text style={{ marginTop: 10, color: '#ff6785ff' }}>Carregando produtos...</Text>
          </View>
        ) : error ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</Text>
          </View>
        ) : produtos.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#ff6785ff', textAlign: 'center' }}>Nenhum produto disponível no momento.</Text>
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