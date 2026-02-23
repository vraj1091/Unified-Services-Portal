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

const UtilityServicesScreen = ({ navigation }) => {
  const services = [
    {
      id: 'electricity',
      title: 'Electricity Connection',
      description: 'New connection, transfer, or load upgrade.',
      icon: 'flash-outline',
    },
    {
      id: 'gas',
      title: 'Gas Connection',
      description: 'Piped gas service for home and business.',
      icon: 'flame-outline',
    },
    {
      id: 'water',
      title: 'Water Connection',
      description: 'Municipal and local authority supply setup.',
      icon: 'water-outline',
    },
    {
      id: 'property',
      title: 'Property Services',
      description: 'Property utility links and tax service support.',
      icon: 'home-outline',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={20} color={mobileTheme.colors.primary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Utility Services</Text>
          <Text style={styles.headerSubtitle}>Choose service type to continue</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              activeOpacity={0.86}
              onPress={() => navigation.navigate('ServiceProviders', { service })}
            >
              <View style={styles.serviceIconWrap}>
                <Ionicons name={service.icon} size={20} color={mobileTheme.colors.primary} />
              </View>
              <View style={styles.serviceBody}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={mobileTheme.colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepTitle}>How This Works</Text>
          <Text style={styles.stepText}>1. Select service</Text>
          <Text style={styles.stepText}>2. Pick your provider</Text>
          <Text style={styles.stepText}>3. Upload required documents</Text>
          <Text style={styles.stepText}>4. Submit final application</Text>
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
  serviceCard: {
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
  serviceIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.primarySoft,
    marginRight: mobileTheme.spacing.md,
  },
  serviceBody: {
    flex: 1,
  },
  serviceTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  serviceDescription: {
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

export default UtilityServicesScreen;
