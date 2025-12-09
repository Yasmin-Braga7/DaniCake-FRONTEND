import { Categoria } from "@/src/interfaces/categoria/response";
import { api } from "../index"; // Ajuste o import conforme sua estrutura de pastas

// Interface para o corpo da requisição (igual ao seu Java DTO)
export interface CategoriaRequest {
  nome: string;
  status: number; // 1 para ativo, 0 para inativo, por exemplo
}

export const CategoriaService = {

  // GET: /api/categoria/listar
  async listarCategorias(): Promise<Categoria[]> {
    try {
      const response = await api.get<Categoria[]>('/categoria/listar');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar categorias:', error);
      throw error;
    }
  },

  // POST: /api/categoria/criar
  async criarCategoria(nome: string): Promise<Categoria> {
    try {
      // Enviando status 1 (ativo) por padrão
      const payload: CategoriaRequest = { nome, status: 1 };
      const response = await api.post('/categoria/criar', payload);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  },

  // PUT: /api/categoria/atualizar/{id}
  async atualizarCategoria(id: number, nome: string): Promise<Categoria> {
    try {
      const payload: CategoriaRequest = { nome, status: 1 };
      const response = await api.put(`/categoria/atualizar/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      throw error;
    }
  },

  // DELETE: /api/categoria/apagar/{id}
  async apagarCategoria(id: number): Promise<void> {
    try {
      await api.delete(`/categoria/apagar/${id}`);
    } catch (error) {
      console.error('Erro ao apagar categoria:', error);
      throw error;
    }
  }

};