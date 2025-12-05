import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "./style";
import { Home, ShoppingBag, ShoppingCart, Calendar, User } from "lucide-react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from "react-native-reanimated";
import { useCart } from "@/src/context/CartContext";

type MenuItem = {
  id: string;
  route: any;
  icon: React.ComponentType<any>;
  isCenter?: boolean;
};

export const Menu = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Home");
  
  // 2. Pegar a quantidade do carrinho
  const { cartCount } = useCart(); 

  // 3. Configurar animação de escala
  const scale = useSharedValue(1);

  // 4. Toda vez que o cartCount mudar, faz o ícone pular
  useEffect(() => {
    if (cartCount > 0) {
      scale.value = withSequence(
        withSpring(1.2), // Aumenta
        withSpring(1)    // Volta ao normal
      );
    }
  }, [cartCount]);

  // Estilo animado
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

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
          const isCart = item.id === "Cart";

          // Se for o carrinho, usamos o Animated.View
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.tab,
                item.isCenter && styles.centerTab,
                activeTab === item.id && styles.activeTab,
              ]}
              onPress={() => handlePress(item)}
              activeOpacity={0.8}
            >
              {isCart ? (
                <Animated.View style={animatedStyle}>
                  <IconComponent
                    size={item.isCenter ? 32 : 30}
                    color={activeTab === item.id ? "#F7B6C3" : "#4b4b4eff"}
                  />
                  {/* 5. A BOLINHA (BADGE) */}
                  {cartCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {cartCount > 99 ? "99+" : cartCount}
                      </Text>
                    </View>
                  )}
                </Animated.View>
              ) : (
                <IconComponent
                  size={item.isCenter ? 32 : 30}
                  color={activeTab === item.id ? "#F7B6C3" : "#4b4b4eff"}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};