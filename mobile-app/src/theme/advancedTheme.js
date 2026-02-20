// Advanced Design System - World-Class UI/UX
// Inspired by: Apple, Google Material Design 3, Stripe, Linear

export const advancedTheme = {
  // Color Palette - Light Theme
  colors: {
    // Primary - Vibrant Blue
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6', // Main
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
    
    // Neutral - Clean Grays
    neutral: {
      0: '#FFFFFF',
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0A0A0A',
    },
    
    // Success
    success: {
      50: '#F0FDF4',
      500: '#10B981',
      600: '#059669',
    },
    
    // Warning
    warning: {
      50: '#FFFBEB',
      500: '#F59E0B',
      600: '#D97706',
    },
    
    // Error
    error: {
      50: '#FEF2F2',
      500: '#EF4444',
      600: '#DC2626',
    },
    
    // Semantic Colors
    background: '#FFFFFF',
    surface: '#FAFAFA',
    surfaceElevated: '#FFFFFF',
    border: '#E5E5E5',
    borderLight: '#F5F5F5',
    
    text: {
      primary: '#171717',
      secondary: '#525252',
      tertiary: '#A3A3A3',
      inverse: '#FFFFFF',
      link: '#2563EB',
    },
    
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.2)',
  },
  
  // Typography - Modern Scale
  typography: {
    // Font Families
    fontFamily: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    
    // Font Sizes
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    
    // Line Heights
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
    
    // Font Weights
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  // Spacing - 4px base unit
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
  },
  
  // Border Radius - Smooth curves
  borderRadius: {
    none: 0,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
  },
  
  // Shadows - Subtle depth
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 12,
    },
  },
  
  // Animation - Smooth transitions
  animation: {
    duration: {
      fast: 150,
      normal: 250,
      slow: 350,
    },
    easing: {
      default: 'ease-in-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  
  // Layout
  layout: {
    maxWidth: 1200,
    containerPadding: 16,
    headerHeight: 64,
    tabBarHeight: 56,
  },
};

// Component Presets
export const componentStyles = {
  // Button Variants
  button: {
    primary: {
      backgroundColor: advancedTheme.colors.primary[500],
      color: advancedTheme.colors.text.inverse,
      paddingVertical: advancedTheme.spacing[3],
      paddingHorizontal: advancedTheme.spacing[6],
      borderRadius: advancedTheme.borderRadius.md,
      ...advancedTheme.shadows.sm,
    },
    secondary: {
      backgroundColor: advancedTheme.colors.neutral[100],
      color: advancedTheme.colors.text.primary,
      paddingVertical: advancedTheme.spacing[3],
      paddingHorizontal: advancedTheme.spacing[6],
      borderRadius: advancedTheme.borderRadius.md,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: advancedTheme.colors.primary[600],
      paddingVertical: advancedTheme.spacing[3],
      paddingHorizontal: advancedTheme.spacing[6],
    },
  },
  
  // Card Variants
  card: {
    default: {
      backgroundColor: advancedTheme.colors.surfaceElevated,
      borderRadius: advancedTheme.borderRadius.lg,
      padding: advancedTheme.spacing[4],
      ...advancedTheme.shadows.md,
    },
    elevated: {
      backgroundColor: advancedTheme.colors.surfaceElevated,
      borderRadius: advancedTheme.borderRadius.xl,
      padding: advancedTheme.spacing[6],
      ...advancedTheme.shadows.lg,
    },
    flat: {
      backgroundColor: advancedTheme.colors.surface,
      borderRadius: advancedTheme.borderRadius.lg,
      padding: advancedTheme.spacing[4],
      borderWidth: 1,
      borderColor: advancedTheme.colors.border,
    },
  },
  
  // Input Variants
  input: {
    default: {
      backgroundColor: advancedTheme.colors.neutral[50],
      borderRadius: advancedTheme.borderRadius.md,
      paddingVertical: advancedTheme.spacing[3],
      paddingHorizontal: advancedTheme.spacing[4],
      borderWidth: 1,
      borderColor: advancedTheme.colors.border,
      fontSize: advancedTheme.typography.fontSize.base,
      color: advancedTheme.colors.text.primary,
    },
    focused: {
      borderColor: advancedTheme.colors.primary[500],
      borderWidth: 2,
      ...advancedTheme.shadows.sm,
    },
  },
};

export default advancedTheme;
