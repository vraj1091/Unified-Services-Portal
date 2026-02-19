import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/colors';

const GovernmentGrantsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const grants = [
    {
      id: 'startup',
      title: 'Startup Gujarat Grant',
      subtitle: 'स्टार्टअप गुजरात अनुदान',
      description: 'Financial assistance for new startups',
      amount: 'Up to ₹10 Lakhs',
      eligibility: 'New startups < 2 years',
    },
    {
      id: 'msme',
      title: 'MSME Development Grant',
      subtitle: 'एमएसएमई विकास अनुदान',
      description: 'Support for small & medium enterprises',
      amount: 'Up to ₹25 Lakhs',
      eligibility: 'Registered MSMEs',
    },
    {
      id: 'export',
      title: 'Export Promotion Grant',
      subtitle: 'निर्यात प्रोत्साहन अनुदान',
      description: 'Incentives for export businesses',
      amount: 'Up to ₹50 Lakhs',
      eligibility: 'Export businesses',
    },
    {
      id: 'women',
      title: 'Women Entrepreneur Grant',
      subtitle: 'महिला उद्यमी अनुदान',
      description: 'Special grants for women-led businesses',
      amount: 'Up to ₹15 Lakhs',
      eligibility: 'Women entrepreneurs',
    },
    {
      id: 'tech',
      title: 'Technology Innovation Grant',
      subtitle: 'प्रौद्योगिकी नवाचार अनुदान',
      description: 'Funding for tech innovation',
      amount: 'Up to ₹30 Lakhs',
      eligibility: 'Tech startups',
    },
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
          <Text style={styles.headerTitle}>Government Grants</Text>
          <Text style={styles.headerSubtitle}>सरकारी अनुदान</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search grants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {[
            { label: 'Available', value: '50+' },
            { label: 'Applied', value: '12' },
            { label: 'Approved', value: '5' },
          ].map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Grants List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Grants</Text>
          {grants.map((grant) => (
            <TouchableOpacity
              key={grant.id}
              onPress={() => {
                console.log('Selected grant:', grant.title);
              }}
              activeOpacity={0.7}
              style={styles.grantCard}
            >
              <View style={styles.grantHeader}>
                <View style={styles.grantInitial}>
                  <Text style={styles.grantInitialText}>
                    {grant.title.charAt(0)}
                  </Text>
                </View>
                <View style={styles.grantInfo}>
                  <Text style={styles.grantTitle}>{grant.title}</Text>
                  <Text style={styles.grantSubtitle}>{grant.subtitle}</Text>
                  <Text style={styles.grantDescription}>
                    {grant.description}
                  </Text>
                </View>
              </View>
              <View style={styles.grantDetails}>
                <View style={styles.grantDetail}>
                  <Text style={styles.detailLabel}>Amount</Text>
                  <Text style={styles.detailValue}>{grant.amount}</Text>
                </View>
                <View style={styles.grantDetail}>
                  <Text style={styles.detailLabel}>Eligibility</Text>
                  <Text style={styles.detailValue}>{grant.eligibility}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Help Section */}
        <View style={styles.section}>
          <View style={styles.helpCard}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
              Our experts can help you find and apply for the right grants
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Support')}
              style={styles.helpButton}
            >
              <Text style={styles.helpButtonText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>

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
  searchContainer: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  searchInput: {
    height: 50,
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.body,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  statValue: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.primary.main,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.tiny,
    color: colors.text.secondary,
    fontWeight: typography.semibold,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  grantCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  grantHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  grantInitial: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  grantInitialText: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  grantInfo: {
    flex: 1,
  },
  grantTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  grantSubtitle: {
    fontSize: typography.tiny,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  grantDescription: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
  grantDetails: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  grantDetail: {
    flex: 1,
    backgroundColor: colors.neutral.bg,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
  },
  detailLabel: {
    fontSize: typography.tiny,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  detailValue: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.primary,
  },
  applyButton: {
    backgroundColor: colors.primary.main,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.inverse,
  },
  helpCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  helpTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  helpText: {
    fontSize: typography.small,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  helpButton: {
    backgroundColor: colors.primary.main,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  helpButtonText: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.inverse,
  },
});

export default GovernmentGrantsScreen;
