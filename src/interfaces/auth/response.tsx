import { UsuarioLoginResponse } from "../user/response";


export interface LoginResponse {
  usuario: UsuarioLoginResponse,
  token: string,

}

// ───────────────────────── Recuperação de senha ─────────────────────────

export interface VerificarEmailResponse {
  encontrado: boolean;
  mensagem: string;
  emailMascarado: string | null;
  telefoneDisponivel: boolean;
  telefoneMascarado: string | null;
}

export interface MensagemResponse {
  sucesso: boolean;
  mensagem: string;
}

export interface ValidarCodigoResponse {
  valido: boolean;
  mensagem: string;
  resetToken: string | null;
}