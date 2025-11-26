import { RegisterRequest } from "@/src/interfaces/auth/request";
import { api } from "../..";


export const registerService = {
    register: async (nome:string, email:string, senha:string): Promise<void>=>{
        try{
            const credentials = { 
                nome: nome, 
                email: email, 
                senha: senha, 
                role: "ROLE_CLIENTE" // <--- O Backend precisa disso!
            };
            const response = await api.post<void>('/usuario/criar', credentials);
            return response.data;
        } catch (error) {
            throw error; 
        }
    }
};