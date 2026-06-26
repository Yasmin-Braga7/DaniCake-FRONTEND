import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Camera } from 'lucide-react-native';
import { Dropdown } from '../ModalSelector';
import { DropdownItem } from '@/src/interfaces/DropDown';
import { Produto, ProdutoCreateRequest } from '@/src/interfaces/produtos/request';
import { ProdutoService } from '@/src/services/produtos';
import * as ImagePicker from 'expo-image-picker';
import { api } from '@/src/services/index';
import { styles } from '../CreateProduto/style';
import { CustomAlert } from '../AlertaR';
import { AuthService } from '@/src/services/storage';

interface EditProdutoProps {
  produto: Produto;
  onSuccess: () => void;
}

export const EditProduto = ({ produto, onSuccess }: EditProdutoProps) => {
  const [nome, setNome] = useState(produto.nome);
  const [descricao, setDescricao] = useState(produto.descricao);
  const [preco, setPreco] = useState(produto.preco.toFixed(2).replace('.', ','));
  const [idCategoria, setIdCategoria] = useState<number | null>(produto.idCategoria);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Imagem nova escolhida da galeria (opcional)
  const [selectedImage, setSelectedImage] = useState<{ uri: string; filename: string; type: string } | null>(null);
  // URL da imagem atual do produto (para preview)
  const [currentImageUri, setCurrentImageUri] = useState<string | null>(null);

  const [alertParams, setAlertParams] = useState({
    visible: false,
    title: '',
    message: '',
    onClose: () => {},
  });

  useEffect(() => {
    const loadCurrentImage = async () => {
      const token = await AuthService.getToken();
      setCurrentImageUri(
        `http://academico3.rj.senac.br/receitix/api/v1/images/foto/${produto.id}?t=${Date.now()}`
      );
    };
    loadCurrentImage();
  }, [produto.id]);

  const showAlert = (title: string, message: string, customOnClose: () => void = () => {}) => {
    setAlertParams({
      visible: true,
      title,
      message,
      onClose: () => {
        setAlertParams(prev => ({ ...prev, visible: false }));
        customOnClose();
      },
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showAlert('Permissão Negada', 'Precisamos de permissão para acessar sua galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
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

  const handleCategorySelect = (item: DropdownItem) => {
    setIdCategoria(Number(item.id));
  };

  const handleSubmit = async () => {
    if (!nome.trim() || !descricao.trim() || !preco.trim() || !idCategoria) {
      showAlert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    setLoadingSubmit(true);
    try {
      const payload: ProdutoCreateRequest = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        preco: parseFloat(preco.replace(',', '.')),
        idCategoria,
        status: produto.status,
      };

      await api.put(`/produto/atualizar/${produto.id}`, payload);

      // Se escolheu nova imagem, faz upload
      if (selectedImage) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', {
          uri: selectedImage.uri,
          name: selectedImage.filename,
          type: selectedImage.type,
        } as any);

        await api.post(`/v1/images/foto/upload/${produto.id}`, uploadFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      showAlert('Sucesso', 'Produto atualizado!', () => {
        onSuccess();
      });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      showAlert('Erro', 'Falha ao atualizar o produto.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Preview: prioriza imagem nova escolhida, senão mostra a atual
  const previewUri = selectedImage ? selectedImage.uri : currentImageUri;

  return (
    <View>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingVertical: 10, paddingHorizontal: 5 }]}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome do produto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Bolo de Cenoura"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Detalhes..."
            multiline={true}
            numberOfLines={3}
            value={descricao}
            onChangeText={setDescricao}
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
              value={preco}
              onChangeText={setPreco}
            />
          </View>
        </View>

        <View style={styles.dropdownGroup}>
          <Text style={styles.label}>Categoria</Text>
          <Dropdown
            placeholder="Selecione..."
            onSelect={handleCategorySelect}
            selectedId={idCategoria}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Imagem {!selectedImage && '(toque para trocar)'}</Text>
          <TouchableOpacity onPress={pickImage} style={styles.imageUploadTouch} activeOpacity={0.7}>
            {previewUri ? (
              <Image source={{ uri: previewUri }} style={styles.imagePreview} />
            ) : (
              <View style={styles.uploadContent}>
                <Camera size={24} color="#A0A0A0" />
                <Text style={styles.uploadText}>Toque para adicionar foto</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loadingSubmit && { opacity: 0.7 }]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={loadingSubmit}
        >
          {loadingSubmit ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.submitButtonText}>Salvar Alterações</Text>
          )}
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
