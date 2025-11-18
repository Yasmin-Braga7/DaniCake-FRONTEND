import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { LogOut } from "lucide-react-native"; 
import { styles } from "./style"; 

export const LogoutButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
            <LogOut size={23} color="#D37A7A" style={styles.logoutIcon} />
            
            <Text style={styles.logoutText}>
                Sair
            </Text>
        </TouchableOpacity>
    );
};