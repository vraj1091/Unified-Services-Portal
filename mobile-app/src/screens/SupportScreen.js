import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mobileTheme from '../theme/mobileTheme';

const SupportScreen = ({ navigation }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const contactMethods = [
    { title: 'Call Support', subtitle: '+91 79 1234 5678', icon: 'call-outline', action: () => Linking.openURL('tel:+917912345678') },
    { title: 'Email Support', subtitle: 'support@gujaratportal.gov.in', icon: 'mail-outline', action: () => Linking.openURL('mailto:support@gujaratportal.gov.in') },
    { title: 'Live Chat', subtitle: 'Average response in 5 minutes', icon: 'chatbubbles-outline', action: () => {} },
  ];

  const faqs = [
    {
      question: 'How do I apply for utility services?',
      answer: 'From Home, choose Utility Services, select provider, upload required documents, then submit your form.',
    },
    {
      question: 'Where can I track my application status?',
      answer: 'Open the Applications tab to view all submitted requests and their real-time status.',
    },
    {
      question: 'Can I reuse uploaded documents?',
      answer: 'Yes. In the document upload flow, you can pick from previously uploaded files in your document vault.',
    },
    {
      question: 'How secure is my account data?',
      answer: 'All account sessions are secured and sensitive user information is handled under government data protection standards.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={20} color={mobileTheme.colors.primary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Support Center</Text>
          <Text style={styles.headerSubtitle}>Help for services and applications</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Channels</Text>
          {contactMethods.map((method) => (
            <TouchableOpacity key={method.title} style={styles.contactCard} onPress={method.action} activeOpacity={0.85}>
              <View style={styles.contactIconWrap}>
                <Ionicons name={method.icon} size={18} color={mobileTheme.colors.primary} />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>{method.title}</Text>
                <Text style={styles.contactSubtitle}>{method.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={mobileTheme.colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={faq.question}
              style={styles.faqCard}
              onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
              activeOpacity={0.85}
            >
              <View style={styles.faqHead}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={expandedFaq === index ? 'remove-circle-outline' : 'add-circle-outline'}
                  size={18}
                  color={mobileTheme.colors.primary}
                />
              </View>
              {expandedFaq === index ? <Text style={styles.faqAnswer}>{faq.answer}</Text> : null}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.hoursCard}>
            <Text style={styles.hoursTitle}>Support Hours</Text>
            <Text style={styles.hoursText}>Monday to Friday: 9:00 AM to 6:00 PM</Text>
            <Text style={styles.hoursText}>Saturday: 9:00 AM to 1:00 PM</Text>
            <Text style={styles.hoursText}>Sunday: Closed</Text>
          </View>
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
  sectionTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h3,
    fontWeight: mobileTheme.typography.bold,
    marginBottom: mobileTheme.spacing.md,
  },
  contactCard: {
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing.md,
    marginBottom: mobileTheme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...mobileTheme.shadows.sm,
  },
  contactIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.primarySoft,
    marginRight: mobileTheme.spacing.md,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  contactSubtitle: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  faqCard: {
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing.md,
    marginBottom: mobileTheme.spacing.sm,
  },
  faqHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: mobileTheme.spacing.sm,
  },
  faqQuestion: {
    flex: 1,
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
    lineHeight: 20,
  },
  faqAnswer: {
    marginTop: mobileTheme.spacing.sm,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
    lineHeight: 20,
  },
  hoursCard: {
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing.lg,
    marginBottom: mobileTheme.spacing.xxxl,
  },
  hoursTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h3,
    fontWeight: mobileTheme.typography.semibold,
    marginBottom: mobileTheme.spacing.sm,
  },
  hoursText: {
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
    marginBottom: 4,
  },
});

export default SupportScreen;
