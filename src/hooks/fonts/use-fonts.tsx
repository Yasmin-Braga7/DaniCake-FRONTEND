import {
    Abel_400Regular
} from '@expo-google-fonts/abel';
import {
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';

export const useAppFonts = () => {
    const [fontsLoaded] = useFonts({
        //Inter
        Inter_300Light,
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold, 

        //Abel
        Abel_400Regular,
    });
    return fontsLoaded;
}