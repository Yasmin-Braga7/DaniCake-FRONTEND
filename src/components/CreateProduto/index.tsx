import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { styles } from './style';
import { ProdutoService } from '../../services/produtos';
import { ProdutoCreateRequest } from '@/src/interfaces/produtos/request';
import { ImagePickerComponent } from '../UploadImage';

// Assumindo que o status é 1 (Ativo) por padrão e idCategoria é 1 para um exemplo
const initialFormData: ProdutoCreateRequest = {
  nome: '',
  descricao: '',
  preco: 0,
  imagem: '',
  // Removido o campo de URL de imagem, agora será Base64
  status: 1, // 1 = Ativo, 0 = Inativo (baseado na entidade Produto.java)
  idCategoria: 1, // Exemplo de ID de Categoria
};

export const ProdutoForm = () => {
  const [formData, setFormData] = useState<ProdutoCreateRequest>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (name: keyof ProdutoCreateRequest, value: string | number) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageSelected = (base64Image: string) => {
    setFormData({
      ...formData,
      imagem: base64Image,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Validação básica
    if (!formData.nome || !formData.descricao || formData.preco <= 0 || !formData.imagem || formData.idCategoria <= 0) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios e verifique o preço e a categoria.');
      setLoading(false);
      return;
    }

    try {
      // O preço precisa ser um número, mas o TextInput retorna string.
      // O backend espera um number/BigDecimal, então convertemos.
      const dataToSend: ProdutoCreateRequest = {
        ...formData,
        preco: Number(formData.preco),
        status: Number(formData.status),
        idCategoria: Number(formData.idCategoria),
      };

      // O campo 'imagem' agora contém o Base64 prefixado (data:image/jpeg;base64,...)

      const produtoCriado = await ProdutoService.criarProduto(dataToSend);
      setSuccessMessage(`Produto "${produtoCriado.nome}" criado com sucesso! ID: ${produtoCriado.id}`);
      setFormData(initialFormData); // Limpa o formulário
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      setErrorMessage('Falha ao criar produto. Verifique a conexão e os dados inseridos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Produto</Text>

      {/* Nome */}
      <Text style={styles.label}>Nome do Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Bolo de Pote de Chocolate"
        value={formData.nome}
        onChangeText={(text) => handleChange('nome', text)}
      />

      {/* Descrição */}
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição detalhada do produto"
        multiline
        value={formData.descricao}
        onChangeText={(text) => handleChange('descricao', text)}
      />

      {/* Preço */}
      <Text style={styles.label}>Preço (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 12.50"
        keyboardType="numeric"
        value={formData.preco === 0 ? '' : String(formData.preco)}
        onChangeText={(text) => handleChange('preco', text.replace(',', '.'))}
      />

      {/* URL da Imagem */}
      {/* Seletor de Imagem */}
      <ImagePickerComponent 
        label="Imagem do Produto (PNG/JPG)"
        onImageSelected={handleImageSelected}
      />

      {/* ID da Categoria */}
      <Text style={styles.label}>ID da Categoria</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 1"
        keyboardType="numeric"
        value={formData.idCategoria === 0 ? '' : String(formData.idCategoria)}
        onChangeText={(text) => handleChange('idCategoria', text)}
      />

      {/* Status (1=Ativo, 0=Inativo) */}
      <Text style={styles.label}>Status (1=Ativo, 0=Inativo)</Text>
      <TextInput
        style={styles.input}
        placeholder="1"
        keyboardType="numeric"
        value={formData.status === 0 ? '0' : String(formData.status)}
        onChangeText={(text) => handleChange('status', text)}
      />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {successMessage && <Text style={styles.successText}>{successMessage}</Text>}

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Cadastrando..." : "Cadastrar Produto"}
          onPress={handleSubmit}
          disabled={loading}
          color="#D4A574" // Cor de exemplo
        />
      </View>

      {loading && <ActivityIndicator size="small" color="#D4A574" style={{ marginTop: 10 }} />}
      
      <View style={{ height: 50 }} /> {/* Espaçamento extra no final */}
    </ScrollView>
  );
};