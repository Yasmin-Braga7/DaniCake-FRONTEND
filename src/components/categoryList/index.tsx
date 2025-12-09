import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal,
    TextInput,
    Alert,
    ActivityIndicator
} from "react-native";
import { Plus, Trash2, Edit3, X } from "lucide-react-native";
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
            console.log(error); // Log para debug
            // Opcional: não alertar sempre se for apenas vazio, mas aqui alerta erro de conexão
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
            {/* 1. Header FIXO (fora da lista) */}
            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Categorias Disponíveis</Text>
                </View>
                <TouchableOpacity onPress={handleOpenCreate}>
                    <Plus color="#000" size={24} />
                </TouchableOpacity>
            </View>

            {/* 2. Área de Lista Rolável */}
            {/* O container tem altura fixa, então o flex: 1 fará a lista ocupar o resto e rolar se necessário */}
            {loading ? (
                <ActivityIndicator color="#000" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={categories}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) => (
                        <View style={styles.itemRow}>
                            <View style={styles.nameBox}>
                                <Text style={styles.nameText}>{item.nome}</Text>
                            </View>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity onPress={() => handleOpenEdit(item)} style={{ marginRight: 10 }}>
                                    <Edit3 color="#555" size={22} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                    <Trash2 color="#000" size={22} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Nenhuma categoria.</Text>
                    }

                    /* AQUI ESTÁ A MÁGICA */
                    style={{ flex: 1 }}
                />

            )}

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {editingId ? "Editar Categoria" : "Nova Categoria"}
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X color="#ffbfbfff" size={24} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Digite o nome da categoria"
                            value={categoryName}
                            onChangeText={setCategoryName}
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};