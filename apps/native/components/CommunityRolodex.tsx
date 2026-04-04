import { Button } from 'heroui-native'
import { useCallback } from 'react'
import { Image, Linking, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Community {
  id: string
  name: string
  logoUrl: string
  link: string
  description?: string
  bgColor: string // Add vibrant background color
}

const COMMUNITIES: Community[] = [
  {
    id: '1',
    name: 'Solana Foundation',
    logoUrl: 'https://solana.com/favicon.png',
    link: 'https://solana.com',
    description: 'Official Solana Foundation',
    bgColor: 'bg-lime-300',
  },
  {
    id: '2',
    name: 'Magic Eden',
    logoUrl: 'https://magiceden.io/static/favicon/favicon-32x32.png',
    link: 'https://magiceden.io',
    description: 'Leading NFT marketplace on Solana',
    bgColor: 'bg-yellow-400',
  },
  {
    id: '3',
    name: 'Raydium',
    logoUrl: 'https://raydium.io/favicon-32x32.png',
    link: 'https://raydium.io',
    description: 'Automated Market Maker on Solana',
    bgColor: 'bg-pink-300',
  },
  {
    id: '4',
    name: 'Marinade Finance',
    logoUrl: 'https://www.marinade.finance/favicon.ico',
    link: 'https://www.marinade.finance',
    description: 'Liquid staking for Solana',
    bgColor: 'bg-cyan-300',
  },
  {
    id: '5',
    name: 'Phantom Wallet',
    logoUrl: 'https://phantom.app/favicon.png',
    link: 'https://phantom.app',
    description: 'Popular Web3 wallet',
    bgColor: 'bg-orange-300',
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
    <View
      className={`mb-6 rounded-2xl border-2 border-black p-5 shadow-md ${community.bgColor}`}
    >
      {/* Header row with logo and name */}
      <View className="mb-4 flex-row items-center gap-4">
        <View className="h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
          <Image
            source={{ uri: community.logoUrl }}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
            }}
            defaultSource={require('@/assets/images/icon.png')}
          />
        </View>
        <Text className="flex-1 font-bold text-2xl text-slate-900">
          {community.name}
        </Text>
      </View>

      {/* Description */}
      {community.description && (
        <Text className="mb-5 font-medium text-base text-slate-700 leading-relaxed">
          {community.description}
        </Text>
      )}

      {/* Visit Button - bottom right */}
      <View className="flex-row justify-end">
        <Button
          onPress={handleVisitPress}
          className="rounded-xl border-2 border-black bg-blue-500 px-5 py-2 shadow-sm"
        >
          <Text className="font-medium text-base text-white">Visit</Text>
        </Button>
      </View>
    </View>
  )
}

export function CommunityRolodex() {
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerClassName="pb-20"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + 80,
        }}
      >
        <View className="px-6 pt-10 pb-6">
          <Text className="mb-2 font-bold text-2xl text-slate-900">
            Communities
          </Text>
          <Text className="font-medium text-lg text-slate-600">
            Discover amazing projects in the Solana ecosystem
          </Text>
        </View>

        <View className="px-3">
          {COMMUNITIES.map((community) => (
            <View key={community.id} className="w-[94%] self-center">
              <CommunityCard community={community} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
