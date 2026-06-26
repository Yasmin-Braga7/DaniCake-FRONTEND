import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Mail, Phone, MapPin, Pencil, Camera, Save, X, LogOut } from "lucide-react-native";
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from "expo-router";

import { styles } from "./style";
import { Toast } from "@/src/components/Toast";
import { AuthService } from "@/src/services/storage";
import { UserUpdateData } from "@/src/interfaces/user/request";
import { router } from "expo-router";
import { UserService } from "@/src/services/auth/user";

export const ProfileScreen = () => {
    const iconColor = "#C23B6B";

    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [userId, setUserId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState<string | null>(null);

    const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "error" | "warning" | "info" });

    const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "success") => {
        setToast({ visible: true, message, type });
    };

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );

    const loadUserData = async () => {
        setLoading(true);
        try {
            const storedUser = await AuthService.getUser();
            if (storedUser && storedUser.id) {
                setUserId(storedUser.id);
                const userFromApi = await UserService.getById(storedUser.id);
                setName(userFromApi.nome);
                setEmail(userFromApi.email);
                setPhone(userFromApi.telefone || "");
                setAddress(userFromApi.endereco || "");
                if (userFromApi.imagem) {
                    setImage(`data:image/png;base64,${userFromApi.imagem}`);
                }
            }
        } catch (error) {
            showToast("Não foi possível carregar seus dados.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handlePickImage = async () => {
        if (!userId) return;
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            showToast("Precisamos de acesso à galeria.", "warning");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });
        if (!result.canceled) {
            const localUri = result.assets[0].uri;
            setImage(localUri);
            try {
                await UserService.updatePhoto(userId, localUri);
                showToast("Foto de perfil atualizada!", "success");
            } catch (error) {
                showToast("Falha ao enviar a foto.", "error");
                loadUserData();
            }
        }
    };

    const handleSaveData = async () => {
        if (!userId) return;
        try {
            setLoading(true);
            const data: UserUpdateData = { nome: name, email, telefone: phone, endereco: address };
            await UserService.updateData(userId, data);
            showToast("Perfil atualizado com sucesso!", "success");
            setIsEditing(false);
        } catch (error) {
            showToast("Falha ao salvar dados.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await AuthService.logout();
        router.replace('/auth/login');
    };

    return (
        <View style={styles.container}>
            <Toast
                visible={toast.visible}
                message={toast.message}
                type={toast.type}
                onHide={() => setToast((t) => ({ ...t, visible: false }))}
            />

            <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Meu Perfil</Text>
                    <Text style={styles.headerSubtitle}>Gerencie suas informações</Text>
                </View>
            </SafeAreaView>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* CARTÃO DE USUÁRIO (FOTO) */}
                <View style={styles.userCard}>
                    <TouchableOpacity onPress={handlePickImage} style={styles.photoCircle}>
                        {image ? (
                            <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 999 }} />
                        ) : (
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                <Camera size={28} color={iconColor} />
                            </View>
                        )}
                    </TouchableOpacity>
                    <Text style={styles.userName}>{name || "Carregando..."}</Text>
                    <Text style={styles.userType}>Cliente</Text>
                </View>

                {/* INFO CARD */}
                <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                        <Text style={styles.infoTitle}>Informações Pessoais</Text>
                        {!isEditing ? (
                            <TouchableOpacity style={styles.editContainer} onPress={() => setIsEditing(true)} activeOpacity={0.7}>
                                <Pencil size={14} color={iconColor} style={{ marginRight: 5 }} />
                                <Text style={styles.editButton}>Editar</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                <TouchableOpacity
                                    onPress={() => { setIsEditing(false); loadUserData(); }}
                                    style={[styles.editContainer, { backgroundColor: '#FFF0F0' }]}
                                    activeOpacity={0.7}
                                >
                                    <X size={18} color="#D37A7A" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleSaveData}
                                    style={[styles.editContainer, { backgroundColor: '#F0FFF0' }]}
                                    activeOpacity={0.7}
                                >
                                    {loading ? <ActivityIndicator size="small" color="#4CAF50" /> : <Save size={18} color="#4CAF50" />}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <User size={18} color={iconColor} />
                            <Text style={styles.itemLabel}>Nome</Text>
                        </View>
                        {isEditing ? (
                            <TextInput style={styles.editInput} value={name} onChangeText={setName} />
                        ) : (
                            <Text style={styles.itemValue}>{name}</Text>
                        )}
                    </View>

                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <Mail size={18} color={iconColor} />
                            <Text style={styles.itemLabel}>E-mail</Text>
                        </View>
                        {isEditing ? (
                            <TextInput style={styles.editInput} value={email} onChangeText={setEmail} keyboardType="email-address" />
                        ) : (
                            <Text style={styles.itemValue}>{email}</Text>
                        )}
                    </View>

                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <Phone size={18} color={iconColor} />
                            <Text style={styles.itemLabel}>Telefone</Text>
                        </View>
                        {isEditing ? (
                            <TextInput style={styles.editInput} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                        ) : (
                            <Text style={styles.itemValue}>{phone || "Não informado"}</Text>
                        )}
                    </View>

                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <MapPin size={18} color={iconColor} />
                            <Text style={styles.itemLabel}>Endereço</Text>
                        </View>
                        {isEditing ? (
                            <TextInput style={styles.editInput} value={address} onChangeText={setAddress} />
                        ) : (
                            <Text style={styles.itemValue}>{address || "Não informado"}</Text>
                        )}
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
                    <LogOut size={20} color="#D37A7A" style={styles.logoutIcon} />
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>

                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    );
};
