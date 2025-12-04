import { Produto, ProdutoCreateRequest } from "@/src/interfaces/produtos/request";
import { api } from '@/src/services/index';


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
  },

  async apagarProduto(produtoId: number): Promise<void> {
    try {
      await api.delete(`/produto/apagar/${produtoId}`);
    } catch (error) {
      console.error('Erro ao apagar produto:', error);
      throw error;
    }
  },

    // ... Seus métodos existentes (listarProdutos, etc.) ...

    /**
     * Constrói a URL pública para obter a foto do produto.
     * @param idProdutoFoto O ID do produto para obter a foto.
     * @returns A URL completa do endpoint da foto.
     */
    getProdutoFotoUrl(idProdutoFoto: number): string {
        // Constrói a URL: BASE_URL + /foto/ + ID
        return `${api}/foto/${idProdutoFoto}`;
    },
};