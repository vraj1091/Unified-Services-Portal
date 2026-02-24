import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { DocumentProvider } from './src/context/DocumentContext';
import mobileTheme from './src/theme/mobileTheme';

// Import screens
import LoginScreenPro from './src/screens/auth/LoginScreenPro';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ApplicationsScreenPro from './src/screens/ApplicationsScreenPro';
import DocumentsScreenPro from './src/screens/DocumentsScreenPro';
import SupportScreen from './src/screens/SupportScreen';
import UtilityServicesScreen from './src/screens/utility/UtilityServicesScreen';
import ServiceProvidersScreen from './src/screens/utility/ServiceProvidersScreen';
import DocumentUploadScreen from './src/screens/utility/DocumentUploadScreen';
import FinalFormScreen from './src/screens/utility/FinalFormScreen';
import CompanyFormationScreenPro from './src/screens/company/CompanyFormationScreenPro';
import GovernmentGrantsScreenPro from './src/screens/grants/GovernmentGrantsScreenPro';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: mobileTheme.colors.background,
    card: mobileTheme.colors.surface,
    text: mobileTheme.colors.textPrimary,
    border: mobileTheme.colors.border,
    primary: mobileTheme.colors.primary,
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: mobileTheme.colors.primary,
        tabBarInactiveTintColor: mobileTheme.colors.textTertiary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: mobileTheme.typography.semibold,
          marginBottom: 4,
        },
        tabBarStyle: {
          height: 76,
          paddingTop: 8,
          paddingHorizontal: 10,
          backgroundColor: mobileTheme.colors.surface,
          borderTopColor: mobileTheme.colors.border,
          borderTopWidth: 1,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const iconByRoute = {
            Home: focused ? 'home' : 'home-outline',
            Applications: focused ? 'layers' : 'layers-outline',
            Documents: focused ? 'folder' : 'folder-outline',
            Support: focused ? 'help-circle' : 'help-circle-outline',
            Profile: focused ? 'person' : 'person-outline',
          };

          return <Ionicons name={iconByRoute[route.name] || 'ellipse-outline'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Applications" component={ApplicationsScreenPro} />
      <Tab.Screen name="Documents" component={DocumentsScreenPro} />
      <Tab.Screen name="Support" component={SupportScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F8FAFC' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreenPro} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: mobileTheme.colors.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="UtilityServices" component={UtilityServicesScreen} />
      <Stack.Screen name="ServiceProviders" component={ServiceProvidersScreen} />
      <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
      <Stack.Screen name="FinalForm" component={FinalFormScreen} />
      <Stack.Screen name="CompanyFormation" component={CompanyFormationScreenPro} />
      <Stack.Screen name="GovernmentGrants" component={GovernmentGrantsScreenPro} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch(() => {});
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DocumentProvider>
        <AuthProvider>
          <Navigation />
          <StatusBar style="dark" />
        </AuthProvider>
      </DocumentProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.background,
  },
});
