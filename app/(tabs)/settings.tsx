import { StyleSheet, View, TouchableOpacity, Text, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, setUser, darkMode, setDarkMode, accentColor, setAccentColor } = useAppContext();
  const [name, setName] = useState(user?.name || '');

  const handleSave = () => {
    setUser({ name });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#666"
            placeholder="Enter your name"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#555', true: '#666' }}
            thumbColor={darkMode ? '#fff' : '#888'}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Accent Color</Text>
          <View style={styles.colorOptions}>
            <TouchableOpacity 
              style={[styles.colorOption, { backgroundColor: '#C8B6FF' }, 
                accentColor === 'lavender' && styles.selectedColor]} 
              onPress={() => setAccentColor('lavender')}
            />
            <TouchableOpacity 
              style={[styles.colorOption, { backgroundColor: '#B6E3FF' }, 
                accentColor === 'blue' && styles.selectedColor]} 
              onPress={() => setAccentColor('blue')}
            />
            <TouchableOpacity 
              style={[styles.colorOption, { backgroundColor: '#FFFFFF' }, 
                accentColor === 'white' && styles.selectedColor]} 
              onPress={() => setAccentColor('white')}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#111',
    color: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  colorOptions: {
    flexDirection: 'row',
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: 'white',
  },
  button: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});