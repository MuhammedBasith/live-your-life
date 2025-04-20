import { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Animated } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COUNTER_WIDTH = Math.min(280, SCREEN_WIDTH - 80);

interface DayCounterProps {
  daysPassed: number;
  currentYear: number;
}

export default function DayCounter({ daysPassed, currentYear }: DayCounterProps) {
  const showRemaining = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;
  
  const daysRemaining = 365 - daysPassed;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.spring(showRemaining, {
        toValue: showRemaining._value === 0 ? 1 : 0,
        useNativeDriver: true,
      }).start();
    }, 5000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => clearInterval(interval);
  }, []);

  const animatedTextStyle = {
    opacity: showRemaining.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
    transform: [{
      translateY: showRemaining.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20],
      }),
    }],
  };

  const animatedRemainingStyle = {
    opacity: showRemaining.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [{
      translateY: showRemaining.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
      }),
    }],
  };

  const glowStyle = {
    shadowOpacity: glow.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
    }),
    shadowRadius: glow.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20],
    }),
  };

  return (
    <TouchableOpacity 
      onPress={() => {
        Animated.spring(showRemaining, {
          toValue: showRemaining._value === 0 ? 1 : 0,
          useNativeDriver: true,
        }).start();
      }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Animated.View style={[styles.countContainer, glowStyle]}>
          <Animated.Text style={[styles.dayCount, animatedTextStyle]}>
            {daysPassed}
          </Animated.Text>
          <Animated.Text style={[styles.dayCount, styles.remainingCount, animatedRemainingStyle]}>
            {daysRemaining}
          </Animated.Text>
        </Animated.View>
        <Animated.Text style={[styles.daysPassed, animatedTextStyle]}>
          days passed in {currentYear}
        </Animated.Text>
        <Animated.Text style={[styles.daysPassed, animatedRemainingStyle, styles.absoluteText]}>
          days remaining in {currentYear}
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 60,
    width: COUNTER_WIDTH,
  },
  header: {
    alignItems: 'center',
    width: '100%',
  },
  countContainer: {
    marginBottom: 5,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
  },
  dayCount: {
    fontSize: 64,
    fontFamily: 'DMSans_200ExtraLight',
    color: 'white',
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  remainingCount: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  daysPassed: {
    fontSize: 16,
    fontFamily: 'DMSans_300Light',
    color: '#999',
    fontVariant: ['tabular-nums'],
    letterSpacing: 0.5,
  },
  absoluteText: {
    position: 'absolute',
    bottom: 0,
  },
});