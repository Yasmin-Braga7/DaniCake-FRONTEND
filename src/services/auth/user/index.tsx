import { UserUpdateData } from "@/src/interfaces/user/request";
import { api } from "../..";


export const UserService = {
    // 1. Buscar dados do usuário (incluindo a foto atual)
    getById: async (id: number) => {
        try {
            const response = await api.get(`/usuario/listarPorUsuarioId/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            throw error;
        }
    },

    // 2. Atualizar dados de texto (Nome, Email...)
    updateData: async (id: number, data: UserUpdateData) => {
        try {
            const response = await api.put(`/usuario/atualizar/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar dados:", error);
            throw error;
        }
    },

    // 3. Upload da Foto (A parte mais importante!)
    updatePhoto: async (id: number, imageUri: string) => {
        try {
            // Cria o objeto FormData para enviar como arquivo
            const formData = new FormData();
            
            // O React Native precisa desses 3 campos obrigatórios: uri, name, type
            formData.append('file', {
                uri: imageUri,
                name: `profile_${id}.jpg`, // Nome fictício
                type: 'image/jpeg',        // Tipo MIME
            } as any); // 'as any' é necessário no TypeScript do RN para FormData

            const response = await api.patch(`/usuario/foto/upload/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao enviar foto:", error);
            throw error;
        }
    },

    // 4. Remover Foto
    removePhoto: async (id: number) => {
        try {
            await api.delete(`/usuario/foto/remover/${id}`);
        } catch (error) {
            console.error("Erro ao remover foto:", error);
            throw error;
        }
    }
};