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
import { colors, spacing, typography, borderRadius, shadows } from '../theme/colors';

const SupportScreen = ({ navigation }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const contactMethods = [
    {
      title: 'Call Us',
      subtitle: '+91 79 1234 5678',
      action: () => Linking.openURL('tel:+917912345678'),
    },
    {
      title: 'Email Us',
      subtitle: 'support@gujaratportal.gov.in',
      action: () => Linking.openURL('mailto:support@gujaratportal.gov.in'),
    },
    {
      title: 'Live Chat',
      subtitle: 'Chat with our team',
      action: () => {},
    },
  ];

  const faqs = [
    {
      question: 'How do I apply for a new electricity connection?',
      answer: 'Go to Utility Services → Select Electricity → Choose your provider → Upload required documents → Fill the form → Submit application.',
    },
    {
      question: 'What documents are required for name change?',
      answer: 'You need: 1) Identity Proof (Aadhaar/PAN), 2) Address Proof (Utility Bill/Ration Card), 3) Name Change Proof (Marriage Certificate/Gazette/Affidavit).',
    },
    {
      question: 'How long does application processing take?',
      answer: 'Processing time varies by service: Utility services: 7-15 days, Company formation: 15-30 days, Government grants: 30-60 days.',
    },
    {
      question: 'Can I track my application status?',
      answer: 'Yes! Go to Dashboard → My Applications to view all your applications and their current status.',
    },
    {
      question: 'How do I upload documents?',
      answer: 'During application, you can upload documents by taking a photo or selecting from gallery. Our AI will automatically extract information.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, all your data is encrypted and stored securely. We follow government security standards and never share your information.',
    },
  ];

  const helpTopics = [
    { title: 'Getting Started', desc: 'Learn the basics' },
    { title: 'Video Tutorials', desc: 'Watch how-to videos' },
    { title: 'User Guide', desc: 'Complete documentation' },
    { title: 'Tips & Tricks', desc: 'Pro tips for faster processing' },
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
          <Text style={styles.headerTitle}>Support & Help</Text>
          <Text style={styles.headerSubtitle}>We're here to help you</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              onPress={method.action}
              activeOpacity={0.7}
              style={styles.contactCard}
            >
              <View style={styles.contactInitial}>
                <Text style={styles.contactInitialText}>
                  {method.title.charAt(0)}
                </Text>
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>{method.title}</Text>
                <Text style={styles.contactSubtitle}>{method.subtitle}</Text>
              </View>
              <View style={styles.contactArrow}>
                <Text style={styles.arrowIcon}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
              style={styles.faqCard}
              activeOpacity={0.7}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqToggle}>
                  {expandedFaq === index ? '−' : '+'}
                </Text>
              </View>
              {expandedFaq === index && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Help Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help Topics</Text>
          <View style={styles.topicsGrid}>
            {helpTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.topicCard}
                activeOpacity={0.7}
              >
                <View style={styles.topicInitial}>
                  <Text style={styles.topicInitialText}>
                    {topic.title.charAt(0)}
                  </Text>
                </View>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDesc}>{topic.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Working Hours */}
        <View style={styles.section}>
          <View style={styles.hoursCard}>
            <Text style={styles.hoursTitle}>Support Hours</Text>
            <Text style={styles.hoursText}>Monday - Friday: 9:00 AM - 6:00 PM</Text>
            <Text style={styles.hoursText}>Saturday: 9:00 AM - 1:00 PM</Text>
            <Text style={styles.hoursText}>Sunday: Closed</Text>
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
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  contactInitial: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  contactInitialText: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  contactSubtitle: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
  contactArrow: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.neutral.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: typography.h4,
    color: colors.primary.main,
    fontWeight: typography.bold,
  },
  faqCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.primary,
    lineHeight: 20,
  },
  faqToggle: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.primary.main,
    marginLeft: spacing.sm,
  },
  faqAnswer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  faqAnswerText: {
    fontSize: typography.small,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  topicCard: {
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
  topicInitial: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  topicInitialText: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  topicTitle: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  topicDesc: {
    fontSize: typography.tiny,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  hoursCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  hoursTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  hoursText: {
    fontSize: typography.small,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
});

export default SupportScreen;
