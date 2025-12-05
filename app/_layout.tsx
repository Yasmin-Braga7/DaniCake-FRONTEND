import { CartProvider } from "@/src/context/CartContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
    return (
        // 1. O Provider deve ser o "pai" de todos, no lugar dos fragmentos <>
        <CartProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="auth" />       
                <Stack.Screen name="(tabs)" />
            </Stack>
            <StatusBar style="auto"/>
        </CartProvider>
    );
}