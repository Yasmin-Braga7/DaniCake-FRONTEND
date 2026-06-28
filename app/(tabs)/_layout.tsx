import { Menu } from "@/src/components/Menu";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => <Menu />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="Home/index" options={{ title: 'Inicior' }} />
      <Tabs.Screen name="Calendar/index" />
      <Tabs.Screen name="Cart/index" />
      <Tabs.Screen name="Orders/index" />
      <Tabs.Screen name="Profile/index" />
    </Tabs>
  );
}