import { useRouter } from "expo-router";

export const useNavigation = () => {
    const router = useRouter();

    const navigateTo = {
        login: () => router.push('/auth/login'),
        register: () => router.push('/auth/register'),
        // Rotas Usuarios...
        home: () => router.push('/(tabs)/Home'),
        cart: () => router.push('/(tabs)/Cart'),
        orders: () => router.push('/(tabs)/Orders'),
        profile: () => router.push('/(tabs)/Profile'),
        calendar: () => router.push('/(tabs)/Calendar'),

        adminDashboard: () => router.push('/(adm)/createProduct'),
        adminCreateProduct: () => router.push('/(adm)/dashboard'),
        adminListOrders: () => router.push('/(adm)/listOrders'),
        back: () => router.back(),
    };
    return navigateTo;
};