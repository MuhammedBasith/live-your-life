import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
};

type AppContextType = {
  user: User | null;
  setUser: (user: User) => void;
  isOnboarded: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('index');
  const [darkMode, setDarkModeState] = useState<boolean>(true);
  const [accentColor, setAccentColorState] = useState<string>('white');

  // Load user data from storage
  useEffect(() => {
    async function loadUserData() {
      try {
        const userData = await AsyncStorage.getItem('@user_data');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUserState(parsedUser);
          setIsOnboarded(true);
        }
        
        // Load settings
        const darkModeValue = await AsyncStorage.getItem('@dark_mode');
        if (darkModeValue !== null) {
          setDarkModeState(darkModeValue === 'true');
        }
        
        const accentColorValue = await AsyncStorage.getItem('@accent_color');
        if (accentColorValue) {
          setAccentColorState(accentColorValue);
        }
      } catch (e) {
        console.error('Failed to load user data:', e);
      }
    }

    loadUserData();
  }, []);

  // Save user data to storage
  const setUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
      setUserState(userData);
      setIsOnboarded(true);
    } catch (e) {
      console.error('Failed to save user data:', e);
    }
  };

  // Save dark mode setting
  const setDarkMode = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('@dark_mode', value.toString());
      setDarkModeState(value);
    } catch (e) {
      console.error('Failed to save dark mode setting:', e);
    }
  };

  // Save accent color setting
  const setAccentColor = async (color: string) => {
    try {
      await AsyncStorage.setItem('@accent_color', color);
      setAccentColorState(color);
    } catch (e) {
      console.error('Failed to save accent color setting:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isOnboarded,
        activeTab,
        setActiveTab,
        darkMode,
        setDarkMode,
        accentColor,
        setAccentColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}