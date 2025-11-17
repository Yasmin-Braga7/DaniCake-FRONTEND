import { Image } from "expo-image";
import { ImageRequireSource, ScrollView, Text, View } from "react-native";
import { CategoriaItem } from "../../components/CategoriaCmp";
import { ProdutoCard } from "../../components/ProdutoCard";
import { styles } from "./style";

interface Categoria {
  title: string;
  image: ImageRequireSource;
}

interface Produto {
  id: string;
  nome: string;
  preco: string;
  imagem: ImageRequireSource;
}


export const HomeScreen = () => {
  const categoriasData: Categoria[] = [
    { title: "Bolos", image: require('../../../assets/imagens/BoloCategoria.png') },
    { title: "Sobremesas", image: require('../../../assets/imagens/BoloCategoria.png') },
    { title: "Encomenda", image: require('../../../assets/imagens/BoloCategoria.png') },
  ];

  const produtosData: Produto[] = [
    { id: "p1", nome: "Bolo De Pote Choco.Branco", preco: "R$12,00", imagem: require('../../../assets/imagens/BombomPote.jpg') },
    { id: "p2", nome: "Bolo De Pote Choco.Preto", preco: "R$12,00", imagem: require('../../../assets/imagens/BombomPote.jpg') },
    { id: "p3", nome: "Delicia de Abacaxi", preco: "R$12,00", imagem: require('../../../assets/imagens/BombomPote.jpg') },
  ];

  const produtos2Data: Produto[] = [
    { id: "p5", nome: "Bolo De Banana", preco: "R$12,00", imagem: require('../../../assets/imagens/BombomPote.jpg') },
    { id: "p6", nome: "Bolo De Cenoura", preco: "R$12,00", imagem: require('../../../assets/imagens/BombomPote.jpg') },
    { id: "p7", nome: "Bolo De Pote", preco: "R$12,00", imagem: require('../../../assets/imagens/BombomPote.jpg') },
  ];

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

        
        <View style={styles.destaque}>
          {produtosData.map((produto) => (
            <ProdutoCard key={produto.id} nome={produto.nome} preco={produto.preco} imagemSource={produto.imagem} />
          ))}
        </View>

        <View style={styles.linha2}> </View>

        <View style={styles.destaque2}>
          {produtos2Data.map((produto) => (
            <ProdutoCard key={produto.id} nome={produto.nome} preco={produto.preco} imagemSource={produto.imagem} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};