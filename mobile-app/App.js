import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { DocumentProvider } from './src/context/DocumentContext';

// Import screens
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ApplicationsScreen from './src/screens/ApplicationsScreen';
import DocumentsScreen from './src/screens/DocumentsScreen';
import SupportScreen from './src/screens/SupportScreen';
import UtilityServicesScreen from './src/screens/utility/UtilityServicesScreen';
import ServiceProvidersScreen from './src/screens/utility/ServiceProvidersScreen';
import DocumentUploadScreen from './src/screens/utility/DocumentUploadScreen';
import FinalFormScreen from './src/screens/utility/FinalFormScreen';
import CompanyFormationScreen from './src/screens/company/CompanyFormationScreen';
import GovernmentGrantsScreen from './src/screens/grants/GovernmentGrantsScreen';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F8FAFC' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F8FAFC' },
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Applications" component={ApplicationsScreen} />
      <Stack.Screen name="Documents" component={DocumentsScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="UtilityServices" component={UtilityServicesScreen} />
      <Stack.Screen name="ServiceProviders" component={ServiceProvidersScreen} />
      <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
      <Stack.Screen name="FinalForm" component={FinalFormScreen} />
      <Stack.Screen name="CompanyFormation" component={CompanyFormationScreen} />
      <Stack.Screen name="GovernmentGrants" component={GovernmentGrantsScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
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
          <StatusBar style="light" />
        </AuthProvider>
      </DocumentProvider>
    </ThemeProvider>
  );
}
