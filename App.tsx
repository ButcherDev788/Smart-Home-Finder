import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { COLORS } from './constants/theme';
import OnboardingScreen from './screens/OnboardingScreen';
import AuthScreen from './screens/AuthScreen';
import AppNavigator from './navigation';
import { Property } from './constants/mockData';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appState, setAppState] = useState<'onboarding' | 'auth' | 'app'>('onboarding');
  const [userType, setUserType] = useState<'buyer' | 'agent' | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  });
  
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }
    
    prepare();
  }, []);
  
  useEffect(() => {
    if (isReady && fontsLoaded) {
      // Hide splash screen
      SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded]);
  
  if (!isReady || !fontsLoaded) {
    return null;
  }
  
  const handleGetStarted = () => {
    setAppState('auth');
  };
  
  const handleLogin = () => {
    setAppState('app');
    setUserType('buyer'); // Default to buyer for demo
  };
  
  const handleBack = () => {
    if (appState === 'auth') {
      setAppState('onboarding');
    } else if (selectedProperty) {
      setSelectedProperty(null);
    }
  };
  
  const handlePropertyPress = (property: Property) => {
    setSelectedProperty(property);
  };
  
  const handleAIAssistantPress = () => {
    console.log('AI Assistant pressed');
  };
  
  const handleAddProperty = () => {
    console.log('Add property pressed');
  };
  
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={COLORS.background.dark} />
      
      {appState === 'onboarding' && (
        <OnboardingScreen onGetStarted={handleGetStarted} />
      )}
      
      {appState === 'auth' && (
        <AuthScreen onLogin={handleLogin} onBack={handleBack} />
      )}
      
      {appState === 'app' && (
        <AppNavigator
          userType={userType}
          onPropertyPress={handlePropertyPress}
          onAIAssistantPress={handleAIAssistantPress}
          onAddProperty={handleAddProperty}
          onBack={handleBack}
        />
      )}
    </SafeAreaProvider>
  );
}