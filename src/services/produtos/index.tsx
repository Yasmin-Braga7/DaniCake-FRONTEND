import { Produto, ProdutoCreateRequest } from "@/src/interfaces/produtos/request";
import { api } from "..";


export const ProdutoService = {
  async listarProdutos(): Promise<Produto[]> {
    try {
      const response = await api.get<Produto[]>('/produto/listar');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      throw error;
    }
  },

  async listarPorId(produtoId: number): Promise<Produto> {
    try {
      const response = await api.get<Produto>(`/produto/listarPorProdutoId/${produtoId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  },

  async criarProduto(produto: ProdutoCreateRequest): Promise<Produto> {
    try {
      const response = await api.post<Produto>('/produto/criar', produto);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  }
};