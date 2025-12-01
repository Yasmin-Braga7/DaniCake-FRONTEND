import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = 'http://academico3.rj.senac.br/receitix/api';

/**
 * Envia uma imagem para o backend para ser convertida em Base64.
 * @param uri URI local da imagem (ex: 'file:///data/user/0/...' )
 * @param filename Nome do arquivo (ex: 'foto.jpg')
 * @param type Tipo MIME do arquivo (ex: 'image/jpeg')
 * @returns Uma string Base64 com o prefixo Data URI (ex: 'data:image/jpeg;base64,...')
 */
export const convertImageToBase64 = async (uri: string, filename: string, type: string): Promise<string> => {
  try {
    const formData = new FormData();
    
    // Ajuste da URI para iOS, se necessário
    const fileUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    // Adiciona o arquivo ao FormData
    formData.append('file', {
      uri: fileUri,
      name: filename,
      type: type,
    } as any);

    // Faz a requisição POST para o endpoint do backend
    const response = await axios.post(`${BASE_URL}/images/to-base64`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Retorna a string Base64 com o prefixo Data URI
    return response.data.base64Image;

  } catch (error) {
    console.error('Erro ao converter imagem para Base64:', error);
    throw error;
  }
};
