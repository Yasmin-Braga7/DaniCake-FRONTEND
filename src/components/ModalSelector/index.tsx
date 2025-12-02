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
}

export const Dropdown = ({ placeholder = "Selecione...", onSelect }: DropdownProps) => {
  const [categorias, setCategorias] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <Text style={styles.loadingText}>Carregando categorias...</Text>;
  }

  const options = categorias;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect(item); // Envia para o pai
    setIsOpen(false); // Fecha o dropdown
  };

  return (
    <View style={styles.container}>
      {/* Botão Principal */}
      <TouchableOpacity 
        style={[styles.header, isOpen && styles.headerOpen]} 
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Text style={styles.headerTitle}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        
        {/* Ícone muda dependendo se está aberto ou fechado */}
        {isOpen ? (
          <ChevronDown size={24} color="#000" />
        ) : (
          <ChevronRight size={24} color="#000" />
        )}
      </TouchableOpacity>

      {/* Lista de Opções (Só aparece se isOpen for true) */}
      {isOpen && (
        <View style={styles.listContainer}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true}>
            {options.map((item, index) => (
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