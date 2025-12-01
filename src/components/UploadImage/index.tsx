import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { convertImageToBase64 } from '@/src/services/image';
import { styles } from './style';

interface ImagePickerProps {
  onImageSelected: (base64Image: string) => void;
  label: string;
}

export const UploadImage = ({ onImageSelected, label}: ImagePickerProps) =>  {
  const [selectedImageUri, setSelectedImageUri] = useState<String | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    setError(null);

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
       Alert.alert('Permissão Negada', 'Precisamos de permissão para acessar sua galeria de fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled){
      const uri = result.assets[0].uri;
      setSelectedImageUri(uri);
      
      try {
        const filename = uri.split('/').pop() || 'image.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        const base64WithPrefix = await convertImageToBase64(uri, filename, type);;

        onImageSelected(base64WithPrefix);
      } catch (e) {
        console.error("Erro ao converte imagem para base64:", e);
        setError("Erro ao processar imagem. Tente outra.");
        onImageSelected('')
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity onPress={pickImage} style={styles.imagePreview}>
        {selectedImageUri ? (
          <Image source={{ uri: selectedImageUri as string }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Toque para selecionar uma imagem</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}