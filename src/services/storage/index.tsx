import { UsuarioLoginResponse, UsuarioResponse } from "@/src/interfaces/user/response";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para armazenar o deviceId da sessão atual no backend
const TOKEN_KEY = '@user_token';
const USER_KEY = '@user_data';
const SESSION_KEY = '@session_id'; // ID único desta sessão no dispositivo

function gerarSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

export const AuthService = {
  // Salva login e gera sessionId único para este dispositivo
  async login(usuario: UsuarioLoginResponse, token: string): Promise<void> {
    try {
      const sessionId = gerarSessionId();
      await AsyncStorage.multiSet([
        [TOKEN_KEY, token],
        [USER_KEY, JSON.stringify(usuario)],
        [SESSION_KEY, sessionId],
      ]);
    } catch (error) {
      console.error('Erro ao salvar login:', error);
    }
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async getUser(): Promise<UsuarioResponse | null> {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  async getSessionId(): Promise<string | null> {
    return await AsyncStorage.getItem(SESSION_KEY);
  },

  async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  },

  // Logout local: limpa AsyncStorage
  async logout(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY, SESSION_KEY]);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  },

  // Verifica se o token JWT ainda é válido (não expirado)
  // O token JWT tem expiração, mas aqui verificamos só se existe
  async isTokenValid(): Promise<boolean> {
    const token = await this.getToken();
    if (!token) return false;
    try {
      // Decodifica o payload do JWT (sem verificar assinatura – feito pelo backend)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      if (Date.now() > exp) {
        await this.logout();
        return false;
      }
      return true;
    } catch {
      // Se não conseguir decodificar, mantém como válido (o backend vai rejeitar se expirado)
      return true;
    }
  },
};
