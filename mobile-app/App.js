import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { DocumentProvider } from './src/context/DocumentContext';

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
        cardStyle: { backgroundColor: '#F8FAFC' },
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Applications" component={ApplicationsScreenPro} />
      <Stack.Screen name="Documents" component={DocumentsScreenPro} />
      <Stack.Screen name="Support" component={SupportScreen} />
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
