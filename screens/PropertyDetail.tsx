import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Bed, 
  Bath, 
  SquareFoot, 
  Calendar, 
  MapPin,
  Phone,
  MessageSquare,
} from 'lucide-react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { COLORS, SHADOWS } from '../constants/theme';
import { scale, moderateScale, SCREEN_PADDING } from '../utils/scaling';
import Carousel from '../components/Carousel';
import Button from '../components/Button';
import GlassmorphicCard from '../components/GlassmorphicCard';
import LoadingShimmer from '../components/LoadingShimmer';
import { Property } from '../constants/mockData';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onContactAgent: (property: Property) => void;
}

const { width } = Dimensions.get('window');

const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  onBack,
  onContactAgent,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const handleShare = () => {
    console.log('Sharing property:', property.id);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ArrowLeft size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <LoadingShimmer type="propertyDetail" />
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <Share2 size={20} color={COLORS.text.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
            <Heart
              size={20}
              color={isFavorite ? '#FF5A5F' : COLORS.text.primary}
              fill={isFavorite ? '#FF5A5F' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.carouselContainer}>
          <Carousel
            images={property.images}
            style={styles.carousel}
            showPagination
            autoPlay
          />
          
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent']}
            style={styles.gradientOverlay}
          />
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(property.price)}</Text>
          </View>
          
          <Text style={styles.title}>{property.title}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color={COLORS.text.secondary} />
            <Text style={styles.location}>
              {property.location.neighborhood}, {property.location.city}
            </Text>
          </View>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <Bed size={24} color={COLORS.accent.primary} />
              <Text style={styles.featureValue}>{property.features.beds}</Text>
              <Text style={styles.featureLabel}>Beds</Text>
            </View>
            
            <View style={styles.featureCard}>
              <Bath size={24} color={COLORS.accent.primary} />
              <Text style={styles.featureValue}>{property.features.baths}</Text>
              <Text style={styles.featureLabel}>Baths</Text>
            </View>
            
            <View style={styles.featureCard}>
              <SquareFoot size={24} color={COLORS.accent.primary} />
              <Text style={styles.featureValue}>{property.features.area}</Text>
              <Text style={styles.featureLabel}>Sq Ft</Text>
            </View>
            
            <View style={styles.featureCard}>
              <Calendar size={24} color={COLORS.accent.primary} />
              <Text style={styles.featureValue}>{property.features.yearBuilt}</Text>
              <Text style={styles.featureLabel}>Year</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <View style={styles.amenityDot} />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nearby</Text>
            <View style={styles.nearbyContainer}>
              {property.nearbyPlaces.map((place, index) => (
                <View key={index} style={styles.nearbyItem}>
                  <Text style={styles.nearbyIcon}>{place}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Agent</Text>
            <GlassmorphicCard style={styles.agentCard} intensity={30}>
              <View style={styles.agentInfo}>
                <View style={styles.agentImageContainer}>
                  <View style={styles.agentImage} />
                </View>
                <View style={styles.agentDetails}>
                  <Text style={styles.agentName}>{property.agent.name}</Text>
                  <Text style={styles.agentContact}>{property.agent.phone}</Text>
                </View>
              </View>
              <View style={styles.agentActions}>
                <TouchableOpacity style={styles.agentActionButton}>
                  <Phone size={20} color={COLORS.text.primary} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.agentActionButton}
                  onPress={() => onContactAgent(property)}
                >
                  <MessageSquare size={20} color={COLORS.text.primary} />
                </TouchableOpacity>
              </View>
            </GlassmorphicCard>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Contact Agent"
          onPress={() => onContactAgent(property)}
          gradient
          style={styles.contactButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.dark,
  },
  header: {
    position: 'absolute',
    top: scale(40),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING.horizontal,
    zIndex: 10,
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
  },
  scrollView: {
    flex: 1,
  },
  carouselContainer: {
    height: scale(350),
    position: 'relative',
  },
  carousel: {
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: scale(100),
  },
  contentContainer: {
    paddingHorizontal: SCREEN_PADDING.horizontal,
    paddingTop: scale(16),
    paddingBottom: scale(100),
  },
  priceContainer: {
    marginBottom: scale(8),
  },
  price: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: scale(8),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(24),
  },
  location: {
    fontSize: moderateScale(16),
    color: COLORS.text.secondary,
    marginLeft: scale(6),
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(24),
  },
  featureCard: {
    width: '23%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: scale(12),
    padding: scale(12),
    alignItems: 'center',
  },
  featureValue: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: scale(8),
    marginBottom: scale(4),
  },
  featureLabel: {
    fontSize: moderateScale(12),
    color: COLORS.text.tertiary,
  },
  section: {
    marginBottom: scale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: scale(12),
  },
  description: {
    fontSize: moderateScale(15),
    lineHeight: scale(24),
    color: COLORS.text.secondary,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: scale(8),
  },
  amenityDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: COLORS.accent.primary,
    marginRight: scale(8),
  },
  amenityText: {
    fontSize: moderateScale(14),
    color: COLORS.text.secondary,
  },
  nearbyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nearbyItem: {
    marginRight: scale(16),
    marginBottom: scale(8),
  },
  nearbyIcon: {
    fontSize: moderateScale(24),
  },
  agentCard: {
    padding: scale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentImageContainer: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    marginRight: scale(12),
  },
  agentImage: {
    width: '100%',
    height: '100%',
  },
  agentDetails: {
    justifyContent: 'center',
  },
  agentName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: scale(4),
  },
  agentContact: {
    fontSize: moderateScale(14),
    color: COLORS.text.secondary,
  },
  agentActions: {
    flexDirection: 'row',
  },
  agentActionButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: COLORS.accent.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background.darker,
    paddingHorizontal: SCREEN_PADDING.horizontal,
    paddingVertical: scale(16),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  contactButton: {
    width: '100%',
  },
});

export default PropertyDetail;