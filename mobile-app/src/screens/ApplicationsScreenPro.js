import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  StatusBar,
  Dimensions,
} from 'react-native';
import professionalTheme from '../theme/professionalTheme';
import api from '../services/api';

const { width } = Dimensions.get('window');

const ApplicationsScreenPro = ({ navigation }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications/');
      setApplications(response.data || []);
    } catch (error) {
      setApplications([
        {
          id: 1,
          service_type: 'electricity',
          provider: 'DGVCL',
          status: 'pending',
          created_at: '2024-02-15T10:30:00',
          application_number: 'APP001234',
        },
        {
          id: 2,
          service_type: 'gas',
          provider: 'Gujarat Gas',
          status: 'completed',
          created_at: '2024-02-10T14:20:00',
          application_number: 'APP001235',
        },
        {
          id: 3,
          service_type: 'water',
          provider: 'AMC Water',
          status: 'processing',
          created_at: '2024-02-18T09:15:00',
          application_number: 'APP001236',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchApplications();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: professionalTheme.colors.warning,
      processing: professionalTheme.colors.info,
      completed: professionalTheme.colors.success,
      rejected: professionalTheme.colors.error,
    };
    return statusColors[status] || professionalTheme.colors.warning;
  };

  const getServiceIcon = (serviceType) => {
    const icons = {
      electricity: '⚡',
      gas: '🔥',
      water: '💧',
      default: '📄',
    };
    return icons[serviceType] || icons.default;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  const filters = [
    { key: 'all', label: 'All', count: applications.length },
    { key: 'pending', label: 'Pending', count: applications.filter(a => a.status === 'pending').length },
    { key: 'processing', label: 'Processing', count: applications.filter(a => a.status === 'processing').length },
    { key: 'completed', label: 'Completed', count: applications.filter(a => a.status === 'completed').length },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={professionalTheme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Applications</Text>
          <Text style={styles.headerSubtitle}>{applications.length} total applications</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((f) => (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[
                styles.filterChip,
                filter === f.key && styles.filterChipActive,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f.key && styles.filterTextActive,
                ]}
              >
                {f.label} ({f.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Applications List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.applicationsContainer}>
          {filteredApplications.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Text style={styles.emptyIconText}>📋</Text>
              </View>
              <Text style={styles.emptyTitle}>No Applications Found</Text>
              <Text style={styles.emptyText}>
                You haven't submitted any applications yet
              </Text>
            </View>
          ) : (
            filteredApplications.map((app) => {
              const statusColor = getStatusColor(app.status);
              const serviceIcon = getServiceIcon(app.service_type);
              
              return (
                <TouchableOpacity
                  key={app.id}
                  style={styles.applicationCard}
                  activeOpacity={0.8}
                >
                  <View style={styles.cardTop}>
                    <View style={styles.cardLeft}>
                      <View style={styles.serviceIconContainer}>
                        <Text style={styles.serviceIconText}>{serviceIcon}</Text>
                      </View>
                      <View style={styles.cardInfo}>
                        <Text style={styles.applicationNumber}>
                          {app.application_number}
                        </Text>
                        <Text style={styles.providerName}>{app.provider}</Text>
                      </View>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
                      <Text style={[styles.statusText, { color: statusColor }]}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardDivider} />

                  <View style={styles.cardBottom}>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Date</Text>
                      <Text style={styles.infoValue}>
                        {formatDate(app.created_at)}
                      </Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Type</Text>
                      <Text style={styles.infoValue}>
                        {app.service_type.charAt(0).toUpperCase() + app.service_type.slice(1)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
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
  headerContent: {
    flex: 1,
    marginLeft: professionalTheme.spacing.sm,
  },
  headerTitle: {
    fontSize: professionalTheme.typography.h4,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textSecondary,
    marginTop: professionalTheme.spacing.xs,
  },
  filtersSection: {
    backgroundColor: professionalTheme.colors.surface,
    paddingVertical: professionalTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: professionalTheme.colors.borderLight,
  },
  filtersContent: {
    paddingHorizontal: professionalTheme.spacing.lg,
    gap: professionalTheme.spacing.sm,
  },
  filterChip: {
    paddingHorizontal: professionalTheme.spacing.lg,
    paddingVertical: professionalTheme.spacing.md,
    borderRadius: professionalTheme.borderRadius.full,
    backgroundColor: professionalTheme.colors.backgroundDark,
    borderWidth: 1.5,
    borderColor: professionalTheme.colors.border,
    marginRight: professionalTheme.spacing.sm,
  },
  filterChipActive: {
    backgroundColor: professionalTheme.colors.accent,
    borderColor: professionalTheme.colors.accent,
  },
  filterText: {
    fontSize: professionalTheme.typography.bodySmall,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textSecondary,
  },
  filterTextActive: {
    color: professionalTheme.colors.textInverse,
  },
  scrollView: {
    flex: 1,
  },
  applicationsContainer: {
    padding: professionalTheme.spacing.lg,
  },
  applicationCard: {
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.lg,
    padding: professionalTheme.spacing.lg,
    marginBottom: professionalTheme.spacing.md,
    ...professionalTheme.shadows.md,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: professionalTheme.borderRadius.md,
    backgroundColor: professionalTheme.colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: professionalTheme.spacing.md,
  },
  serviceIconText: {
    fontSize: 28,
  },
  cardInfo: {
    flex: 1,
  },
  applicationNumber: {
    fontSize: professionalTheme.typography.h5,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.xs,
  },
  providerName: {
    fontSize: professionalTheme.typography.bodySmall,
    color: professionalTheme.colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: professionalTheme.spacing.md,
    paddingVertical: professionalTheme.spacing.sm,
    borderRadius: professionalTheme.borderRadius.md,
  },
  statusText: {
    fontSize: professionalTheme.typography.caption,
    fontWeight: professionalTheme.typography.bold,
  },
  cardDivider: {
    height: 1,
    backgroundColor: professionalTheme.colors.borderLight,
    marginVertical: professionalTheme.spacing.lg,
  },
  cardBottom: {
    flexDirection: 'row',
    gap: professionalTheme.spacing.xxl,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textSecondary,
    marginBottom: professionalTheme.spacing.xs,
    fontWeight: professionalTheme.typography.medium,
  },
  infoValue: {
    fontSize: professionalTheme.typography.bodySmall,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textPrimary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: professionalTheme.colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: professionalTheme.spacing.xl,
  },
  emptyIconText: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: professionalTheme.typography.h3,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.sm,
  },
  emptyText: {
    fontSize: professionalTheme.typography.body,
    color: professionalTheme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default ApplicationsScreenPro;
