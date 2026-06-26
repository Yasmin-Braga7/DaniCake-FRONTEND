import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react-native";
import { normalize } from "@/src/constants/responsive";
import { FONTS } from "@/src/constants/fonts";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onHide: () => void;
}

const COLORS = {
  success: { bg: "#1A8A5A", icon: "#fff", border: "#16A86E" },
  error:   { bg: "#C0392B", icon: "#fff", border: "#E74C3C" },
  warning: { bg: "#E67E22", icon: "#fff", border: "#F39C12" },
  info:    { bg: "#2980B9", icon: "#fff", border: "#3498DB" },
};

const ICONS = {
  success: CheckCircle,
  error:   XCircle,
  warning: AlertCircle,
  info:    Info,
};

export const Toast = ({ visible, message, type = "success", duration = 3000, onHide }: ToastProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, tension: 80, friction: 8 }),
        Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: -20, duration: 300, useNativeDriver: true }),
        ]).start(() => {
          onHide();
          translateY.setValue(-20);
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const color = COLORS[type];
  const Icon = ICONS[type];

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: color.bg, borderColor: color.border, opacity, transform: [{ translateY }] },
      ]}
    >
      <Icon size={20} color={color.icon} />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: normalize(60),
    left: normalize(20),
    right: normalize(20),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(14),
    borderRadius: normalize(14),
    borderWidth: 1,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    zIndex: 9999,
    gap: normalize(10),
  },
  text: {
    flex: 1,
    color: "#fff",
    fontSize: normalize(14),
    fontFamily: FONTS.inter.semiBold,
  },
});
