import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import { styles } from './style';

// Interface para definir como os dados devem chegar (preparado para o backend)
export interface DropdownItem {
  id: number | string;
  label: string;
}

interface DropdownProps {
  placeholder?: string;
  options: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
}

export const Dropdown = ({ placeholder = "Selecione...", options, onSelect }: DropdownProps) => {
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