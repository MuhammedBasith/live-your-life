import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DotGrid from '@/components/DotGrid';
import DayCounter from '@/components/DayCounter';
import { useAppContext } from '@/context/AppContext';
import { useDaysPassed } from '@/hooks/useDaysPassed';

export default function HomeScreen() {
  const { user } = useAppContext();
  const { daysPassed, currentYear } = useDaysPassed();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <DayCounter daysPassed={daysPassed} currentYear={currentYear} />
        <DotGrid daysPassed={daysPassed} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});