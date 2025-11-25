import { useState, useRef, useEffect } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    Pressable, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";

export const RegisterScreen = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const scrollViewRef = useRef<ScrollView | null>(null);

    // Garante o scroll resetar quando o teclado desce
    useEffect(() => {
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        });
        return () => hideSubscription.remove();
    }, []);

    const handleRegister = () => {
        console.log("Cadastrando:", { nome, email });
        Keyboard.dismiss();
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
                    {/* Pressable para fechar teclado ao tocar fora */}
                    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                        
                        {/* Cabeçalho (Logo e Título) */}
                        <View style={styles.header}>
                            <View style={styles.logoCircle}>
                                {/* Aqui entraria sua imagem da Logo */}
                                <Text style={styles.logoText}>Logo</Text>
                            </View>
                            
                            <Text style={styles.pageTitle}>CRIAR UMA CONTA</Text>
                        </View>

                        {/* Card do Formulário */}
                        <View style={styles.cardForm}>
                            
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nome completo</Text>
                                <TextInput
                                    style={styles.input}
                                    value={nome}
                                    onChangeText={setNome}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>E-mail</Text>
                                <TextInput
                                    style={styles.input}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Senha</Text>
                                <TextInput
                                    style={styles.input}
                                    value={senha}
                                    onChangeText={setSenha}
                                    secureTextEntry
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>confirmar senha</Text>
                                <TextInput
                                    style={styles.input}
                                    value={confirmarSenha}
                                    onChangeText={setConfirmarSenha}
                                    secureTextEntry
                                />
                            </View>

                            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                                <Text style={styles.buttonText}>CADASTRAR</Text>
                            </TouchableOpacity>

                        </View>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}