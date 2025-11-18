import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { SafeAreaView } from "react-native-safe-area-context";

// 1. Importando os ícones diretamente
import { User, Mail, Phone, MapPin, Pencil, LogOut } from "lucide-react-native";
import { LogoutButton } from "@/src/components/ButtonProfile";
import { router } from "expo-router";

export const ProfileScreen = () => {
    // Definindo uma cor padrão para os ícones das labels
    const iconColor = "#6B3F31"; 

    return (
        <View style={styles.container}>

            <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Meu Perfil</Text>
                    <Text style={styles.headerSubtitle}>Gerencie suas informações</Text>
                </View>
            </SafeAreaView>

            <View style={styles.seguraforms}>
                <View style={styles.userCard}>
                    <View style={styles.photoCircle}>
                        <Text style={styles.photoText}>Foto</Text>
                    </View>
                    <Text style={styles.userName}>Usuário</Text>
                    <Text style={styles.userType}>Cliente</Text>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                        <Text style={styles.infoTitle}>Informações Pessoais</Text>
                        
                        
                        <TouchableOpacity style={styles.editContainer}>
                            <Pencil size={18} color="#6B3F31" style={{ marginRight: 5 }} />
                            <Text style={styles.editButton}>Editar</Text>
                        </TouchableOpacity>
                    </View>

                    
                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <User size={20} color={iconColor} />
                            <Text style={styles.itemLabel}>Nome</Text>
                        </View>
                        <Text style={styles.itemValue}>Usuario Silva</Text>
                    </View>

                    
                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <Mail size={20} color={iconColor} />
                            <Text style={styles.itemLabel}>E-mail</Text>
                        </View>
                        <Text style={styles.itemValue}>UsuarioSilva@gmail.com</Text>
                    </View>

                    
                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <Phone size={20} color={iconColor} />
                            <Text style={styles.itemLabel}>Telefone</Text>
                        </View>
                        <Text style={styles.itemValue}>(21) 99192-2344</Text>
                    </View>

                    
                    <View style={styles.seguraLabel}>
                        <View style={styles.labelRow}>
                            <MapPin size={20} color={iconColor} />
                            <Text style={styles.itemLabel}>Endereço</Text>
                        </View>
                        <Text style={styles.itemValue}>Rua. sla, 123 - RJ</Text>
                    </View>
                </View>
                <LogoutButton onPress={() => router.navigate('/auth/login')}/>
            </View>
        </View>
    );
};