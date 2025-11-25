import { useRouter } from "expo-router";

export const useNavigation = () => {
    const router = useRouter();

    const navigateTo = {
        login: () => router.push('/auth/login'),
        register: () => router.push('/'),
        home: () => router.push('/'),
        cart: () => router.push('/Cart'),
        orders: () => router.push('/Orders'),
        profile: () => router.push('/Profile'),
        calendar: () => router.push('/Calendar'),
        back: () => router.back(),
    };
    return navigateTo;
};