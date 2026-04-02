import { Card } from 'heroui-native'
import { useCallback } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Pressable,
  Text,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Community {
  id: string
  name: string
  logoUrl: string
  link: string
  description?: string
}

const COMMUNITIES: Community[] = [
  {
    id: '1',
    name: 'Solana Foundation',
    logoUrl: 'https://solana.com/favicon.png',
    link: 'https://solana.com',
    description: 'Official Solana Foundation',
  },
  {
    id: '2',
    name: 'Magic Eden',
    logoUrl: 'https://magiceden.io/static/favicon/favicon-32x32.png',
    link: 'https://magiceden.io',
    description: 'Leading NFT marketplace on Solana',
  },
  {
    id: '3',
    name: 'Raydium',
    logoUrl: 'https://raydium.io/favicon-32x32.png',
    link: 'https://raydium.io',
    description: 'Automated Market Maker on Solana',
  },
  {
    id: '4',
    name: 'Marinade Finance',
    logoUrl: 'https://www.marinade.finance/favicon.ico',
    link: 'https://www.marinade.finance',
    description: 'Liquid staking for Solana',
  },
  {
    id: '5',
    name: 'Phantom Wallet',
    logoUrl: 'https://phantom.app/favicon.png',
    link: 'https://phantom.app',
    description: 'Popular Web3 wallet',
  },
]

interface CommunityCardProps {
  community: Community
  index: number
}

function CommunityCard({ community, index }: CommunityCardProps) {
  const handlePress = useCallback(async () => {
    try {
      const canOpen = await Linking.canOpenURL(community.link)
      if (canOpen) {
        await Linking.openURL(community.link)
      }
    } catch (error) {
      console.error('Failed to open link:', error)
    }
  }, [community.link])

  return (
    <Pressable onPress={handlePress} className="mx-6 mb-4 active:opacity-70">
      <Card className="overflow-hidden border-0 shadow-lg">
        <Card.Body className="flex-row gap-4 bg-gradient-to-r from-slate-50 to-slate-100 p-6 dark:from-slate-900 dark:to-slate-800">
          {/* Logo */}
          <View className="h-16 w-16 items-center justify-center rounded-lg bg-white shadow-md dark:bg-slate-700">
            <Image
              source={{ uri: community.logoUrl }}
              style={{
                width: 40,
                height: 40,
                resizeMode: 'contain',
              }}
              defaultSource={require('@/assets/images/icon.png')}
            />
          </View>

          {/* Content */}
          <View className="flex-1 justify-center">
            <Text className="font-bold text-lg text-slate-900 dark:text-white">
              {community.name}
            </Text>
            {community.description && (
              <Text className="mt-1 text-slate-600 text-sm dark:text-slate-300">
                {community.description}
              </Text>
            )}
          </View>

          {/* Arrow indicator */}
          <View className="justify-center">
            <Text className="text-slate-400 text-xl dark:text-slate-500">
              →
            </Text>
          </View>
        </Card.Body>
      </Card>
    </Pressable>
  )
}

export function CommunityRolodex() {
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1">
      <View className="px-6 pt-6 pb-2">
        <Text className="font-bold text-2xl text-slate-900 dark:text-white">
          Community
        </Text>
        <Text className="mt-1 text-slate-600 text-sm dark:text-slate-400">
          Explore projects in the Solana ecosystem
        </Text>
      </View>

      <FlatList
        data={COMMUNITIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CommunityCard community={item} index={index} />
        )}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 16,
        }}
        bounces={true}
      />
    </View>
  )
}
