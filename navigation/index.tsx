import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Search, Heart, User, Plus } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { scale } from '../utils/scaling';
import BuyerDashboard from '../screens/BuyerDashboard';
import ListingsScreen from '../screens/ListingsScreen';
import AgentDashboard from '../screens/AgentDashboard';
import PropertyDetail from '../screens/PropertyDetail';
import { Property } from '../constants/mockData';

type RootStackParamList = {
  BuyerTabs: undefined;
  AgentTabs: undefined;
  PropertyDetail: { property: Property };
};

type BuyerTabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};

type AgentTabParamList = {
  Dashboard: undefined;
  AddProperty: undefined;
  Listings: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const BuyerTab = createBottomTabNavigator<BuyerTabParamList>();
const AgentTab = createBottomTabNavigator<AgentTabParamList>();

interface NavigationProps {
  userType: 'buyer' | 'agent' | null;
  onPropertyPress: (property: Property) => void;
  onAIAssistantPress: () => void;
  onAddProperty: () => void;
  onBack: () => void;
}

const BuyerTabNavigator = ({ onPropertyPress, onAIAssistantPress }: NavigationProps) => {
  return (
    <BuyerTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.background.darker,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          height: scale(60),
          paddingBottom: scale(10),
        },
        tabBarActiveTintColor: COLORS.accent.primary,
        tabBarInactiveTintColor: COLORS.text.tertiary,
        headerShown: false,
      }}
    >
      <BuyerTab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      >
        {(props) => (
          <BuyerDashboard
            {...props}
            onPropertyPress={onPropertyPress}
            onAIAssistantPress={onAIAssistantPress}
          />
        )}
      </BuyerTab.Screen>
      
      <BuyerTab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      >
        {(props) => (
          <ListingsScreen
            {...props}
            onPropertyPress={onPropertyPress}
            onBack={() => {}}
            onFilterPress={() => {}}
          />
        )}
      </BuyerTab.Screen>
      
      <BuyerTab.Screen
        name="Favorites"
        component={BuyerDashboard}
        options={{
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      
      <BuyerTab.Screen
        name="Profile"
        component={BuyerDashboard}
        options={{
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </BuyerTab.Navigator>
  );
};

const AgentTabNavigator = ({ onPropertyPress, onAddProperty }: NavigationProps) => {
  return (
    <AgentTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.background.darker,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          height: scale(60),
          paddingBottom: scale(10),
        },
        tabBarActiveTintColor: COLORS.accent.primary,
        tabBarInactiveTintColor: COLORS.text.tertiary,
        headerShown: false,
      }}
    >
      <AgentTab.Screen
        name="Dashboard"
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      >
        {(props) => (
          <AgentDashboard
            {...props}
            onPropertyPress={onPropertyPress}
            onAddProperty={onAddProperty}
            onSettingsPress={() => {}}
          />
        )}
      </AgentTab.Screen>
      
      <AgentTab.Screen
        name="AddProperty"
        component={AgentDashboard}
        options={{
          tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />,
        }}
      />
      
      <AgentTab.Screen
        name="Listings"
        options={{
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      >
        {(props) => (
          <ListingsScreen
            {...props}
            onPropertyPress={onPropertyPress}
            onBack={() => {}}
            onFilterPress={() => {}}
          />
        )}
      </AgentTab.Screen>
      
      <AgentTab.Screen
        name="Profile"
        component={AgentDashboard}
        options={{
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </AgentTab.Navigator>
  );
};

const AppNavigator: React.FC<NavigationProps> = ({
  userType,
  onPropertyPress,
  onAIAssistantPress,
  onAddProperty,
  onBack,
}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background.dark },
        }}
      >
        {userType === 'buyer' ? (
          <Stack.Screen name="BuyerTabs">
            {(props) => (
              <BuyerTabNavigator
                {...props}
                userType={userType}
                onPropertyPress={onPropertyPress}
                onAIAssistantPress={onAIAssistantPress}
                onAddProperty={onAddProperty}
                onBack={onBack}
              />
            )}
          </Stack.Screen>
        ) : userType === 'agent' ? (
          <Stack.Screen name="AgentTabs">
            {(props) => (
              <AgentTabNavigator
                {...props}
                userType={userType}
                onPropertyPress={onPropertyPress}
                onAIAssistantPress={onAIAssistantPress}
                onAddProperty={onAddProperty}
                onBack={onBack}
              />
            )}
          </Stack.Screen>
        ) : null}
        
        <Stack.Screen name="PropertyDetail">
          {(props) => (
            <PropertyDetail
              {...props}
              property={props.route.params.property}
              onBack={onBack}
              onContactAgent={() => {}}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;