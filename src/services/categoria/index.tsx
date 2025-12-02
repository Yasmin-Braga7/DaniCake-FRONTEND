import { Categoria } from "@/src/interfaces/categoria/response";
import { api } from "..";

export const CategoriaService = {
  async listarCategorias(): Promise<Categoria[]> {
    try {
      const response = await api.get<Categoria[]>('/categoria/listar');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar categorias:', error);
      throw error;
    }
  },
};