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
    name: 'WayLearn Latam',
    logoUrl: 'https://unavatar.io/twitter/waylearnlatam',
    link: 'https://x.com/waylearnlatam',
    description:
      'Comunidad educativa enfocada en Web3 y desarrollo en Latinoamérica.',
    bgColor: 'bg-blue-400',
  },
  {
    id: '2',
    name: 'Hispanasol',
    logoUrl: 'https://unavatar.io/twitter/hispanasol18060',
    link: 'https://x.com/hispanasol18060',
    description:
      'Espacio dedicado a empoderar a las mujeres en el ecosistema de Solana.',
    bgColor: 'bg-purple-300',
  },
  {
    id: '3',
    name: 'Jupiter Spanish',
    logoUrl: 'https://unavatar.io/twitter/JUPspanish',
    link: 'https://x.com/JUPspanish',
    description:
      'Comunidad oficial en español del agregador de swaps líder en Solana.',
    bgColor: 'bg-emerald-300',
  },
  {
    id: '4',
    name: 'Meteora ES',
    logoUrl: 'https://unavatar.io/twitter/MeteoraES',
    link: 'https://x.com/MeteoraES',
    description:
      'Capítulo en español de Meteora, enfocado en infraestructura de liquidez dinámica.',
    bgColor: 'bg-indigo-300',
  },
  {
    id: '5',
    name: 'Cultura Solana',
    logoUrl: 'https://unavatar.io/twitter/CulturaSolana',
    link: 'https://x.com/CulturaSolana',
    description:
      'Difusión de noticias, eventos y cultura general del ecosistema Solana en español.',
    bgColor: 'bg-slate-200',
  },
  {
    id: '6',
    name: 'La Familia',
    logoUrl: 'https://unavatar.io/twitter/LaFamilia_so',
    link: 'https://x.com/LaFamilia_so',
    description:
      'Comunidad vibrante de builders y entusiastas de Solana en la región.',
    bgColor: 'bg-red-300',
  },
  {
    id: '7',
    name: 'Casa Web3',
    logoUrl: 'https://unavatar.io/twitter/casaweb3_',
    link: 'https://x.com/casaweb3_',
    description:
      'Hub de aprendizaje y colaboración para la nueva generación de internet.',
    bgColor: 'bg-amber-200',
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
          <Text className="font-medium text-base text-white">Únete</Text>
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
