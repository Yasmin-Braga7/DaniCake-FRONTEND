/**
 * Serviço de Notificações Push
 *
 * IMPORTANTE: A partir do Expo SDK 53, o módulo `expo-notifications`
 * registra automaticamente um listener nativo assim que é importado
 * (mesmo sem chamar nenhuma função dele). Esse listener quebra dentro
 * do app Expo Go, porque a Google removeu push remoto de lá.
 *
 * Por isso, este arquivo NÃO importa `expo-notifications` de forma
 * estática no topo do arquivo. Em vez disso, ele só é carregado via
 * `require()` dinâmico, e somente quando NÃO estamos no Expo Go.
 *
 * Para testar push de verdade, rode um development build:
 *   npx expo run:android
 * ou
 *   eas build --profile development --platform android
 */

import * as Device from 'expo-device';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';
import { api } from '../index';

// true quando rodando dentro do app "Expo Go" (não é development build nem produção)
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

// Tipagem mínima, sem depender do import estático do módulo
type NotificationsModule = typeof import('expo-notifications');

let NotificationsLib: NotificationsModule | null = null;

/**
 * Carrega o módulo expo-notifications sob demanda (lazy require).
 * Retorna null se estivermos no Expo Go, sem nunca importar o módulo nesse caso.
 */
function getNotificationsLib(): NotificationsModule | null {
  if (isExpoGo) return null;

  if (!NotificationsLib) {
    // require() dinâmico: só executa (e só registra os listeners nativos)
    // quando esta linha realmente roda — ou seja, fora do Expo Go.
    NotificationsLib = require('expo-notifications') as NotificationsModule;

    NotificationsLib.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }

  return NotificationsLib;
}

export const NotificationService = {
  /**
   * Indica se as notificações push estão disponíveis neste ambiente.
   */
  isDisponivel(): boolean {
    return !isExpoGo && Device.isDevice;
  },

  async registrar(): Promise<string | null> {
    if (isExpoGo) {
      console.log(
        'ℹ️ Notificações push desativadas: rodando no Expo Go. ' +
        'Use um development build para testar push de verdade.'
      );
      return null;
    }

    if (!Device.isDevice) {
      console.warn('Notificações só funcionam em dispositivos físicos.');
      return null;
    }

    const Notifications = getNotificationsLib();
    if (!Notifications) return null;

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

    try {
      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      const tokenData = await Notifications.getExpoPushTokenAsync(
        projectId ? { projectId } : undefined
      );
      return tokenData.data;
    } catch (error) {
      console.warn('Erro ao obter push token:', error);
      return null;
    }
  },

  async salvarTokenNoBackend(usuarioId: number, pushToken: string): Promise<void> {
    if (isExpoGo) return;
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

  addReceivedListener(callback: (n: any) => void) {
    if (isExpoGo) return null;
    const Notifications = getNotificationsLib();
    if (!Notifications) return null;
    return Notifications.addNotificationReceivedListener(callback);
  },

  addResponseListener(callback: (r: any) => void) {
    if (isExpoGo) return null;
    const Notifications = getNotificationsLib();
    if (!Notifications) return null;
    return Notifications.addNotificationResponseReceivedListener(callback);
  },

  removeSubscription(subscription: any) {
    if (!subscription) return;
    subscription.remove();
  },
};
