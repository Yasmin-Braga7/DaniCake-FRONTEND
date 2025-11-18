import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./style";

// Aqui eu digo o tipo direto na linha (title: string, onPress: qualquer função)
export const ReusableButton = ({ title, onPress }: { title: string, onPress: any }) => {
    return (
        <TouchableOpacity style={styles.defaultButton} onPress={onPress}>
            <Text style={styles.defaultButtonText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};