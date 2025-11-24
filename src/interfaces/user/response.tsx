import { Status } from "@/src/enums/status";

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  criado: string;
  status: Status;
}

export interface UsuarioLoginResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  criado: string;
  status: Status;
}