import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ViewStyle,
  Dimensions
} from 'react-native';
import { Heart, Bed, Bath, SquareFoot } from 'lucide-react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { COLORS, SHADOWS } from '../constants/theme';
import { scale, moderateScale } from '../utils/scaling';
import { Property } from '../constants/mockData';

interface PropertyCardProps {
  property: Property;
  onPress: (property: Property) => void;
  style?: ViewStyle;
  isFavorite?: boolean;
  onToggleFavorite?: (property: Property) => void;
  variant?: 'default' | 'horizontal' | 'featured';
}

const { width } = Dimensions.get('window');

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
  style,
  isFavorite = false,
  onToggleFavorite,
  variant = 'default',
}) => {
  const getCardWidth = () => {
    switch (variant) {
      case 'featured':
        return { width: width * 0.85 };
      case 'horizontal':
        return { width: '100%' };
      default:
        return { width: width * 0.7 };
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getCardWidth(),
        variant === 'horizontal' && styles.horizontalContainer,
        style,
      ]}
      onPress={() => onPress(property)}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: property.images[0] }}
          style={[
            styles.image,
            variant === 'horizontal' && styles.horizontalImage,
          ]}
          resizeMode="cover"
        />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        
        {property.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
        
        {onToggleFavorite && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => onToggleFavorite(property)}
          >
            <Heart
              size={20}
              color={isFavorite ? '#FF5A5F' : COLORS.text.primary}
              fill={isFavorite ? '#FF5A5F' : 'transparent'}
            />
          </TouchableOpacity>
        )}
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(property.price)}</Text>
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {property.title}
        </Text>
        
        <Text style={styles.location} numberOfLines={1}>
          {property.location.neighborhood}, {property.location.city}
        </Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Bed size={16} color={COLORS.text.secondary} />
            <Text style={styles.featureText}>{property.features.beds}</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Bath size={16} color={COLORS.text.secondary} />
            <Text style={styles.featureText}>{property.features.baths}</Text>
          </View>
          
          <View style={styles.featureItem}>
            <SquareFoot size={16} color={COLORS.text.secondary} />
            <Text style={styles.featureText}>{property.features.area} ft²</Text>
          </View>
        </View>
        
        {variant === 'featured' && (
          <View style={styles.nearbyContainer}>
            {property.nearbyPlaces.slice(0, 4).map((place, index) => (
              <Text key={index} style={styles.nearbyItem}>
                {place}
              </Text>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(16),
    backgroundColor: COLORS.card.dark,
    overflow: 'hidden',
    marginRight: scale(16),
    marginBottom: scale(16),
    ...SHADOWS.medium,
  },
  horizontalContainer: {
    flexDirection: 'row',
    height: scale(120),
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: scale(180),
  },
  horizontalImage: {
    width: scale(120),
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: scale(80),
  },
  newBadge: {
    position: 'absolute',
    top: scale(12),
    left: scale(12),
    backgroundColor: COLORS.accent.green,
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(4),
  },
  newBadgeText: {
    color: COLORS.text.primary,
    fontSize: moderateScale(10),
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: scale(12),
    right: scale(12),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: scale(8),
    borderRadius: scale(20),
  },
  priceContainer: {
    position: 'absolute',
    bottom: scale(12),
    left: scale(12),
  },
  price: {
    color: COLORS.text.primary,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: scale(12),
    flex: 1,
  },
  title: {
    color: COLORS.text.primary,
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: scale(4),
  },
  location: {
    color: COLORS.text.secondary,
    fontSize: moderateScale(14),
    marginBottom: scale(8),
  },
  featuresContainer: {
    flexDirection: 'row',
    marginTop: scale(4),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(12),
  },
  featureText: {
    color: COLORS.text.secondary,
    fontSize: moderateScale(14),
    marginLeft: scale(4),
  },
  nearbyContainer: {
    flexDirection: 'row',
    marginTop: scale(8),
  },
  nearbyItem: {
    fontSize: moderateScale(16),
    marginRight: scale(8),
  },
});

export default PropertyCard;