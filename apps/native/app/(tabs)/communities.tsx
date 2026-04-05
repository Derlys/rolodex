import { SafeAreaView } from 'react-native-safe-area-context'
import { CommunityRolodex } from '../../components/CommunityRolodex'

export default function CommunitiesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <CommunityRolodex />
    </SafeAreaView>
  )
}
