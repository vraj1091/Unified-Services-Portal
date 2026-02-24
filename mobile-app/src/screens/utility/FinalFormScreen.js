import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import mobileTheme from '../../theme/mobileTheme';

const FinalFormScreen = ({ navigation, route }) => {
  const { user } = useAuth();
  const { service, provider, facility, documents } = route.params || {};
  const serviceTitle = service?.title || 'Service Application';
  const providerName = provider?.name || 'Government Portal';
  const facilityTitle = facility?.title || 'Name Change';

  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    address: '',
    city: user?.city || '',
    pincode: '',
    requestType: 'Standard',
    remarks: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStageIndex, setSubmitStageIndex] = useState(0);
  const [activeApplicationNo, setActiveApplicationNo] = useState('');

  const submitStages = useMemo(
    () => [
      'Uploading your details',
      'Connecting to department portal',
      'Running application workflow',
      'Finalizing submission',
    ],
    []
  );

  useEffect(() => {
    if (!submitting) {
      setSubmitStageIndex(0);
      return undefined;
    }

    const interval = setInterval(() => {
      setSubmitStageIndex((prev) => Math.min(prev + 1, submitStages.length - 1));
    }, 1400);

    return () => clearInterval(interval);
  }, [submitting, submitStages.length]);

  const updateField = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const requiredFields = ['fullName', 'email', 'mobile', 'address', 'city', 'pincode'];

  const resolveServiceType = () => {
    const rawId = (service?.id || '').toLowerCase();
    if (['electricity', 'gas', 'water', 'property'].includes(rawId)) return rawId;

    const rawTitle = (service?.title || '').toLowerCase();
    if (rawTitle.includes('electric')) return 'electricity';
    if (rawTitle.includes('gas')) return 'gas';
    if (rawTitle.includes('water')) return 'water';
    if (rawTitle.includes('property')) return 'property';
    return 'electricity';
  };

  const handleSubmit = async () => {
    if (submitting) return;

    const missing = requiredFields.some((field) => !(formData[field] || '').toString().trim());
    if (missing) {
      Alert.alert('Incomplete Form', 'Please fill all required fields before submitting.');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile.trim())) {
      Alert.alert('Invalid Mobile', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      Alert.alert('Invalid Pincode', 'Please enter a valid 6-digit pincode.');
      return;
    }

    const applicationNumber = `APP${Date.now().toString().slice(-8)}`;
    setActiveApplicationNo(applicationNumber);
    const newApplication = {
      id: Date.now(),
      application_number: applicationNumber,
      service_type: serviceTitle,
      provider: providerName,
      status: 'submitted',
      created_at: new Date().toISOString(),
      request_type: formData.requestType,
    };

    try {
      setSubmitting(true);

      // Submit to backend first so application is visible across devices/sessions.
      const serviceType = resolveServiceType();
      const createResponse = await api.post('/api/applications/', {
        service_type: serviceType,
        application_type: facility?.id || 'mobile_final_form_submission',
        form_data: {
          service_id: service?.id || null,
          service_title: serviceTitle,
          facility_id: facility?.id || 'name-change',
          facility_title: facilityTitle,
          provider_id: provider?.id || null,
          provider_name: providerName,
          documents_attached: documents ? Object.keys(documents).length : 0,
          request_type: formData.requestType,
          remarks: formData.remarks || '',
          applicant: {
            full_name: formData.fullName.trim(),
            email: formData.email.trim(),
            mobile: formData.mobile.trim(),
            address: formData.address.trim(),
            city: formData.city.trim(),
            pincode: formData.pincode.trim(),
          },
        },
      });

      const backendAppId = createResponse?.data?.id;
      if (backendAppId) {
        await api.post(`/api/applications/${backendAppId}/submit`);
      }

      const stored = await AsyncStorage.getItem('localApplications');
      const previous = stored ? JSON.parse(stored) : [];
      await AsyncStorage.setItem('localApplications', JSON.stringify([newApplication, ...previous]));
    } catch (error) {
      // Fallback to local save if backend is unavailable.
      try {
        const stored = await AsyncStorage.getItem('localApplications');
        const previous = stored ? JSON.parse(stored) : [];
        await AsyncStorage.setItem('localApplications', JSON.stringify([newApplication, ...previous]));
      } catch (storageError) {
        // no-op
      }

      Alert.alert('Submitted in Offline Mode', 'Backend is slow or unavailable. Your application is saved locally and visible in Applications.');
    } finally {
      setSubmitting(false);
    }

    navigation.navigate('MainTabs', { screen: 'Applications' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={submitting} transparent animationType="fade" onRequestClose={() => {}}>
        <View style={styles.progressOverlay}>
          <View style={styles.progressCard}>
            <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
            <Text style={styles.progressTitle}>Application Running</Text>
            <Text style={styles.progressText}>{submitStages[submitStageIndex]}</Text>
            {!!activeApplicationNo && (
              <Text style={styles.progressMeta}>Application No: {activeApplicationNo}</Text>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={20} color={mobileTheme.colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerBody}>
          <Text style={styles.headerTitle}>Final Application Form</Text>
          <Text style={styles.headerSubtitle}>{serviceTitle} - {facilityTitle}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <SummaryRow label="Service" value={serviceTitle} />
          <SummaryRow label="Facility" value={facilityTitle} />
          <SummaryRow label="Provider" value={providerName} />
          <SummaryRow label="Documents" value={`${documents ? Object.keys(documents).length : 0} attached`} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <Field label="Full Name *">
            <TextInput style={styles.input} value={formData.fullName} onChangeText={(v) => updateField('fullName', v)} />
          </Field>
          <Field label="Email *">
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(v) => updateField('email', v)}
            />
          </Field>
          <Field label="Mobile Number *">
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              maxLength={10}
              value={formData.mobile}
              onChangeText={(v) => updateField('mobile', v)}
            />
          </Field>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Details</Text>
          <Field label="Full Address *">
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={3}
              value={formData.address}
              onChangeText={(v) => updateField('address', v)}
              textAlignVertical="top"
            />
          </Field>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Field label="City *">
                <TextInput style={styles.input} value={formData.city} onChangeText={(v) => updateField('city', v)} />
              </Field>
            </View>
            <View style={styles.rowItem}>
              <Field label="Pincode *">
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={6}
                  value={formData.pincode}
                  onChangeText={(v) => updateField('pincode', v)}
                />
              </Field>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Request Preferences</Text>
          <View style={styles.chipRow}>
            {['Standard', 'Priority', 'Urgent'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.chip, formData.requestType === item && styles.chipActive]}
                onPress={() => updateField('requestType', item)}
              >
                <Text style={[styles.chipText, formData.requestType === item && styles.chipTextActive]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Field label="Remarks">
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={3}
              value={formData.remarks}
              onChangeText={(v) => updateField('remarks', v)}
              textAlignVertical="top"
            />
          </Field>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            activeOpacity={0.86}
            disabled={submitting}
          >
            <Text style={styles.submitButtonText}>{submitting ? 'Submitting...' : 'Submit Application'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Field = ({ label, children }) => (
  <View style={styles.field}>
    <Text style={styles.fieldLabel}>{label}</Text>
    {children}
  </View>
);

const SummaryRow = ({ label, value }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
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
  summaryCard: {
    marginHorizontal: mobileTheme.spacing.lg,
    marginTop: mobileTheme.spacing.lg,
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    paddingHorizontal: mobileTheme.spacing.md,
  },
  summaryRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  summaryLabel: {
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
  },
  summaryValue: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  section: {
    marginTop: mobileTheme.spacing.lg,
    paddingHorizontal: mobileTheme.spacing.lg,
    paddingBottom: mobileTheme.spacing.sm,
  },
  sectionTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h3,
    fontWeight: mobileTheme.typography.bold,
    marginBottom: mobileTheme.spacing.md,
  },
  field: {
    marginBottom: mobileTheme.spacing.md,
  },
  fieldLabel: {
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
    marginBottom: 6,
    fontWeight: mobileTheme.typography.semibold,
  },
  input: {
    minHeight: 48,
    borderRadius: mobileTheme.radius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    color: mobileTheme.colors.textPrimary,
    paddingHorizontal: mobileTheme.spacing.md,
  },
  textArea: {
    paddingTop: mobileTheme.spacing.sm,
    minHeight: 92,
  },
  row: {
    flexDirection: 'row',
    gap: mobileTheme.spacing.sm,
  },
  rowItem: {
    flex: 1,
  },
  chipRow: {
    flexDirection: 'row',
    gap: mobileTheme.spacing.sm,
    marginBottom: mobileTheme.spacing.md,
  },
  chip: {
    flex: 1,
    borderRadius: mobileTheme.radius.full,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: mobileTheme.colors.surface,
  },
  chipActive: {
    borderColor: mobileTheme.colors.primary,
    backgroundColor: mobileTheme.colors.primarySoft,
  },
  chipText: {
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
    fontWeight: mobileTheme.typography.semibold,
  },
  chipTextActive: {
    color: mobileTheme.colors.primary,
  },
  submitButton: {
    borderRadius: mobileTheme.radius.md,
    backgroundColor: mobileTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mobileTheme.spacing.md,
    marginBottom: mobileTheme.spacing.xxxl,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: mobileTheme.colors.textOnPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  progressOverlay: {
    flex: 1,
    backgroundColor: 'rgba(8, 15, 30, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: mobileTheme.spacing.lg,
  },
  progressCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: mobileTheme.radius.xl,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing.lg,
    paddingVertical: mobileTheme.spacing.xl,
  },
  progressTitle: {
    marginTop: mobileTheme.spacing.md,
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h2,
    fontWeight: mobileTheme.typography.bold,
  },
  progressText: {
    marginTop: mobileTheme.spacing.xs,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
    textAlign: 'center',
  },
  progressMeta: {
    marginTop: mobileTheme.spacing.md,
    color: mobileTheme.colors.textTertiary,
    fontSize: mobileTheme.typography.caption,
    fontWeight: mobileTheme.typography.semibold,
  },
});

export default FinalFormScreen;
