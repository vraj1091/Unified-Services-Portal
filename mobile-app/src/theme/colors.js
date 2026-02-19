// Professional 2-Color Palette Design System
// Following Material Design and iOS Human Interface Guidelines

export const colors = {
  // Primary - Deep Blue (Professional, Trustworthy)
  primary: {
    main: '#1E40AF',      // Primary actions, headers
    dark: '#1E3A8A',      // Pressed states
    light: '#3B82F6',     // Hover states
    bg: '#EFF6FF',        // Light backgrounds
  },
  
  // Neutral - Grays (Clean, Professional)
  neutral: {
    white: '#FFFFFF',
    bg: '#F8FAFC',        // App background
    surface: '#FFFFFF',   // Card backgrounds
    border: '#E2E8F0',    // Borders
    divider: '#CBD5E1',   // Dividers
  },
  
  // Text
  text: {
    primary: '#0F172A',   // Main text
    secondary: '#475569', // Secondary text
    disabled: '#94A3B8',  // Disabled text
    inverse: '#FFFFFF',   // Text on dark backgrounds
  },
  
  // Status Colors (Minimal use)
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  // Font sizes following 8pt grid
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  small: 14,
  tiny: 12,
  
  // Font weights
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
};
