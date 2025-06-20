import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Home, Building2, MapPin, DollarSign, Bed } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { scale, moderateScale, SCREEN_PADDING } from '../utils/scaling';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import PropertyCard from '../components/PropertyCard';
import AIAssistantButton from '../components/AIAssistantButton';
import LoadingShimmer from '../components/LoadingShimmer';
import { PROPERTIES, FILTER_OPTIONS, Property } from '../constants/mockData';

interface BuyerDashboardProps {
  onPropertyPress: (property: Property) => void;
  onAIAssistantPress: () => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  onPropertyPress,
  onAIAssistantPress,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [newProperties, setNewProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setFeaturedProperties(PROPERTIES.filter(p => p.isFeatured));
      setNewProperties(PROPERTIES.filter(p => p.isNew));
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };
  
  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };
  
  const toggleFavorite = (property: Property) => {
    setFavorites(prev => 
      prev.includes(property.id)
        ? prev.filter(id => id !== property.id)
        : [...prev, property.id]
    );
  };
  
  const filterOptions = [
    { id: 'price', label: 'Price', icon: <DollarSign size={16} color={COLORS.text.secondary} /> },
    { id: 'beds', label: 'Beds', icon: <Bed size={16} color={COLORS.text.secondary} /> },
    { id: 'location', label: 'Location', icon: <MapPin size={16} color={COLORS.text.secondary} /> },
    { id: 'house', label: 'House', icon: <Home size={16} color={COLORS.text.secondary} /> },
    { id: 'apartment', label: 'Apartment', icon: <Building2 size={16} color={COLORS.text.secondary} /> },
  ];
  
  const renderPropertyItem = ({ item }: { item: Property }) => (
    <PropertyCard
      property={item}
      onPress={onPropertyPress}
      isFavorite={favorites.includes(item.id)}
      onToggleFavorite={toggleFavorite}
      variant="featured"
    />
  );
  
  const renderNewPropertyItem = ({ item }: { item: Property }) => (
    <PropertyCard
      property={item}
      onPress={onPropertyPress}
      isFavorite={favorites.includes(item.id)}
      onToggleFavorite={toggleFavorite}
    />
  );
  
  const renderPropertyShimmer = () => (
    <LoadingShimmer type="propertyCard" style={styles.propertyCardShimmer} />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background.dark} />
      
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.greeting}>Hello, Alex</Text>
        <Text style={styles.subtitle}>Find your perfect home</Text>
      </Animated.View>
      
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search by city, neighborhood, or address"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmit={handleSearch}
          />
        </View>
        
        <View style={styles.filtersContainer}>
          <FilterChips
            options={filterOptions}
            selectedIds={selectedFilters}
            onSelect={toggleFilter}
          />
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Properties</Text>
          
          {loading ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.propertyListContent}
            >
              {[1, 2, 3].map(i => (
                <View key={i} style={{ marginRight: scale(16) }}>
                  {renderPropertyShimmer()}
                </View>
              ))}
            </ScrollView>
          ) : (
            <FlatList
              data={featuredProperties}
              renderItem={renderPropertyItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.propertyListContent}
            />
          )}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>New on the Market</Text>
          
          {loading ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.propertyListContent}
            >
              {[1, 2, 3].map(i => (
                <View key={i} style={{ marginRight: scale(16) }}>
                  {renderPropertyShimmer()}
                </View>
              ))}
            </ScrollView>
          ) : (
            <FlatList
              data={newProperties}
              renderItem={renderNewPropertyItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.propertyListContent}
            />
          )}
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Cities</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.citiesContainer}>
            {loading ? (
              <>
                {[1, 2, 3, 4].map(i => (
                  <LoadingShimmer
                    key={i}
                    type="rectangle"
                    width="48%"
                    height={scale(100)}
                    borderRadius={scale(12)}
                    style={styles.cityShimmer}
                  />
                ))}
              </>
            ) : (
              <>
                {FILTER_OPTIONS.cities.slice(0, 4).map((city, index) => (
                  <TouchableOpacity key={index} style={styles.cityCard}>
                    <Text style={styles.cityName}>{city}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        </View>
      </Animated.ScrollView>
      
      <AIAssistantButton
        onPress={onAIAssistantPress}
        style={styles.aiButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.dark,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING.horizontal,
    paddingTop: scale(16),
    paddingBottom: scale(8),
    backgroundColor: COLORS.background.dark,
    zIndex: 10,
  },
  greeting: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: COLORS.text.secondary,
    marginTop: scale(4),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scale(100),
  },
  searchContainer: {
    paddingHorizontal: SCREEN_PADDING.horizontal,
    marginTop: scale(16),
    marginBottom: scale(16),
  },
  filtersContainer: {
    paddingLeft: SCREEN_PADDING.horizontal,
    marginBottom: scale(24),
  },
  sectionContainer: {
    marginBottom: scale(32),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING.horizontal,
    marginBottom: scale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: COLORS.text.primary,
    paddingHorizontal: SCREEN_PADDING.horizontal,
    marginBottom: scale(16),
  },
  seeAllText: {
    fontSize: moderateScale(14),
    color: COLORS.accent.primary,
  },
  propertyListContent: {
    paddingHorizontal: SCREEN_PADDING.horizontal,
  },
  propertyCardShimmer: {
    marginRight: scale(16),
  },
  citiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SCREEN_PADDING.horizontal,
    justifyContent: 'space-between',
  },
  cityCard: {
    width: '48%',
    height: scale(100),
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  cityShimmer: {
    marginBottom: scale(16),
  },
  cityName: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  aiButton: {
    position: 'absolute',
    bottom: scale(24),
    right: scale(24),
  },
});

export default BuyerDashboard;