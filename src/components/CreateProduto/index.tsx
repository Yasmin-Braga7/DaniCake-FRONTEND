import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'lucide-react-native';
import { Dropdown } from '../ModalSelector';
import { DropdownItem } from '@/src/interfaces/DropDown';
import { ProdutoCreateRequest, ProdutoFormData } from '@/src/interfaces/produtos/request';
import { ProdutoService } from '@/src/services/produtos';
import * as ImagePicker from 'expo-image-picker';
import { api } from '@/src/services/index';
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
      mediaTypes: 'images' as any,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
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
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios e selecione uma imagem.");
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
        
        const uploadFormData = new FormData();
        
        uploadFormData.append('file', {
          uri: selectedImage.uri,
          name: selectedImage.filename,
          type: selectedImage.type,
        } as any);

        await api.post(`/v1/images/foto/upload/${novoProduto.id}`, uploadFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      Alert.alert("Sucesso", "Produto criado com imagem!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);

    } catch (error) {
      console.error("Erro ao criar produto ou fazer upload:", error);
      Alert.alert("Erro", "Falha ao processar o cadastro.");
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
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome do produto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Bolo de Cenoura"
              value={formData.nome}
              onChangeText={(t) => handleChangeText('nome', t)}
            />
          </View>

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

          <View style={styles.dropdownGroup}>
            <Text style={styles.label}>Categoria</Text>
            <Dropdown 
              placeholder="Selecione..."
              onSelect={handleCategorySelect}
            />
          </View>

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

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Criar Produto</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};