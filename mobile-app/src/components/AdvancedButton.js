import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import advancedTheme from '../theme/advancedTheme';

const AdvancedButton = ({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  style = {},
  textStyle = {},
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'ghost':
        return styles.ghost;
      case 'danger':
        return styles.danger;
      default:
        return styles.primary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'medium':
        return styles.medium;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.base,
        getVariantStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : advancedTheme.colors.primary[500]} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, getVariantStyle().text, textStyle]}>
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: advancedTheme.borderRadius.md,
    gap: advancedTheme.spacing[2],
  },
  primary: {
    backgroundColor: advancedTheme.colors.primary[500],
    ...advancedTheme.shadows.sm,
    text: {
      color: advancedTheme.colors.text.inverse,
      fontSize: advancedTheme.typography.fontSize.base,
      fontWeight: advancedTheme.typography.fontWeight.semibold,
    },
  },
  secondary: {
    backgroundColor: advancedTheme.colors.neutral[100],
    text: {
      color: advancedTheme.colors.text.primary,
      fontSize: advancedTheme.typography.fontSize.base,
      fontWeight: advancedTheme.typography.fontWeight.semibold,
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    text: {
      color: advancedTheme.colors.primary[600],
      fontSize: advancedTheme.typography.fontSize.base,
      fontWeight: advancedTheme.typography.fontWeight.semibold,
    },
  },
  danger: {
    backgroundColor: advancedTheme.colors.error[500],
    ...advancedTheme.shadows.sm,
    text: {
      color: advancedTheme.colors.text.inverse,
      fontSize: advancedTheme.typography.fontSize.base,
      fontWeight: advancedTheme.typography.fontWeight.semibold,
    },
  },
  small: {
    paddingVertical: advancedTheme.spacing[2],
    paddingHorizontal: advancedTheme.spacing[4],
  },
  medium: {
    paddingVertical: advancedTheme.spacing[3],
    paddingHorizontal: advancedTheme.spacing[6],
  },
  large: {
    paddingVertical: advancedTheme.spacing[4],
    paddingHorizontal: advancedTheme.spacing[8],
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    // Base text style
  },
});

export default AdvancedButton;
