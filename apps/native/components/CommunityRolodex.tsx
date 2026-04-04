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
      className={`mb-6 rounded-2xl border-2 border-black p-6 shadow-[4px_4px_0_rgba(0,0,0,1)] ${community.bgColor}`}
    >
      {/* Header row with logo and name */}
      <View className="mb-4 flex-row items-center gap-4">
        <View className="h-14 w-14 items-center justify-center rounded-xl border border-black bg-white shadow-[2px_2px_0_rgba(0,0,0,1)]">
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
        <Text className="flex-1 font-black text-3xl text-slate-950">
          {community.name}
        </Text>
      </View>

      {/* Description */}
      {community.description && (
        <Text className="mb-6 font-semibold text-base text-slate-800 leading-relaxed">
          {community.description}
        </Text>
      )}

      {/* Visit Button - bottom right */}
      <View className="flex-row justify-end">
        <Button
          onPress={handleVisitPress}
          className="rounded-xl border-2 border-black bg-blue-500 px-6 py-2 shadow-[3px_3px_0_rgba(0,0,0,1)]"
        >
          <Text className="font-black text-base text-white">VISIT</Text>
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
        contentContainerClassName="pb-24"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + 80,
        }}
      >
        <View className="px-6 pt-10 pb-6">
          <Text className="mb-2 font-black text-3xl text-slate-950">
            Communities
          </Text>
          <Text className="font-bold text-lg text-slate-700">
            Discover amazing projects in the Solana ecosystem
          </Text>
        </View>

        <View className="px-6">
          {COMMUNITIES.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
