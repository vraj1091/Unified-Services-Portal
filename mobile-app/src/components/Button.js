import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  gradient = false,
}) => {
  const theme = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: theme.borderRadius.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.md,
    };

    const sizeStyles = {
      sm: { paddingVertical: 8, paddingHorizontal: 16 },
      md: { paddingVertical: 12, paddingHorizontal: 24 },
      lg: { paddingVertical: 16, paddingHorizontal: 32 },
    };

    const variantStyles = {
      primary: {
        backgroundColor: theme.colors.primary[600],
      },
      secondary: {
        backgroundColor: theme.colors.slate[100],
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary[600],
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return [baseStyle, sizeStyles[size], variantStyles[variant]];
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontWeight: theme.fontWeight.bold,
    };

    const sizeStyles = {
      sm: { fontSize: theme.fontSize.sm },
      md: { fontSize: theme.fontSize.base },
      lg: { fontSize: theme.fontSize.lg },
    };

    const variantStyles = {
      primary: { color: theme.colors.white },
      secondary: { color: theme.colors.slate[700] },
      outline: { color: theme.colors.primary[600] },
      ghost: { color: theme.colors.primary[600] },
    };

    return [baseStyle, sizeStyles[size], variantStyles[variant]];
  };

  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? theme.colors.white : theme.colors.primary[600]}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyle(), textStyle, icon && { marginLeft: 8 }]}>{title}</Text>
        </>
      )}
    </>
  );

  if (gradient && variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[{ opacity: disabled ? 0.5 : 1 }, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[theme.colors.primary[600], theme.colors.primary[700]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[getButtonStyle(), { backgroundColor: 'transparent' }]}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), { opacity: disabled ? 0.5 : 1 }, style]}
      activeOpacity={0.8}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

export default Button;
