# Mobile App Implementation Guide

## Current Status

### ✅ Completed
1. **Project Structure**
   - Modern file organization
   - Context providers (Auth, Theme)
   - Navigation setup
   - API service configuration

2. **Core Components**
   - Button component with variants
   - Theme system with colors and spacing
   - Auth context with login/register/logout

3. **Screens Created**
   - LoginScreen (fully functional with modern design)
   - Navigation structure for all screens

### 🚧 In Progress
The following screens need to be created. I've provided the structure and you can implement them following the same design patterns as the LoginScreen.

## Screen Implementation Guide

### 1. Register Screen (`src/screens/auth/RegisterScreen.js`)
**Design Pattern**: Similar to LoginScreen
**Fields**:
- Full Name
- Email
- Mobile Number
- City
- Password
- Confirm Password

**Features**:
- Form validation
- Password strength indicator
- Terms & conditions checkbox
- Navigate to Login after success

### 2. Dashboard Screen (`src/screens/DashboardScreen.js`)
**Sections**:
- Welcome banner with user info
- Quick stats cards (Applications, Pending, Completed, Notifications)
- Service categories (Utility, Company, Grants)
- Recent activity
- Quick actions

**Design Elements**:
- Gradient header
- Card-based layout
- Icons for each service
- Bottom navigation

### 3. Utility Services Screen (`src/screens/utility/UtilityServicesScreen.js`)
**Content**:
- Service type selection (Electricity, Gas, Water, Property)
- Service action (Name Change, New Connection)
- Beautiful cards with icons
- Navigation to provider selection

### 4. Service Providers Screen (`src/screens/utility/ServiceProvidersScreen.js`)
**Content**:
- List of service providers
- Provider details (name, logo, coverage)
- Select provider button
- Navigate to document upload

### 5. Document Upload Screen (`src/screens/utility/DocumentUploadScreen.js`)
**Features**:
- Step-by-step upload (Identity, Address, Name Change proof)
- Camera integration
- File picker
- AI extraction simulation
- Progress indicator
- Extracted data preview

**Implementation**:
```javascript
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

// Pick document
const pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: ['application/pdf', 'image/*'],
  });
  // Handle result
};

// Take photo
const takePhoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
  });
  // Handle result
};
```

### 6. Final Form Screen (`src/screens/utility/FinalFormScreen.js`)
**Features**:
- Pre-filled form with extracted data
- Editable fields
- Validation
- Submit button
- Success/Error handling

### 7. Company Formation Screen (`src/screens/company/CompanyFormationScreen.js`)
**Content**:
- Service cards (GST, TAN, PAN, Company Registration)
- Service details
- Requirements list
- Start application button

### 8. Government Grants Screen (`src/screens/grants/GovernmentGrantsScreen.js`)
**Content**:
- Featured: AI Grant Finder
- Grant categories
- Browse by category
- Statistics
- How it works section

### 9. Grant Category Screen (`src/screens/grants/GrantCategoryScreen.js`)
**Content**:
- List of grants in category
- Grant cards with amount and eligibility
- Filter options
- Search functionality

### 10. Grant Detail Screen (`src/screens/grants/GrantDetailScreen.js`)
**Content**:
- Grant information
- Eligibility criteria
- Required documents
- Application process
- Apply button

### 11. Profile Screen (`src/screens/ProfileScreen.js`)
**Content**:
- User information
- Edit profile
- Change password
- Settings
- Logout

### 12. Applications Screen (`src/screens/ApplicationsScreen.js`)
**Content**:
- List of all applications
- Filter by status
- Search
- Application cards with status
- Navigate to details

### 13. Documents Screen (`src/screens/DocumentsScreen.js`)
**Content**:
- Document library
- Categories
- Upload new document
- View/Download documents

### 14. Support Screen (`src/screens/SupportScreen.js`)
**Content**:
- FAQ section
- Contact support
- Help guides
- Video tutorials

## Component Library to Create

### 1. Card Component (`src/components/Card.js`)
```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style, shadow = true }) => {
  return (
    <View style={[styles.card, shadow && styles.shadow, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Card;
```

### 2. Input Component (`src/components/Input.js`)
```javascript
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Input = ({ label, error, icon, ...props }) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.slate[400]}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1E293B',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
});

export default Input;
```

### 3. Header Component (`src/components/Header.js`)
```javascript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, subtitle, showBack = false, rightAction }) => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: '#1E293B',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  rightAction: {
    marginLeft: 12,
  },
});

export default Header;
```

### 4. LoadingSpinner Component (`src/components/LoadingSpinner.js`)
```javascript
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563EB" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
  },
});

export default LoadingSpinner;
```

## API Services to Create

### 1. Application Service (`src/services/applicationService.js`)
```javascript
import api from './api';

export const applicationService = {
  getAll: async () => {
    const response = await api.get('/applications/');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/applications/', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/applications/${id}`, data);
    return response.data;
  },
};
```

### 2. Document Service (`src/services/documentService.js`)
```javascript
import api from './api';

export const documentService = {
  upload: async (file, type) => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });
    formData.append('document_type', type);
    
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/documents/');
    return response.data;
  },
};
```

## Next Steps

1. **Install Dependencies**
   ```bash
   cd mobile-app
   npm install
   ```

2. **Create Remaining Screens**
   - Follow the patterns from LoginScreen
   - Use the component library
   - Implement API calls

3. **Test Each Screen**
   - Test on iOS and Android
   - Check responsiveness
   - Verify API integration

4. **Add Animations**
   - Use react-native-reanimated
   - Add smooth transitions
   - Implement loading states

5. **Optimize Performance**
   - Memoize components
   - Optimize images
   - Reduce re-renders

6. **Deploy**
   - Build APK for Android
   - Build IPA for iOS
   - Submit to app stores

## Design Guidelines

### Colors
- Use theme colors consistently
- Primary for main actions
- Secondary for supporting actions
- Slate for text and borders

### Spacing
- Use 8px grid system
- Consistent padding (16, 24, 32)
- Proper margins between elements

### Typography
- Bold for headings
- Medium for labels
- Regular for body text

### Components
- Rounded corners (12-24px)
- Shadows for elevation
- Smooth animations
- Loading states

## Tips

1. **Reuse Components**: Create reusable components for common UI elements
2. **Consistent Styling**: Use the theme system for all colors and spacing
3. **Error Handling**: Always handle API errors gracefully
4. **Loading States**: Show loading indicators during async operations
5. **Validation**: Validate all user inputs before submission
6. **Accessibility**: Add proper labels and hints for screen readers
7. **Performance**: Optimize images and use FlatList for long lists
8. **Testing**: Test on both iOS and Android devices

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/)

---

**Happy Coding! 🚀**
