import { CartProvider } from "@/src/context/CartContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Alert, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthService } from "@/src/services/storage";
import { NotificationService } from "@/src/services/notifications";
import { api } from "@/src/services";

/**
 * Banner de aviso de sessão encerrada em outro dispositivo.
 * Aparece no topo da tela quando detectamos que o sessionId
 * atual foi substituído por outro dispositivo.
 */
function SessaoEncerradaBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <View style={bannerStyles.container}>
      <Text style={bannerStyles.text}>
        ⚠️ Sua conta foi acessada em outro dispositivo. Você foi deslogado de lá.
      </Text>
      <TouchableOpacity onPress={onDismiss} style={bannerStyles.btn}>
        <Text style={bannerStyles.btnText}>OK</Text>
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

  useEffect(() => {
    inicializarNotificacoes();
    verificarSessaoUnica();
    return () => {
      if (notifReceived.current) NotificationService.removeSubscription(notifReceived.current);
      if (notifResponse.current) NotificationService.removeSubscription(notifResponse.current);
    };
  }, []);

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
      // Se receber notificação de sessão encerrada
      if (data?.tipo === 'SESSAO_ENCERRADA') {
        setMostrarBanner(true);
      }
    });

    // Listener: usuário tocou na notificação
    notifResponse.current = NotificationService.addResponseListener((response) => {
      const data = response.notification.request.content.data as any;
      if (data?.tipo === 'NOVO_PEDIDO') {
        // Navegar para a lista de pedidos do admin (tratado via deep link se necessário)
        console.log('Novo pedido recebido, id:', data?.pedidoId);
      }
    });
  };

  /**
   * Verifica periodicamente se o sessionId local ainda é o ativo no backend.
   * Se não for, significa que outro dispositivo fez login → exibe aviso.
   */
  const verificarSessaoUnica = async () => {
    const isLogado = await AuthService.isLoggedIn();
    if (!isLogado) return;

    const user = await AuthService.getUser();
    const sessionIdLocal = await AuthService.getSessionId();
    if (!user || !sessionIdLocal) return;

    // Verifica a cada 60 segundos
    const interval = setInterval(async () => {
      try {
        const response = await api.get(`/usuario/sessao/${user.id}`);
        const sessionIdRemoto = response.data?.sessionId;
        if (sessionIdRemoto && sessionIdRemoto !== sessionIdLocal) {
          // Outro dispositivo fez login
          setMostrarBanner(true);
          clearInterval(interval);
        }
      } catch {
        // Endpoint não existe ainda → ignora silenciosamente
      }
    }, 60000);

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
