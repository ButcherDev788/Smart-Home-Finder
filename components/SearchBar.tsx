import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Search } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { scale } from '../utils/scaling';
import GlassmorphicCard from './GlassmorphicCard';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  style?: ViewStyle;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search properties...',
  value,
  onChangeText,
  onSubmit,
  style,
}) => {
  return (
    <GlassmorphicCard style={[styles.container, style]} intensity={30}>
      <View style={styles.inputContainer}>
        <Search size={20} color={COLORS.text.secondary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.tertiary}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          selectionColor={COLORS.accent.primary}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton}>
            <View style={styles.clearIcon}>
              <View style={styles.clearIconLine1} />
              <View style={styles.clearIconLine2} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </GlassmorphicCard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scale(50),
    borderRadius: scale(12),
    overflow: 'hidden',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
  },
  icon: {
    marginRight: scale(8),
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.text.primary,
    fontSize: scale(16),
  },
  clearButton: {
    padding: scale(8),
  },
  clearIcon: {
    width: scale(16),
    height: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIconLine1: {
    position: 'absolute',
    width: scale(16),
    height: scale(2),
    backgroundColor: COLORS.text.tertiary,
    transform: [{ rotate: '45deg' }],
  },
  clearIconLine2: {
    position: 'absolute',
    width: scale(16),
    height: scale(2),
    backgroundColor: COLORS.text.tertiary,
    transform: [{ rotate: '-45deg' }],
  },
});

export default SearchBar;