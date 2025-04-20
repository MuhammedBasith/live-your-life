import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Platform, Dimensions, Animated } from 'react-native';
import { useAppContext } from '@/context/AppContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTENT_WIDTH = Math.min(320, SCREEN_WIDTH - 40);

export default function Onboarding() {
  const { setUser } = useAppContext();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleContinue = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setUser({ name: name.trim() });
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.appName}>LiveYourLife</Text>
          
          <Text style={styles.description}>
            Track and visualize your journey through the year, one day at a time.
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>What's your name?</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (error) setError('');
              }}
              placeholder="Enter your name"
              placeholderTextColor="#666"
              autoCapitalize="words"
              {...(Platform.OS === 'web' ? { 
                autoFocus: false,
                onFocus: (e) => e.target.select()
              } : {})}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          
          <TouchableOpacity 
            style={[styles.button, !name.trim() && styles.buttonDisabled]} 
            onPress={handleContinue}
            disabled={!name.trim()}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: CONTENT_WIDTH,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#ccc',
    marginBottom: 5,
    fontFamily: 'DMSans_300Light',
    letterSpacing: 0.5,
  },
  appName: {
    fontSize: 36,
    color: 'white',
    fontFamily: 'DMSans_200ExtraLight',
    marginBottom: 30,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    fontFamily: 'DMSans_300Light',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'DMSans_400Regular',
  },
  input: {
    backgroundColor: '#111',
    color: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#333',
    fontFamily: 'DMSans_400Regular',
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
  },
  button: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
  },
});