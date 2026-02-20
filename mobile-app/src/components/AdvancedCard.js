import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import advancedTheme from '../theme/advancedTheme';

const AdvancedCard = ({
  children,
  variant = 'default',
  onPress = null,
  style = {},
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return styles.elevated;
      case 'flat':
        return styles.flat;
      case 'outlined':
        return styles.outlined;
      default:
        return styles.default;
    }
  };

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={[styles.base, getVariantStyle(), style]}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: advancedTheme.borderRadius.lg,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: advancedTheme.colors.surfaceElevated,
    padding: advancedTheme.spacing[4],
    ...advancedTheme.shadows.md,
  },
  elevated: {
    backgroundColor: advancedTheme.colors.surfaceElevated,
    padding: advancedTheme.spacing[6],
    ...advancedTheme.shadows.lg,
  },
  flat: {
    backgroundColor: advancedTheme.colors.surface,
    padding: advancedTheme.spacing[4],
  },
  outlined: {
    backgroundColor: advancedTheme.colors.surfaceElevated,
    padding: advancedTheme.spacing[4],
    borderWidth: 1,
    borderColor: advancedTheme.colors.border,
  },
});

export default AdvancedCard;
