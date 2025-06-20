import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import LottieView from 'lottie-react-native';
import { COLORS } from '../constants/theme';
import { scale, moderateScale } from '../utils/scaling';
import Button from '../components/Button';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onGetStarted }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background.dark} />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Zengo</Text>
        </View>
        
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/city-animation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Find your next home... smarter</Text>
          <Text style={styles.subtitle}>
            Discover your perfect property with our AI-powered real estate app
          </Text>
        </Animated.View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={onGetStarted}
            variant="primary"
            size="large"
            gradient
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.dark,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(24),
  },
  logoContainer: {
    position: 'absolute',
    top: height * 0.08,
    alignSelf: 'center',
  },
  logo: {
    fontSize: moderateScale(36),
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  animationContainer: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: scale(40),
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: scale(40),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: scale(16),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: COLORS.text.secondary,
    textAlign: 'center',
    paddingHorizontal: scale(20),
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: height * 0.08,
    alignItems: 'center',
  },
  button: {
    width: '80%',
  },
});

export default OnboardingScreen;