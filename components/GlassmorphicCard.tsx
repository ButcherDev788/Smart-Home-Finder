import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { GLASSMORPHISM } from '../constants/theme';

interface GlassmorphicCardProps extends ViewProps {
  intensity?: number;
  variant?: 'light' | 'medium' | 'dark';
  children: React.ReactNode;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  intensity = 50,
  variant = 'light',
  style,
  children,
  ...props
}) => {
  const glassMorphism = GLASSMORPHISM[variant];

  return (
    <View
      style={[
        styles.container,
        glassMorphism,
        style,
      ]}
      {...props}
    >
      <BlurView intensity={intensity} style={styles.blurView} tint="dark">
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  blurView: {
    width: '100%',
    height: '100%',
  },
});

export default GlassmorphicCard;