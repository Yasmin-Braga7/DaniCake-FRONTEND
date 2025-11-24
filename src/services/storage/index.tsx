import { UsuarioLoginResponse, UsuarioResponse } from "@/src/interfaces/user/response";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthService ={
    async login (usuario:UsuarioLoginResponse,token:string): Promise<void>{
    try{
        await AsyncStorage.setItem('@user_token',token);
        await AsyncStorage.setItem('@user_data',JSON.stringify(usuario));

        }catch(error){
            console.error('Erro ao salvar login:', error);
        }
    },

    async getToken(): Promise<string | null>{
        return await AsyncStorage.getItem('@user_token')
    },

    async getUser(): Promise<UsuarioResponse | null>{
        const userJson = await AsyncStorage.getItem('@user_data');
        return userJson ? JSON.parse(userJson):null;
    },

    async isLoggedIn(): Promise<boolean>{
        const token = await this.getToken();
        return !!token;
    },

    async logout(): Promise<void>{
        try{
            await AsyncStorage.multiRemove(['@user_token','@user_data']);

        }catch(error){
            console.error('Erro ao fazer logout:', error);
        }
    }
};