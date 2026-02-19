import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../theme/colors';
import api from '../services/api';

const DashboardScreen = ({ navigation }) => {
  const { user, logout, demoMode } = useAuth();
  const [stats, setStats] = useState({
    applications: 0,
    pending: 0,
    completed: 0,
    notifications: 2,
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      if (demoMode) {
        setStats({
          applications: 5,
          pending: 2,
          completed: 3,
          notifications: 2,
        });
        return;
      }

      const response = await api.get('/applications/');
      const applications = response.data || [];
      const pending = applications.filter(a => ['pending', 'draft', 'processing'].includes(a.status)).length;
      const completed = applications.filter(a => a.status === 'completed').length;

      setStats({
        applications: applications.length,
        pending: pending,
        completed: completed,
        notifications: 2,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error.message);
      setStats({
        applications: 0,
        pending: 0,
        completed: 0,
        notifications: 0,
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    setRefreshing(false);
  };

  const services = [
    {
      id: 'utility',
      title: 'Utility Services',
      description: 'Electricity, Gas, Water & Property',
      screen: 'UtilityServices',
    },
    {
      id: 'company',
      title: 'Business Registration',
      description: 'GST, TAN, PAN & Company',
      screen: 'CompanyFormation',
    },
    {
      id: 'grants',
      title: 'Government Grants',
      description: 'Startup, MSME & Export',
      screen: 'GovernmentGrants',
    },
  ];

  const quickActions = [
    { title: 'Applications', screen: 'Applications' },
    { title: 'Documents', screen: 'Documents' },
    { title: 'Profile', screen: 'Profile' },
    { title: 'Support', screen: 'Support' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Demo Mode Banner */}
        {demoMode && (
          <View style={styles.demoBanner}>
            <Text style={styles.demoText}>Demo Mode • Offline</Text>
          </View>
        )}

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.userName}>{user?.full_name || 'User'}</Text>
            <Text style={styles.userCity}>{user?.city || 'Gujarat'}</Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.applications}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.notifications}</Text>
            <Text style={styles.statLabel}>Alerts</Text>
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => navigation.navigate(service.screen)}
              style={styles.serviceCard}
              activeOpacity={0.7}
            >
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <Text style={styles.serviceArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(action.screen)}
                style={styles.actionCard}
                activeOpacity={0.7}
              >
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.bg,
  },
  demoBanner: {
    backgroundColor: colors.status.warning,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  demoText: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.inverse,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  greeting: {
    fontSize: typography.small,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  userCity: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
  logoutButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  logoutText: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.secondary,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  statValue: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.tiny,
    fontWeight: typography.medium,
    color: colors.text.secondary,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  serviceDescription: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
  serviceArrow: {
    fontSize: typography.h3,
    color: colors.primary.main,
    fontWeight: typography.bold,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  actionTitle: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.primary,
  },
});

export default DashboardScreen;
