import { Ionicons } from '@expo/vector-icons'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type PortfolioItem = {
  id: string
  symbol: string
  name: string
  price: string
  amount: string
  value: string
  icon: ImageSourcePropType
}

const assets: PortfolioItem[] = [
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    price: '$174.23',
    amount: '12.50 SOL',
    value: '$2,177.88',
    icon: {
      uri: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png',
    },
  },
  {
    id: 'jup',
    symbol: 'JUP',
    name: 'Jupiter',
    price: '$1.21',
    amount: '945.00 JUP',
    value: '$1,143.45',
    icon: {
      uri: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/HBZQx5M7bzfQ8y2v8gYgKQ8j5x5A5f7dzS5F6VfQXJ9M/logo.png',
    },
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    price: '$1.00',
    amount: '1,250.00 USDC',
    value: '$1,250.00',
    icon: {
      uri: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    },
  },
  {
    id: 'bonk',
    symbol: 'BONK',
    name: 'Bonk',
    price: '$0.000022',
    amount: '12,500,000 BONK',
    value: '$275.00',
    icon: {
      uri: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png',
    },
  },
]

const cardPalette = ['bg-purple-200', 'bg-green-200', 'bg-emerald-200'] as const

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'tokens' | 'liquidity'>('tokens')

  const totalValue = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(4846.33),
    [],
  )

  return (
    <View className="flex-1 bg-slate-50">
      <View style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center justify-between px-4 pt-2 pb-4">
          <Pressable
            accessibilityLabel="Settings"
            className="h-11 w-11 items-center justify-center rounded-xl border-2 border-black bg-white shadow-[3px_3px_0_rgba(0,0,0,1)]"
          >
            <Ionicons name="person" size={20} color="#111827" />
          </Pressable>

          <View className="flex-row gap-2">
            <HeaderIcon icon="time-outline" label="History" />
            <HeaderIcon
              icon="qr-code-outline"
              label={t('jupiter_home.swap_btn')}
            />
            <HeaderIcon icon="search-outline" label="Search" />
          </View>
        </View>
      </View>

      <View className="px-4">
        <View className="mb-4 rounded-2xl border-2 border-black bg-white p-4 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <Text className="font-bold text-slate-500 text-xs uppercase tracking-wide">
            {t('jupiter_home.balance_title')}
          </Text>
          <Text className="mt-1 font-black text-4xl text-slate-950">
            {totalValue}
          </Text>

          <View className="mt-3 flex-row gap-2">
            <View className="rounded-full border-2 border-black bg-green-300 px-3 py-1 shadow-[2px_2px_0_rgba(0,0,0,1)]">
              <Text className="font-black text-black text-xs">+$124.51</Text>
            </View>
            <View className="rounded-full border-2 border-black bg-emerald-200 px-3 py-1 shadow-[2px_2px_0_rgba(0,0,0,1)]">
              <Text className="font-black text-black text-xs">+2.64%</Text>
            </View>
          </View>
        </View>

        <View className="mb-4 flex-row rounded-xl border-2 border-black bg-white p-1 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <Pressable
            className={`flex-1 items-center rounded-lg px-2 py-2 ${
              activeTab === 'tokens' ? 'bg-[#C084FC]' : 'bg-white'
            }`}
            onPress={() => setActiveTab('tokens')}
          >
            <Text
              numberOfLines={1}
              className={`font-black text-sm ${
                activeTab === 'tokens' ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t('jupiter_home.tokens_tab')}
            </Text>
          </Pressable>
          <Pressable
            className={`flex-1 items-center rounded-lg px-2 py-2 ${
              activeTab === 'liquidity' ? 'bg-[#C084FC]' : 'bg-white'
            }`}
            onPress={() => setActiveTab('liquidity')}
          >
            <Text
              numberOfLines={1}
              className={`font-black text-sm ${
                activeTab === 'liquidity' ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t('jupiter_home.liquidity_tab')}
            </Text>
          </Pressable>
        </View>

        <View className="mb-4 flex-row items-center justify-between gap-2 rounded-xl border-2 border-black bg-white p-3 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <Text className="font-black text-slate-950 text-sm">
            {t('jupiter_home.positions')}
          </Text>
          <View className="ml-2 flex-row items-center gap-2">
            <Pressable className="rounded-lg border-2 border-black bg-purple-200 px-3 py-1 shadow-[2px_2px_0_rgba(0,0,0,1)]">
              <Text className="font-black text-slate-900 text-xs">
                {t('jupiter_home.view_details')}
              </Text>
            </Pressable>
            <Pressable className="rounded-lg border-2 border-black bg-green-200 px-3 py-1 shadow-[2px_2px_0_rgba(0,0,0,1)]">
              <Text className="font-black text-slate-900 text-xs">
                {t('jupiter_home.swap_btn')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 84,
        }}
        showsVerticalScrollIndicator={false}
      >
        {(activeTab === 'tokens' ? assets : assets.slice(0, 2)).map(
          (asset, index) => (
            <View
              key={asset.id}
              className={`mb-3 flex-row items-center rounded-2xl border-2 border-black p-4 shadow-[4px_4px_0_rgba(0,0,0,1)] ${
                cardPalette[index % cardPalette.length]
              }`}
            >
              <View className="mr-3 h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-slate-100">
                <Image source={asset.icon} className="h-8 w-8 rounded-full" />
              </View>

              <View className="flex-1">
                <Text className="font-black text-base text-slate-950">
                  {asset.name}
                </Text>
                <Text className="font-semibold text-slate-600 text-xs">
                  {asset.symbol} • {asset.price}
                </Text>
              </View>

              <View className="items-end">
                <Text className="font-black text-slate-950 text-sm">
                  {asset.amount}
                </Text>
                <Text className="font-black text-slate-700 text-sm">
                  {asset.value}
                </Text>
              </View>
            </View>
          ),
        )}
      </ScrollView>
    </View>
  )
}

function HeaderIcon({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap
  label: string
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      className="h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-white shadow-[2px_2px_0_rgba(0,0,0,1)]"
    >
      <Ionicons name={icon} size={18} color="#111827" />
    </Pressable>
  )
}
