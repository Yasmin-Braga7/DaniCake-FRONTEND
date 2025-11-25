import { api } from "../..";
import { LoginRequest } from "@/src/interfaces/auth/request";
import { LoginResponse } from "@/src/interfaces/auth/response";
import { AuthService } from "../../storage";
import { Alert } from "react-native";

export const LoginService = {
  login: async (email: string, senha: string): Promise<LoginResponse> => {
    const credentials: LoginRequest = { email, senha };

    try {
      const response = await api.post<LoginResponse>('/usuario/login', credentials, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
      });

      const { usuario, token } = response.data;
      await AuthService.login(usuario, token);
      return response.data;
    } catch (error: any) {

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        const serverMsg =
          data?.message ||
          data?.error ||
          (typeof data === 'string' ? data : JSON.stringify(data));
        // Tratamento específico para 403 (usuário não encontrado)
        if (status === 403) {
          Alert.alert('O usuario ou semha inválido', ``);
          throw new Error(serverMsg || 'Usuário não encontrado (403)');
        }
        // Tratamento para 401
        if (status === 401) {
          throw new Error(serverMsg || 'Credenciais inválidas (401)');
        }

        // outros status
        throw new Error(`${serverMsg || 'Erro no servidor'} (status ${status})`);
      } else if (error.request) {
        throw new Error('Sem resposta do servidor. Verifique a conexão.');
      } else {
        throw new Error('Erro inesperado: ' + (error.message || ''));
      }
    }
  }
};