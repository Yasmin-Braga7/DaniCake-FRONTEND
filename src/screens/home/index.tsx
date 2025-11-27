import { Image } from "expo-image";
import { ImageRequireSource, ScrollView, Text, View, ActivityIndicator } from "react-native";
import { CategoriaItem } from "../../components/CategoriaCmp";
import { ProdutoCard } from "../../components/ProdutoCard";
import { styles } from "./style";
import { useEffect, useState } from "react";
import { ProdutoService } from "@/src/services/produtos";


interface Categoria {
  title: string;
  image: ImageRequireSource;
}

interface ProdutoLocal {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
}


export const HomeScreen = () => {
  const [produtos, setProdutos] = useState<ProdutoLocal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoriasData: Categoria[] = [
    { title: "Bolos", image: require('../../../assets/imagens/BoloCategoria.png') },
    { title: "Sobremesas", image: require('../../../assets/imagens/BoloCategoria.png') },
    { title: "Encomenda", image: require('../../../assets/imagens/BoloCategoria.png') },
  ];

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      setError(null);
      const produtosAPI = await ProdutoService.listarProdutos();
      
      // Filtrar apenas produtos ativos (status = 1)
      const produtosAtivos = produtosAPI.filter(p => p.status === 1);
      
      // Converter para o formato local
      const produtosFormatados = produtosAtivos.map(produto => ({
        id: produto.id,
        nome: produto.nome,
        preco: `R$ ${produto.preco.toFixed(2).replace('.', ',')}`,
        imagem: produto.imagem
      }));
      
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
                  nome={produto.nome} 
                  preco={produto.preco} 
                  imagemSource={{ uri: produto.imagem }} 
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
                      nome={produto.nome} 
                      preco={produto.preco} 
                      imagemSource={{ uri: produto.imagem }} 
                    />
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};
