import { Ionicons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import {
  Button,
  Input,
  Spinner,
  Surface,
  TextField,
  useThemeColor,
} from 'heroui-native'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { Container } from '@/components/container'
import { orpc } from '@/utils/orpc'

export default function SolanaScreen() {
  const [address, setAddress] = useState(
    'SEekKY1iUoWYJqZ3d9QBsfJytNx5RLBjBmgznkGrqbH',
  )

  const balanceMutation = useMutation({
    ...orpc.solana.getBalance.mutationOptions(),
  })

  const mutedColor = useThemeColor('muted')
  const dangerColor = useThemeColor('danger')
  const foregroundColor = useThemeColor('foreground')

  const handleCheckBalance = () => {
    if (address.trim()) {
      balanceMutation.mutate({ address })
    }
  }

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <View className="mb-4 py-4">
          <View className="flex-row items-center gap-2">
            <Ionicons name="wallet-outline" size={24} color="#000000" />
            <Text className="font-black text-3xl text-slate-950 tracking-tight">
              SOLANA BALANCE
            </Text>
          </View>
          <Text className="mt-1 font-semibold text-slate-700 text-sm">
            Check the balance of any Solana address
          </Text>
        </View>

        <View className="mb-6 rounded-2xl border-2 border-black bg-orange-300 p-4 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <Text className="mb-2 font-black text-slate-950 text-sm">
            WALLET ADDRESS
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <TextField>
                <Input
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter Solana address..."
                  editable={!balanceMutation.isPending}
                  onSubmitEditing={handleCheckBalance}
                  returnKeyType="search"
                />
              </TextField>
            </View>
            <Button
              isIconOnly
              className={`rounded-xl border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] ${
                balanceMutation.isPending || !address.trim()
                  ? 'bg-gray-400'
                  : 'bg-blue-500'
              }`}
              isDisabled={balanceMutation.isPending || !address.trim()}
              onPress={handleCheckBalance}
              size="sm"
            >
              {balanceMutation.isPending ? (
                <Spinner size="sm" color="default" />
              ) : (
                <Ionicons name="search" size={20} color="#ffffff" />
              )}
            </Button>
          </View>
        </View>

        <View className="rounded-2xl border-2 border-black bg-pink-300 p-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          {balanceMutation.isIdle ? (
            <View className="items-center py-6">
              <Ionicons
                name="information-circle-outline"
                size={32}
                color="#000000"
              />
              <Text className="mt-3 text-center font-semibold text-slate-800 text-sm italic">
                Enter an address and click search to check the balance
              </Text>
            </View>
          ) : balanceMutation.isPending ? (
            <View className="items-center py-6">
              <Spinner size="lg" />
              <Text className="mt-3 font-semibold text-slate-800 text-sm">
                Fetching balance...
              </Text>
            </View>
          ) : balanceMutation.isError ? (
            <View className="items-center py-6">
              <Ionicons name="alert-circle-outline" size={32} color="#000000" />
              <Text className="mt-2 text-center font-semibold text-red-600 text-sm">
                Error: {balanceMutation.error.message}
              </Text>
            </View>
          ) : (
            <View>
              <Text className="font-black text-slate-950 text-sm">
                CURRENT BALANCE
              </Text>
              <View className="mt-2 flex-row items-baseline gap-2">
                <Text className="font-black text-4xl text-slate-950">
                  {balanceMutation.data?.value !== undefined
                    ? (
                        Number(balanceMutation.data.value) / 1_000_000_000
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 9,
                      })
                    : '0.000000000'}
                </Text>
                <Text className="font-black text-slate-950 text-xl">SOL</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  )
}
