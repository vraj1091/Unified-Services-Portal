import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Animated,
} from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/colors';

const ServiceProvidersScreen = ({ navigation, route }) => {
  const { service } = route.params || {};
  const serviceType = service?.id || 'electricity';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);

  const providersData = {
    electricity: [
      { 
        id: 'dgvcl', 
        name: 'DGVCL', 
        fullName: 'Dakshin Gujarat Vij Company Limited', 
        coverage: 'South Gujarat',
        rating: 4.2,
        responseTime: '2-3 days',
        applications: '15,234'
      },
      { 
        id: 'torrent', 
        name: 'Torrent Power', 
        fullName: 'Torrent Power Limited', 
        coverage: 'Ahmedabad, Gandhinagar',
        rating: 4.5,
        responseTime: '1-2 days',
        applications: '28,456'
      },
      { 
        id: 'ugvcl', 
        name: 'UGVCL', 
        fullName: 'Uttar Gujarat Vij Company Limited', 
        coverage: 'North Gujarat',
        rating: 4.0,
        responseTime: '3-4 days',
        applications: '12,890'
      },
      { 
        id: 'mgvcl', 
        name: 'MGVCL', 
        fullName: 'Madhya Gujarat Vij Company Limited', 
        coverage: 'Central Gujarat',
        rating: 4.3,
        responseTime: '2-3 days',
        applications: '18,567'
      },
    ],
    gas: [
      { 
        id: 'ggl', 
        name: 'Gujarat Gas', 
        fullName: 'Gujarat Gas Limited', 
        coverage: 'All Gujarat',
        rating: 4.4,
        responseTime: '3-5 days',
        applications: '45,678'
      },
      { 
        id: 'adani', 
        name: 'Adani Gas', 
        fullName: 'Adani Total Gas Limited', 
        coverage: 'Major Cities',
        rating: 4.6,
        responseTime: '2-4 days',
        applications: '52,341'
      },
    ],
    water: [
      { 
        id: 'amc', 
        name: 'AMC Water', 
        fullName: 'Ahmedabad Municipal Corporation', 
        coverage: 'Ahmedabad',
        rating: 3.9,
        responseTime: '5-7 days',
        applications: '34,567'
      },
      { 
        id: 'smc', 
        name: 'SMC Water', 
        fullName: 'Surat Municipal Corporation', 
        coverage: 'Surat',
        rating: 4.1,
        responseTime: '4-6 days',
        applications: '29,876'
      },
      { 
        id: 'vmc', 
        name: 'VMC Water', 
        fullName: 'Vadodara Municipal Corporation', 
        coverage: 'Vadodara',
        rating: 4.0,
        responseTime: '5-7 days',
        applications: '21,234'
      },
    ],
    property: [
      { 
        id: 'amc-prop', 
        name: 'AMC Property', 
        fullName: 'Ahmedabad Municipal Corporation', 
        coverage: 'Ahmedabad',
        rating: 3.8,
        responseTime: '7-10 days',
        applications: '56,789'
      },
      { 
        id: 'smc-prop', 
        name: 'SMC Property', 
        fullName: 'Surat Municipal Corporation', 
        coverage: 'Surat',
        rating: 4.0,
        responseTime: '6-9 days',
        applications: '43,210'
      },
    ],
  };

  const currentProviders = providersData[serviceType] || providersData.electricity;

  const filteredProviders = currentProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.coverage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider.id);
    setTimeout(() => {
      navigation.navigate('DocumentUpload', {
        service,
        provider,
      });
    }, 200);
  };

  const getServiceTitle = () => {
    const titles = {
      electricity: 'Electricity Providers',
      gas: 'Gas Providers',
      water: 'Water Providers',
      property: 'Property Services',
    };
    return titles[serviceType] || 'Service Providers';
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('⯨');
    }
    
    return stars.join('');
  };

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
          <Text style={styles.headerTitle}>{getServiceTitle()}</Text>
          <Text style={styles.headerSubtitle}>{filteredProviders.length} providers available</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, area, or coverage..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.text.disabled}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentProviders.length}</Text>
            <Text style={styles.statLabel}>Providers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {currentProviders.reduce((sum, p) => sum + parseInt(p.applications.replace(/,/g, '')), 0).toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Applications</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {(currentProviders.reduce((sum, p) => sum + p.rating, 0) / currentProviders.length).toFixed(1)}
            </Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <View style={styles.infoBadge}>
            <Text style={styles.infoBadgeText}>TIP</Text>
          </View>
          <Text style={styles.infoText}>
            Choose a provider based on your location for faster processing
          </Text>
        </View>

        {/* Providers List */}
        <View style={styles.providersContainer}>
          <Text style={styles.sectionTitle}>Available Providers</Text>
          {filteredProviders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No providers found</Text>
              <Text style={styles.emptyText}>Try adjusting your search</Text>
            </View>
          ) : (
            filteredProviders.map((provider) => (
              <TouchableOpacity
                key={provider.id}
                onPress={() => handleProviderSelect(provider)}
                activeOpacity={0.7}
                style={[
                  styles.providerCard,
                  selectedProvider === provider.id && styles.providerCardSelected
                ]}
              >
                {/* Provider Header */}
                <View style={styles.providerHeader}>
                  <View style={styles.providerInitial}>
                    <Text style={styles.providerInitialText}>
                      {provider.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.providerInfo}>
                    <Text style={styles.providerName}>{provider.name}</Text>
                    <Text style={styles.providerFullName}>{provider.fullName}</Text>
                  </View>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingStars}>{renderRatingStars(provider.rating)}</Text>
                    <Text style={styles.ratingValue}>{provider.rating}</Text>
                  </View>
                </View>

                {/* Provider Details */}
                <View style={styles.providerDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Coverage</Text>
                    <Text style={styles.detailValue}>{provider.coverage}</Text>
                  </View>
                  <View style={styles.detailDivider} />
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Response Time</Text>
                    <Text style={styles.detailValue}>{provider.responseTime}</Text>
                  </View>
                  <View style={styles.detailDivider} />
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Applications</Text>
                    <Text style={styles.detailValue}>{provider.applications}</Text>
                  </View>
                </View>

                {/* Select Button */}
                <View style={styles.selectButton}>
                  <Text style={styles.selectButtonText}>Select Provider</Text>
                  <Text style={styles.selectButtonArrow}>→</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Need Help Choosing?</Text>
          <Text style={styles.helpText}>
            Our support team can help you select the right provider for your needs
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Support')}
            style={styles.helpButton}
          >
            <Text style={styles.helpButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
    ...shadows.sm,
  },
  backButton: {
    marginRight: spacing.sm,
    padding: spacing.xs,
  },
  backIcon: {
    fontSize: typography.h2,
    color: colors.primary.main,
    fontWeight: typography.bold,
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  searchIcon: {
    fontSize: typography.h4,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: typography.body,
    color: colors.text.primary,
  },
  clearIcon: {
    fontSize: typography.h4,
    color: colors.text.disabled,
    padding: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
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
    fontWeight: typography.medium,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.bg,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
  },
  infoBadge: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  infoBadgeText: {
    fontSize: typography.tiny,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  infoText: {
    flex: 1,
    fontSize: typography.small,
    color: colors.primary.dark,
    lineHeight: 18,
  },
  providersContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  providerCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.neutral.border,
    ...shadows.md,
  },
  providerCardSelected: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.bg,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  providerInitial: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  providerInitialText: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  providerFullName: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
  ratingBadge: {
    alignItems: 'center',
    backgroundColor: colors.neutral.bg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  ratingStars: {
    fontSize: typography.small,
    color: '#F59E0B',
    marginBottom: spacing.xs,
  },
  ratingValue: {
    fontSize: typography.small,
    fontWeight: typography.bold,
    color: colors.text.primary,
  },
  providerDetails: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.bg,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
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
    textAlign: 'center',
  },
  detailDivider: {
    width: 1,
    backgroundColor: colors.neutral.border,
    marginHorizontal: spacing.sm,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  selectButtonText: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.inverse,
  },
  selectButtonArrow: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  helpSection: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  helpTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  helpText: {
    fontSize: typography.small,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  helpButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.sm,
  },
  helpButtonText: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.inverse,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  emptyText: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
});

export default ServiceProvidersScreen;
