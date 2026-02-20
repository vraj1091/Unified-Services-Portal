import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  StatusBar,
} from 'react-native';
import professionalTheme from '../../theme/professionalTheme';

const GovernmentGrantsScreenPro = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedInput, setFocusedInput] = useState(false);

  const grants = [
    {
      id: 'startup',
      title: 'Startup Gujarat Grant',
      subtitle: 'स्टार्टअप गुजरात अनुदान',
      description: 'Financial assistance for new startups',
      amount: 'Up to ₹10 Lakhs',
      eligibility: 'New startups < 2 years',
      color: '#3B82F6',
    },
    {
      id: 'msme',
      title: 'MSME Development Grant',
      subtitle: 'एमएसएमई विकास अनुदान',
      description: 'Support for small & medium enterprises',
      amount: 'Up to ₹25 Lakhs',
      eligibility: 'Registered MSMEs',
      color: '#8B5CF6',
    },
    {
      id: 'export',
      title: 'Export Promotion Grant',
      subtitle: 'निर्यात प्रोत्साहन अनुदान',
      description: 'Incentives for export businesses',
      amount: 'Up to ₹50 Lakhs',
      eligibility: 'Export businesses',
      color: '#10B981',
    },
    {
      id: 'women',
      title: 'Women Entrepreneur Grant',
      subtitle: 'महिला उद्यमी अनुदान',
      description: 'Special grants for women-led businesses',
      amount: 'Up to ₹15 Lakhs',
      eligibility: 'Women entrepreneurs',
      color: '#F59E0B',
    },
    {
      id: 'tech',
      title: 'Technology Innovation Grant',
      subtitle: 'प्रौद्योगिकी नवाचार अनुदान',
      description: 'Funding for tech innovation',
      amount: 'Up to ₹30 Lakhs',
      eligibility: 'Tech startups',
      color: '#EF4444',
    },
  ];

  const stats = [
    { label: 'Available', value: '50+', color: professionalTheme.colors.accent },
    { label: 'Applied', value: '12', color: professionalTheme.colors.info },
    { label: 'Approved', value: '5', color: professionalTheme.colors.success },
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
          <Text style={styles.headerTitle}>Government Grants</Text>
          <Text style={styles.headerSubtitle}>सरकारी अनुदान</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[
            styles.searchInputContainer,
            focusedInput && styles.searchInputContainerFocused
          ]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search grants..."
              placeholderTextColor={professionalTheme.colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
            />
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Grants List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Grants</Text>
          {grants.map((grant) => (
            <View key={grant.id} style={styles.grantCard}>
              <View style={styles.grantHeader}>
                <View style={[styles.grantIcon, { backgroundColor: grant.color + '15' }]}>
                  <Text style={styles.grantIconText}>💰</Text>
                </View>
                <View style={styles.grantInfo}>
                  <Text style={styles.grantTitle}>{grant.title}</Text>
                  <Text style={styles.grantSubtitle}>{grant.subtitle}</Text>
                </View>
              </View>
              
              <Text style={styles.grantDescription}>{grant.description}</Text>
              
              <View style={styles.grantDetails}>
                <View style={styles.grantDetail}>
                  <Text style={styles.detailLabel}>Amount</Text>
                  <Text style={[styles.detailValue, { color: grant.color }]}>
                    {grant.amount}
                  </Text>
                </View>
                <View style={styles.grantDetail}>
                  <Text style={styles.detailLabel}>Eligibility</Text>
                  <Text style={styles.detailValue}>{grant.eligibility}</Text>
                </View>
              </View>
              
              <TouchableOpacity
                style={[styles.applyButton, { backgroundColor: grant.color }]}
                activeOpacity={0.8}
              >
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Help Section */}
        <View style={styles.section}>
          <View style={styles.helpCard}>
            <View style={styles.helpContent}>
              <Text style={styles.helpIcon}>💡</Text>
              <View style={styles.helpText}>
                <Text style={styles.helpTitle}>Need Help?</Text>
                <Text style={styles.helpSubtitle}>
                  Our experts can help you find and apply for the right grants
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Support')}
              style={styles.helpButton}
              activeOpacity={0.8}
            >
              <Text style={styles.helpButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
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
  searchContainer: {
    paddingHorizontal: professionalTheme.spacing.lg,
    paddingTop: professionalTheme.spacing.xl,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: professionalTheme.colors.border,
    paddingHorizontal: professionalTheme.spacing.lg,
    height: 56,
    ...professionalTheme.shadows.sm,
  },
  searchInputContainerFocused: {
    borderColor: professionalTheme.colors.accent,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: professionalTheme.spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: professionalTheme.typography.body,
    color: professionalTheme.colors.textPrimary,
    height: '100%',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: professionalTheme.spacing.lg,
    paddingTop: professionalTheme.spacing.xl,
    gap: professionalTheme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.lg,
    padding: professionalTheme.spacing.lg,
    alignItems: 'center',
    ...professionalTheme.shadows.sm,
  },
  statValue: {
    fontSize: professionalTheme.typography.h2,
    fontWeight: professionalTheme.typography.bold,
    marginBottom: professionalTheme.spacing.xs,
  },
  statLabel: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textSecondary,
    fontWeight: professionalTheme.typography.medium,
  },
  section: {
    paddingHorizontal: professionalTheme.spacing.lg,
    marginTop: professionalTheme.spacing.xl,
  },
  sectionTitle: {
    fontSize: professionalTheme.typography.h4,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.lg,
  },
  grantCard: {
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.lg,
    padding: professionalTheme.spacing.lg,
    marginBottom: professionalTheme.spacing.lg,
    ...professionalTheme.shadows.md,
  },
  grantHeader: {
    flexDirection: 'row',
    marginBottom: professionalTheme.spacing.md,
  },
  grantIcon: {
    width: 56,
    height: 56,
    borderRadius: professionalTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: professionalTheme.spacing.md,
  },
  grantIconText: {
    fontSize: 28,
  },
  grantInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  grantTitle: {
    fontSize: professionalTheme.typography.h5,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.xs,
  },
  grantSubtitle: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textSecondary,
  },
  grantDescription: {
    fontSize: professionalTheme.typography.body,
    color: professionalTheme.colors.textSecondary,
    marginBottom: professionalTheme.spacing.lg,
    lineHeight: 22,
  },
  grantDetails: {
    flexDirection: 'row',
    marginBottom: professionalTheme.spacing.lg,
    gap: professionalTheme.spacing.md,
  },
  grantDetail: {
    flex: 1,
    backgroundColor: professionalTheme.colors.backgroundDark,
    borderRadius: professionalTheme.borderRadius.md,
    padding: professionalTheme.spacing.md,
  },
  detailLabel: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textSecondary,
    marginBottom: professionalTheme.spacing.xs,
    fontWeight: professionalTheme.typography.medium,
  },
  detailValue: {
    fontSize: professionalTheme.typography.bodySmall,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textPrimary,
  },
  applyButton: {
    backgroundColor: professionalTheme.colors.accent,
    borderRadius: professionalTheme.borderRadius.md,
    paddingVertical: professionalTheme.spacing.lg,
    alignItems: 'center',
    ...professionalTheme.shadows.sm,
  },
  applyButtonText: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textInverse,
  },
  helpCard: {
    backgroundColor: professionalTheme.colors.infoBg,
    borderRadius: professionalTheme.borderRadius.lg,
    padding: professionalTheme.spacing.xl,
    borderWidth: 1,
    borderColor: professionalTheme.colors.info + '30',
  },
  helpContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: professionalTheme.spacing.lg,
  },
  helpIcon: {
    fontSize: 40,
    marginRight: professionalTheme.spacing.md,
  },
  helpText: {
    flex: 1,
  },
  helpTitle: {
    fontSize: professionalTheme.typography.h5,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.xs,
  },
  helpSubtitle: {
    fontSize: professionalTheme.typography.bodySmall,
    color: professionalTheme.colors.textSecondary,
    lineHeight: 20,
  },
  helpButton: {
    backgroundColor: professionalTheme.colors.accent,
    borderRadius: professionalTheme.borderRadius.md,
    paddingVertical: professionalTheme.spacing.lg,
    alignItems: 'center',
    ...professionalTheme.shadows.sm,
  },
  helpButtonText: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textInverse,
  },
});

export default GovernmentGrantsScreenPro;
