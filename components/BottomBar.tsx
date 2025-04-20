import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import { Flower, Grid2x2 as Grid } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useDaysPassed } from '@/hooks/useDaysPassed';

export default function BottomBar({ state, navigation }: BottomTabBarProps) {
  const router = useRouter();
  const { activeTab, setActiveTab } = useAppContext();
  const { trialDaysLeft } = useDaysPassed();

  const handleTabPress = (tabName: string, index: number) => {
    const isFocused = state.index === index;

    if (isFocused) {
      return;
    }

    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  // Helper function to get the dot color based on active state
  const getDotColor = (index: number) => {
    return state.index === index ? 'white' : 'rgba(255, 255, 255, 0.4)';
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBarContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('settings', 1)}
        >
          <Flower size={20} color={getDotColor(1)} />
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{ translateX: state.index === 0 ? 0 : 44 }],
            },
          ]}
        />

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('index', 0)}
        >
          <Grid size={20} color={getDotColor(0)} />
        </TouchableOpacity>
      </View>

      <Text style={styles.trialText}>
        made with ❤️ by{' '}
        <Text
          style={styles.trialDays}
          onPress={() => Linking.openURL('https://basith.me')}
        >
          basith.
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBarContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 30,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 15,
    position: 'relative',
  },
  tabButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  slider: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: -1,
  },
  trialText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    fontVariant: ['tabular-nums'],
  },
  trialDays: {
    color: 'white',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
