import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Mail, Phone, MapPin, Pencil, Camera, Save, X } from "lucide-react-native"; // Adicionei Camera, Save e X
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { styles } from "./style";
import { LogoutButton } from "@/src/components/ButtonProfile";
import { UserUpdateData } from "@/src/interfaces/user/request";
import { UserService } from "@/src/services/auth/user";

export const ProfileScreen = () => {
    const iconColor = "#6B3F31";
    
    // --- LÓGICA DO BACKEND ---
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Controla se está editando ou só vendo

    // Estados dos dados
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState<string | null>(null);

    // TODO: Substituir pelo ID real do usuário logado (Contexto ou AsyncStorage)
    const userId = 1; 

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        setLoading(true);
        try {
            const user = await UserService.getById(userId);
            setName(user.nome);
            setEmail(user.email);
            setPhone(user.telefone);
            setAddress(user.endereco);
            
            if (user.imagem) {
                setImage(`data:image/png;base64,${user.imagem}`);
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os dados.");
        } finally {
            setLoading(false);
        }
    };

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permissão necessária", "Precisamos de acesso à galeria.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            const localUri = result.assets[0].uri;
            setImage(localUri); // Mostra preview na hora
            
            // Faz upload silencioso ou espera salvar tudo? 
            // Sugestão: Upload imediato da foto é melhor UX
            try {
                await UserService.updatePhoto(userId, localUri);
                Alert.alert("Sucesso", "Foto atualizada!");
            } catch (error) {
                Alert.alert("Erro", "Falha ao enviar a foto.");
            }
        }
    };

    const handleSaveData = async () => {
        try {
            setLoading(true);
            const data: UserUpdateData = {
                nome: name,
                email: email,
                telefone: phone,
                endereco: address
            };
            await UserService.updateData(userId, data);
            Alert.alert("Sucesso", "Dados atualizados!");
            setIsEditing(false); // Sai do modo edição
        } catch (error) {
            Alert.alert("Erro", "Falha ao salvar dados.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        loadUserData(); // Reseta os dados para o que estava no banco
    };

    // --- RENDERIZAÇÃO (SEU LAYOUT) ---

    return (
        <View style={styles.container}>
            {/* Header permanece fixo no topo */}
            <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Meu Perfil</Text>
                    <Text style={styles.headerSubtitle}>Gerencie suas informações</Text>
                </View>
            </SafeAreaView>

            <ScrollView 
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={false}
            >
                {/* Cartão do Usuário (Foto + Nome Principal) */}
                <View style={styles.userCard}>
                    <TouchableOpacity onPress={handlePickImage} style={styles.photoCircle}>
                        {image ? (
                            <Image 
                                source={{ uri: image }} 
                                style={{ width: '100%', height: '100%', borderRadius: 999 }} 
                            />
                        ) : (
                            // Se não tiver foto, mostra o texto ou ícone
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                <Camera size={24} color="#6B3F31" />
                                <Text style={[styles.photoText, { fontSize: 10 }]}>Alterar</Text>
                            </View>
                        )}
                        
                        {/* Ícone pequeno de edição sobre a foto */}
                        <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white', borderRadius: 10, padding: 2 }}>
                             <Pencil size={12} color="#6B3F31" />
                        </View>
                    </TouchableOpacity>
                    
                    <Text style={styles.userName}>{name || "Usuário"}</Text>
                    <Text style={styles.userType}>Cliente</Text>
                </View>

                {/* Card de Informações */}
                <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                        <Text style={styles.infoTitle}>Informações Pessoais</Text>
                        
                        {/* Botão de Editar / Salvar */}
                        {!isEditing ? (
                            <TouchableOpacity style={styles.editContainer} onPress={() => setIsEditing(true)}>
                                <Pencil size={18} color="#6B3F31" style={{ marginRight: 5 }} />
                                <Text style={styles.editButton}>Editar</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <TouchableOpacity onPress={handleCancelEdit}>
                                    <X size={24} color="red" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSaveData}>
                                    {loading ? <ActivityIndicator color="green"/> : <Save size={24} color="green" />}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* --- CAMPOS --- */}
                    
                    {/* Nome */}
                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <User size={20} color={iconColor} />
                            <Text style={styles.itemLabel}>Nome</Text>
                        </View>
                        {isEditing ? (
                            <TextInput 
                                style={{ borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 2, color: '#333' }}
                                value={name} onChangeText={setName} 
                            />
                        ) : (
                            <Text style={styles.itemValue}>{name}</Text>
                        )}
                    </View>

                    {/* Email */}
                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <Mail size={20} color={iconColor} />
                            <Text style={styles.itemLabel}>E-mail</Text>
                        </View>
                        {isEditing ? (
                            <TextInput 
                                style={{ borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 2, color: '#333' }}
                                value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"
                            />
                        ) : (
                            <Text style={styles.itemValue}>{email}</Text>
                        )}
                    </View>

                    {/* Telefone */}
                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <Phone size={20} color={iconColor} />
                            <Text style={styles.itemLabel}>Telefone</Text>
                        </View>
                        {isEditing ? (
                            <TextInput 
                                style={{ borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 2, color: '#333' }}
                                value={phone} onChangeText={setPhone} keyboardType="phone-pad"
                            />
                        ) : (
                            <Text style={styles.itemValue}>{phone || "(Não informado)"}</Text>
                        )}
                    </View>

                    {/* Endereço */}
                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <MapPin size={20} color={iconColor} />
                            <Text style={styles.itemLabel}>Endereço</Text>
                        </View>
                        {isEditing ? (
                            <TextInput 
                                style={{ borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 2, color: '#333' }}
                                value={address} onChangeText={setAddress}
                            />
                        ) : (
                            <Text style={styles.itemValue}>{address || "(Não informado)"}</Text>
                        )}
                    </View>
                </View>
                
                <LogoutButton onPress={() => router.navigate('/auth/login')}/>
                
                {/* Espaço extra */}
                <View style={{ height: 20 }} /> 
            </ScrollView>
        </View>
    );
};