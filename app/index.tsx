import { useAppFonts } from "@/src/hooks/fonts/use-fonts";
import { SplashScreen } from "@/src/screens/splash/index";
import * as NavigationBar from "expo-navigation-bar";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { AuthService } from "@/src/services/storage";

type Destino = 'loading' | 'login' | 'tabs' | 'adm';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [destino, setDestino] = useState<Destino>('loading');
  const fontsLoaded = useAppFonts();

  useEffect(() => {
    StatusBar.setHidden(true);
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;

    const verificarSessao = async () => {
      await new Promise(r => setTimeout(r, 3500)); // splash mínimo
      try {
        const logado = await AuthService.isLoggedIn();
        const tokenValido = logado ? await AuthService.isTokenValid() : false;

        if (!tokenValido) {
          setDestino('login');
        } else {
          const user = await AuthService.getUser();
          const roles: string[] = (user as any)?.roles ?? [];
          if (roles.includes('ROLE_ADMINISTRADOR')) {
            setDestino('adm');
          } else {
            setDestino('tabs');
          }
        }
      } catch {
        setDestino('login');
      } finally {
        setIsLoading(false);
      }
    };

    verificarSessao();
  }, [fontsLoaded]);

  if (isLoading || !fontsLoaded || destino === 'loading') {
    return <SplashScreen />;
  }

  if (destino === 'adm') return <Redirect href="/(adm)/createProduct" />;
  if (destino === 'tabs') return <Redirect href="/(tabs)/Home" />;
  return <Redirect href="./auth/login" />;
}
