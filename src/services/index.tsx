import axios from 'axios';
import { AuthService } from './storage';

export const api = axios.create({
    baseURL: 'http://academico3.rj.senac.br/receitix/api',
    timeout: 10000,

    headers:{
        'Content-Type':'application/json',
    }
});

const ENDPOINTS_WITH_AUTHENTICATION_NOT_REQUIRED = [
  '/api/usuario/login',
  '/api/usuario/criar',
  '/api/usuario/recuperarSenha/verificarEmail',
  '/api/usuario/recuperarSenha/enviarCodigo',
  '/api/usuario/recuperarSenha/validarCodigo',
  '/api/usuario/recuperarSenha/redefinirSenha',
];

api.interceptors.request.use(async (config) => {
  const isEndpointPublico = ENDPOINTS_WITH_AUTHENTICATION_NOT_REQUIRED.some(endpoint => 
    config.url?.includes(endpoint)
  );

  if (!isEndpointPublico) {
    const token = await AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await AuthService.logout();
      throw new Error('Sessão expirada');
    }
    throw error;
  }
);