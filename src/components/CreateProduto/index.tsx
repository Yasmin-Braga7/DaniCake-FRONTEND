import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Image, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, ImagePlus } from 'lucide-react-native';
import { Dropdown } from '../ModalSelector';
import { DropdownItem } from '@/src/interfaces/DropDown';
import { ProdutoCreateRequest, ProdutoFormData } from '@/src/interfaces/produtos/request';
import { ProdutoService } from '@/src/services/produtos';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '@/src/services/image';
import { styles } from './style';

export const CreateProduto = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState<ProdutoFormData>({
    nome: '',
    idCategoria: null,
    descricao: '',
    preco: '',
    imagemUri: null,
  });

  const [selectedImage, setSelectedImage] = useState<{ uri: string; filename: string; type: string } | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
       Alert.alert('Permissão Negada', 'Precisamos de permissão para acessar sua galeria.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8, // Reduzi um pouco a qualidade para otimizar
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const filename = uri.split('/').pop() || 'image.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      setSelectedImage({ uri, filename, type });
      
      
      
    }
  };

  const handleChangeText = (key: keyof ProdutoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleCategorySelect = (item: DropdownItem) => {
    setFormData(prev => ({ ...prev, idCategoria: Number(item.id) }));
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.descricao || !formData.preco || !formData.idCategoria || !selectedImage) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios, incluindo a imagem.");
      return;
    }

    const produtoRequest: ProdutoCreateRequest = {
      nome: formData.nome,
      descricao: formData.descricao,
      preco: parseFloat(formData.preco.replace(',', '.')),
      idCategoria: formData.idCategoria,
      status: 1,
    };

    try {
      const novoProduto = await ProdutoService.criarProduto(produtoRequest);

      if (novoProduto && novoProduto.id && selectedImage) {
        await uploadImage(novoProduto.id, selectedImage.uri, selectedImage.filename, selectedImage.type);
      }
      Alert.alert("Sucesso", "Produto criado!");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível criar o produto.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: 'center' }} 
    >
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
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
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Detalhes..."
              multiline={true}
              numberOfLines={3}
              value={formData.descricao}
              onChangeText={(t) => handleChangeText('descricao', t)}
            />
          </View>

          {/* 3. Preço */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Valor</Text>
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

          {/* 4. Categoria */}
          <View style={styles.dropdownGroup}>
            <Text style={styles.label}>Categoria</Text>
            <Dropdown 
              placeholder="Selecione..."
              onSelect={handleCategorySelect}
            />
          </View>

          {/* 5. Imagem OTIMIZADA */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Imagem</Text>
            
            <TouchableOpacity onPress={pickImage} style={styles.imageUploadTouch} activeOpacity={0.7}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} />
              ) : (
                <View style={styles.uploadContent}>
                  <Camera size={24} color="#A0A0A0" />
                  <Text style={styles.uploadText}>Toque para adicionar foto</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Botão Final */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Criar Produto</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};