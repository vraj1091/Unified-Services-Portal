import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import professionalTheme from '../../theme/professionalTheme';

const CompanyFormationScreenPro = ({ navigation }) => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'gst',
      title: 'GST Registration',
      subtitle: 'जीएसटी पंजीकरण',
      description: 'Register for Goods and Services Tax',
      duration: '7-10 days',
      fee: '₹2,999',
      icon: '📋',
      color: '#3B82F6',
    },
    {
      id: 'pan',
      title: 'PAN Card',
      subtitle: 'पैन कार्ड',
      description: 'Permanent Account Number',
      duration: '5-7 days',
      fee: '₹499',
      icon: '💳',
      color: '#8B5CF6',
    },
    {
      id: 'tan',
      title: 'TAN Registration',
      subtitle: 'टैन पंजीकरण',
      description: 'Tax Deduction Account Number',
      duration: '7-10 days',
      fee: '₹1,499',
      icon: '🏦',
      color: '#10B981',
    },
    {
      id: 'company',
      title: 'Company Registration',
      subtitle: 'कंपनी पंजीकरण',
      description: 'Private Limited, LLP, OPC',
      duration: '15-20 days',
      fee: '₹9,999',
      icon: '🏢',
      color: '#F59E0B',
    },
    {
      id: 'trademark',
      title: 'Trademark Registration',
      subtitle: 'ट्रेडमार्क पंजीकरण',
      description: 'Protect your brand identity',
      duration: '12-18 months',
      fee: '₹6,999',
      icon: '®️',
      color: '#EF4444',
    },
    {
      id: 'msme',
      title: 'MSME Registration',
      subtitle: 'एमएसएमई पंजीकरण',
      description: 'Udyam Registration Certificate',
      duration: '1-2 days',
      fee: '₹999',
      icon: '🏭',
      color: '#06B6D4',
    },
  ];

  const features = [
    { title: 'Fast Processing', desc: 'Quick turnaround time', icon: '⚡' },
    { title: 'Secure', desc: 'Data protection', icon: '🔒' },
    { title: 'Affordable', desc: 'Best prices', icon: '💰' },
    { title: 'Support', desc: '24/7 assistance', icon: '💬' },
  ];

  const handleApply = (service) => {
    console.log('Applying for:', service.title);
    setSelectedService(service);
    // Navigate to application form or show modal
  };

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
          <Text style={styles.headerTitle}>Business Registration</Text>
          <Text style={styles.headerSubtitle}>व्यवसाय पंजीकरण</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <View style={styles.bannerIcon}>
            <Text style={styles.bannerIconText}>✨</Text>
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Quick & Easy Process</Text>
            <Text style={styles.bannerText}>
              Complete registration online with minimal documentation
            </Text>
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          {services.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <View style={[styles.serviceIcon, { backgroundColor: service.color + '15' }]}>
                  <Text style={styles.serviceIconText}>{service.icon}</Text>
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
                </View>
              </View>
              
              <Text style={styles.serviceDescription}>{service.description}</Text>
              
              <View style={styles.serviceDetails}>
                <View style={styles.serviceDetail}>
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{service.duration}</Text>
                </View>
                <View style={styles.serviceDetail}>
                  <Text style={styles.detailLabel}>Fee</Text>
                  <Text style={[styles.detailValue, { color: service.color }]}>
                    {service.fee}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity
                style={[styles.applyButton, { backgroundColor: service.color }]}
                onPress={() => handleApply(service)}
                activeOpacity={0.8}
              >
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>{feature.icon}</Text>
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Help Card */}
        <View style={styles.section}>
          <View style={styles.helpCard}>
            <View style={styles.helpContent}>
              <Text style={styles.helpIcon}>💡</Text>
              <View style={styles.helpText}>
                <Text style={styles.helpTitle}>Need Assistance?</Text>
                <Text style={styles.helpSubtitle}>
                  Our experts can guide you through the registration process
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
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: professionalTheme.colors.infoBg,
    marginHorizontal: professionalTheme.spacing.lg,
    marginTop: professionalTheme.spacing.xl,
    padding: professionalTheme.spacing.lg,
    borderRadius: professionalTheme.borderRadius.lg,
    borderWidth: 1,
    borderColor: professionalTheme.colors.info + '30',
  },
  bannerIcon: {
    width: 48,
    height: 48,
    borderRadius: professionalTheme.borderRadius.md,
    backgroundColor: professionalTheme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: professionalTheme.spacing.md,
  },
  bannerIconText: {
    fontSize: 24,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: professionalTheme.typography.h5,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.xs,
  },
  bannerText: {
    fontSize: professionalTheme.typography.bodySmall,
    color: professionalTheme.colors.textSecondary,
    lineHeight: 20,
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
  serviceCard: {
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.lg,
    padding: professionalTheme.spacing.lg,
    marginBottom: professionalTheme.spacing.lg,
    ...professionalTheme.shadows.md,
  },
  serviceHeader: {
    flexDirection: 'row',
    marginBottom: professionalTheme.spacing.md,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: professionalTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: professionalTheme.spacing.md,
  },
  serviceIconText: {
    fontSize: 28,
  },
  serviceInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  serviceTitle: {
    fontSize: professionalTheme.typography.h5,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.xs,
  },
  serviceSubtitle: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textSecondary,
  },
  serviceDescription: {
    fontSize: professionalTheme.typography.body,
    color: professionalTheme.colors.textSecondary,
    marginBottom: professionalTheme.spacing.lg,
    lineHeight: 22,
  },
  serviceDetails: {
    flexDirection: 'row',
    marginBottom: professionalTheme.spacing.lg,
    gap: professionalTheme.spacing.md,
  },
  serviceDetail: {
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
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: professionalTheme.spacing.md,
  },
  featureCard: {
    width: '48%',
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.lg,
    padding: professionalTheme.spacing.lg,
    alignItems: 'center',
    ...professionalTheme.shadows.sm,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: professionalTheme.borderRadius.md,
    backgroundColor: professionalTheme.colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: professionalTheme.spacing.md,
  },
  featureIconText: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: professionalTheme.typography.bodySmall,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.xs,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textSecondary,
    textAlign: 'center',
  },
  helpCard: {
    backgroundColor: professionalTheme.colors.successBg,
    borderRadius: professionalTheme.borderRadius.lg,
    padding: professionalTheme.spacing.xl,
    borderWidth: 1,
    borderColor: professionalTheme.colors.success + '30',
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

export default CompanyFormationScreenPro;
