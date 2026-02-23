import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import mobileTheme from '../theme/mobileTheme';
import api from '../services/api';

const fallbackApplications = [
  {
    id: 1,
    service_type: 'electricity',
    provider: 'DGVCL',
    status: 'pending',
    created_at: '2026-01-15T10:30:00',
    application_number: 'APP001234',
  },
  {
    id: 2,
    service_type: 'company registration',
    provider: 'Corporate Affairs',
    status: 'processing',
    created_at: '2026-01-10T14:20:00',
    application_number: 'APP001235',
  },
];

const ApplicationsScreenPro = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchApplications = async () => {
    try {
      let remote = [];
      try {
        const response = await api.get('/api/applications/');
        remote = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        remote = [];
      }

      let local = [];
      try {
        const stored = await AsyncStorage.getItem('localApplications');
        local = stored ? JSON.parse(stored) : [];
      } catch (error) {
        local = [];
      }

      const seen = new Set();
      const merged = [...remote, ...local].filter((app) => {
        const uniqueKey =
          app?.application_number ||
          app?.applicationNo ||
          String(app?.id || `${app?.service_type || app?.service || 'service'}-${app?.created_at || app?.createdAt || ''}`);

        if (seen.has(uniqueKey)) {
          return false;
        }

        seen.add(uniqueKey);
        return true;
      });

      setApplications(merged.length ? merged : fallbackApplications);
    } catch (error) {
      setApplications(fallbackApplications);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchApplications();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchApplications();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    const normalized = (status || '').toLowerCase();
    if (normalized === 'completed' || normalized === 'approved') return mobileTheme.colors.success;
    if (normalized === 'processing' || normalized === 'in review') return mobileTheme.colors.info;
    if (normalized === 'rejected') return mobileTheme.colors.danger;
    return mobileTheme.colors.warning;
  };

  const getServiceIcon = (serviceType) => {
    const normalized = (serviceType || '').toLowerCase();
    if (normalized.includes('electric')) return 'flash';
    if (normalized.includes('water')) return 'water';
    if (normalized.includes('gas')) return 'flame';
    if (normalized.includes('company')) return 'business';
    if (normalized.includes('grant')) return 'cash';
    return 'document-text';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const filters = useMemo(() => {
    const statuses = ['all', ...new Set(applications.map((app) => (app.status || 'pending').toLowerCase()))];
    return statuses.map((statusKey) => ({
      key: statusKey,
      label: statusKey === 'all' ? 'All' : statusKey.charAt(0).toUpperCase() + statusKey.slice(1),
      count: statusKey === 'all'
        ? applications.length
        : applications.filter((app) => (app.status || '').toLowerCase() === statusKey).length,
    }));
  }, [applications]);

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true;
    return (app.status || '').toLowerCase() === filter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Applications</Text>
        <Text style={styles.headerSubtitle}>{applications.length} records</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => setFilter(item.key)}
            style={[styles.filterChip, filter === item.key && styles.filterChipActive]}
          >
            <Text style={[styles.filterChipText, filter === item.key && styles.filterChipTextActive]}>
              {item.label} ({item.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
        </View>
      ) : (
        <ScrollView
          style={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.listContent}>
            {filteredApplications.length === 0 ? (
              <View style={styles.emptyCard}>
                <Ionicons name="layers-outline" size={28} color={mobileTheme.colors.textTertiary} />
                <Text style={styles.emptyTitle}>No Applications</Text>
                <Text style={styles.emptyText}>Submit a new service request to see it here.</Text>
              </View>
            ) : (
              filteredApplications.map((app, index) => {
                const statusColor = getStatusColor(app.status);
                const serviceLabel = app.service_type || app.service || 'Service';
                const appNo = app.application_number || app.applicationNo || `APP${String(1000 + index)}`;

                return (
                  <View key={`${appNo}-${index}`} style={styles.card}>
                    <View style={styles.cardTop}>
                      <View style={styles.iconWrap}>
                        <Ionicons name={getServiceIcon(serviceLabel)} size={20} color={mobileTheme.colors.primary} />
                      </View>
                      <View style={styles.cardMain}>
                        <Text style={styles.appNo}>{appNo}</Text>
                        <Text style={styles.providerText}>{app.provider || 'Portal Service'}</Text>
                      </View>
                      <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                        <Text style={[styles.statusText, { color: statusColor }]}>
                          {(app.status || 'pending').toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.cardRow}>
                      <Info title="Service" value={serviceLabel} />
                      <Info title="Date" value={formatDate(app.created_at || app.createdAt)} />
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const Info = ({ title, value }) => (
  <View style={styles.infoBox}>
    <Text style={styles.infoLabel}>{title}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  header: {
    paddingHorizontal: mobileTheme.spacing.lg,
    paddingTop: mobileTheme.spacing.md,
    paddingBottom: mobileTheme.spacing.md,
  },
  headerTitle: {
    fontSize: mobileTheme.typography.h1,
    color: mobileTheme.colors.textPrimary,
    fontWeight: mobileTheme.typography.bold,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: mobileTheme.typography.small,
    color: mobileTheme.colors.textSecondary,
  },
  filterBar: {
    maxHeight: 52,
  },
  filterContent: {
    paddingHorizontal: mobileTheme.spacing.lg,
    alignItems: 'center',
    gap: mobileTheme.spacing.sm,
  },
  filterChip: {
    borderRadius: mobileTheme.radius.full,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    paddingHorizontal: mobileTheme.spacing.md,
    paddingVertical: mobileTheme.spacing.sm,
  },
  filterChipActive: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  filterChipText: {
    fontSize: mobileTheme.typography.caption,
    color: mobileTheme.colors.textSecondary,
    fontWeight: mobileTheme.typography.semibold,
  },
  filterChipTextActive: {
    color: mobileTheme.colors.textOnPrimary,
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: mobileTheme.spacing.lg,
  },
  card: {
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    padding: mobileTheme.spacing.md,
    marginBottom: mobileTheme.spacing.md,
    ...mobileTheme.shadows.sm,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: mobileTheme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: mobileTheme.spacing.md,
  },
  cardMain: {
    flex: 1,
  },
  appNo: {
    fontSize: mobileTheme.typography.body,
    color: mobileTheme.colors.textPrimary,
    fontWeight: mobileTheme.typography.semibold,
  },
  providerText: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  statusBadge: {
    borderRadius: mobileTheme.radius.full,
    paddingHorizontal: mobileTheme.spacing.sm,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: mobileTheme.typography.bold,
  },
  cardRow: {
    marginTop: mobileTheme.spacing.md,
    flexDirection: 'row',
    gap: mobileTheme.spacing.sm,
  },
  infoBox: {
    flex: 1,
    borderRadius: mobileTheme.radius.md,
    padding: mobileTheme.spacing.sm,
    backgroundColor: mobileTheme.colors.surfaceMuted,
  },
  infoLabel: {
    fontSize: 11,
    color: mobileTheme.colors.textTertiary,
  },
  infoValue: {
    marginTop: 2,
    fontSize: mobileTheme.typography.small,
    color: mobileTheme.colors.textPrimary,
    fontWeight: mobileTheme.typography.medium,
  },
  emptyCard: {
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    paddingVertical: mobileTheme.spacing.xxxl,
    alignItems: 'center',
  },
  emptyTitle: {
    marginTop: mobileTheme.spacing.md,
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h3,
    fontWeight: mobileTheme.typography.semibold,
  },
  emptyText: {
    marginTop: mobileTheme.spacing.xs,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
  },
});

export default ApplicationsScreenPro;
