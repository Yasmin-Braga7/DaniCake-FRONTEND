import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "./style";


// 🔹 Importa ícones Lucide que combinam com cada aba
import { Home, ShoppingBag, ShoppingCart, Calendar, User } from "lucide-react-native";

type MenuItem = {
  id: string;
  route: any;
  icon: React.ComponentType<any>;
  isCenter?: boolean;
};

export const Menu = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Home");


  // 🔹 Define os itens do menu
  const menuItems: MenuItem[] = [
    { id: "Home", route: "/Home", icon: Home },
    { id: "Orders", route: "/Orders", icon: ShoppingBag },
    { id: "Cart", route: "/Cart", icon: ShoppingCart, isCenter: true },
    { id: "Calendar", route: "/Calendar", icon: Calendar },
    { id: "Profile", route: "/Profile", icon: User },
  ];

  const handlePress = (item: MenuItem) => {
    setActiveTab(item.id);
    router.push(item.route);
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footer}>
        <View style={styles.topCurve} />

        {menuItems.map((item) => {
          const IconComponent = item.icon;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.tab,
                item.isCenter && styles.centerTab,
                activeTab === item.id && styles.activeTab,
              ]}
              onPress={() => handlePress(item)}
            >
              <IconComponent
                size={item.isCenter ? 38 : 30}

                color={activeTab === item.id ? "#F7B6C3" : "#4b4b4eff"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
