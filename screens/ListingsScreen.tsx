import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { scale, moderateScale, SCREEN_PADDING } from '../utils/scaling';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import FilterChips from '../components/FilterChips';
import LoadingShimmer from '../components/LoadingShimmer';
import { PROPERTIES, FILTER_OPTIONS, Property } from '../constants/mockData';

interface ListingsScreenProps {
  onBack: () => void;
  onPropertyPress: (property: Property) => void;
  onFilterPress: () => void;
}

const ListingsScreen: React.FC<ListingsScreenProps> = ({
  onBack,
  onPropertyPress,
  onFilterPress,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setProperties(PROPERTIES);
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
  
  const renderPropertyItem = ({ item }: { item: Property }) => (
    <PropertyCard
      property={item}
      onPress={onPropertyPress}
      isFavorite={favorites.includes(item.id)}
      onToggleFavorite={toggleFavorite}
      variant="horizontal"
      style={styles.propertyCard}
    />
  );
  
  const cityOptions = FILTER_OPTIONS.cities.map(city => ({
    id: city,
    label: city,
  }));
  
  const bedsOptions = FILTER_OPTIONS.beds.map(bed => ({
    id: `bed-${bed}`,
    label: `${bed} ${typeof bed === 'number' && bed === 1 ? 'Bed' : 'Beds'}`,
  }));
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background.dark} />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ArrowLeft size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Browse Properties</Text>
          
          <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
            <SlidersHorizontal size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>
        
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
            options={cityOptions}
            selectedIds={selectedFilters}
            onSelect={toggleFilter}
          />
        </View>
        
        <View style={styles.filtersContainer}>
          <FilterChips
            options={bedsOptions}
            selectedIds={selectedFilters}
            onSelect={toggleFilter}
          />
        </View>
      </View>
      
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {loading ? 'Loading properties...' : `${properties.length} properties found`}
        </Text>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            {[1, 2, 3].map(i => (
              <LoadingShimmer
                key={i}
                type="propertyCard"
                width="100%"
                height={scale(120)}
                style={styles.propertyShimmer}
              />
            ))}
          </View>
        ) : (
          <FlatList
            data={properties}
            renderItem={renderPropertyItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
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
    paddingTop: scale(16),
    paddingBottom: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING.horizontal,
    marginBottom: scale(16),
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  filterButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: SCREEN_PADDING.horizontal,
    marginBottom: scale(16),
  },
  filtersContainer: {
    paddingLeft: SCREEN_PADDING.horizontal,
    marginBottom: scale(8),
  },
  resultsContainer: {
    flex: 1,
  },
  resultsText: {
    fontSize: moderateScale(14),
    color: COLORS.text.secondary,
    paddingHorizontal: SCREEN_PADDING.horizontal,
    paddingVertical: scale(12),
  },
  loadingContainer: {
    paddingHorizontal: SCREEN_PADDING.horizontal,
  },
  propertyShimmer: {
    marginBottom: scale(16),
  },
  listContent: {
    paddingBottom: scale(20),
  },
  propertyCard: {
    marginHorizontal: SCREEN_PADDING.horizontal,
    marginBottom: scale(16),
  },
});

export default ListingsScreen;