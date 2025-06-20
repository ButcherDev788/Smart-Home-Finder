import React from 'react';
import { 
  ScrollView, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View,
  ViewStyle
} from 'react-native';
import { COLORS } from '../constants/theme';
import { scale } from '../utils/scaling';

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface FilterChipsProps {
  options: FilterOption[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  style?: ViewStyle;
  horizontal?: boolean;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  options,
  selectedIds,
  onSelect,
  style,
  horizontal = true,
}) => {
  return (
    <ScrollView
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        !horizontal && styles.verticalContainer,
        style,
      ]}
    >
      {options.map((option) => {
        const isSelected = selectedIds.includes(option.id);
        
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.chip,
              isSelected && styles.selectedChip,
            ]}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.7}
          >
            {option.icon && (
              <View style={styles.iconContainer}>
                {option.icon}
              </View>
            )}
            <Text
              style={[
                styles.label,
                isSelected && styles.selectedLabel,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: scale(8),
  },
  verticalContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: scale(20),
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    marginRight: scale(8),
    marginBottom: scale(8),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedChip: {
    backgroundColor: COLORS.accent.primary,
    borderColor: COLORS.accent.primary,
  },
  iconContainer: {
    marginRight: scale(6),
  },
  label: {
    color: COLORS.text.secondary,
    fontSize: scale(14),
    fontWeight: '500',
  },
  selectedLabel: {
    color: COLORS.text.primary,
    fontWeight: '600',
  },
});

export default FilterChips;