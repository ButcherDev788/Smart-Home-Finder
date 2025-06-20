import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'react-native-linear-gradient';
import { COLORS } from '../constants/theme';
import { scale } from '../utils/scaling';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

interface LoadingShimmerProps {
  type: 'propertyCard' | 'propertyDetail' | 'text' | 'circle' | 'rectangle';
  style?: ViewStyle;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
}

const LoadingShimmer: React.FC<LoadingShimmerProps> = ({
  type,
  style,
  width,
  height,
  borderRadius,
}) => {
  const renderPropertyCardShimmer = () => (
    <View style={[styles.propertyCard, style]}>
      <ShimmerPlaceholder
        shimmerColors={[
          'rgba(255, 255, 255, 0.03)',
          'rgba(255, 255, 255, 0.08)',
          'rgba(255, 255, 255, 0.03)',
        ]}
        style={styles.propertyCardImage}
      />
      <View style={styles.propertyCardContent}>
        <ShimmerPlaceholder
          shimmerColors={[
            'rgba(255, 255, 255, 0.03)',
            'rgba(255, 255, 255, 0.08)',
            'rgba(255, 255, 255, 0.03)',
          ]}
          style={styles.propertyCardTitle}
        />
        <ShimmerPlaceholder
          shimmerColors={[
            'rgba(255, 255, 255, 0.03)',
            'rgba(255, 255, 255, 0.08)',
            'rgba(255, 255, 255, 0.03)',
          ]}
          style={styles.propertyCardLocation}
        />
        <View style={styles.propertyCardFeatures}>
          <ShimmerPlaceholder
            shimmerColors={[
              'rgba(255, 255, 255, 0.03)',
              'rgba(255, 255, 255, 0.08)',
              'rgba(255, 255, 255, 0.03)',
            ]}
            style={styles.propertyCardFeature}
          />
          <ShimmerPlaceholder
            shimmerColors={[
              'rgba(255, 255, 255, 0.03)',
              'rgba(255, 255, 255, 0.08)',
              'rgba(255, 255, 255, 0.03)',
            ]}
            style={styles.propertyCardFeature}
          />
          <ShimmerPlaceholder
            shimmerColors={[
              'rgba(255, 255, 255, 0.03)',
              'rgba(255, 255, 255, 0.08)',
              'rgba(255, 255, 255, 0.03)',
            ]}
            style={styles.propertyCardFeature}
          />
        </View>
      </View>
    </View>
  );

  const renderPropertyDetailShimmer = () => (
    <View style={[styles.propertyDetail, style]}>
      <ShimmerPlaceholder
        shimmerColors={[
          'rgba(255, 255, 255, 0.03)',
          'rgba(255, 255, 255, 0.08)',
          'rgba(255, 255, 255, 0.03)',
        ]}
        style={styles.propertyDetailImage}
      />
      <View style={styles.propertyDetailContent}>
        <ShimmerPlaceholder
          shimmerColors={[
            'rgba(255, 255, 255, 0.03)',
            'rgba(255, 255, 255, 0.08)',
            'rgba(255, 255, 255, 0.03)',
          ]}
          style={styles.propertyDetailTitle}
        />
        <ShimmerPlaceholder
          shimmerColors={[
            'rgba(255, 255, 255, 0.03)',
            'rgba(255, 255, 255, 0.08)',
            'rgba(255, 255, 255, 0.03)',
          ]}
          style={styles.propertyDetailLocation}
        />
        <View style={styles.propertyDetailFeatures}>
          <ShimmerPlaceholder
            shimmerColors={[
              'rgba(255, 255, 255, 0.03)',
              'rgba(255, 255, 255, 0.08)',
              'rgba(255, 255, 255, 0.03)',
            ]}
            style={styles.propertyDetailFeature}
          />
          <ShimmerPlaceholder
            shimmerColors={[
              'rgba(255, 255, 255, 0.03)',
              'rgba(255, 255, 255, 0.08)',
              'rgba(255, 255, 255, 0.03)',
            ]}
            style={styles.propertyDetailFeature}
          />
          <ShimmerPlaceholder
            shimmerColors={[
              'rgba(255, 255, 255, 0.03)',
              'rgba(255, 255, 255, 0.08)',
              'rgba(255, 255, 255, 0.03)',
            ]}
            style={styles.propertyDetailFeature}
          />
        </View>
        <ShimmerPlaceholder
          shimmerColors={[
            'rgba(255, 255, 255, 0.03)',
            'rgba(255, 255, 255, 0.08)',
            'rgba(255, 255, 255, 0.03)',
          ]}
          style={styles.propertyDetailDescription}
        />
        <ShimmerPlaceholder
          shimmerColors={[
            'rgba(255, 255, 255, 0.03)',
            'rgba(255, 255, 255, 0.08)',
            'rgba(255, 255, 255, 0.03)',
          ]}
          style={styles.propertyDetailDescription}
        />
      </View>
    </View>
  );

  const renderCustomShimmer = () => (
    <ShimmerPlaceholder
      shimmerColors={[
        'rgba(255, 255, 255, 0.03)',
        'rgba(255, 255, 255, 0.08)',
        'rgba(255, 255, 255, 0.03)',
      ]}
      style={[
        {
          width: width || '100%',
          height: height || scale(20),
          borderRadius: borderRadius || scale(4),
        },
        style,
      ]}
    />
  );

  switch (type) {
    case 'propertyCard':
      return renderPropertyCardShimmer();
    case 'propertyDetail':
      return renderPropertyDetailShimmer();
    case 'text':
    case 'circle':
    case 'rectangle':
      return renderCustomShimmer();
    default:
      return renderCustomShimmer();
  }
};

const styles = StyleSheet.create({
  propertyCard: {
    width: scale(280),
    height: scale(280),
    borderRadius: scale(16),
    backgroundColor: COLORS.card.dark,
    overflow: 'hidden',
    marginRight: scale(16),
  },
  propertyCardImage: {
    width: '100%',
    height: scale(180),
  },
  propertyCardContent: {
    padding: scale(12),
  },
  propertyCardTitle: {
    width: '80%',
    height: scale(20),
    borderRadius: scale(4),
    marginBottom: scale(8),
  },
  propertyCardLocation: {
    width: '60%',
    height: scale(16),
    borderRadius: scale(4),
    marginBottom: scale(12),
  },
  propertyCardFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propertyCardFeature: {
    width: scale(60),
    height: scale(16),
    borderRadius: scale(4),
  },
  propertyDetail: {
    width: '100%',
  },
  propertyDetailImage: {
    width: '100%',
    height: scale(250),
    marginBottom: scale(16),
  },
  propertyDetailContent: {
    padding: scale(16),
  },
  propertyDetailTitle: {
    width: '70%',
    height: scale(24),
    borderRadius: scale(4),
    marginBottom: scale(8),
  },
  propertyDetailLocation: {
    width: '50%',
    height: scale(18),
    borderRadius: scale(4),
    marginBottom: scale(16),
  },
  propertyDetailFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(16),
  },
  propertyDetailFeature: {
    width: '30%',
    height: scale(40),
    borderRadius: scale(8),
  },
  propertyDetailDescription: {
    width: '100%',
    height: scale(16),
    borderRadius: scale(4),
    marginBottom: scale(8),
  },
});

export default LoadingShimmer;