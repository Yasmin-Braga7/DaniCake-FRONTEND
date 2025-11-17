import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
import { styles } from './style';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Seu e-mail está incorreto.');
      return;
    }

    Alert.alert('Sucesso', `Bem-vindo, ${email}`);
    router.push('/(tabs)/Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.seguraForm}>
      <Image style={styles.img} source={require('@/assets/imagens/LogoCake.png')} />

      <Text style={styles.titulo}>Bem-Vindo de volta !</Text>

      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, {fontSize: 17}]}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={[styles.input, {fontSize: 17}]}
          placeholder="Digite sua senha"

          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonC}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.link}>Esqueci minha senha</Text>
      </View>

      <Text style={styles.footer}>
        Não tem uma conta? <Text style={styles.signup}>Cadastra-se</Text>
      </Text>
      </View>
    </View>
  );
};
