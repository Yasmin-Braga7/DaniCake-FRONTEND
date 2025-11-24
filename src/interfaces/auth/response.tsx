import { UsuarioLoginResponse } from "../user/response";


export interface LoginResponse {
  usuario: UsuarioLoginResponse,
  token: string,

}