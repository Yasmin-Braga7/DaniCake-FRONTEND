import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { styles } from "./style"; 
import { LayoutDashboard, PackagePlus, ClipboardList } from "lucide-react-native";

export const AdminMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Definindo rotas do Admin baseadas na sua imagem
  const menuItems = [
    { 
      id: "dashboard", 
      route: "/(adm)/dashboard", 
      icon: LayoutDashboard 
    },
    { 
      id: "createProduct", 
      route: "/(adm)/createProduct", 
      icon: PackagePlus 
    },
    { 
      id: "listOrders", 
      route: "/(adm)/listOrders", 
      icon: ClipboardList 
    },
  ];

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footer}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          // Verifica se a rota atual contém o ID (ex: se estou em /dashboard, acende o ícone)
          const isActive = pathname.includes(item.id); 

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => router.push(item.route as any)}
            >
              <IconComponent
                size={30}
                color={isActive ? "#F7B6C3" : "#4b4b4eff"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};