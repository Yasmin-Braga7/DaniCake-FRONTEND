export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest{
  nome: string,
  email: string,
  senha: string,
  role?: string,
}

// ───────────────────────── Recuperação de senha ─────────────────────────

export type CanalRecuperacao = 'EMAIL' | 'SMS';

export interface VerificarEmailRequest {
  email: string;
}

export interface EnviarCodigoRequest {
  email: string;
  canal: CanalRecuperacao;
}

export interface ValidarCodigoRequest {
  email: string;
  codigo: string;
}

export interface RedefinirSenhaRequest {
  email: string;
  resetToken: string;
  novaSenha: string;
}