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
import { colors, spacing, typography, borderRadius, shadows } from '../theme/colors';
import api from '../services/api';

const ApplicationsScreen = ({ navigation }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/api/applications/');
      setApplications(response.data || []);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      // Mock data for demo
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
      pending: { bg: '#FEF3C7', text: '#92400E' },
      processing: { bg: '#DBEAFE', text: '#1E40AF' },
      completed: { bg: '#D1FAE5', text: '#065F46' },
      rejected: { bg: '#FEE2E2', text: '#991B1B' },
    };
    return statusColors[status] || statusColors.pending;
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Applications</Text>
          <Text style={styles.headerSubtitle}>{applications.length} total applications</Text>
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
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

      {/* Applications List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.applicationsContainer}>
          {filteredApplications.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No Applications Found</Text>
              <Text style={styles.emptyText}>
                You haven't submitted any applications yet
              </Text>
            </View>
          ) : (
            filteredApplications.map((app) => {
              const statusStyle = getStatusColor(app.status);
              return (
                <TouchableOpacity
                  key={app.id}
                  style={styles.applicationCard}
                  activeOpacity={0.7}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.serviceInitial}>
                      <Text style={styles.serviceInitialText}>
                        {app.service_type.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.cardHeaderContent}>
                      <Text style={styles.applicationNumber}>
                        {app.application_number}
                      </Text>
                      <Text style={styles.providerName}>{app.provider}</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: statusStyle.bg },
                      ]}
                    >
                      <Text
                        style={[styles.statusText, { color: statusStyle.text }]}
                      >
                        {app.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardDivider} />

                  <View style={styles.cardFooter}>
                    <View style={styles.footerItem}>
                      <Text style={styles.footerLabel}>Date:</Text>
                      <Text style={styles.footerText}>
                        {formatDate(app.created_at)}
                      </Text>
                    </View>
                    <View style={styles.footerItem}>
                      <Text style={styles.footerLabel}>Type:</Text>
                      <Text style={styles.footerText}>
                        {app.service_type.charAt(0).toUpperCase() +
                          app.service_type.slice(1)}
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
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: typography.tiny,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  filtersContainer: {
    backgroundColor: colors.neutral.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  filtersContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.neutral.bg,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  filterText: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.secondary,
  },
  filterTextActive: {
    color: colors.text.inverse,
  },
  applicationsContainer: {
    padding: spacing.md,
  },
  applicationCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceInitial: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  serviceInitialText: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  cardHeaderContent: {
    flex: 1,
  },
  applicationNumber: {
    fontSize: typography.body,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  providerName: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: typography.tiny,
    fontWeight: typography.bold,
    textTransform: 'capitalize',
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.neutral.border,
    marginVertical: spacing.md,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: typography.small,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },
  footerText: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.small,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default ApplicationsScreen;
