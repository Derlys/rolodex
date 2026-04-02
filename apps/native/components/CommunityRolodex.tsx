import { Button } from 'heroui-native'
import { useCallback } from 'react'
import { Image, Linking, Text, View } from 'react-native'
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
}

function CommunityCard({ community }: CommunityCardProps) {
  const handleVisitPress = useCallback(async () => {
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
    <View className="mb-6 rounded-[40px] border border-slate-100 bg-white p-6 shadow-slate-300 shadow-xl">
      {/* Header row with logo and name */}
      <View className="mb-4 flex-row items-center gap-4">
        <View className="h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 shadow-lg">
          <Image
            source={{ uri: community.logoUrl }}
            style={{
              width: 28,
              height: 28,
              resizeMode: 'contain',
            }}
            defaultSource={require('@/assets/images/icon.png')}
          />
        </View>
        <Text className="flex-1 font-bold text-slate-900 text-xl">
          {community.name}
        </Text>
      </View>

      {/* Description */}
      {community.description && (
        <Text className="mb-6 text-base text-slate-600 leading-relaxed">
          {community.description}
        </Text>
      )}

      {/* Visit Button - bottom right */}
      <View className="flex-row justify-end">
        <Button
          onPress={handleVisitPress}
          className="rounded-xl bg-indigo-600 px-6 py-2 shadow-lg"
        >
          <Text className="font-semibold text-base text-white">Visit</Text>
        </Button>
      </View>
    </View>
  )
}

export function CommunityRolodex() {
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-slate-50 pt-10">
      <View className="px-6 pb-6">
        <Text className="mb-2 font-black text-3xl text-slate-900">
          Communities
        </Text>
        <Text className="text-lg text-slate-600">
          Discover amazing projects in the Solana ecosystem
        </Text>
      </View>

      <View className="px-6">
        {COMMUNITIES.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </View>

      {/* Bottom spacing for safe area */}
      <View style={{ height: insets.bottom + 20 }} />
    </View>
  )
}
