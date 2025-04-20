import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { useAppContext } from '@/context/AppContext';

interface DotGridProps {
  daysPassed: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_PADDING = 40;
const MAX_WIDTH = Math.min(200, SCREEN_WIDTH - GRID_PADDING * 2);
const DOT_SIZE = 7;
const DOT_MARGIN = 6;

export default function DotGrid({ daysPassed }: DotGridProps) {
  const { accentColor } = useAppContext();
  const [dots, setDots] = useState<JSX.Element[]>([]);
  const opacity = useRef(new Animated.Value(0)).current;

  const getDotColor = (isPassed: boolean) => {
    if (!isPassed) return 'rgba(255, 255, 255, 0.4)';
    
    switch (accentColor) {
      case 'lavender':
        return '#C8B6FF';
      case 'blue':
        return '#B6E3FF';
      default:
        return 'rgba(255, 255, 255, 0.9)';
    }
  };
  
  useEffect(() => {
    const totalDots = 365;
    
    const newDots = Array.from({ length: totalDots }).map((_, index) => {
      const isPassed = index < daysPassed;
      const scale = new Animated.Value(1);
      
      const handlePress = () => {
        Animated.sequence([
          Animated.spring(scale, {
            toValue: 1.5,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();
      };
      
      return (
        <TouchableOpacity 
          key={`dot-${index}`}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Animated.View 
            style={[
              styles.dot,
              {
                transform: [{ scale }],
              }
            ]}
          >
            <View
              style={[
                styles.innerDot,
                {
                  backgroundColor: getDotColor(isPassed),
                  opacity: isPassed ? 1 : 0.3,
                }
              ]}
            />
          </Animated.View>
        </TouchableOpacity>
      );
    });
    
    setDots(newDots);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [daysPassed, accentColor]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.grid}>
        {dots}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: MAX_WIDTH,
    gap: DOT_MARGIN,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {
    width: '100%',
    height: '100%',
    borderRadius: DOT_SIZE / 2,
  },
});