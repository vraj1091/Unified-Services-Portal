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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mobileTheme from '../../theme/mobileTheme';
import { useAuth } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  const update = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleRegister = async () => {
    const { full_name, email, mobile, city, password, confirmPassword } = formData;

    if (!full_name || !email || !mobile || !city || !password || !confirmPassword) {
      Alert.alert('Required', 'Please complete all fields.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Password and confirm password must match.');
      return;
    }

    setLoading(true);
    const result = await register({
      full_name,
      email,
      mobile,
      city,
      password,
    });
    setLoading(false);

    if (!result.success) {
      Alert.alert('Registration Failed', result.message || 'Please try again.');
      return;
    }

    Alert.alert('Account Created', 'Registration completed successfully.', [
      { text: 'Continue', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={20} color={mobileTheme.colors.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Account</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Citizen Registration</Text>
            <Text style={styles.cardSubTitle}>Set up your profile to access services</Text>

            <Field icon="person-outline">
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor={mobileTheme.colors.textTertiary}
                value={formData.full_name}
                onChangeText={(v) => update('full_name', v)}
              />
            </Field>

            <Field icon="mail-outline">
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={mobileTheme.colors.textTertiary}
                value={formData.email}
                onChangeText={(v) => update('email', v)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Field>

            <Field icon="call-outline">
              <TextInput
                style={styles.input}
                placeholder="Mobile number"
                placeholderTextColor={mobileTheme.colors.textTertiary}
                value={formData.mobile}
                onChangeText={(v) => update('mobile', v)}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </Field>

            <Field icon="location-outline">
              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor={mobileTheme.colors.textTertiary}
                value={formData.city}
                onChangeText={(v) => update('city', v)}
              />
            </Field>

            <Field icon="lock-closed-outline">
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={mobileTheme.colors.textTertiary}
                value={formData.password}
                onChangeText={(v) => update('password', v)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} activeOpacity={0.8}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={mobileTheme.colors.textTertiary}
                />
              </TouchableOpacity>
            </Field>

            <Field icon="shield-checkmark-outline">
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor={mobileTheme.colors.textTertiary}
                value={formData.confirmPassword}
                onChangeText={(v) => update('confirmPassword', v)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            </Field>

            <TouchableOpacity style={styles.primaryButton} onPress={handleRegister} activeOpacity={0.88} disabled={loading}>
              <Text style={styles.primaryButtonText}>{loading ? 'Creating account...' : 'Create Account'}</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already registered?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerLink}> Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const Field = ({ icon, children }) => (
  <View style={styles.inputWrap}>
    <Ionicons name={icon} size={18} color={mobileTheme.colors.textTertiary} />
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: mobileTheme.spacing.lg,
    paddingBottom: mobileTheme.spacing.xxl,
  },
  header: {
    marginTop: mobileTheme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.primarySoft,
    marginRight: mobileTheme.spacing.sm,
  },
  headerTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h2,
    fontWeight: mobileTheme.typography.bold,
  },
  card: {
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.xl,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    padding: mobileTheme.spacing.xl,
    ...mobileTheme.shadows.md,
  },
  cardTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h2,
    fontWeight: mobileTheme.typography.bold,
  },
  cardSubTitle: {
    color: mobileTheme.colors.textSecondary,
    marginTop: 4,
    marginBottom: mobileTheme.spacing.lg,
    fontSize: mobileTheme.typography.small,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.radius.md,
    paddingHorizontal: mobileTheme.spacing.md,
    backgroundColor: mobileTheme.colors.surfaceMuted,
    marginBottom: mobileTheme.spacing.md,
    height: 50,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: mobileTheme.spacing.sm,
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.body,
  },
  primaryButton: {
    marginTop: mobileTheme.spacing.sm,
    height: 52,
    borderRadius: mobileTheme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.primary,
    ...mobileTheme.shadows.sm,
  },
  primaryButtonText: {
    color: mobileTheme.colors.textOnPrimary,
    fontSize: mobileTheme.typography.body,
    fontWeight: mobileTheme.typography.semibold,
  },
  footerRow: {
    marginTop: mobileTheme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
  },
  footerLink: {
    color: mobileTheme.colors.primary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
});

export default RegisterScreen;
