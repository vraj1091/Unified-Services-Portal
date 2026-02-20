// Professional Design System - Real-world, Human-centered Design
// Inspired by: Revolut, N26, Monzo, Stripe Dashboard

export const professionalTheme = {
  colors: {
    // Primary - Deep Professional Blue
    primary: '#0A2540',
    primaryLight: '#1A3A5C',
    primaryDark: '#051829',
    
    // Accent - Vibrant Action Color
    accent: '#635BFF',
    accentLight: '#7A73FF',
    accentDark: '#4B45CC',
    
    // Background
    background: '#F7F9FC',
    backgroundDark: '#EEF2F6',
    
    // Surface
    surface: '#FFFFFF',
    surfaceHover: '#FAFBFC',
    
    // Text
    textPrimary: '#0A2540',
    textSecondary: '#425466',
    textTertiary: '#697386',
    textInverse: '#FFFFFF',
    
    // Status
    success: '#00D4AA',
    successBg: '#E6FAF5',
    warning: '#FFB020',
    warningBg: '#FFF8E6',
    error: '#DF1B41',
    errorBg: '#FFEEF2',
    info: '#0073E6',
    infoBg: '#E6F2FF',
    
    // Borders
    border: '#E3E8EF',
    borderLight: '#F0F4F8',
    borderDark: '#D1D9E0',
    
    // Shadows (for web)
    shadow: 'rgba(10, 37, 64, 0.08)',
    shadowMedium: 'rgba(10, 37, 64, 0.12)',
    shadowLarge: 'rgba(10, 37, 64, 0.16)',
  },
  
  typography: {
    // Font sizes
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    body: 16,
    bodySmall: 14,
    caption: 12,
    tiny: 10,
    
    // Line heights
    lineHeightTight: 1.2,
    lineHeightNormal: 1.5,
    lineHeightRelaxed: 1.75,
    
    // Font weights
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 18,
    full: 999,
  },
  
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#0A2540',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 1,
    },
    md: {
      shadowColor: '#0A2540',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    lg: {
      shadowColor: '#0A2540',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 6,
    },
  },
};

export default professionalTheme;
