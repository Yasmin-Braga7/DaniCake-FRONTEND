import { useRouter } from "expo-router";

export const useNavigation = () => {
    const router = useRouter();

    const navigateTo = {
        login: () => router.push('/app/auth/login'),
        register: () => router.push('/app/auth/register'),
        home: () => router.push('/app/(tabs)/Home/index.tsx'),
        cart: () => router.push('/Cart'),
        orders: () => router.push('/Orders'),
        profile: () => router.push('/Profile'),
        calendar: () => router.push('/Calendar'),
        back: () => router.back(),
    };
    return navigateTo;
};