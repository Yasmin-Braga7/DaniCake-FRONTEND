import React, { useState, useRef, useEffect } from 'react';
import {
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, MessageSquare } from 'lucide-react-native';
import { router } from 'expo-router';
import { styles } from './style';
import { ReusableButton } from '@/src/components/Button';
import { Alert } from '@/src/components/alertRegister';
import { RecuperarSenhaService } from '@/src/services/auth/recuperarSenha';
import { useNavigation } from '@/src/constants/router';

type Etapa = 'EMAIL' | 'CANAL' | 'CODIGO' | 'NOVA_SENHA' | 'SUCESSO';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [etapa, setEtapa] = useState<Etapa>('EMAIL');
  const [loading, setLoading] = useState(false);

  // Dados coletados ao longo do fluxo
  const [email, setEmail] = useState('');
  const [emailMascarado, setEmailMascarado] = useState('');
  const [telefoneDisponivel, setTelefoneDisponivel] = useState(false);
  const [telefoneMascarado, setTelefoneMascarado] = useState('');
  const [canalEscolhido, setCanalEscolhido] = useState<'EMAIL' | 'SMS' | null>(null);
  const [codigo, setCodigo] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Erros simples por campo
  const [erroEmail, setErroEmail] = useState('');
  const [erroCodigo, setErroCodigo] = useState('');
  const [erroNovaSenha, setErroNovaSenha] = useState('');
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

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

  // ───────────────────────── Navegação entre etapas ─────────────────────────

  const handleVoltar = () => {
    if (etapa === 'EMAIL') {
      navigation.back();
    } else if (etapa === 'CANAL') {
      setEtapa('EMAIL');
    } else if (etapa === 'CODIGO') {
      setEtapa('CANAL');
    } else if (etapa === 'NOVA_SENHA') {
      setEtapa('CODIGO');
    } else {
      router.replace('/auth/login');
    }
  };

  // ───────────────────────── Passo 1: e-mail ─────────────────────────

  const handleVerificarEmail = async () => {
    setErroEmail('');
    const emailTrim = email.trim();

    if (!emailTrim) {
      setErroEmail('O campo não pode estar em branco*');
      return;
    }
    if (!emailTrim.includes('@')) {
      setErroEmail('Digite um e-mail válido*');
      return;
    }

    try {
      setLoading(true);
      const response = await RecuperarSenhaService.verificarEmail(emailTrim);

      if (!response.encontrado) {
        setErroEmail(response.mensagem || 'Não encontramos nenhum usuário cadastrado com este e-mail.');
        return;
      }

      setEmailMascarado(response.emailMascarado || emailTrim);
      setTelefoneDisponivel(response.telefoneDisponivel);
      setTelefoneMascarado(response.telefoneMascarado || '');
      setEtapa('CANAL');
    } catch (error: any) {
      mostrarAlerta('Erro', error.message || 'Não foi possível verificar o e-mail. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // ───────────────────────── Passo 2: escolher canal ─────────────────────────

  const handleEscolherCanal = async (canal: 'EMAIL' | 'SMS') => {
    if (canal === 'SMS' && !telefoneDisponivel) return;

    try {
      setLoading(true);
      const response = await RecuperarSenhaService.enviarCodigo(email, canal);

      if (!response.sucesso) {
        mostrarAlerta('Atenção', response.mensagem);
        return;
      }

      setCanalEscolhido(canal);
      setCodigo('');
      setErroCodigo('');
      setEtapa('CODIGO');
    } catch (error: any) {
      mostrarAlerta('Erro', error.message || 'Não foi possível enviar o código. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReenviarCodigo = async () => {
    if (!canalEscolhido) return;
    try {
      setLoading(true);
      const response = await RecuperarSenhaService.enviarCodigo(email, canalEscolhido);
      mostrarAlerta(response.sucesso ? 'Pronto!' : 'Atenção', response.mensagem);
    } catch (error: any) {
      mostrarAlerta('Erro', error.message || 'Não foi possível reenviar o código.');
    } finally {
      setLoading(false);
    }
  };

  // ───────────────────────── Passo 3: validar código ─────────────────────────

  const handleValidarCodigo = async () => {
    setErroCodigo('');
    const codigoTrim = codigo.trim();

    if (!codigoTrim) {
      setErroCodigo('O campo não pode estar em branco*');
      return;
    }
    if (codigoTrim.length !== 6) {
      setErroCodigo('O código deve ter 6 dígitos*');
      return;
    }

    try {
      setLoading(true);
      const response = await RecuperarSenhaService.validarCodigo(email, codigoTrim);

      if (!response.valido || !response.resetToken) {
        setErroCodigo(response.mensagem || 'Código inválido.');
        return;
      }

      setResetToken(response.resetToken);
      setNovaSenha('');
      setConfirmarSenha('');
      setEtapa('NOVA_SENHA');
    } catch (error: any) {
      mostrarAlerta('Erro', error.message || 'Não foi possível validar o código. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // ───────────────────────── Passo 4: nova senha ─────────────────────────

  const handleRedefinirSenha = async () => {
    setErroNovaSenha('');
    setErroConfirmarSenha('');

    let valido = true;
    if (!novaSenha || novaSenha.length < 6) {
      setErroNovaSenha('A senha deve ter pelo menos 6 caracteres*');
      valido = false;
    }
    if (confirmarSenha !== novaSenha) {
      setErroConfirmarSenha('As senhas não coincidem*');
      valido = false;
    }
    if (!valido) return;

    try {
      setLoading(true);
      const response = await RecuperarSenhaService.redefinirSenha(email, resetToken, novaSenha);

      if (!response.sucesso) {
        mostrarAlerta('Atenção', response.mensagem);
        return;
      }

      setEtapa('SUCESSO');
    } catch (error: any) {
      mostrarAlerta('Erro', error.message || 'Não foi possível redefinir a senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // ───────────────────────── Conteúdo de cada etapa ─────────────────────────

  const renderConteudo = () => {
    switch (etapa) {
      case 'EMAIL':
        return (
          <>
            <Text style={styles.subtitle}>
              Informe o e-mail cadastrado na sua conta para recuperar o acesso.
            </Text>
            <View style={styles.cardForm}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>E-mail</Text>
                {erroEmail ? <Text style={styles.errorText}>{erroEmail}</Text> : null}
                <TextInput
                  style={[styles.input, erroEmail && styles.inputError]}
                  placeholder="Digite seu email"
                  placeholderTextColor="#5e5e5eff"
                  value={email}
                  onChangeText={(text) => { setEmail(text); setErroEmail(''); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <ReusableButton
                title={loading ? 'VERIFICANDO...' : 'CONTINUAR'}
                onPress={handleVerificarEmail}
              />
            </View>
          </>
        );

      case 'CANAL':
        return (
          <>
            <Text style={styles.subtitle}>
              Como você quer receber o código de verificação?
            </Text>
            <View style={styles.cardForm}>
              <TouchableOpacity
                style={styles.canalOption}
                activeOpacity={0.8}
                onPress={() => handleEscolherCanal('EMAIL')}
                disabled={loading}
              >
                <View style={styles.canalIconWrapper}>
                  <Mail color="#FFFFFF" size={20} />
                </View>
                <View style={styles.canalTextWrapper}>
                  <Text style={styles.canalTitle}>Receber por e-mail</Text>
                  <Text style={styles.canalSubtitle}>{emailMascarado}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.canalOption,
                  !telefoneDisponivel && styles.canalOptionDisabled,
                ]}
                activeOpacity={0.8}
                onPress={() => handleEscolherCanal('SMS')}
                disabled={loading || !telefoneDisponivel}
              >
                <View style={styles.canalIconWrapper}>
                  <MessageSquare color="#FFFFFF" size={20} />
                </View>
                <View style={styles.canalTextWrapper}>
                  <Text style={styles.canalTitle}>Receber por SMS</Text>
                  <Text style={styles.canalSubtitle}>
                    {telefoneDisponivel ? telefoneMascarado : 'Nenhum telefone cadastrado'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );

      case 'CODIGO':
        return (
          <>
            <Text style={styles.subtitle}>
              Enviamos um código de 6 dígitos {canalEscolhido === 'SMS' ? 'por SMS para' : 'por e-mail para'}{' '}
              <Text style={styles.subtitleHighlight}>
                {canalEscolhido === 'SMS' ? telefoneMascarado : emailMascarado}
              </Text>
            </Text>
            <View style={styles.cardForm}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Código de verificação</Text>
                {erroCodigo ? <Text style={styles.errorText}>{erroCodigo}</Text> : null}
                <TextInput
                  style={[styles.input, styles.inputCodigo, erroCodigo && styles.inputError]}
                  placeholder="000000"
                  placeholderTextColor="#5e5e5eff"
                  value={codigo}
                  onChangeText={(text) => { setCodigo(text.replace(/\D/g, '').slice(0, 6)); setErroCodigo(''); }}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>
              <ReusableButton
                title={loading ? 'VALIDANDO...' : 'VALIDAR CÓDIGO'}
                onPress={handleValidarCodigo}
              />
              <Text style={styles.link} onPress={handleReenviarCodigo}>
                Não recebeu? <Text style={styles.linkBold}>Reenviar código</Text>
              </Text>
            </View>
          </>
        );

      case 'NOVA_SENHA':
        return (
          <>
            <Text style={styles.subtitle}>Crie uma nova senha para sua conta.</Text>
            <View style={styles.cardForm}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nova senha</Text>
                {erroNovaSenha ? <Text style={styles.errorText}>{erroNovaSenha}</Text> : null}
                <TextInput
                  style={[styles.input, erroNovaSenha && styles.inputError]}
                  placeholder="Digite a nova senha"
                  placeholderTextColor="#5e5e5eff"
                  value={novaSenha}
                  onChangeText={(text) => { setNovaSenha(text); setErroNovaSenha(''); }}
                  secureTextEntry
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar nova senha</Text>
                {erroConfirmarSenha ? <Text style={styles.errorText}>{erroConfirmarSenha}</Text> : null}
                <TextInput
                  style={[styles.input, erroConfirmarSenha && styles.inputError]}
                  placeholder="Confirme a nova senha"
                  placeholderTextColor="#5e5e5eff"
                  value={confirmarSenha}
                  onChangeText={(text) => { setConfirmarSenha(text); setErroConfirmarSenha(''); }}
                  secureTextEntry
                />
              </View>
              <ReusableButton
                title={loading ? 'SALVANDO...' : 'REDEFINIR SENHA'}
                onPress={handleRedefinirSenha}
              />
            </View>
          </>
        );

      case 'SUCESSO':
        return (
          <>
            <Text style={styles.subtitle}>
              Sua senha foi redefinida com sucesso! Agora você já pode fazer login com a nova senha.
            </Text>
            <View style={styles.cardForm}>
              <ReusableButton
                title="IR PARA O LOGIN"
                onPress={() => router.replace('/auth/login')}
              />
            </View>
          </>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.topHeader}>
              <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
                <ArrowLeft color="#D81B60" size={28} />
              </TouchableOpacity>
            </View>

            <View style={styles.header}>
              <Image style={styles.img} source={require('@/assets/imagens/LogoCake.png')} />
              <Text style={styles.pageTitle}>Recuperar senha</Text>
            </View>

            {renderConteudo()}

            <Alert
              visible={alertVisible}
              title={alertTitle}
              message={alertMessage}
              onClose={() => setAlertVisible(false)}
            />
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
