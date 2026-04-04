import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { useThemeColor } from 'heroui-native'
import { useCallback } from 'react'
import { Pressable, Text } from 'react-native'

import { ThemeToggle } from '@/components/theme-toggle'

function DrawerLayout() {
  const themeColorForeground = useThemeColor('foreground')
  const themeColorBackground = useThemeColor('background')

  const renderThemeToggle = useCallback(() => <ThemeToggle />, [])

  return (
    <Drawer
      screenOptions={{
        headerTintColor: '#000000',
        headerStyle: {
          backgroundColor: '#ffffff',
          shadowColor: '#000000',
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          fontWeight: '900',
          fontSize: 24,
          color: '#000000',
        },
        headerRight: renderThemeToggle,
        drawerStyle: {
          backgroundColor: '#f8f9fa',
          borderRightWidth: 2,
          borderRightColor: '#000000',
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'HOME',
          drawerLabel: ({ color, focused }) => (
            <Text
              style={{
                color: focused ? '#000000' : '#333333',
                fontWeight: '900',
                fontSize: 18,
                textTransform: 'uppercase',
              }}
            >
              Home
            </Text>
          ),
          drawerIcon: ({ size, color, focused }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={focused ? '#000000' : '#333333'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="(communities)"
        options={{
          headerTitle: 'COMMUNITIES',
          drawerLabel: ({ color, focused }) => (
            <Text
              style={{
                color: focused ? '#000000' : '#333333',
                fontWeight: '900',
                fontSize: 18,
                textTransform: 'uppercase',
              }}
            >
              Communities
            </Text>
          ),
          drawerIcon: ({ size, color, focused }) => (
            <Ionicons
              name="people"
              size={size}
              color={focused ? '#000000' : '#333333'}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable className="mr-4 rounded-xl border-2 border-black bg-red-500 p-2 shadow-[3px_3px_0_rgba(0,0,0,1)]">
                <Ionicons name="add-outline" size={20} color="#ffffff" />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="todos"
        options={{
          headerTitle: 'TODOS',
          drawerLabel: ({ color, focused }) => (
            <Text
              style={{
                color: focused ? '#000000' : '#333333',
                fontWeight: '900',
                fontSize: 18,
                textTransform: 'uppercase',
              }}
            >
              Todos
            </Text>
          ),
          drawerIcon: ({ size, color, focused }) => (
            <Ionicons
              name="checkbox-outline"
              size={size}
              color={focused ? '#000000' : '#333333'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="solana"
        options={{
          headerTitle: 'SOLANA',
          drawerLabel: ({ color, focused }) => (
            <Text
              style={{
                color: focused ? '#000000' : '#333333',
                fontWeight: '900',
                fontSize: 18,
                textTransform: 'uppercase',
              }}
            >
              Solana
            </Text>
          ),
          drawerIcon: ({ size, color, focused }) => (
            <Ionicons
              name="wallet-outline"
              size={size}
              color={focused ? '#000000' : '#333333'}
            />
          ),
        }}
      />
    </Drawer>
  )
}

export default DrawerLayout
