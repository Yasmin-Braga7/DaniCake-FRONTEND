import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    TextInput,
    Alert,
    ActivityIndicator
} from "react-native";
import { Trash2, Pencil, X, CirclePlus } from "lucide-react-native";
import { styles } from "./style";
import { CategoriaService } from "@/src/services/categoria";
import { Categoria } from "@/src/interfaces/categoria/response";

export const CategoryList = () => {
    const [categories, setCategories] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(false);

    // Controle do Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const data = await CategoriaService.listarCategorias();
            setCategories(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreate = () => {
        setEditingId(null);
        setCategoryName("");
        setModalVisible(true);
    };

    const handleOpenEdit = (item: Categoria) => {
        setEditingId(item.id);
        setCategoryName(item.nome);
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!categoryName.trim()) {
            Alert.alert("Aviso", "O nome da categoria é obrigatório.");
            return;
        }

        try {
            if (editingId) {
                await CategoriaService.atualizarCategoria(editingId, categoryName);
                Alert.alert("Sucesso", "Categoria atualizada!");
            } else {
                await CategoriaService.criarCategoria(categoryName);
                Alert.alert("Sucesso", "Categoria criada!");
            }
            setModalVisible(false);
            loadCategories();
        } catch (error) {
            Alert.alert("Erro", "Falha ao salvar categoria.");
        }
    };

    const handleDelete = (id: number) => {
        Alert.alert("Confirmar", "Deseja realmente apagar esta categoria?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Apagar",
                style: "destructive",
                onPress: async () => {
                    try {
                        await CategoriaService.apagarCategoria(id);
                        loadCategories();
                    } catch (error) {
                        Alert.alert("Erro", "Não foi possível apagar. Verifique se há produtos vinculados.");
                    }
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Categorias Disponíveis</Text>
                </View>
                <TouchableOpacity onPress={handleOpenCreate} activeOpacity={0.7}>
                    <CirclePlus size={30} color="#C23B6B" strokeWidth={1.5} />
                </TouchableOpacity>
            </View>

            <View style={styles.listContainer}>
            {loading ? (
                <ActivityIndicator color="#C23B6B" style={{ marginTop: 20 }} />
            ) : categories.length === 0 ? (
                <Text style={styles.emptyText}>Nenhuma categoria.</Text>
            ) : (
                <ScrollView 
                    contentContainerStyle={styles.listContent} 
                    showsVerticalScrollIndicator={false} 
                    nestedScrollEnabled={true}
                >
                    {categories.map((item) => (
                        <View key={String(item.id)} style={styles.itemRow}>
                            <View style={styles.nameBox}>
                                <Text style={styles.nameText}>{item.nome}</Text>
                            </View>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity 
                                    onPress={() => handleOpenEdit(item)} 
                                    style={[styles.actionBtn, styles.editBtn]}
                                    activeOpacity={0.7}
                                >
                                    <Pencil color="#C23B6B" size={18} strokeWidth={1.8} />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => handleDelete(item.id)}
                                    style={[styles.actionBtn, styles.deleteBtn]}
                                    activeOpacity={0.7}
                                >
                                    <Trash2 color="#D37A7A" size={18} strokeWidth={1.8} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {editingId ? "Editar Categoria" : "Nova Categoria"}
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.7}>
                                <X color="#999" size={24} strokeWidth={2} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Digite o nome da categoria"
                            placeholderTextColor="#aaa"
                            value={categoryName}
                            onChangeText={setCategoryName}
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
                            <Text style={styles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};