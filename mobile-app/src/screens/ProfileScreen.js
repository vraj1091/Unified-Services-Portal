import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import mobileTheme from '../theme/mobileTheme';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const displayName = user?.full_name || user?.name || 'Citizen';

  const runLogout = async () => {
    try {
      await logout();
    } catch (error) {
      // Auth context already handles state reset; keep this non-blocking.
    }
  };

  const handleLogout = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.confirm === 'function') {
      const confirmed = window.confirm('Do you want to logout from this account?');
      if (confirmed) {
        runLogout();
      }
      return;
    }

    Alert.alert('Logout', 'Do you want to logout from this account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: runLogout },
    ]);
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        { key: 'personal', label: 'Personal Information', icon: 'person-circle-outline' },
        { key: 'security', label: 'Security & Privacy', icon: 'shield-checkmark-outline' },
      ],
    },
    {
      title: 'Services',
      items: [
        { key: 'applications', label: 'My Applications', icon: 'layers-outline', action: () => navigation.navigate('Applications') },
        { key: 'documents', label: 'My Documents', icon: 'folder-outline', action: () => navigation.navigate('Documents') },
        { key: 'support', label: 'Support', icon: 'headset-outline', action: () => navigation.navigate('Support') },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Text style={styles.headerSubtitle}>Manage your account and preferences</Text>
        </View>

        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          <Text style={styles.userMeta}>{user?.city || 'Ahmedabad'} • {user?.mobile || '9876543210'}</Text>
        </View>

        <View style={styles.statsRow}>
          <Stat label="Applications" value="12" />
          <Stat label="Documents" value="8" />
          <Stat label="Active" value="3" />
        </View>

        {menuSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.key}
                  style={[styles.menuItem, index !== section.items.length - 1 && styles.menuBorder]}
                  activeOpacity={0.82}
                  onPress={item.action || (() => {})}
                >
                  <View style={styles.menuLeft}>
                    <Ionicons name={item.icon} size={18} color={mobileTheme.colors.primary} />
                    <Text style={styles.menuText}>{item.label}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={mobileTheme.colors.textTertiary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.86}>
            <Ionicons name="log-out-outline" size={18} color={mobileTheme.colors.textOnPrimary} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Version 2.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const Stat = ({ label, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  scroll: {
    flex: 1,
  },
  header: {
    paddingHorizontal: mobileTheme.spacing.lg,
    paddingTop: mobileTheme.spacing.md,
  },
  headerTitle: {
    fontSize: mobileTheme.typography.h1,
    fontWeight: mobileTheme.typography.bold,
    color: mobileTheme.colors.textPrimary,
  },
  headerSubtitle: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
  },
  userCard: {
    marginHorizontal: mobileTheme.spacing.lg,
    marginTop: mobileTheme.spacing.lg,
    borderRadius: mobileTheme.radius.xl,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    alignItems: 'center',
    padding: mobileTheme.spacing.xl,
    ...mobileTheme.shadows.sm,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing.md,
  },
  avatarText: {
    color: mobileTheme.colors.textOnPrimary,
    fontSize: mobileTheme.typography.h1,
    fontWeight: mobileTheme.typography.bold,
  },
  userName: {
    fontSize: mobileTheme.typography.h2,
    fontWeight: mobileTheme.typography.bold,
    color: mobileTheme.colors.textPrimary,
  },
  userEmail: {
    marginTop: 2,
    fontSize: mobileTheme.typography.small,
    color: mobileTheme.colors.textSecondary,
  },
  userMeta: {
    marginTop: 2,
    fontSize: mobileTheme.typography.caption,
    color: mobileTheme.colors.textTertiary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: mobileTheme.spacing.sm,
    marginHorizontal: mobileTheme.spacing.lg,
    marginTop: mobileTheme.spacing.md,
  },
  statCard: {
    flex: 1,
    borderRadius: mobileTheme.radius.lg,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing.md,
  },
  statValue: {
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.bold,
    fontSize: mobileTheme.typography.h2,
  },
  statLabel: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  section: {
    marginTop: mobileTheme.spacing.lg,
    paddingHorizontal: mobileTheme.spacing.lg,
  },
  sectionTitle: {
    marginBottom: mobileTheme.spacing.sm,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: mobileTheme.typography.semibold,
  },
  sectionCard: {
    borderRadius: mobileTheme.radius.lg,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    minHeight: 52,
    paddingHorizontal: mobileTheme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: mobileTheme.spacing.sm,
  },
  menuText: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.medium,
  },
  logoutButton: {
    borderRadius: mobileTheme.radius.md,
    backgroundColor: mobileTheme.colors.danger,
    paddingVertical: mobileTheme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: mobileTheme.spacing.sm,
  },
  logoutText: {
    color: mobileTheme.colors.textOnPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  versionText: {
    marginTop: mobileTheme.spacing.xl,
    marginBottom: mobileTheme.spacing.xxxl,
    textAlign: 'center',
    color: mobileTheme.colors.textTertiary,
    fontSize: mobileTheme.typography.caption,
  },
});

export default ProfileScreen;
