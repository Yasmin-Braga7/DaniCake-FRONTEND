import React, { useState, useRef, useEffect } from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
import { styles } from './style';
import { ReusableButton } from '@/src/components/Button';
import { useFormLogin } from '@/src/hooks/formLogin';
import { LoginService } from '@/src/services/auth/login';
import { useNavigation } from "@/src/constants/router";

export const LoginScreen = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { errors, validate, clearError, setInvalidCredentialsError } = useFormLogin();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    });

    return () => hideSubscription.remove();
  }, []);

  const mostrarAlerta = (titulo: string, mensagem: string) => {
    setAlertTitle(titulo);
    setAlertMessage(mensagem);
    setAlertVisible(true);
  };

  const handleLogin = async () => {

    if (!validate(email, senha)) return;
    
    try {
      setLoading(true);
      // O LoginService agora retorna o usuário com as roles que configuramos no Backend
      const response = await LoginService.login(email, senha);
      
      const userRoles = response.usuario.roles || [];
      console.log("Roles do usuário:", userRoles); // Para você conferir no terminal se está vindo certo

      // --- LÓGICA DE SEPARAÇÃO ---
      if (userRoles.includes("ROLE_ADMINISTRADOR")) {
        // Se for admin, manda para a área administrativa
        router.replace('/(adm)/createProduct'); 
      } else {
        // Se for cliente (ou qualquer outro), manda para a Home do App
        router.replace('/(tabs)/Home');
      }
      // ---------------------------

    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        setInvalidCredentialsError();
      } else {
        mostrarAlerta("Erro", "Não foi possível fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top','bottom']}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding ?? { flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.seguraForm}>
                <Image style={styles.img} source={require('@/assets/imagens/LogoCake.png')} />

                <Text style={styles.titulo}>Bem-Vindo de volta !</Text>

                <View style={styles.form}>
                  <Text style={styles.label}>E-mail</Text>
                  {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError, { fontSize: 17 }]}
                    placeholder="Digite seu email"
                    placeholderTextColor="#5e5e5eff"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                  />
                  
                  <Text style={styles.label}>Senha</Text>
                  {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}
                  <TextInput                  
                    style={[styles.input, errors.senha && styles.inputError, { fontSize: 17 }]}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#5e5e5eff"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                  />

                  <ReusableButton title={loading ? 'ENTRANDO...' : 'ENTRAR'} onPress={handleLogin} />

                  <Text style={styles.link}>Esqueci minha senha</Text>
                </View>

                <Text style={styles.footer}>
                  Não tem uma conta? <Text style={styles.signup} onPress={navigation.register}>Cadastre-se</Text>
                </Text>
              </View>
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};