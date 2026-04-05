import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3b82f6',
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          backgroundColor: 'white',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({ color }: { color: string; size: number }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="solana"
        options={{
          tabBarLabel: t('tabs.solana'),
          tabBarIcon: ({ color }: { color: string; size: number }) => (
            <MaterialCommunityIcons name="wallet" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          tabBarLabel: t('tabs.communities'),
          tabBarIcon: ({ color }: { color: string; size: number }) => (
            <Ionicons name="people" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          tabBarLabel: t('tabs.todos'),
          tabBarIcon: ({ color }: { color: string; size: number }) => (
            <Ionicons name="checkbox" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: t('tabs.explore'),
          tabBarIcon: ({ color }: { color: string; size: number }) => (
            <Ionicons name="compass" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
