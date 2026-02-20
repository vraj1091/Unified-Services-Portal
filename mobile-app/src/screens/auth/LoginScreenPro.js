import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import professionalTheme from '../../theme/professionalTheme';

const LoginScreenPro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      if (Platform.OS === 'web') {
        alert('Please enter email and password');
      }
      return;
    }
    
    console.log('Login button clicked');
    const result = await login(email, password);
    
    if (!result.success) {
      if (Platform.OS === 'web') {
        alert(result.message || 'Login failed');
      }
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
            <Text style={styles.appName}>Gujarat Services</Text>
            <Text style={styles.tagline}>Your gateway to government services</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.subtitleText}>Sign in to continue</Text>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email address</Text>
              <View style={[
                styles.inputContainer,
                focusedField === 'email' && styles.inputContainerFocused
              ]}>
                <Text style={styles.inputIcon}>✉</Text>
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={professionalTheme.colors.textTertiary}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot?</Text>
                </TouchableOpacity>
              </View>
              <View style={[
                styles.inputContainer,
                focusedField === 'password' && styles.inputContainerFocused
              ]}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={professionalTheme.colors.textTertiary}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? '👁' : '👁‍🗨'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Sign in</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login */}
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <Text style={styles.socialIcon}>G</Text>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <Text style={styles.socialIcon}>📱</Text>
                <Text style={styles.socialText}>Phone</Text>
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signupSection}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signupLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.footerLink}>Terms</Text> and{' '}
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </Text>
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
    paddingTop: professionalTheme.spacing.xxxl * 2,
    paddingBottom: professionalTheme.spacing.xxxl,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: professionalTheme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: professionalTheme.spacing.lg,
    ...professionalTheme.shadows.md,
  },
  logoText: {
    fontSize: 32,
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
  welcomeText: {
    fontSize: professionalTheme.typography.h2,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.xs,
  },
  subtitleText: {
    fontSize: professionalTheme.typography.body,
    color: professionalTheme.colors.textSecondary,
    marginBottom: professionalTheme.spacing.xxl,
  },
  inputGroup: {
    marginBottom: professionalTheme.spacing.xl,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: professionalTheme.spacing.sm,
  },
  label: {
    fontSize: professionalTheme.typography.bodySmall,
    fontWeight: professionalTheme.typography.medium,
    color: professionalTheme.colors.textPrimary,
  },
  forgotText: {
    fontSize: professionalTheme.typography.bodySmall,
    fontWeight: professionalTheme.typography.medium,
    color: professionalTheme.colors.accent,
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
  inputContainerFocused: {
    borderColor: professionalTheme.colors.accent,
    ...professionalTheme.shadows.sm,
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
  loginButton: {
    backgroundColor: professionalTheme.colors.accent,
    borderRadius: professionalTheme.borderRadius.md,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: professionalTheme.spacing.md,
    ...professionalTheme.shadows.md,
  },
  loginButtonText: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textInverse,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: professionalTheme.spacing.xxl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: professionalTheme.colors.border,
  },
  dividerText: {
    fontSize: professionalTheme.typography.bodySmall,
    color: professionalTheme.colors.textTertiary,
    marginHorizontal: professionalTheme.spacing.lg,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: professionalTheme.spacing.md,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: professionalTheme.colors.border,
    height: 56,
    gap: professionalTheme.spacing.sm,
  },
  socialIcon: {
    fontSize: 20,
  },
  socialText: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.medium,
    color: professionalTheme.colors.textPrimary,
  },
  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: professionalTheme.spacing.xxl,
  },
  signupText: {
    fontSize: professionalTheme.typography.body,
    color: professionalTheme.colors.textSecondary,
  },
  signupLink: {
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

export default LoginScreenPro;
