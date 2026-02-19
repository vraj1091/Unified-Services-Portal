import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

const FinalFormScreen = ({ navigation, route }) => {
  const { user } = useAuth();
  const { service, provider } = route.params || {};
  
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    address: '',
    city: user?.city || '',
    pincode: '',
    connectionType: 'New',
    remarks: '',
  });

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.address || !formData.city || !formData.pincode) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Application Submitted!',
      `Your ${service?.title || 'service'} application has been submitted successfully. Application ID: APP${Date.now().toString().slice(-6)}`,
      [
        {
          text: 'View Applications',
          onPress: () => navigation.navigate('Applications'),
        },
        {
          text: 'Go to Dashboard',
          onPress: () => navigation.navigate('Dashboard'),
        },
      ]
    );
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
          <Text style={styles.headerTitle}>Application Form</Text>
          <Text style={styles.headerSubtitle}>
            {service?.title || 'Service Application'}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.progressDotActive]}>
              <Text style={styles.progressDotText}>1</Text>
            </View>
            <Text style={styles.progressLabel}>Service</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.progressDotActive]}>
              <Text style={styles.progressDotText}>2</Text>
            </View>
            <Text style={styles.progressLabel}>Provider</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.progressDotActive]}>
              <Text style={styles.progressDotText}>3</Text>
            </View>
            <Text style={styles.progressLabel}>Documents</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.progressDotCurrent]}>
              <Text style={styles.progressDotText}>4</Text>
            </View>
            <Text style={styles.progressLabel}>Submit</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChangeText={(text) => setFormData({ ...formData, mobile: text })}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Address *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter your complete address"
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>City *</Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                value={formData.city}
                onChangeText={(text) => setFormData({ ...formData, city: text })}
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Pincode *</Text>
              <TextInput
                style={styles.input}
                placeholder="Pincode"
                value={formData.pincode}
                onChangeText={(text) => setFormData({ ...formData, pincode: text })}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connection Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Connection Type *</Text>
            <View style={styles.radioGroup}>
              {['New', 'Transfer', 'Upgrade'].map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setFormData({ ...formData, connectionType: type })}
                  style={[
                    styles.radioButton,
                    formData.connectionType === type && styles.radioButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.radioButtonText,
                      formData.connectionType === type && styles.radioButtonTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Additional Remarks</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Any additional information..."
              value={formData.remarks}
              onChangeText={(text) => setFormData({ ...formData, remarks: text })}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Application Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service:</Text>
              <Text style={styles.summaryValue}>{service?.title || 'N/A'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Provider:</Text>
              <Text style={styles.summaryValue}>{provider?.name || 'N/A'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Connection Type:</Text>
              <Text style={styles.summaryValue}>{formData.connectionType}</Text>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.7}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Submit Application</Text>
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  progressStep: {
    alignItems: 'center',
  },
  progressDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  progressDotActive: {
    backgroundColor: colors.status.success,
  },
  progressDotCurrent: {
    backgroundColor: colors.primary.main,
  },
  progressDotText: {
    fontSize: typography.small,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  progressLabel: {
    fontSize: typography.tiny,
    fontWeight: typography.semibold,
    color: colors.text.secondary,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.neutral.border,
    marginHorizontal: spacing.sm,
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
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  input: {
    height: 50,
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    fontSize: typography.body,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    color: colors.text.primary,
  },
  textArea: {
    height: 100,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  radioButton: {
    flex: 1,
    height: 44,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    backgroundColor: colors.neutral.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonActive: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.bg,
  },
  radioButtonText: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.secondary,
  },
  radioButtonTextActive: {
    color: colors.primary.main,
  },
  summaryCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  summaryTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  summaryLabel: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.primary,
  },
  submitButton: {
    backgroundColor: colors.primary.main,
    height: 56,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  submitButtonText: {
    fontSize: typography.h4,
    fontWeight: typography.semibold,
    color: colors.text.inverse,
  },
});

export default FinalFormScreen;
