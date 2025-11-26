import { useState } from "react";


export const useFormRegister = () => {
    const [errors, setErrors] = useState({ nome: '', email: '', senha: '' });

    const validate = (nome: string, email: string, senha: string) => {
        const newErrors = { nome: '', email: '', senha: '' };

        if (!nome.trim() && !email.trim() && !senha.trim()) {
            newErrors.nome = 'O campos não pode estar em branco*';
            newErrors.email = 'O campos não pode estar em branco*';
            newErrors.senha = 'O campos não pode estar em branco*';
        }
        // Verifica se algum campo está vazio ou com dados inválidos
        else if (!nome.trim() || !email.trim() || !senha.trim() ||
            nome.length < 3 || nome.length > 20 ||
            !email.includes('@') || senha.length < 3) {
            newErrors.nome = 'Mínimo 3 e maximo 20 caracteres*';
            newErrors.email = 'Dados inválidos*';
            newErrors.senha = 'Mínimo 8 caracteres*';
        }

        setErrors(newErrors);
        return !newErrors.nome && !newErrors.email && !newErrors.senha;
    };

    const clearError = (field: keyof typeof errors) => {
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    return { errors, validate, clearError };
}