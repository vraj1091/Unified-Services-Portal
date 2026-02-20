import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import professionalTheme from '../theme/professionalTheme';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to logout?')) {
        logout();
      }
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', onPress: logout, style: 'destructive' },
        ]
      );
    }
  };

  const profileSections = [
    {
      title: 'Account',
      items: [
        { id: 'personal', label: 'Personal Information', icon: '👤', action: () => {} },
        { id: 'security', label: 'Security & Privacy', icon: '🔒', action: () => {} },
        { id: 'notifications', label: 'Notifications', icon: '🔔', action: () => {} },
      ],
    },
    {
      title: 'Services',
      items: [
        { id: 'applications', label: 'My Applications', icon: '📋', action: () => navigation.navigate('Applications') },
        { id: 'documents', label: 'My Documents', icon: '📄', action: () => navigation.navigate('Documents') },
        { id: 'payments', label: 'Payment History', icon: '💳', action: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 'help', label: 'Help Center', icon: '❓', action: () => navigation.navigate('Support') },
        { id: 'feedback', label: 'Send Feedback', icon: '💬', action: () => {} },
        { id: 'about', label: 'About', icon: 'ℹ️', action: () => {} },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={professionalTheme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Applications</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Documents</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    itemIndex !== section.items.length - 1 && styles.menuItemBorder
                  ]}
                  onPress={item.action}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <Text style={styles.menuIconText}>{item.icon}</Text>
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </View>
                  <Text style={styles.menuArrow}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 Gujarat Services</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: professionalTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: professionalTheme.spacing.lg,
    paddingVertical: professionalTheme.spacing.lg,
    backgroundColor: professionalTheme.colors.surface,
    ...professionalTheme.shadows.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: professionalTheme.colors.textPrimary,
    fontWeight: professionalTheme.typography.bold,
  },
  headerTitle: {
    fontSize: professionalTheme.typography.h4,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: professionalTheme.colors.surface,
    margin: professionalTheme.spacing.lg,
    borderRadius: professionalTheme.borderRadius.lg,
    padding: professionalTheme.spacing.xxl,
    alignItems: 'center',
    ...professionalTheme.shadows.md,
  },
  avatarLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: professionalTheme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: professionalTheme.spacing.lg,
    ...professionalTheme.shadows.lg,
  },
  avatarLargeText: {
    fontSize: 40,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textInverse,
  },
  userName: {
    fontSize: professionalTheme.typography.h3,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.xs,
  },
  userEmail: {
    fontSize: professionalTheme.typography.body,
    color: professionalTheme.colors.textSecondary,
    marginBottom: professionalTheme.spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: professionalTheme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: professionalTheme.colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: professionalTheme.colors.border,
  },
  statValue: {
    fontSize: professionalTheme.typography.h3,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.accent,
    marginBottom: professionalTheme.spacing.xs,
  },
  statLabel: {
    fontSize: professionalTheme.typography.bodySmall,
    color: professionalTheme.colors.textSecondary,
  },
  section: {
    paddingHorizontal: professionalTheme.spacing.lg,
    marginTop: professionalTheme.spacing.xl,
  },
  sectionTitle: {
    fontSize: professionalTheme.typography.bodySmall,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textSecondary,
    marginBottom: professionalTheme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.lg,
    overflow: 'hidden',
    ...professionalTheme.shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: professionalTheme.spacing.lg,
    paddingHorizontal: professionalTheme.spacing.lg,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: professionalTheme.colors.borderLight,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: professionalTheme.borderRadius.md,
    backgroundColor: professionalTheme.colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: professionalTheme.spacing.md,
  },
  menuIconText: {
    fontSize: 20,
  },
  menuLabel: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.medium,
    color: professionalTheme.colors.textPrimary,
  },
  menuArrow: {
    fontSize: 20,
    color: professionalTheme.colors.textTertiary,
    fontWeight: professionalTheme.typography.bold,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.lg,
    paddingVertical: professionalTheme.spacing.lg,
    borderWidth: 1.5,
    borderColor: professionalTheme.colors.error,
    ...professionalTheme.shadows.sm,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: professionalTheme.spacing.sm,
  },
  logoutText: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.error,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: professionalTheme.spacing.xxl,
  },
  versionText: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textTertiary,
    marginBottom: professionalTheme.spacing.xs,
  },
  copyrightText: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textTertiary,
  },
});

export default ProfileScreen;
