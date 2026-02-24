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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import mobileTheme from '../../theme/mobileTheme';
import InstallAppBanner from '../../components/InstallAppBanner';

const LoginScreenPro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Required', 'Please enter email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.message || 'Please try again.');
      return;
    }

    if (result.demoMode) {
      Alert.alert('Offline Mode', result.message || 'You are signed in without live backend connection.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.contentWrap}>
            <LinearGradient colors={['#214CC8', '#173A9F']} style={styles.hero}>
              <View style={styles.logoWrap}>
                <Ionicons name="shield-checkmark" size={28} color={mobileTheme.colors.textOnPrimary} />
              </View>
              <Text style={styles.heroTitle}>Gujarat Services Portal</Text>
              <Text style={styles.heroSubtitle}>Secure digital access to state government services</Text>
            </LinearGradient>

            <View style={styles.card}>
              <Text style={styles.title}>Sign In</Text>
              <Text style={styles.subtitle}>Enter credentials to continue</Text>

              <View style={styles.inputWrap}>
                <Ionicons name="mail-outline" size={18} color={mobileTheme.colors.textTertiary} />
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor={mobileTheme.colors.textTertiary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputWrap}>
                <Ionicons name="lock-closed-outline" size={18} color={mobileTheme.colors.textTertiary} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={mobileTheme.colors.textTertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} activeOpacity={0.8}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={mobileTheme.colors.textTertiary}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} activeOpacity={0.88} disabled={loading}>
                <Text style={styles.primaryButtonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
              </TouchableOpacity>

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>No account yet?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.footerLink}> Create account</Text>
                </TouchableOpacity>
              </View>
            </View>

            <InstallAppBanner />

            <Text style={styles.bottomText}>Government of Gujarat | Encrypted session</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: mobileTheme.spacing.lg,
    paddingVertical: mobileTheme.spacing.lg,
    justifyContent: 'center',
  },
  contentWrap: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
  hero: {
    borderRadius: mobileTheme.radius.xl,
    padding: mobileTheme.spacing.xl,
  },
  logoWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: mobileTheme.spacing.lg,
  },
  heroTitle: {
    color: mobileTheme.colors.textOnPrimary,
    fontSize: mobileTheme.typography.h2,
    fontWeight: mobileTheme.typography.bold,
  },
  heroSubtitle: {
    marginTop: mobileTheme.spacing.sm,
    color: '#E5ECFF',
    fontSize: mobileTheme.typography.small,
    lineHeight: 20,
  },
  card: {
    marginTop: -18,
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.xl,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    padding: mobileTheme.spacing.xl,
    ...mobileTheme.shadows.md,
  },
  title: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h2,
    fontWeight: mobileTheme.typography.bold,
  },
  subtitle: {
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
    marginTop: 4,
    marginBottom: mobileTheme.spacing.lg,
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
    height: 52,
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
  bottomText: {
    marginTop: mobileTheme.spacing.lg,
    textAlign: 'center',
    color: mobileTheme.colors.textTertiary,
    fontSize: mobileTheme.typography.caption,
  },
});

export default LoginScreenPro;
