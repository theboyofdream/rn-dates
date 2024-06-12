import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { useTheme } from '@/themes/useTheme';


export default function HomeScreen() {
  const { background } = useTheme().colors

  return (
    <View style={{ flex: 1, gap: 8, alignItems: 'center', backgroundColor: background }}>

      <View>


      </View>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 24 }}>
          Quickly add calendar/date picker to your React Native app
        </Text>
        <Text style={{ fontSize: 14 }}>
          Copy, paste and redesign the look & feel. My logic, your design.
        </Text>
      </View>
    </View>
  );
}
