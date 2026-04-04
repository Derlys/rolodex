import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, useThemeColor } from 'heroui-native'
import { Text, View } from 'react-native'

import { Container } from '@/components/container'
import { SignIn } from '@/components/sign-in'
import { SignUp } from '@/components/sign-up'
import { SolanaConnect } from '@/components/solana-connect'
import { SolanaSignInButton } from '@/components/solana-sign-in-button'
import { type AuthSession, authClient } from '@/lib/auth-client'
import { orpc, queryClient } from '@/utils/orpc'

export default function Home() {
  const { data: session } = authClient.useSession()
  const healthCheck = useQuery(orpc.healthCheck.queryOptions())

  return (
    <Container>
      <View className="flex w-full flex-col gap-6 p-6">
        <Text className="mb-2 text-center font-black text-4xl text-slate-950">
          ROLODEX
        </Text>
        <HomeUiStatus
          isConnected={healthCheck?.data === 'OK'}
          isLoading={healthCheck?.isLoading}
        />
        <SolanaConnect />
        {session ? <HomeUiSession session={session} /> : <HomeUiNoSession />}
      </View>
    </Container>
  )
}

function HomeUiStatus({
  isConnected,
  isLoading,
}: {
  isConnected: boolean
  isLoading: boolean
}) {
  const mutedColor = useThemeColor('muted')
  const successColor = useThemeColor('success')
  const dangerColor = useThemeColor('danger')

  return (
    <View className="rounded-2xl border-2 border-black bg-purple-300 p-4 shadow-[4px_4px_0_rgba(0,0,0,1)]">
      <View className="flex-row items-center">
        <View
          className={`mr-3 h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}
        />
        <View className="flex-1">
          <Text className="mb-1 font-black text-lg text-slate-950">
            ORPC BACKEND
          </Text>
          <Text className="font-semibold text-slate-800">
            {isLoading
              ? 'Checking connection...'
              : isConnected
                ? 'Connected to API'
                : 'API Disconnected'}
          </Text>
        </View>
        {isLoading && (
          <Ionicons name="hourglass-outline" size={20} color="#000000" />
        )}
        {!isLoading && isConnected && (
          <Ionicons name="checkmark-circle" size={20} color="#000000" />
        )}
        {!isLoading && !isConnected && (
          <Ionicons name="close-circle" size={20} color="#000000" />
        )}
      </View>
    </View>
  )
}

function HomeUiNoSession() {
  return (
    <View className="mb-6 rounded-2xl border-2 border-black bg-cyan-300 p-4 shadow-[4px_4px_0_rgba(0,0,0,1)]">
      <Text className="mb-3 font-black text-slate-950 text-xl">
        NO ACTIVE SESSION
      </Text>
      <View className="flex gap-6">
        <SolanaSignInButton />
        <View className="flex-row items-center gap-4">
          <View className="h-[1] flex-1 bg-black" />
          <Text className="font-bold text-slate-950 text-xs uppercase">
            Or continue with email
          </Text>
          <View className="h-[1] flex-1 bg-black" />
        </View>
        <SignIn />
        <SignUp />
      </View>
    </View>
  )
}

function HomeUiSession({ session }: { session: AuthSession }) {
  return (
    <View className="mb-6 rounded-2xl border-2 border-black bg-green-300 p-4 shadow-[4px_4px_0_rgba(0,0,0,1)]">
      <Text className="mb-3 font-black text-slate-950 text-xl">
        Welcome, <Text className="font-black">{session.user.name}</Text>
      </Text>
      <Text className="mb-4 font-semibold text-slate-800 text-sm">
        {session.user.email}
      </Text>
      <Button
        onPress={() => {
          authClient.signOut()
          void queryClient.invalidateQueries()
        }}
        className="rounded-xl border-2 border-black bg-red-500 shadow-[3px_3px_0_rgba(0,0,0,1)]"
      >
        <Text className="font-black text-white">SIGN OUT</Text>
      </Button>
    </View>
  )
}
