import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabLayout() {
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0', // border-slate-200
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 0,
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarActiveTintColor: '#A3E635', // Lime
        tabBarInactiveTintColor: '#94a3b8', // slate-400
        tabBarItemStyle: {
          flex: 1,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: -4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="solana"
        options={{
          tabBarLabel: 'Solana',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="wallet" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Communities',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="people" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          tabBarLabel: 'Todos',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="checkbox" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="compass" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
