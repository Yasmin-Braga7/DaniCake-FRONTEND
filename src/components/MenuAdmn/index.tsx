import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { styles } from "./style"; 
import { LayoutGrid, Package, FileText, UserCircle } from "lucide-react-native";

export const AdminMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { 
      id: "dashboard", 
      route: "/(adm)/dashboard", 
      icon: LayoutGrid 
    },
    { 
      id: "createProduct", 
      route: "/(adm)/createProduct", 
      icon: Package 
    },
    { 
      id: "listOrders", 
      route: "/(adm)/listOrders", 
      icon: FileText 
    },
    { 
      id: "adminProfile", 
      route: "/(adm)/adminProfile", 
      icon: UserCircle 
    },
  ];

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footer}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname.includes(item.id); 

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.7}
            >
              <IconComponent
                size={26}
                color={isActive ? "#C23B6B" : "#999"}
                strokeWidth={isActive ? 2 : 1.5}
              />
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};