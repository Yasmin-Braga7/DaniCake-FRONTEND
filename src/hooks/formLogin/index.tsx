import { useState } from 'react';

export const useFormLogin = () => {
    const [errors, setErrors] = useState({ email: '', senha: '' });

        const validate = (email: string, senha: string) => {
        const newErrors = { email: '', senha: '' };
        const emailTrim = email.trim();
        const senhaTrim = senha.trim();

        // Campos em branco
        if (!emailTrim && !senhaTrim) {
            newErrors.email = 'O campo não pode estar em branco*';
            newErrors.senha = 'O campo não pode estar em branco*';
        } 
        // Apenas email em branco
        else if (!emailTrim) {
            newErrors.email = 'O campo não pode estar em branco*';
        }
        // Apenas senha em branco
        else if (!senhaTrim) {
            newErrors.senha = 'O campo não pode estar em branco*';
        }
        // Formato inválido (só verifica se campos não estão vazios)
        else if (!emailTrim.includes('@') || senhaTrim.length < 3) {
            newErrors.email = 'E-mail ou senha inválidos*';
            newErrors.senha = 'E-mail ou senha inválidos*';
        }

        setErrors(newErrors);
        return !newErrors.email && !newErrors.senha;
    };

    const clearError = (field: keyof typeof errors) => {
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const setInvalidCredentialsError = () => {
        setErrors({
            email: 'E-mail ou senha inválidos*',
            senha: 'E-mail ou senha inválidos*'
        });
    };

     const clearAllErrors = () => {
        setErrors({ email: '', senha: '' });
    };

    return { 
        errors, 
        validate, 
        setInvalidCredentialsError, 
        clearError, 
        clearAllErrors 
    };
};