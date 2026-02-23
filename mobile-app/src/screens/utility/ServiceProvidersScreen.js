import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mobileTheme from '../../theme/mobileTheme';

const providersData = {
  electricity: [
    { id: 'dgvcl', name: 'DGVCL', fullName: 'Dakshin Gujarat Vij Company Ltd', coverage: 'South Gujarat', rating: 4.2, responseTime: '2-3 days', applications: '15,234' },
    { id: 'torrent', name: 'Torrent Power', fullName: 'Torrent Power Ltd', coverage: 'Ahmedabad, Gandhinagar', rating: 4.5, responseTime: '1-2 days', applications: '28,456' },
    { id: 'ugvcl', name: 'UGVCL', fullName: 'Uttar Gujarat Vij Company Ltd', coverage: 'North Gujarat', rating: 4.0, responseTime: '3-4 days', applications: '12,890' },
  ],
  gas: [
    { id: 'ggl', name: 'Gujarat Gas', fullName: 'Gujarat Gas Ltd', coverage: 'All Gujarat', rating: 4.4, responseTime: '3-5 days', applications: '45,678' },
    { id: 'adani', name: 'Adani Gas', fullName: 'Adani Total Gas Ltd', coverage: 'Major Cities', rating: 4.6, responseTime: '2-4 days', applications: '52,341' },
  ],
  water: [
    { id: 'amc', name: 'AMC Water', fullName: 'Ahmedabad Municipal Corporation', coverage: 'Ahmedabad', rating: 3.9, responseTime: '5-7 days', applications: '34,567' },
    { id: 'smc', name: 'SMC Water', fullName: 'Surat Municipal Corporation', coverage: 'Surat', rating: 4.1, responseTime: '4-6 days', applications: '29,876' },
  ],
  property: [
    { id: 'amc-prop', name: 'AMC Property', fullName: 'Ahmedabad Municipal Corporation', coverage: 'Ahmedabad', rating: 3.8, responseTime: '7-10 days', applications: '56,789' },
    { id: 'smc-prop', name: 'SMC Property', fullName: 'Surat Municipal Corporation', coverage: 'Surat', rating: 4.0, responseTime: '6-9 days', applications: '43,210' },
  ],
};

const ServiceProvidersScreen = ({ navigation, route }) => {
  const { service } = route.params || {};
  const serviceType = service?.id || 'electricity';
  const [searchQuery, setSearchQuery] = useState('');

  const providers = providersData[serviceType] || providersData.electricity;

  const filteredProviders = useMemo(
    () => providers.filter((provider) => {
      const query = searchQuery.toLowerCase();
      return (
        provider.name.toLowerCase().includes(query) ||
        provider.fullName.toLowerCase().includes(query) ||
        provider.coverage.toLowerCase().includes(query)
      );
    }),
    [providers, searchQuery]
  );

  const title = `${service?.title || 'Service'} Providers`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={20} color={mobileTheme.colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerBody}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>{filteredProviders.length} providers available</Text>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={mobileTheme.colors.textTertiary} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search providers or area"
          placeholderTextColor={mobileTheme.colors.textTertiary}
          style={styles.searchInput}
        />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {filteredProviders.map((provider) => (
            <TouchableOpacity
              key={provider.id}
              style={styles.providerCard}
              activeOpacity={0.86}
              onPress={() => navigation.navigate('DocumentUpload', { service, provider })}
            >
              <View style={styles.rowTop}>
                <View style={styles.logoWrap}>
                  <Text style={styles.logoText}>{provider.name.charAt(0)}</Text>
                </View>
                <View style={styles.providerBody}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <Text style={styles.providerSub} numberOfLines={1}>{provider.fullName}</Text>
                </View>
                <View style={styles.ratingWrap}>
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text style={styles.ratingText}>{provider.rating}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Detail title="Coverage" value={provider.coverage} />
                <Detail title="Response" value={provider.responseTime} />
                <Detail title="Requests" value={provider.applications} />
              </View>

              <View style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select Provider</Text>
                <Ionicons name="arrow-forward" size={14} color={mobileTheme.colors.textOnPrimary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Detail = ({ title, value }) => (
  <View style={styles.detailBox}>
    <Text style={styles.detailTitle}>{title}</Text>
    <Text style={styles.detailValue}>{value}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: mobileTheme.spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.primarySoft,
  },
  headerBody: {
    flex: 1,
  },
  headerTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h2,
    fontWeight: mobileTheme.typography.bold,
  },
  headerSubtitle: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  searchWrap: {
    marginHorizontal: mobileTheme.spacing.lg,
    marginTop: mobileTheme.spacing.md,
    borderRadius: mobileTheme.radius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    paddingHorizontal: mobileTheme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: mobileTheme.spacing.sm,
    color: mobileTheme.colors.textPrimary,
  },
  scroll: {
    flex: 1,
  },
  list: {
    padding: mobileTheme.spacing.lg,
  },
  providerCard: {
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing.md,
    marginBottom: mobileTheme.spacing.md,
    ...mobileTheme.shadows.sm,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.primary,
    marginRight: mobileTheme.spacing.md,
  },
  logoText: {
    color: mobileTheme.colors.textOnPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.bold,
  },
  providerBody: {
    flex: 1,
  },
  providerName: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  providerSub: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.caption,
    fontWeight: mobileTheme.typography.semibold,
  },
  detailRow: {
    marginTop: mobileTheme.spacing.md,
    flexDirection: 'row',
    gap: mobileTheme.spacing.sm,
  },
  detailBox: {
    flex: 1,
    borderRadius: mobileTheme.radius.md,
    backgroundColor: mobileTheme.colors.surfaceMuted,
    padding: mobileTheme.spacing.sm,
  },
  detailTitle: {
    color: mobileTheme.colors.textTertiary,
    fontSize: 11,
  },
  detailValue: {
    marginTop: 2,
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.caption,
    fontWeight: mobileTheme.typography.semibold,
  },
  selectButton: {
    marginTop: mobileTheme.spacing.md,
    backgroundColor: mobileTheme.colors.primary,
    borderRadius: mobileTheme.radius.md,
    paddingVertical: mobileTheme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: mobileTheme.spacing.xs,
  },
  selectButtonText: {
    color: mobileTheme.colors.textOnPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
});

export default ServiceProvidersScreen;
