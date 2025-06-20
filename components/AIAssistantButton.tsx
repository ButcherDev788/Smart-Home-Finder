import React, { useEffect, useRef } from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Easing,
  ViewStyle 
} from 'react-native';
import { MessageSquare } from 'lucide-react-native';
import { COLORS, SHADOWS } from '../constants/theme';
import { scale } from '../utils/scaling';

interface AIAssistantButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  size?: number;
  color?: string;
  pulseColor?: string;
}

const AIAssistantButton: React.FC<AIAssistantButtonProps> = ({
  onPress,
  style,
  size = 60,
  color = COLORS.accent.primary,
  pulseColor = 'rgba(14, 165, 233, 0.3)', // sky-500 with opacity
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.sin,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.sin,
          useNativeDriver: true,
        }),
      ])
    );
    
    pulse.start();
    
    return () => {
      pulse.stop();
    };
  }, [pulseAnim]);
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: scale(size),
          height: scale(size),
          borderRadius: scale(size / 2),
          backgroundColor: color,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.pulse,
          {
            width: scale(size),
            height: scale(size),
            borderRadius: scale(size / 2),
            backgroundColor: pulseColor,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />
      <MessageSquare size={scale(size / 2)} color={COLORS.text.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    zIndex: 10,
  },
  pulse: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default AIAssistantButton;