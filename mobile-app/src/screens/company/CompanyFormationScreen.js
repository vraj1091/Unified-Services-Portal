import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/colors';

const CompanyFormationScreen = ({ navigation }) => {
  const services = [
    {
      id: 'gst',
      title: 'GST Registration',
      subtitle: 'जीएसटी पंजीकरण',
      description: 'Register for Goods and Services Tax',
      duration: '7-10 days',
      fee: '₹2,999',
    },
    {
      id: 'pan',
      title: 'PAN Card',
      subtitle: 'पैन कार्ड',
      description: 'Permanent Account Number',
      duration: '5-7 days',
      fee: '₹499',
    },
    {
      id: 'tan',
      title: 'TAN Registration',
      subtitle: 'टैन पंजीकरण',
      description: 'Tax Deduction Account Number',
      duration: '7-10 days',
      fee: '₹1,499',
    },
    {
      id: 'company',
      title: 'Company Registration',
      subtitle: 'कंपनी पंजीकरण',
      description: 'Private Limited, LLP, OPC',
      duration: '15-20 days',
      fee: '₹9,999',
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
          <Text style={styles.headerTitle}>Business Registration</Text>
          <Text style={styles.headerSubtitle}>व्यवसाय पंजीकरण</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>Quick & Easy Process</Text>
          <Text style={styles.infoText}>
            Complete registration online with minimal documentation
          </Text>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => {
                console.log('Selected:', service.title);
              }}
              activeOpacity={0.7}
              style={styles.serviceCard}
            >
              <View style={styles.serviceHeader}>
                <View style={styles.serviceInitial}>
                  <Text style={styles.serviceInitialText}>
                    {service.title.charAt(0)}
                  </Text>
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
                  <Text style={styles.serviceDescription}>
                    {service.description}
                  </Text>
                </View>
              </View>
              <View style={styles.serviceFooter}>
                <View style={styles.serviceDetail}>
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{service.duration}</Text>
                </View>
                <View style={styles.serviceDetail}>
                  <Text style={styles.detailLabel}>Fee</Text>
                  <Text style={styles.detailValue}>{service.fee}</Text>
                </View>
                <View style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>Apply</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <View style={styles.featuresGrid}>
            {[
              { title: 'Fast Processing', desc: 'Quick turnaround time' },
              { title: 'Secure', desc: 'Data protection' },
              { title: 'Affordable', desc: 'Best prices' },
              { title: 'Support', desc: '24/7 assistance' },
            ].map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureInitial}>
                  <Text style={styles.featureInitialText}>
                    {feature.title.charAt(0)}
                  </Text>
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
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
  infoBanner: {
    backgroundColor: colors.primary.bg,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
  },
  infoTitle: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.primary.main,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: typography.small,
    color: colors.primary.main,
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
  serviceCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  serviceHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  serviceInitial: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  serviceInitialText: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  serviceSubtitle: {
    fontSize: typography.tiny,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  serviceDescription: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
  serviceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  serviceDetail: {
    flex: 1,
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  applyButtonText: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.inverse,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  featureCard: {
    width: '48%',
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    margin: spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  featureInitial: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  featureInitialText: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  featureTitle: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  featureDesc: {
    fontSize: typography.tiny,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default CompanyFormationScreen;
