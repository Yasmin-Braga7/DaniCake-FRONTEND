/**
 * Serviço de Notificações Push
 *
 * Para funcionar em produção você precisa:
 * 1. Instalar: npx expo install expo-notifications expo-device
 * 2. Adicionar no app.json > "plugins": ["expo-notifications"]
 * 3. No backend: salvar o pushToken por usuário e chamar a API
 *    do Expo para enviar notificação quando um pedido for criado.
 */

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { api } from '../index';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const NotificationService = {
  async registrar(): Promise<string | null> {
    if (!Device.isDevice) {
      console.warn('Notificações só funcionam em dispositivos físicos.');
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Permissão de notificação negada.');
      return null;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('pedidos', {
        name: 'Novos Pedidos',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#C23B6B',
        sound: 'default',
      });
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    return tokenData.data;
  },

  async salvarTokenNoBackend(usuarioId: number, pushToken: string): Promise<void> {
    try {
      await api.patch(`/usuario/pushToken/${usuarioId}`, { pushToken });
    } catch (error) {
      console.warn('Backend sem suporte a pushToken ainda:', error);
    }
  },

  async salvarSessaoNoBackend(usuarioId: number, sessionId: string): Promise<void> {
    try {
      await api.patch(`/usuario/sessao/${usuarioId}`, { sessionId });
    } catch (error) {
      console.warn('Backend sem suporte a sessão única ainda:', error);
    }
  },

  addReceivedListener(callback: (n: Notifications.Notification) => void) {
    return Notifications.addNotificationReceivedListener(callback);
  },

  addResponseListener(callback: (r: Notifications.NotificationResponse) => void) {
    return Notifications.addNotificationResponseReceivedListener(callback);
  },

  removeSubscription(subscription: Notifications.EventSubscription) {
    subscription.remove();
  },
};
