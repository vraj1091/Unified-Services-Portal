import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import professionalTheme from '../../theme/professionalTheme';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile: '',
    city: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!formData.full_name || !formData.email || !formData.mobile || !formData.city || !formData.password) {
      Alert.alert('Required Fields', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await register({
      full_name: formData.full_name,
      email: formData.email,
      mobile: formData.mobile,
      city: formData.city,
      password: formData.password,
    });
    setLoading(false);

    if (result.success) {
      const message = result.message || 'Registration successful! Please login.';
      Alert.alert('Success', message, [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } else {
      Alert.alert('Registration Failed', result.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={professionalTheme.colors.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>GS</Text>
            </View>
            <Text style={styles.appName}>Create Account</Text>
            <Text style={styles.tagline}>Join Gujarat Services Portal</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={professionalTheme.colors.textTertiary}
                value={formData.full_name}
                onChangeText={(text) => setFormData({ ...formData, full_name: text })}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>✉</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                placeholderTextColor={professionalTheme.colors.textTertiary}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Mobile */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>📱</Text>
              <TextInput
                style={styles.input}
                placeholder="10-digit mobile number"
                placeholderTextColor={professionalTheme.colors.textTertiary}
                value={formData.mobile}
                onChangeText={(text) => setFormData({ ...formData, mobile: text })}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          {/* City */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>📍</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your city"
                placeholderTextColor={professionalTheme.colors.textTertiary}
                value={formData.city}
                onChangeText={(text) => setFormData({ ...formData, city: text })}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Minimum 6 characters"
                placeholderTextColor={professionalTheme.colors.textTertiary}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '👁' : '👁‍🗨'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Re-enter password"
                placeholderTextColor={professionalTheme.colors.textTertiary}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            style={[styles.registerButton, loading && styles.registerButtonDisabled]}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.footerLink}>Terms</Text> and{' '}
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: professionalTheme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: professionalTheme.spacing.xl,
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: professionalTheme.spacing.xxxl,
    paddingBottom: professionalTheme.spacing.xxl,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: professionalTheme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: professionalTheme.spacing.lg,
    ...professionalTheme.shadows.md,
  },
  logoText: {
    fontSize: 28,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textInverse,
  },
  appName: {
    fontSize: professionalTheme.typography.h3,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.xs,
  },
  tagline: {
    fontSize: professionalTheme.typography.bodySmall,
    color: professionalTheme.colors.textSecondary,
  },
  formSection: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: professionalTheme.spacing.lg,
  },
  label: {
    fontSize: professionalTheme.typography.bodySmall,
    fontWeight: professionalTheme.typography.medium,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: professionalTheme.colors.border,
    paddingHorizontal: professionalTheme.spacing.lg,
    height: 56,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: professionalTheme.spacing.md,
  },
  input: {
    flex: 1,
    fontSize: professionalTheme.typography.body,
    color: professionalTheme.colors.textPrimary,
    height: '100%',
  },
  eyeButton: {
    padding: professionalTheme.spacing.sm,
  },
  eyeIcon: {
    fontSize: 20,
  },
  registerButton: {
    backgroundColor: professionalTheme.colors.accent,
    borderRadius: professionalTheme.borderRadius.md,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: professionalTheme.spacing.md,
    ...professionalTheme.shadows.md,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textInverse,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: professionalTheme.spacing.xl,
  },
  loginText: {
    fontSize: professionalTheme.typography.body,
    color: professionalTheme.colors.textSecondary,
  },
  loginLink: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.accent,
  },
  footer: {
    paddingVertical: professionalTheme.spacing.xxl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    color: professionalTheme.colors.accent,
    fontWeight: professionalTheme.typography.medium,
  },
});

export default RegisterScreen;
