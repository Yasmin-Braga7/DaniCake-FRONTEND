import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Pressable, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@/src/constants/router";
import { styles } from "./style";
import { ReusableButton } from "@/src/components/Button";

export const RegisterScreen = () => {

    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const scrollViewRef = useRef<ScrollView | null>(null);

    
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
                                <TextInput
                                    style={[styles.input,  { fontSize: 17 }]}
                                    placeholder="Digite seu Nome"
                                    value={nome}
                                    onChangeText={setNome}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>E-mail</Text>
                                <TextInput
                                    style={[styles.input,  { fontSize: 17 }]}
                                    placeholder="Digite um E-mail"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Senha</Text>
                                <TextInput
                                    style={[styles.input,  { fontSize: 17 }]}
                                    placeholder="Digite uma senha"
                                    value={senha}
                                    onChangeText={setSenha}
                                    secureTextEntry
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>confirmar senha</Text>
                                <TextInput
                                    style={[styles.input,  { fontSize: 17 }]}
                                    placeholder="Confirme a senha"
                                    value={confirmarSenha}
                                    onChangeText={setConfirmarSenha}
                                    secureTextEntry
                                />
                            </View>

                            <ReusableButton title='CADASTRAR' onPress={handleRegister} />

                        </View>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}