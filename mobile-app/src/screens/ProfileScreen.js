import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../theme/colors';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const menuItems = [
    { title: 'Edit Profile', subtitle: 'Update your information', action: () => {} },
    { title: 'Change Password', subtitle: 'Update your password', action: () => {} },
    { title: 'My Applications', subtitle: 'View all applications', action: () => navigation.navigate('Applications') },
    { title: 'My Documents', subtitle: 'Manage documents', action: () => navigation.navigate('Documents') },
    { title: 'Notifications', subtitle: 'Manage notifications', action: () => {} },
    { title: 'Settings', subtitle: 'App preferences', action: () => {} },
    { title: 'Support', subtitle: 'Get help', action: () => navigation.navigate('Support') },
    { title: 'About', subtitle: 'App information', action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.full_name?.charAt(0) || 'U'}
              </Text>
            </View>
          </View>
          <Text style={styles.userName}>{user?.full_name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          <View style={styles.userInfoRow}>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Mobile</Text>
              <Text style={styles.userInfoText}>{user?.mobile || 'N/A'}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>City</Text>
              <Text style={styles.userInfoText}>{user?.city || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.action}
              style={styles.menuItem}
              activeOpacity={0.7}
            >
              <View style={styles.menuInitial}>
                <Text style={styles.menuInitialText}>
                  {item.title.charAt(0)}
                </Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 2.0.0</Text>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.neutral.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  backIcon: {
    fontSize: typography.h2,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.primary,
  },
  profileCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.h1,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  userName: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: typography.small,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  userInfoRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  userInfoItem: {
    alignItems: 'center',
    backgroundColor: colors.neutral.bg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  userInfoLabel: {
    fontSize: typography.tiny,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  userInfoText: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.primary,
  },
  menuContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  menuInitial: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuInitialText: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  menuSubtitle: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
  menuArrow: {
    fontSize: typography.h3,
    color: colors.neutral.divider,
    fontWeight: typography.bold,
  },
  logoutButton: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: colors.status.error,
  },
  logoutText: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.status.error,
  },
  versionText: {
    textAlign: 'center',
    fontSize: typography.tiny,
    color: colors.text.disabled,
    marginTop: spacing.lg,
  },
});

export default ProfileScreen;
