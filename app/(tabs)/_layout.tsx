import { Menu } from "@/src/components/Menu";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
    tabBar={() => <Menu />}
      screenOptions={{
        headerShown: false,}}
    >
      <Tabs.Screen name="Home" options={{title: 'Inicior'}} />
      <Tabs.Screen name="Calendar" />
      <Tabs.Screen name="Cart" />
      <Tabs.Screen name="Orders" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
}