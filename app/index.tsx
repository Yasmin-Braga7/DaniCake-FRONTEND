import { useAppFonts } from "@/src/hooks/fonts/use-fonts";
import { SplashScreen } from "@/src/screens/splash/index";
import * as NavigationBar from "expo-navigation-bar";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);
    const fontsLoaded = useAppFonts();

    useEffect(() => {
        StatusBar.setHidden(true);
        NavigationBar.setVisibilityAsync("hidden");
        NavigationBar.setBehaviorAsync("overlay-swipe");
    }, []);

    useEffect(() =>{
        if (fontsLoaded) {
            setTimeout(() => setIsLoading(false), 4000);
        }
    }, [fontsLoaded]);

    if (isLoading || !fontsLoaded) {
        return <SplashScreen />
    }

    return <Redirect  href="./auth/login"/>
}