import { Tabs } from "expo-router";
import { AdminMenu } from "@/src/components/MenuAdmn"; // Certifique-se que o componente existe

export default function AdminLayout() {
  return (
    <Tabs
      tabBar={() => <AdminMenu />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* O 'name' deve bater com o caminho da pasta/arquivo */}
      <Tabs.Screen name="dashboard/index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="createProduct/index" options={{ title: 'Criar Produto' }} />
      <Tabs.Screen name="listOrders/index" options={{ title: 'Pedidos' }} />
    </Tabs>
  );
}