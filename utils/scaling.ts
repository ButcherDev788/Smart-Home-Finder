import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base dimensions for scaling (based on standard iPhone 11)
const baseWidth = 375;
const baseHeight = 812;

// Scaling functions
export const scale = (size: number) => (width / baseWidth) * size;
export const verticalScale = (size: number) => (height / baseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

// Responsive font sizes
export const FONT_SIZES = {
  xs: moderateScale(10),
  sm: moderateScale(12),
  md: moderateScale(14),
  lg: moderateScale(16),
  xl: moderateScale(18),
  xxl: moderateScale(20),
  xxxl: moderateScale(24),
  title: moderateScale(28),
  heading: moderateScale(32),
};

// Device dimensions
export const WINDOW_WIDTH = width;
export const WINDOW_HEIGHT = height;

// Responsive spacing
export const SPACING = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(40),
};

// Screen padding
export const SCREEN_PADDING = {
  horizontal: scale(16),
  vertical: verticalScale(16),
};

// Card dimensions
export const CARD_WIDTH = width * 0.85;
export const SMALL_CARD_WIDTH = width * 0.4;