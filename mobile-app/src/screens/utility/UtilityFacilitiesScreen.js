import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mobileTheme from '../../theme/mobileTheme';

const facilityOptions = [
  {
    id: 'name-change',
    title: 'Name Change',
    subtitle: 'Update applicant name in existing service connection.',
    icon: 'document-text-outline',
    active: true,
  },
  {
    id: 'new-connection',
    title: 'New Connection',
    subtitle: 'Apply for a fresh service connection.',
    icon: 'add-circle-outline',
    active: false,
  },
  {
    id: 'transfer',
    title: 'Transfer Connection',
    subtitle: 'Transfer existing service to another address.',
    icon: 'swap-horizontal-outline',
    active: false,
  },
];

const UtilityFacilitiesScreen = ({ navigation, route }) => {
  const { service } = route.params || {};

  const handleSelectFacility = (facility) => {
    if (!facility.active) {
      Alert.alert('Coming Soon', `${facility.title} will be available shortly.`);
      return;
    }

    navigation.navigate('ServiceProviders', {
      service,
      facility,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={20} color={mobileTheme.colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerBody}>
          <Text style={styles.headerTitle}>{service?.title || 'Utility'} Facilities</Text>
          <Text style={styles.headerSubtitle}>Select facility to continue</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {facilityOptions.map((facility) => (
            <TouchableOpacity
              key={facility.id}
              style={[styles.facilityCard, !facility.active && styles.facilityCardDisabled]}
              activeOpacity={0.86}
              onPress={() => handleSelectFacility(facility)}
            >
              <View style={styles.facilityIconWrap}>
                <Ionicons
                  name={facility.icon}
                  size={20}
                  color={facility.active ? mobileTheme.colors.primary : mobileTheme.colors.textTertiary}
                />
              </View>

              <View style={styles.facilityBody}>
                <View style={styles.titleRow}>
                  <Text style={styles.facilityTitle}>{facility.title}</Text>
                  {!facility.active && <Text style={styles.tag}>Coming Soon</Text>}
                </View>
                <Text style={styles.facilitySubtitle}>{facility.subtitle}</Text>
              </View>

              <Ionicons name="chevron-forward" size={16} color={mobileTheme.colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepTitle}>How This Works</Text>
          <Text style={styles.stepText}>1. Select utility service</Text>
          <Text style={styles.stepText}>2. Select facility (Name Change, etc.)</Text>
          <Text style={styles.stepText}>3. Pick your provider</Text>
          <Text style={styles.stepText}>4. Upload required documents</Text>
          <Text style={styles.stepText}>5. Submit final application</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  section: {
    marginTop: mobileTheme.spacing.lg,
    paddingHorizontal: mobileTheme.spacing.lg,
  },
  facilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing.md,
    marginBottom: mobileTheme.spacing.sm,
    ...mobileTheme.shadows.sm,
  },
  facilityCardDisabled: {
    opacity: 0.7,
  },
  facilityIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.primarySoft,
    marginRight: mobileTheme.spacing.md,
  },
  facilityBody: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: mobileTheme.spacing.xs,
  },
  facilityTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  tag: {
    color: mobileTheme.colors.warning,
    fontSize: 10,
    fontWeight: mobileTheme.typography.bold,
    textTransform: 'uppercase',
  },
  facilitySubtitle: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
    lineHeight: 16,
  },
  stepCard: {
    marginTop: mobileTheme.spacing.lg,
    marginHorizontal: mobileTheme.spacing.lg,
    marginBottom: mobileTheme.spacing.xxxl,
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing.lg,
  },
  stepTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h3,
    fontWeight: mobileTheme.typography.semibold,
    marginBottom: mobileTheme.spacing.sm,
  },
  stepText: {
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
    marginBottom: 4,
  },
});

export default UtilityFacilitiesScreen;
