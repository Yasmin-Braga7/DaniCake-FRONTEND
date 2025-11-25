import { useRouter } from "expo-router";

export const useNavigation = () => {
    const router = useRouter();

    const navigateTo = {
        login: () => router.push('/auth/login'),
        register: () => router.push('/auth/register'),
        home: () => router.push('/(tabs)/Home'),
        cart: () => router.push('/(tabs)/Cart'),
        orders: () => router.push('/(tabs)/Orders'),
        profile: () => router.push('/(tabs)/Profile'),
        calendar: () => router.push('/(tabs)/Calendar'),
        back: () => router.back(),
    };
    return navigateTo;
};