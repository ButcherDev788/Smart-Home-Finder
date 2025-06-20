import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { COLORS, SHADOWS } from '../constants/theme';
import { scale, moderateScale } from '../utils/scaling';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  gradient?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  gradient = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const getButtonStyles = (): ViewStyle => {
    let buttonStyle: ViewStyle = { ...styles.button };
    
    // Size variations
    if (size === 'small') {
      buttonStyle = { ...buttonStyle, ...styles.buttonSmall };
    } else if (size === 'large') {
      buttonStyle = { ...buttonStyle, ...styles.buttonLarge };
    }
    
    // Variant styles (if not using gradient)
    if (!gradient) {
      if (variant === 'primary') {
        buttonStyle = { ...buttonStyle, ...styles.buttonPrimary };
      } else if (variant === 'secondary') {
        buttonStyle = { ...buttonStyle, ...styles.buttonSecondary };
      } else if (variant === 'outline') {
        buttonStyle = { ...buttonStyle, ...styles.buttonOutline };
      } else if (variant === 'text') {
        buttonStyle = { ...buttonStyle, ...styles.buttonText };
      }
    }
    
    // Disabled state
    if (disabled) {
      buttonStyle = { ...buttonStyle, ...styles.buttonDisabled };
    }
    
    return buttonStyle;
  };
  
  const getTextStyles = (): TextStyle => {
    let textStyleObj: TextStyle = { ...styles.text };
    
    // Size variations
    if (size === 'small') {
      textStyleObj = { ...textStyleObj, ...styles.textSmall };
    } else if (size === 'large') {
      textStyleObj = { ...textStyleObj, ...styles.textLarge };
    }
    
    // Variant text styles
    if (variant === 'primary') {
      textStyleObj = { ...textStyleObj, ...styles.textPrimary };
    } else if (variant === 'secondary') {
      textStyleObj = { ...textStyleObj, ...styles.textSecondary };
    } else if (variant === 'outline') {
      textStyleObj = { ...textStyleObj, ...styles.textOutline };
    } else if (variant === 'text') {
      textStyleObj = { ...textStyleObj, ...styles.textText };
    }
    
    // Disabled state
    if (disabled) {
      textStyleObj = { ...textStyleObj, ...styles.textDisabled };
    }
    
    return textStyleObj;
  };
  
  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? COLORS.accent.primary : COLORS.text.primary} 
        />
      ) : (
        <React.Fragment>
          {icon && iconPosition === 'left' && icon}
          <Text style={[getTextStyles(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && icon}
        </React.Fragment>
      )}
    </>
  );
  
  if (gradient && !disabled) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled || loading}
        style={[getButtonStyles(), style]}
        {...props}
      >
        <LinearGradient
          colors={[COLORS.accent.blue, COLORS.accent.green]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyles(), style]}
      {...props}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(12),
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    ...SHADOWS.small,
  },
  buttonSmall: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
  },
  buttonLarge: {
    paddingVertical: scale(16),
    paddingHorizontal: scale(32),
    borderRadius: scale(16),
  },
  buttonPrimary: {
    backgroundColor: COLORS.accent.primary,
  },
  buttonSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.accent.primary,
  },
  buttonText: {
    backgroundColor: 'transparent',
    ...SHADOWS.small,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.5,
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    textAlign: 'center',
  },
  textSmall: {
    fontSize: moderateScale(14),
  },
  textLarge: {
    fontSize: moderateScale(18),
  },
  textPrimary: {
    color: COLORS.text.primary,
  },
  textSecondary: {
    color: COLORS.text.primary,
  },
  textOutline: {
    color: COLORS.accent.primary,
  },
  textText: {
    color: COLORS.accent.primary,
  },
  textDisabled: {
    color: COLORS.text.tertiary,
  },
  gradient: {
    flex: 1,
    borderRadius: scale(12),
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Button;