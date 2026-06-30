import { api } from "../..";
import {
  VerificarEmailRequest,
  EnviarCodigoRequest,
  ValidarCodigoRequest,
  RedefinirSenhaRequest,
} from "@/src/interfaces/auth/request";
import {
  VerificarEmailResponse,
  MensagemResponse,
  ValidarCodigoResponse,
} from "@/src/interfaces/auth/response";

// Extrai uma mensagem amigável do erro do axios, sem quebrar caso o backend
// esteja fora do ar ou retorne algo inesperado.
const extrairMensagemErro = (error: any, mensagemPadrao: string): string => {
  if (error.response) {
    const data = error.response.data;
    return data?.mensagem || data?.message || data?.error || mensagemPadrao;
  } else if (error.request) {
    return 'Sem resposta do servidor. Verifique sua conexão.';
  }
  return error.message || mensagemPadrao;
};

export const RecuperarSenhaService = {

  // Passo 1: confere se existe usuário cadastrado com aquele e-mail
  verificarEmail: async (email: string): Promise<VerificarEmailResponse> => {
    try {
      const payload: VerificarEmailRequest = { email: email.trim() };
      const response = await api.post<VerificarEmailResponse>(
        '/usuario/recuperarSenha/verificarEmail',
        payload
      );
      return response.data;
    } catch (error: any) {
      throw new Error(extrairMensagemErro(error, 'Não foi possível verificar o e-mail. Tente novamente.'));
    }
  },

  // Passo 2: envia o código de verificação por e-mail ou SMS
  enviarCodigo: async (email: string, canal: 'EMAIL' | 'SMS'): Promise<MensagemResponse> => {
    try {
      const payload: EnviarCodigoRequest = { email: email.trim(), canal };
      const response = await api.post<MensagemResponse>(
        '/usuario/recuperarSenha/enviarCodigo',
        payload
      );
      return response.data;
    } catch (error: any) {
      throw new Error(extrairMensagemErro(error, 'Não foi possível enviar o código. Tente novamente.'));
    }
  },

  // Passo 3: valida o código digitado pelo usuário
  validarCodigo: async (email: string, codigo: string): Promise<ValidarCodigoResponse> => {
    try {
      const payload: ValidarCodigoRequest = { email: email.trim(), codigo: codigo.trim() };
      const response = await api.post<ValidarCodigoResponse>(
        '/usuario/recuperarSenha/validarCodigo',
        payload
      );
      return response.data;
    } catch (error: any) {
      throw new Error(extrairMensagemErro(error, 'Não foi possível validar o código. Tente novamente.'));
    }
  },

  // Passo 4: redefine a senha usando o token gerado na validação do código
  redefinirSenha: async (email: string, resetToken: string, novaSenha: string): Promise<MensagemResponse> => {
    try {
      const payload: RedefinirSenhaRequest = { email: email.trim(), resetToken, novaSenha };
      const response = await api.post<MensagemResponse>(
        '/usuario/recuperarSenha/redefinirSenha',
        payload
      );
      return response.data;
    } catch (error: any) {
      throw new Error(extrairMensagemErro(error, 'Não foi possível redefinir a senha. Tente novamente.'));
    }
  },
};
