import { View } from 'react-native'

import { CommunityRolodex } from '@/components/CommunityRolodex'

export default function Home() {
  return (
    <View className="flex-1 bg-background">
      <CommunityRolodex />
    </View>
  )
}
