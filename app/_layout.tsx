import { CartProvider } from "@/src/context/CartContext";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthService } from "@/src/services/storage";
import { NotificationService } from "@/src/services/notifications";
import { api } from "@/src/services";

/**
 * Banner de aviso de sessão encerrada em outro dispositivo.
 * Some sozinho depois que o logout é concluído (usuário só confirma "Entendi").
 */
function SessaoEncerradaBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <View style={bannerStyles.container}>
      <Text style={bannerStyles.text}>
        ⚠️ Sua conta foi acessada em outro dispositivo. Você foi desconectado.
      </Text>
      <TouchableOpacity onPress={onDismiss} style={bannerStyles.btn}>
        <Text style={bannerStyles.btnText}>Entendi</Text>
      </TouchableOpacity>
    </View>
  );
}

const bannerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#C23B6B',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    flex: 1,
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  btn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  btnText: {
    color: '#C23B6B',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default function RootLayout() {
  const [mostrarBanner, setMostrarBanner] = useState(false);
  const notifReceived = useRef<any>(null);
  const notifResponse = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    inicializarNotificacoes();
    const limparPolling = verificarSessaoUnica();
    return () => {
      if (notifReceived.current) NotificationService.removeSubscription(notifReceived.current);
      if (notifResponse.current) NotificationService.removeSubscription(notifResponse.current);
      limparPolling?.then((fn) => fn && fn());
    };
  }, []);

  /**
   * Desloga de verdade: limpa o AsyncStorage e manda para a tela de login.
   * Usado tanto quando a notificação SESSAO_ENCERRADA chega (app aberto)
   * quanto pelo polling de segurança (app em foreground sem push disponível).
   */
  const forcarLogoutPorOutraSessao = async () => {
    await AuthService.logout();
    setMostrarBanner(true);
    router.replace('/auth/login');
  };

  const inicializarNotificacoes = async () => {
    const isLogado = await AuthService.isLoggedIn();
    if (!isLogado) return;

    const user = await AuthService.getUser();
    if (!user) return;

    // Registra o dispositivo e salva o token no backend
    const pushToken = await NotificationService.registrar();
    if (pushToken && user.id) {
      await NotificationService.salvarTokenNoBackend(user.id, pushToken);
    }

    // Salva o sessionId desta sessão no backend
    const sessionId = await AuthService.getSessionId();
    if (sessionId && user.id) {
      await NotificationService.salvarSessaoNoBackend(user.id, sessionId);
    }

    // Listener: notificação recebida com app aberto
    notifReceived.current = NotificationService.addReceivedListener((notification) => {
      const data = notification.request.content.data as any;

      if (data?.tipo === 'SESSAO_ENCERRADA') {
        forcarLogoutPorOutraSessao();
      }
      // NOVO_PEDIDO (admin) e STATUS_PEDIDO (cliente) já aparecem
      // como notificação do sistema automaticamente; nada extra a fazer aqui
      // além de, opcionalmente, atualizar listas abertas — feito via refresh manual.
    });

    // Listener: usuário tocou na notificação (app em background/fechado)
    notifResponse.current = NotificationService.addResponseListener((response) => {
      const data = response.notification.request.content.data as any;

      if (data?.tipo === 'SESSAO_ENCERRADA') {
        forcarLogoutPorOutraSessao();
        return;
      }

      if (data?.tipo === 'NOVO_PEDIDO') {
        // Admin tocou na notificação de novo pedido → abre a lista de pedidos
        router.push('/(adm)/listOrders' as any);
        return;
      }

      if (data?.tipo === 'STATUS_PEDIDO') {
        // Cliente tocou na notificação de status → abre "Meus Pedidos"
        router.push('/(tabs)/Orders' as any);
        return;
      }
    });
  };

  /**
   * Verifica periodicamente (a cada 30s, só enquanto o app está em foreground)
   * se o sessionId local ainda é o ativo no backend. É uma camada extra de
   * segurança caso a notificação push não chegue por algum motivo
   * (sem internet no momento do push, app no Expo Go, etc).
   */
  const verificarSessaoUnica = async () => {
    const isLogado = await AuthService.isLoggedIn();
    if (!isLogado) return undefined;

    const user = await AuthService.getUser();
    const sessionIdLocal = await AuthService.getSessionId();
    if (!user || !sessionIdLocal) return undefined;

    const interval = setInterval(async () => {
      try {
        const response = await api.get(`/usuario/sessao/${user.id}`);
        const sessionIdRemoto = response.data?.sessionId;
        if (sessionIdRemoto && sessionIdRemoto !== sessionIdLocal) {
          clearInterval(interval);
          await forcarLogoutPorOutraSessao();
        }
      } catch {
        // Sem conexão ou endpoint indisponível → ignora silenciosamente nesta rodada
      }
    }, 30000);

    return () => clearInterval(interval);
  };

  return (
    <CartProvider>
      {mostrarBanner && (
        <SessaoEncerradaBanner onDismiss={() => setMostrarBanner(false)} />
      )}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </CartProvider>
  );
}
