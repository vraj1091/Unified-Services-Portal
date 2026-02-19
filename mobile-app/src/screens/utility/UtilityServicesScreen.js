import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

const UtilityServicesScreen = ({ navigation }) => {
  const services = [
    {
      id: 'electricity',
      title: 'Electricity Connection',
      description: 'New connection, transfer, or upgrade',
    },
    {
      id: 'gas',
      title: 'Gas Connection',
      description: 'Piped gas connection services',
    },
    {
      id: 'water',
      title: 'Water Connection',
      description: 'Municipal water supply connection',
    },
    {
      id: 'property',
      title: 'Property Tax',
      description: 'Property tax payment and services',
    },
  ];

  const handleServiceSelect = (service) => {
    navigation.navigate('ServiceProviders', { service });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Utility Services</Text>
          <Text style={styles.subtitle}>Select a service to continue</Text>
        </View>

        {/* Services List */}
        <View style={styles.content}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => handleServiceSelect(service)}
              style={styles.serviceCard}
              activeOpacity={0.7}
            >
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <Text style={styles.serviceArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How it works</Text>
          <Text style={styles.infoText}>
            1. Select a service{'\n'}
            2. Choose your provider{'\n'}
            3. Upload documents{'\n'}
            4. Submit application
          </Text>
        </View>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    marginBottom: spacing.md,
  },
  backText: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.primary.main,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  serviceDescription: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
  serviceArrow: {
    fontSize: typography.h3,
    color: colors.primary.main,
    fontWeight: typography.bold,
  },
  infoCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: colors.primary.bg,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary.light,
  },
  infoTitle: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.primary.main,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: typography.small,
    color: colors.primary.dark,
    lineHeight: 20,
  },
});

export default UtilityServicesScreen;
