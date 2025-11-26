import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Pressable, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@/src/constants/router";
import { styles } from "./style";
import { ReusableButton } from "@/src/components/Button";
import { useFormRegister } from "@/src/hooks/formRegister";
import { registerService } from "@/src/services/auth/register";
import { Alert } from "@/src/components/alertRegister";

export const RegisterScreen = () => {

    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { errors, validate, clearError } = useFormRegister();
    const [loading, setLoading] = useState(false);
    // const [confirmarSenha, setConfirmarSenha] = useState('');

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

    const handleRegister = async () => {
        if (!validate(nome, email, senha)) return;

        setLoading(true);
        try {
            await registerService.register(nome, email, senha);
            mostrarAlerta("Sucesso", "Conta criada com sucesso!");
            setTimeout(() => {
                navigation.login();
            }, 1000);
        } catch (error: any) {
            console.error('Erro no registro:', error);
            
            if (error.response?.status === 400) {
                mostrarAlerta("Erro", "Dados inválidos. Verifique as informações.");
            } else if (error.response?.status === 409) {
                mostrarAlerta("Atenção", "Este e-mail já está em uso.");
            } else if (error.message?.includes('Network Error')) {
                mostrarAlerta("Erro", "Sem conexão com a internet.");
            } else {
                mostrarAlerta("Erro", error.message || 'Erro ao criar usuário');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            
            <KeyboardAvoidingView
                style={styles.keyboardAvoiding}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                            <TouchableOpacity onPress={navigation.back} style={styles.backButton}>
                                
                                <ArrowLeft color="#D81B60" size={28} />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.header}>
                            
                                <Image style={styles.img} source={require('@/assets/imagens/LogoCake.png')}/>
                            
                            
                            <Text style={styles.pageTitle}>CRIAR UMA CONTA</Text>
                        </View>

                        <View style={styles.cardForm}>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nome completo</Text>
                                {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}
                                <TextInput
                                    style={[styles.input, errors.nome && styles.inputError, { fontSize: 17 }]}
                                    placeholder="Digite seu Nome"
                                    value={nome}
                                    onChangeText={(text) =>{
                                        setNome(text);
                                        clearError('nome');
                                    }}
                                    placeholderTextColor='#858587'
                                    keyboardType="default"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>E-mail</Text>
                                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                                <TextInput
                                    style={[styles.input,errors.email && styles.inputError, { fontSize: 17 }]}
                                    placeholder="Digite um E-mail"
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text);
                                        clearError('email');
                                    }}
                                    placeholderTextColor='#858587'
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Senha</Text>
                                {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}
                                <TextInput
                                    style={[styles.input, errors.senha && styles.inputError, { fontSize: 17 }]}
                                    placeholder="Digite uma senha"
                                    value={senha}
                                    onChangeText={(text) => {
                                        setSenha(text);
                                        clearError('senha');
                                    }}
                                    placeholderTextColor='#858587'
                                    keyboardType="default"
                                    secureTextEntry
                                />
                            </View>

                            {/* <View style={styles.inputContainer}>
                                <Text style={styles.label}>confirmar senha</Text>
                                <TextInput
                                    style={[styles.input,  { fontSize: 17 }]}
                                    placeholder="Confirme a senha"
                                    value={confirmarSenha}
                                    onChangeText={setConfirmarSenha}
                                    secureTextEntry
                                />
                            </View> */}

                            <ReusableButton title='CADASTRAR' onPress={handleRegister} />

                        </View>
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
}