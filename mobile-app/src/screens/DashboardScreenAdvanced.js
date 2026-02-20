import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import advancedTheme from '../theme/advancedTheme';

const { width } = Dimensions.get('window');

const DashboardScreenAdvanced = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('services');

  const services = [
    {
      id: 'utility',
      title: 'Utility Services',
      subtitle: 'Electricity, Gas, Water',
      icon: '⚡',
      color: '#3B82F6',
      gradient: ['#3B82F6', '#2563EB'],
      route: 'UtilityServices',
    },
    {
      id: 'company',
      title: 'Company Formation',
      subtitle: 'Business Registration',
      icon: '🏢',
      color: '#8B5CF6',
      gradient: ['#8B5CF6', '#7C3AED'],
      route: 'CompanyFormation',
    },
    {
      id: 'grants',
      title: 'Government Grants',
      subtitle: 'Schemes & Subsidies',
      icon: '💰',
      color: '#10B981',
      gradient: ['#10B981', '#059669'],
      route: 'GovernmentGrants',
    },
    {
      id: 'documents',
      title: 'My Documents',
      subtitle: 'View & Manage',
      icon: '📄',
      color: '#F59E0B',
      gradient: ['#F59E0B', '#D97706'],
      route: 'Documents',
    },
  ];

  const quickActions = [
    { id: 'applications', title: 'Applications', icon: '📋', route: 'Applications' },
    { id: 'profile', title: 'Profile', icon: '👤', route: 'Profile' },
    { id: 'support', title: 'Support', icon: '💬', route: 'Support' },
  ];

  const recentActivity = [
    { id: 1, title: 'Electricity Connection', status: 'In Progress', date: '2 days ago', progress: 60 },
    { id: 2, title: 'Document Uploaded', status: 'Completed', date: '5 days ago', progress: 100 },
    { id: 3, title: 'Grant Application', status: 'Pending', date: '1 week ago', progress: 30 },
  ];

  const stats = [
    { label: 'Active', value: '3', color: '#3B82F6' },
    { label: 'Completed', value: '12', color: '#10B981' },
    { label: 'Pending', value: '2', color: '#F59E0B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
          </View>
          <TouchableOpacity style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Services Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => navigation.navigate(service.route)}
                activeOpacity={0.8}
              >
                <View style={[styles.serviceIconContainer, { backgroundColor: service.color + '15' }]}>
                  <Text style={styles.serviceIcon}>{service.icon}</Text>
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
                <View style={styles.serviceArrow}>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => navigation.navigate(action.route)}
                activeOpacity={0.8}
              >
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Applications')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityLeft}>
                <View style={[
                  styles.activityDot,
                  { backgroundColor: activity.status === 'Completed' ? '#10B981' : activity.status === 'In Progress' ? '#3B82F6' : '#F59E0B' }
                ]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
              </View>
              <View style={styles.activityRight}>
                <Text style={[
                  styles.activityStatus,
                  { color: activity.status === 'Completed' ? '#10B981' : activity.status === 'In Progress' ? '#3B82F6' : '#F59E0B' }
                ]}>
                  {activity.status}
                </Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${activity.progress}%`, backgroundColor: activity.status === 'Completed' ? '#10B981' : '#3B82F6' }]} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Help Card */}
        <View style={styles.helpCard}>
          <View style={styles.helpContent}>
            <Text style={styles.helpIcon}>💡</Text>
            <View style={styles.helpText}>
              <Text style={styles.helpTitle}>Need Help?</Text>
              <Text style={styles.helpSubtitle}>Our support team is here to assist you</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => navigation.navigate('Support')}
          >
            <Text style={styles.helpButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: advancedTheme.colors.background,
  },
  header: {
    backgroundColor: advancedTheme.colors.surfaceElevated,
    paddingHorizontal: advancedTheme.spacing[4],
    paddingTop: advancedTheme.spacing[4],
    paddingBottom: advancedTheme.spacing[6],
    ...advancedTheme.shadows.sm,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: advancedTheme.spacing[6],
  },
  greeting: {
    fontSize: advancedTheme.typography.fontSize.sm,
    color: advancedTheme.colors.text.secondary,
    marginBottom: advancedTheme.spacing[1],
  },
  userName: {
    fontSize: advancedTheme.typography.fontSize['3xl'],
    fontWeight: advancedTheme.typography.fontWeight.bold,
    color: advancedTheme.colors.text.primary,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: advancedTheme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...advancedTheme.shadows.md,
  },
  avatarText: {
    fontSize: advancedTheme.typography.fontSize.xl,
    fontWeight: advancedTheme.typography.fontWeight.bold,
    color: advancedTheme.colors.text.inverse,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: advancedTheme.colors.error[500],
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: advancedTheme.colors.surfaceElevated,
  },
  notificationText: {
    fontSize: advancedTheme.typography.fontSize.xs,
    fontWeight: advancedTheme.typography.fontWeight.bold,
    color: advancedTheme.colors.text.inverse,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: advancedTheme.spacing[3],
  },
  statCard: {
    flex: 1,
    backgroundColor: advancedTheme.colors.surface,
    borderRadius: advancedTheme.borderRadius.md,
    padding: advancedTheme.spacing[4],
    alignItems: 'center',
  },
  statValue: {
    fontSize: advancedTheme.typography.fontSize['2xl'],
    fontWeight: advancedTheme.typography.fontWeight.bold,
    marginBottom: advancedTheme.spacing[1],
  },
  statLabel: {
    fontSize: advancedTheme.typography.fontSize.xs,
    color: advancedTheme.colors.text.secondary,
    fontWeight: advancedTheme.typography.fontWeight.medium,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: advancedTheme.spacing[4],
  },
  section: {
    marginTop: advancedTheme.spacing[6],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: advancedTheme.spacing[4],
  },
  sectionTitle: {
    fontSize: advancedTheme.typography.fontSize.xl,
    fontWeight: advancedTheme.typography.fontWeight.bold,
    color: advancedTheme.colors.text.primary,
    marginBottom: advancedTheme.spacing[4],
  },
  seeAllText: {
    fontSize: advancedTheme.typography.fontSize.sm,
    color: advancedTheme.colors.primary[600],
    fontWeight: advancedTheme.typography.fontWeight.semibold,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: advancedTheme.spacing[3],
  },
  serviceCard: {
    width: (width - advancedTheme.spacing[4] * 2 - advancedTheme.spacing[3]) / 2,
    backgroundColor: advancedTheme.colors.surfaceElevated,
    borderRadius: advancedTheme.borderRadius.lg,
    padding: advancedTheme.spacing[5],
    ...advancedTheme.shadows.md,
    position: 'relative',
  },
  serviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: advancedTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: advancedTheme.spacing[4],
  },
  serviceIcon: {
    fontSize: 28,
  },
  serviceTitle: {
    fontSize: advancedTheme.typography.fontSize.base,
    fontWeight: advancedTheme.typography.fontWeight.semibold,
    color: advancedTheme.colors.text.primary,
    marginBottom: advancedTheme.spacing[1],
  },
  serviceSubtitle: {
    fontSize: advancedTheme.typography.fontSize.xs,
    color: advancedTheme.colors.text.secondary,
    lineHeight: 16,
  },
  serviceArrow: {
    position: 'absolute',
    bottom: advancedTheme.spacing[4],
    right: advancedTheme.spacing[4],
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: advancedTheme.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 16,
    color: advancedTheme.colors.primary[600],
    fontWeight: advancedTheme.typography.fontWeight.bold,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: advancedTheme.spacing[3],
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: advancedTheme.colors.surfaceElevated,
    borderRadius: advancedTheme.borderRadius.md,
    padding: advancedTheme.spacing[4],
    alignItems: 'center',
    ...advancedTheme.shadows.sm,
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: advancedTheme.spacing[2],
  },
  quickActionTitle: {
    fontSize: advancedTheme.typography.fontSize.sm,
    fontWeight: advancedTheme.typography.fontWeight.medium,
    color: advancedTheme.colors.text.primary,
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: advancedTheme.colors.surfaceElevated,
    borderRadius: advancedTheme.borderRadius.md,
    padding: advancedTheme.spacing[4],
    marginBottom: advancedTheme.spacing[3],
    ...advancedTheme.shadows.sm,
  },
  activityLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: advancedTheme.spacing[3],
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: advancedTheme.typography.fontSize.base,
    fontWeight: advancedTheme.typography.fontWeight.semibold,
    color: advancedTheme.colors.text.primary,
    marginBottom: advancedTheme.spacing[1],
  },
  activityDate: {
    fontSize: advancedTheme.typography.fontSize.xs,
    color: advancedTheme.colors.text.secondary,
  },
  activityRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: advancedTheme.spacing[3],
  },
  activityStatus: {
    fontSize: advancedTheme.typography.fontSize.xs,
    fontWeight: advancedTheme.typography.fontWeight.semibold,
    marginBottom: advancedTheme.spacing[2],
  },
  progressBar: {
    width: 80,
    height: 4,
    backgroundColor: advancedTheme.colors.neutral[200],
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  helpCard: {
    backgroundColor: advancedTheme.colors.primary[50],
    borderRadius: advancedTheme.borderRadius.lg,
    padding: advancedTheme.spacing[5],
    marginTop: advancedTheme.spacing[6],
    borderWidth: 1,
    borderColor: advancedTheme.colors.primary[100],
  },
  helpContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: advancedTheme.spacing[4],
  },
  helpIcon: {
    fontSize: 40,
    marginRight: advancedTheme.spacing[3],
  },
  helpText: {
    flex: 1,
  },
  helpTitle: {
    fontSize: advancedTheme.typography.fontSize.lg,
    fontWeight: advancedTheme.typography.fontWeight.bold,
    color: advancedTheme.colors.text.primary,
    marginBottom: advancedTheme.spacing[1],
  },
  helpSubtitle: {
    fontSize: advancedTheme.typography.fontSize.sm,
    color: advancedTheme.colors.text.secondary,
    lineHeight: 20,
  },
  helpButton: {
    backgroundColor: advancedTheme.colors.primary[500],
    borderRadius: advancedTheme.borderRadius.md,
    paddingVertical: advancedTheme.spacing[3],
    alignItems: 'center',
    ...advancedTheme.shadows.sm,
  },
  helpButtonText: {
    fontSize: advancedTheme.typography.fontSize.base,
    fontWeight: advancedTheme.typography.fontWeight.semibold,
    color: advancedTheme.colors.text.inverse,
  },
});

export default DashboardScreenAdvanced;
