import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, ImagePlus } from 'lucide-react-native';

// Importe o componente Dropdown e sua interface
import { Dropdown, DropdownItem } from '../ModalSelector';
import { styles } from './style';

interface ProdutoFormData {
  nome: string;
  idCategoria: number | null;
  descricao: string;
  preco: string;
  imagemUri: string | null;
}

export const CreateProduto = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState<ProdutoFormData>({
    nome: '',
    idCategoria: null,
    descricao: '',
    preco: '',
    imagemUri: null,
  });

  const categoriasStatic: DropdownItem[] = [
    { id: 1, label: 'Bolos de Pote' },
    { id: 2, label: 'Bolos Caseiros' },
    { id: 3, label: 'Docinhos de Festa' },
    { id: 4, label: 'Tortas Doces' },
    { id: 5, label: 'Bebidas' },
    { id: 6, label: 'Salgados' }, 
  ];

  const handleChangeText = (key: keyof ProdutoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleCategorySelect = (item: DropdownItem) => {
    setFormData(prev => ({ ...prev, idCategoria: Number(item.id) }));
  };

  const handleSubmit = () => {
    console.log("Enviando formulário:", formData);
    alert("Produto cadastrado (simulação)!");
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: 'center' }} 
    >
      {/* Container principal com 80% de largura via styles.container */}
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          // Importante para deixar o dropdown vazar se necessário
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Header Removido */}

          {/* 1. Nome */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome do produto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Bolo de Cenoura"
              value={formData.nome}
              onChangeText={(t) => handleChangeText('nome', t)}
            />
          </View>

          {/* 2. Descrição */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Descrição do produto</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva os detalhes..."
              multiline={true}
              numberOfLines={4}
              value={formData.descricao}
              onChangeText={(t) => handleChangeText('descricao', t)}
            />
          </View>

          {/* 3. Preço */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Valor do produto</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.pricePrefix}>R$</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="0,00"
                keyboardType="numeric"
                value={formData.preco}
                onChangeText={(t) => handleChangeText('preco', t)}
              />
            </View>
          </View>

          {/* 4. Categoria (Dropdown) */}
          {/* AQUI APLICAMOS O ZINDEX ALTO PARA FICAR POR CIMA */}
          <View style={styles.dropdownGroup}>
            <Text style={styles.label}>Selecionar Categoria</Text>
            <Dropdown 
              placeholder="Selecione a categoria"
              options={categoriasStatic}
              onSelect={handleCategorySelect}
            />
          </View>

          {/* 5. Imagem */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Imagem</Text>
            <View style={styles.imageUploadContainer}>
              <View style={styles.imagePlaceholder}>
                <Camera size={40} color="#A0A0A0" />
              </View>
              
              <TouchableOpacity style={styles.uploadButton}>
                <ImagePlus size={20} color="#D81B60" />
                <Text style={styles.uploadButtonText}>Adicionar imagem</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Botão Final */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Criar</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};