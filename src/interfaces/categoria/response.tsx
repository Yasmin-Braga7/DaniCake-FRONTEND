
export interface Categoria {
  id: number;
  nome: string;
  criada: string;
  status: number;
}

export interface CategoriaRequest {
  nome: string;
}

export interface CategoriaResponse {
  id: number;
  nome: string;
}