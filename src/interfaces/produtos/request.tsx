export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  status: number;
  idCategoria: number;
}

export interface ProdutoCreateRequest {
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  status: number;
  idCategoria: number;
}