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

const grants = [
  { id: 'startup', title: 'Startup Gujarat Grant', description: 'Financial assistance for early-stage startups.', amount: 'Up to INR 10 Lakhs', eligibility: 'Startup under 2 years' },
  { id: 'msme', title: 'MSME Development Grant', description: 'Support for registered MSME modernization projects.', amount: 'Up to INR 25 Lakhs', eligibility: 'Registered MSME' },
  { id: 'export', title: 'Export Promotion Grant', description: 'Incentives for export readiness and market expansion.', amount: 'Up to INR 50 Lakhs', eligibility: 'Export-focused entities' },
  { id: 'women', title: 'Women Entrepreneur Grant', description: 'Special support for women-led enterprises.', amount: 'Up to INR 15 Lakhs', eligibility: 'Women promoters' },
  { id: 'tech', title: 'Technology Innovation Grant', description: 'Funding for innovative technology products.', amount: 'Up to INR 30 Lakhs', eligibility: 'Technology ventures' },
];

const GovernmentGrantsScreenPro = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGrants = useMemo(
    () => grants.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const handleApply = (grant) => {
    navigation.navigate('FinalForm', {
      service: { id: grant.id, title: grant.title },
      provider: { name: 'Government Grants Cell' },
      documents: {},
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={20} color={mobileTheme.colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerBody}>
          <Text style={styles.headerTitle}>Government Grants</Text>
          <Text style={styles.headerSubtitle}>Search and apply to active schemes</Text>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={mobileTheme.colors.textTertiary} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search grant schemes"
          placeholderTextColor={mobileTheme.colors.textTertiary}
          style={styles.searchInput}
        />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <Stat value="50+" label="Available" />
          <Stat value="12" label="Applied" />
          <Stat value="5" label="Approved" />
        </View>

        <View style={styles.list}>
          {filteredGrants.map((grant) => (
            <View key={grant.id} style={styles.card}>
              <View style={styles.cardHead}>
                <View style={styles.iconWrap}>
                  <Ionicons name="cash-outline" size={18} color={mobileTheme.colors.primary} />
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{grant.title}</Text>
                  <Text style={styles.cardDescription}>{grant.description}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <Meta label="Grant Value" value={grant.amount} />
                <Meta label="Eligibility" value={grant.eligibility} />
              </View>

              <TouchableOpacity style={styles.applyButton} onPress={() => handleApply(grant)} activeOpacity={0.86}>
                <Text style={styles.applyButtonText}>Apply Now</Text>
                <Ionicons name="arrow-forward" size={14} color={mobileTheme.colors.textOnPrimary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Stat = ({ value, label }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const Meta = ({ label, value }) => (
  <View style={styles.metaBox}>
    <Text style={styles.metaLabel}>{label}</Text>
    <Text numberOfLines={2} style={styles.metaValue}>{value}</Text>
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
  statsRow: {
    flexDirection: 'row',
    gap: mobileTheme.spacing.sm,
    marginHorizontal: mobileTheme.spacing.lg,
    marginTop: mobileTheme.spacing.lg,
  },
  statCard: {
    flex: 1,
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing.md,
  },
  statValue: {
    color: mobileTheme.colors.primary,
    fontSize: mobileTheme.typography.h2,
    fontWeight: mobileTheme.typography.bold,
  },
  statLabel: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  list: {
    padding: mobileTheme.spacing.lg,
  },
  card: {
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing.md,
    marginBottom: mobileTheme.spacing.md,
    ...mobileTheme.shadows.sm,
  },
  cardHead: {
    flexDirection: 'row',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.primarySoft,
    marginRight: mobileTheme.spacing.md,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  cardDescription: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
    lineHeight: 18,
  },
  metaRow: {
    marginTop: mobileTheme.spacing.md,
    flexDirection: 'row',
    gap: mobileTheme.spacing.sm,
  },
  metaBox: {
    flex: 1,
    borderRadius: mobileTheme.radius.md,
    backgroundColor: mobileTheme.colors.surfaceMuted,
    padding: mobileTheme.spacing.sm,
  },
  metaLabel: {
    color: mobileTheme.colors.textTertiary,
    fontSize: 11,
  },
  metaValue: {
    marginTop: 2,
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.caption,
    fontWeight: mobileTheme.typography.semibold,
  },
  applyButton: {
    marginTop: mobileTheme.spacing.md,
    borderRadius: mobileTheme.radius.md,
    backgroundColor: mobileTheme.colors.primary,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: mobileTheme.spacing.xs,
  },
  applyButtonText: {
    color: mobileTheme.colors.textOnPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
});

export default GovernmentGrantsScreenPro;
