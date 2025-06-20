import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { 
  Plus, 
  Home, 
  Eye, 
  MessageSquare, 
  User,
  Settings,
} from 'lucide-react-native';
import { COLORS, SHADOWS } from '../constants/theme';
import { scale, moderateScale, SCREEN_PADDING } from '../utils/scaling';
import PropertyCard from '../components/PropertyCard';
import GlassmorphicCard from '../components/GlassmorphicCard';
import Button from '../components/Button';
import LoadingShimmer from '../components/LoadingShimmer';
import { PROPERTIES, Property } from '../constants/mockData';

interface AgentDashboardProps {
  onAddProperty: () => void;
  onPropertyPress: (property: Property) => void;
  onSettingsPress: () => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({
  onAddProperty,
  onPropertyPress,
  onSettingsPress,
}) => {
  const [myListings, setMyListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      // For demo purposes, we'll use the first 3 properties as the agent's listings
      setMyListings(PROPERTIES.slice(0, 3));
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const renderPropertyItem = ({ item }: { item: Property }) => (
    <PropertyCard
      property={item}
      onPress={onPropertyPress}
      variant="horizontal"
      style={styles.propertyCard}
    />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background.dark} />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Agent Dashboard</Text>
          <Text style={styles.subtitle}>Manage your listings</Text>
        </View>
        
        <TouchableOpacity style={styles.settingsButton} onPress={onSettingsPress}>
          <Settings size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsContainer}>
          {loading ? (
            <View style={styles.statsCards}>
              {[1, 2, 3].map(i => (
                <LoadingShimmer
                  key={i}
                  type="rectangle"
                  width="30%"
                  height={scale(100)}
                  borderRadius={scale(12)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.statsCards}>
              <GlassmorphicCard style={styles.statCard} intensity={20}>
                <Home size={24} color={COLORS.accent.primary} />
                <Text style={styles.statValue}>{myListings.length}</Text>
                <Text style={styles.statLabel}>Listings</Text>
              </GlassmorphicCard>
              
              <GlassmorphicCard style={styles.statCard} intensity={20}>
                <Eye size={24} color={COLORS.accent.amber} />
                <Text style={styles.statValue}>142</Text>
                <Text style={styles.statLabel}>Views</Text>
              </GlassmorphicCard>
              
              <GlassmorphicCard style={styles.statCard} intensity={20}>
                <MessageSquare size={24} color={COLORS.accent.green} />
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Inquiries</Text>
              </GlassmorphicCard>
            </View>
          )}
        </View>
        
        <View style={styles.actionsContainer}>
          <Button
            title="Add New Property"
            onPress={onAddProperty}
            gradient
            icon={<Plus size={20} color={COLORS.text.primary} />}
            iconPosition="left"
            style={styles.addButton}
          />
        </View>
        
        <View style={styles.listingsContainer}>
          <Text style={styles.sectionTitle}>My Listings</Text>
          
          {loading ? (
            <View style={styles.loadingListings}>
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
          ) : myListings.length > 0 ? (
            <FlatList
              data={myListings}
              renderItem={renderPropertyItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyListings}>
              <Text style={styles.emptyText}>
                You don't have any listings yet. Add your first property!
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.profileContainer}>
          <Text style={styles.sectionTitle}>Profile</Text>
          
          <GlassmorphicCard style={styles.profileCard} intensity={20}>
            {loading ? (
              <View style={styles.loadingProfile}>
                <LoadingShimmer
                  type="circle"
                  width={scale(80)}
                  height={scale(80)}
                  borderRadius={scale(40)}
                  style={styles.profileImageShimmer}
                />
                <View style={styles.profileInfoShimmer}>
                  <LoadingShimmer
                    type="text"
                    width="60%"
                    height={scale(20)}
                    style={{ marginBottom: scale(8) }}
                  />
                  <LoadingShimmer
                    type="text"
                    width="40%"
                    height={scale(16)}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.profileContent}>
                <View style={styles.profileImageContainer}>
                  <User size={40} color={COLORS.text.primary} />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>Sarah Ahmed</Text>
                  <Text style={styles.profileRole}>Real Estate Agent</Text>
                  <Text style={styles.profileStats}>8 years experience</Text>
                </View>
                <TouchableOpacity style={styles.editProfileButton}>
                  <Text style={styles.editProfileText}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          </GlassmorphicCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.dark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING.horizontal,
    paddingTop: scale(16),
    paddingBottom: scale(16),
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
  settingsButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scale(40),
  },
  statsContainer: {
    paddingHorizontal: SCREEN_PADDING.horizontal,
    marginBottom: scale(24),
  },
  statsCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '30%',
    padding: scale(16),
    alignItems: 'center',
  },
  statValue: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: scale(8),
    marginBottom: scale(4),
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: COLORS.text.tertiary,
  },
  actionsContainer: {
    paddingHorizontal: SCREEN_PADDING.horizontal,
    marginBottom: scale(24),
  },
  addButton: {
    width: '100%',
  },
  listingsContainer: {
    marginBottom: scale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: COLORS.text.primary,
    paddingHorizontal: SCREEN_PADDING.horizontal,
    marginBottom: scale(16),
  },
  loadingListings: {
    paddingHorizontal: SCREEN_PADDING.horizontal,
  },
  propertyShimmer: {
    marginBottom: scale(16),
  },
  propertyCard: {
    marginHorizontal: SCREEN_PADDING.horizontal,
    marginBottom: scale(16),
  },
  emptyListings: {
    padding: SCREEN_PADDING.horizontal,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: moderateScale(16),
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  profileContainer: {
    marginBottom: scale(24),
  },
  profileCard: {
    marginHorizontal: SCREEN_PADDING.horizontal,
    padding: scale(16),
  },
  loadingProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageShimmer: {
    marginRight: scale(16),
  },
  profileInfoShimmer: {
    flex: 1,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: scale(4),
  },
  profileRole: {
    fontSize: moderateScale(14),
    color: COLORS.text.secondary,
    marginBottom: scale(4),
  },
  profileStats: {
    fontSize: moderateScale(14),
    color: COLORS.text.tertiary,
  },
  editProfileButton: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(8),
  },
  editProfileText: {
    fontSize: moderateScale(14),
    color: COLORS.accent.primary,
    fontWeight: '500',
  },
});

export default AgentDashboard;