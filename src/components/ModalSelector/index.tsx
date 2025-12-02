import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { CategoriaService } from '@/src/services/categoria';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import { styles } from './style';

import { DropdownItem } from '@/src/interfaces/DropDown';

interface DropdownProps {
  placeholder?: string;
  onSelect: (item: DropdownItem) => void;
  selectedId?: number | null;
}

export const Dropdown = ({ placeholder = "Selecione...", onSelect, selectedId }: DropdownProps) => {
  const [categorias, setCategorias] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await CategoriaService.listarCategorias();
        const dropdownItems: DropdownItem[] = response.map(cat => ({
          id: cat.id,
          label: cat.nome,
        }));
        setCategorias(dropdownItems);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        Alert.alert("Erro", "Não foi possível carregar as categorias.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  // Novo Effect: Atualiza o item selecionado se receber um ID externo (Edição)
  useEffect(() => {
    if (selectedId && categorias.length > 0) {
      const found = categorias.find(c => Number(c.id) === Number(selectedId));
      if (found) {
        setSelectedItem(found);
      }
    }
  }, [selectedId, categorias]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect(item); 
    setIsOpen(false); 
  };

  // --- 2. O RETORNO CONDICIONAL FICA AQUI EMBAIXO ---
  if (loading) {
    return <Text style={styles.loadingText}>Carregando categorias...</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.header, isOpen && styles.headerOpen]} 
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Text style={styles.headerTitle}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        
        {isOpen ? (
          <ChevronDown size={24} color="#000" />
        ) : (
          <ChevronRight size={24} color="#000" />
        )}
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.listContainer}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true}>
            {categorias.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.item} 
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};