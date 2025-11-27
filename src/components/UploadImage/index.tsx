import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { styles } from './style';

interface ImagePickerProps {
  onImageSelected: (base64Image: string) => void;
  label: string;
}

export const ImagePickerComponent: React.FC<ImagePickerProps> = ({ onImageSelected, label }) => {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    setError(null);
    
    // Solicitar permissão de acesso à galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Precisamos de permissão para acessar sua galeria de fotos.');
      return;
    }

    // Abrir a galeria para seleção de imagem
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImageUri(uri);
      
      // Converter a imagem para Base64
      try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: 'base64',
        });
        
        // O Base64 precisa ser prefixado com o tipo MIME para ser interpretado corretamente
        // Ex: data:image/jpeg;base64,... ou data:image/png;base64,...
        // O Expo ImagePicker não fornece o tipo MIME diretamente, mas podemos inferir
        // ou deixar o backend lidar com isso. Para o seu caso, o backend espera apenas o Base64.
        // No entanto, para exibição no frontend e para o backend saber o tipo, é melhor prefixar.
        
        // Tentativa de inferir o tipo MIME (simplificado)
        const mimeType = uri.endsWith('.png') ? 'image/png' : 'image/jpeg';
        const prefixedBase64 = `data:${mimeType};base64,${base64}`;
        
        onImageSelected(prefixedBase64);
      } catch (e) {
        console.error("Erro ao converter para Base64:", e);
        setError("Erro ao processar a imagem. Tente outra.");
        onImageSelected('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity onPress={pickImage} style={styles.imagePreview}>
        {selectedImageUri ? (
          <Image source={{ uri: selectedImageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Toque para selecionar uma imagem</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};