import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import mobileTheme from '../theme/mobileTheme';
import InstallAppBanner from '../components/InstallAppBanner';

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();

  const displayName = user?.full_name || user?.name || 'Citizen';

  const services = [
    {
      id: 'utility',
      title: 'Utility Services',
      subtitle: 'Electricity, gas, water',
      icon: 'flash',
      route: 'UtilityServices',
    },
    {
      id: 'company',
      title: 'Company Formation',
      subtitle: 'Business registrations',
      icon: 'business',
      route: 'CompanyFormation',
    },
    {
      id: 'grants',
      title: 'Government Grants',
      subtitle: 'Schemes and subsidies',
      icon: 'cash',
      route: 'GovernmentGrants',
    },
    {
      id: 'documents',
      title: 'Document Vault',
      subtitle: 'Upload and manage',
      icon: 'folder',
      route: 'Documents',
      isTab: true,
    },
  ];

  const quickActions = [
    { id: 'applications', title: 'Applications', icon: 'layers', route: 'Applications' },
    { id: 'support', title: 'Support', icon: 'headset', route: 'Support' },
    { id: 'profile', title: 'Profile', icon: 'person', route: 'Profile' },
  ];

  const activity = [
    { id: 'a1', label: 'Electricity connection request', status: 'In Review', color: mobileTheme.colors.info },
    { id: 'a2', label: 'Proof of address uploaded', status: 'Completed', color: mobileTheme.colors.success },
    { id: 'a3', label: 'Startup grant pre-check', status: 'Pending', color: mobileTheme.colors.warning },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={['#1F4BC9', '#173A9F']} style={styles.hero}>
          <View>
            <Text style={styles.heroGreeting}>Welcome back</Text>
            <Text style={styles.heroName}>{displayName}</Text>
            <Text style={styles.heroSubtitle}>Unified services portal for Gujarat citizens</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.heroAvatar} activeOpacity={0.85}>
            <Text style={styles.heroAvatarText}>{displayName.charAt(0).toUpperCase()}</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.installWrap}>
          <InstallAppBanner />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>03</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>02</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Services</Text>
          <View style={styles.grid}>
            {services.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.serviceCard}
                onPress={() => navigation.navigate(item.route)}
                activeOpacity={0.85}
              >
                <View style={styles.serviceIconWrap}>
                  <Ionicons name={item.icon} size={22} color={mobileTheme.colors.primary} />
                </View>
                <Text style={styles.serviceTitle}>{item.title}</Text>
                <Text style={styles.serviceSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickRow}>
            {quickActions.map((item) => (
              <TouchableOpacity key={item.id} style={styles.quickCard} onPress={() => navigation.navigate(item.route)} activeOpacity={0.85}>
                <Ionicons name={item.icon} size={20} color={mobileTheme.colors.primary} />
                <Text style={styles.quickText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Applications')}>
              <Text style={styles.linkText}>View all</Text>
            </TouchableOpacity>
          </View>
          {activity.map((item) => (
            <View key={item.id} style={styles.activityCard}>
              <View style={[styles.activityDot, { backgroundColor: item.color }]} />
              <View style={styles.activityTextWrap}>
                <Text style={styles.activityLabel}>{item.label}</Text>
                <Text style={styles.activityStatus}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  scrollContent: {
    paddingBottom: mobileTheme.spacing.xxxl,
  },
  hero: {
    marginHorizontal: mobileTheme.spacing.lg,
    marginTop: mobileTheme.spacing.md,
    borderRadius: mobileTheme.radius.xl,
    padding: mobileTheme.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroGreeting: {
    color: '#D8E4FF',
    fontSize: mobileTheme.typography.small,
    marginBottom: 2,
  },
  heroName: {
    color: mobileTheme.colors.textOnPrimary,
    fontSize: mobileTheme.typography.h1,
    fontWeight: mobileTheme.typography.bold,
    marginBottom: mobileTheme.spacing.sm,
  },
  heroSubtitle: {
    color: '#DFE9FF',
    fontSize: mobileTheme.typography.small,
    maxWidth: 220,
    lineHeight: 20,
  },
  heroAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroAvatarText: {
    color: mobileTheme.colors.textOnPrimary,
    fontSize: mobileTheme.typography.h2,
    fontWeight: mobileTheme.typography.bold,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: mobileTheme.spacing.lg,
    marginTop: mobileTheme.spacing.md,
    gap: mobileTheme.spacing.md,
  },
  installWrap: {
    marginHorizontal: mobileTheme.spacing.lg,
    marginTop: mobileTheme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.lg,
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    ...mobileTheme.shadows.sm,
  },
  statValue: {
    fontSize: mobileTheme.typography.h2,
    fontWeight: mobileTheme.typography.bold,
    color: mobileTheme.colors.primary,
  },
  statLabel: {
    fontSize: mobileTheme.typography.caption,
    color: mobileTheme.colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginTop: mobileTheme.spacing.xl,
    paddingHorizontal: mobileTheme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: mobileTheme.typography.h3,
    color: mobileTheme.colors.textPrimary,
    fontWeight: mobileTheme.typography.bold,
    marginBottom: mobileTheme.spacing.md,
  },
  linkText: {
    fontSize: mobileTheme.typography.small,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.semibold,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: mobileTheme.spacing.md,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.lg,
    padding: mobileTheme.spacing.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    ...mobileTheme.shadows.sm,
  },
  serviceIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: mobileTheme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: mobileTheme.spacing.md,
  },
  serviceTitle: {
    fontSize: mobileTheme.typography.small,
    color: mobileTheme.colors.textPrimary,
    fontWeight: mobileTheme.typography.semibold,
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: mobileTheme.typography.caption,
    color: mobileTheme.colors.textSecondary,
    lineHeight: 16,
  },
  quickRow: {
    flexDirection: 'row',
    gap: mobileTheme.spacing.md,
  },
  quickCard: {
    flex: 1,
    borderRadius: mobileTheme.radius.lg,
    backgroundColor: mobileTheme.colors.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    paddingVertical: mobileTheme.spacing.lg,
    ...mobileTheme.shadows.sm,
  },
  quickText: {
    marginTop: mobileTheme.spacing.sm,
    fontSize: mobileTheme.typography.caption,
    fontWeight: mobileTheme.typography.medium,
    color: mobileTheme.colors.textPrimary,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    padding: mobileTheme.spacing.md,
    marginBottom: mobileTheme.spacing.sm,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: mobileTheme.spacing.md,
  },
  activityTextWrap: {
    flex: 1,
  },
  activityLabel: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.medium,
  },
  activityStatus: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
});

export default DashboardScreen;
