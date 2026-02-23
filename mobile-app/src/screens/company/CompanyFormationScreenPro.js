import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mobileTheme from '../../theme/mobileTheme';

const services = [
  { id: 'gst', title: 'GST Registration', description: 'Goods and Services Tax account activation', duration: '7-10 days', fee: 'INR 2,999', icon: 'receipt-outline' },
  { id: 'pan', title: 'PAN Registration', description: 'Business PAN issuance and setup', duration: '5-7 days', fee: 'INR 499', icon: 'card-outline' },
  { id: 'tan', title: 'TAN Registration', description: 'Tax Deduction Account Number setup', duration: '7-10 days', fee: 'INR 1,499', icon: 'document-lock-outline' },
  { id: 'company', title: 'Company Incorporation', description: 'Private Limited, LLP, OPC incorporation', duration: '15-20 days', fee: 'INR 9,999', icon: 'business-outline' },
  { id: 'trademark', title: 'Trademark Filing', description: 'Brand identity protection filing', duration: '12-18 months', fee: 'INR 6,999', icon: 'ribbon-outline' },
];

const CompanyFormationScreenPro = ({ navigation }) => {
  const handleApply = (service) => {
    navigation.navigate('FinalForm', {
      service: { id: service.id, title: service.title },
      provider: { name: 'Business Facilitation Desk' },
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
          <Text style={styles.headerTitle}>Company Formation</Text>
          <Text style={styles.headerSubtitle}>Professional registration services</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Ionicons name="sparkles-outline" size={22} color={mobileTheme.colors.primary} />
          <Text style={styles.bannerText}>End-to-end guided registration with compliance-ready workflows.</Text>
        </View>

        <View style={styles.list}>
          {services.map((service) => (
            <View key={service.id} style={styles.card}>
              <View style={styles.cardHead}>
                <View style={styles.iconWrap}>
                  <Ionicons name={service.icon} size={18} color={mobileTheme.colors.primary} />
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{service.title}</Text>
                  <Text style={styles.cardDescription}>{service.description}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <Meta label="Duration" value={service.duration} />
                <Meta label="Fee" value={service.fee} />
              </View>

              <TouchableOpacity style={styles.applyButton} onPress={() => handleApply(service)} activeOpacity={0.86}>
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

const Meta = ({ label, value }) => (
  <View style={styles.metaBox}>
    <Text style={styles.metaLabel}>{label}</Text>
    <Text style={styles.metaValue}>{value}</Text>
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
  scroll: {
    flex: 1,
  },
  banner: {
    marginHorizontal: mobileTheme.spacing.lg,
    marginTop: mobileTheme.spacing.lg,
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.primarySoft,
    padding: mobileTheme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: mobileTheme.spacing.sm,
  },
  bannerText: {
    flex: 1,
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    lineHeight: 20,
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

export default CompanyFormationScreenPro;
