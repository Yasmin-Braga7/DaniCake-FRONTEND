import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./style";

// Aqui eu digo o tipo direto na linha (title: string, onPress: qualquer função)
export const ReusableButton = ({ title, onPress, activeOpacity = 1 }: { title: string, onPress: any, activeOpacity?: number; }) => {
    return (
        <TouchableOpacity style={styles.defaultButton} onPress={onPress} activeOpacity={activeOpacity}>
            <Text style={styles.defaultButtonText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};