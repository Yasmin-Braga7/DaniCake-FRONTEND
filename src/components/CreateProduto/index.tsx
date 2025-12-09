import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
// REMOVEMOS: useRouter, KeyboardAvoidingView, Platform (agora controlados pelo pai)
import { Camera } from 'lucide-react-native';
import { Dropdown } from '../ModalSelector';
import { DropdownItem } from '@/src/interfaces/DropDown';
import { ProdutoCreateRequest, ProdutoFormData } from '@/src/interfaces/produtos/request';
import { ProdutoService } from '@/src/services/produtos';
import * as ImagePicker from 'expo-image-picker';
import { api } from '@/src/services/index';
import { styles } from './style';
import { CustomAlert } from '../AlertaR';

// Interface para receber a função de sucesso do pai
interface CreateProdutoProps {
  onSuccess: () => void;
}

export const CreateProduto = ({ onSuccess }: CreateProdutoProps) => {
  // REMOVEMOS: const router = useRouter();

  const [formData, setFormData] = useState<ProdutoFormData>({
    nome: '',
    idCategoria: null,
    descricao: '',
    preco: '',
    imagemUri: null,
  });

  const [selectedImage, setSelectedImage] = useState<{ uri: string; filename: string; type: string } | null>(null);

  const [alertParams, setAlertParams] = useState({
    visible: false,
    title: '',
    message: '',
    onClose: () => {} 
  });

  const showAlert = (title: string, message: string, customOnClose: () => void = () => {}) => {
    setAlertParams({
      visible: true,
      title,
      message,
      onClose: () => {
        setAlertParams(prev => ({ ...prev, visible: false })); 
        customOnClose();
      }
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showAlert('Permissão Negada', 'Precisamos de permissão para acessar sua galeria.');
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
      showAlert("Atenção", "Preencha todos os campos obrigatórios e selecione uma imagem.");
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

      // SUCESSO: Chama o alerta e depois executa o onSuccess passado pelo pai
      showAlert(
        "Sucesso", 
        "Produto criado com imagem!", 
        () => {
          onSuccess(); // Fecha o modal e atualiza a lista
        }
      );

    } catch (error) {
      console.error("Erro ao criar produto:", error);
      showAlert("Erro", "Falha ao processar o cadastro.");
    }
  };

  // REMOVEMOS o KeyboardAvoidingView externo e a View container principal com flex:1
  return (
    <View style={{ flex: 1 }}> {/* Apenas um flex:1 simples para o ScrollView ocupar o espaço do modal */}
        <ScrollView 
          contentContainerStyle={[styles.scrollContainer, { paddingVertical: 10, paddingHorizontal: 5 }]} // Ajuste de padding para o modal
          showsVerticalScrollIndicator={true}
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

      <CustomAlert 
        visible={alertParams.visible}
        title={alertParams.title}
        message={alertParams.message}
        onClose={alertParams.onClose}
      />
    </View>
  );
};