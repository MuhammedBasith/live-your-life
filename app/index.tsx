import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import Onboarding from '@/components/Onboarding';

export default function Index() {
  const router = useRouter();
  const { user, isOnboarded } = useAppContext();

  useEffect(() => {
    // If user is already onboarded, redirect to main app
    if (isOnboarded) {
      router.replace('/(tabs)');
    }
  }, [isOnboarded, router]);

  return (
    <View style={styles.container}>
      {!isOnboarded && <Onboarding />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});