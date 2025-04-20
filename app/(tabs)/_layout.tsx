import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Flower, Grid2x2 as Grid } from 'lucide-react-native';
import BottomBar from '@/components/BottomBar';
import { useAppContext } from '@/context/AppContext';

export default function TabLayout() {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }
      }}
      tabBar={props => <BottomBar {...props} />}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Grid size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Flower size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});