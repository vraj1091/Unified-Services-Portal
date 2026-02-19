import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Platform,
} from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme/colors';
import { useDocuments } from '../context/DocumentContext';

const DocumentsScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewingDocument, setViewingDocument] = useState(null);
  const { documents, addDocument, removeDocument } = useDocuments();

  const categories = [
    { key: 'all', label: 'All', count: documents.length },
    { key: 'identity', label: 'Identity', count: documents.filter(d => d.category === 'identity').length },
    { key: 'address', label: 'Address', count: documents.filter(d => d.category === 'address').length },
    { key: 'financial', label: 'Financial', count: documents.filter(d => d.category === 'financial').length },
    { key: 'other', label: 'Other', count: documents.filter(d => d.category === 'other').length },
  ];

  const filteredDocuments = documents.filter(
    doc => selectedCategory === 'all' || doc.category === selectedCategory
  );

  const handleUploadDocument = () => {
    if (Platform.OS === 'web') {
      const docName = window.prompt('Enter document name:', 'New Document');
      if (docName) {
        const categoryChoice = window.prompt(
          'Select category:\n1 - Identity\n2 - Address\n3 - Financial\n4 - Other',
          '1'
        );
        const categories = ['identity', 'address', 'financial', 'other'];
        const categoryIndex = parseInt(categoryChoice) - 1;
        const category = categories[categoryIndex] || 'other';
        
        const fileSize = Math.random() * 3 + 1;
        
        addDocument({
          name: docName,
          category: category,
          type: 'PDF',
          size: fileSize.toFixed(1) + ' MB',
          source: 'manual',
        });
        
        window.alert(`✓ Success!\n\n${docName} uploaded successfully`);
      }
    }
  };

  const handleDocumentClick = (doc) => {
    console.log('Document clicked:', doc);
    setViewingDocument(doc);
  };

  const handleDownload = (doc) => {
    if (Platform.OS === 'web') {
      window.alert(`✓ Download Started\\n\\n${doc.name} is being downloaded...`);
    }
  };

  const handleDelete = (doc) => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Delete ${doc.name}?\n\nThis action cannot be undone.`)) {
        removeDocument(doc.id);
        setViewingDocument(null);
        window.alert(`✓ Deleted\n\n${doc.name} has been deleted`);
      }
    }
  };

  const handleShare = (doc) => {
    if (Platform.OS === 'web') {
      window.alert(`✓ Share\\n\\nSharing options for ${doc.name}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Document Viewer Modal */}
      <Modal
        visible={viewingDocument !== null}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setViewingDocument(null)}
      >
        {viewingDocument && (
          <SafeAreaView style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setViewingDocument(null)}
                style={styles.modalCloseButton}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCloseIcon}>✕</Text>
              </TouchableOpacity>
              <View style={styles.modalHeaderContent}>
                <Text style={styles.modalTitle}>{viewingDocument.name}</Text>
                <Text style={styles.modalSubtitle}>
                  {viewingDocument.type} • {viewingDocument.size}
                </Text>
              </View>
            </View>

            {/* Document Preview */}
            <ScrollView style={styles.modalBody}>
              <View style={styles.documentPreview}>
                <View style={styles.previewIcon}>
                  <Text style={styles.previewIconText}>📄</Text>
                </View>
                <Text style={styles.previewTitle}>{viewingDocument.name}</Text>
                <Text style={styles.previewMeta}>
                  Type: {viewingDocument.type} | Size: {viewingDocument.size}
                </Text>
                <Text style={styles.previewMeta}>
                  Uploaded: {viewingDocument.uploadedDate}
                </Text>
                <Text style={styles.previewMeta}>
                  Category: {viewingDocument.category}
                </Text>

                {/* Document Content Placeholder */}
                <View style={styles.previewContent}>
                  <View style={styles.documentPage}>
                    <Text style={styles.documentPageText}>
                      Document Preview
                    </Text>
                    <Text style={styles.documentPageSubtext}>
                      This is a simulated preview of your document.
                      In a production app, the actual document content would be displayed here.
                    </Text>
                    <View style={styles.documentLines}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <View key={i} style={styles.documentLine} />
                      ))}
                    </View>
                  </View>
                </View>
              </View>

              {/* Document Info */}
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Document Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Name:</Text>
                  <Text style={styles.infoValue}>{viewingDocument.name}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Type:</Text>
                  <Text style={styles.infoValue}>{viewingDocument.type}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Size:</Text>
                  <Text style={styles.infoValue}>{viewingDocument.size}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Category:</Text>
                  <Text style={styles.infoValue}>{viewingDocument.category}</Text>
                </View>
                <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.infoLabel}>Uploaded:</Text>
                  <Text style={styles.infoValue}>{viewingDocument.uploadedDate}</Text>
                </View>
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => handleDownload(viewingDocument)}
                style={styles.actionButton}
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonIcon}>⬇</Text>
                <Text style={styles.actionButtonText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare(viewingDocument)}
                style={styles.actionButton}
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonIcon}>↗</Text>
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(viewingDocument)}
                style={[styles.actionButton, styles.actionButtonDanger]}
                activeOpacity={0.7}
              >
                <Text style={[styles.actionButtonIcon, styles.actionButtonIconDanger]}>🗑</Text>
                <Text style={[styles.actionButtonText, styles.actionButtonTextDanger]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Documents</Text>
          <Text style={styles.headerSubtitle}>{documents.length} documents</Text>
        </View>
        <TouchableOpacity
          onPress={handleUploadDocument}
          style={styles.uploadButton}
          activeOpacity={0.7}
        >
          <Text style={styles.uploadIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            onPress={() => setSelectedCategory(cat.key)}
            style={[
              styles.categoryChip,
              selectedCategory === cat.key && styles.categoryChipActive,
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat.key && styles.categoryTextActive,
              ]}
            >
              {cat.label} ({cat.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Documents List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.documentsContainer}>
          {filteredDocuments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No Documents Found</Text>
              <Text style={styles.emptyText}>
                Upload your first document to get started
              </Text>
              <TouchableOpacity
                onPress={handleUploadDocument}
                style={styles.emptyButton}
                activeOpacity={0.7}
              >
                <Text style={styles.emptyButtonText}>Upload Document</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredDocuments.map((doc) => (
              <TouchableOpacity
                key={doc.id}
                onPress={() => handleDocumentClick(doc)}
                style={styles.documentCard}
                activeOpacity={0.7}
              >
                <View style={styles.documentInitial}>
                  <Text style={styles.documentInitialText}>
                    {doc.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.docInfo}>
                  <Text style={styles.documentName}>{doc.name}</Text>
                  <View style={styles.documentMeta}>
                    <Text style={styles.metaText}>{doc.type}</Text>
                    <Text style={styles.metaSeparator}>•</Text>
                    <Text style={styles.metaText}>{doc.size}</Text>
                    <Text style={styles.metaSeparator}>•</Text>
                    <Text style={styles.metaText}>{doc.uploadedDate}</Text>
                  </View>
                </View>
                <View style={styles.documentArrow}>
                  <Text style={styles.arrowIcon}>⋮</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Upload Banner */}
        <View style={styles.section}>
          <View style={styles.uploadBanner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Upload More Documents</Text>
              <Text style={styles.bannerText}>
                Keep all your important documents in one place
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleUploadDocument}
              style={styles.bannerButton}
              activeOpacity={0.7}
            >
              <Text style={styles.bannerButtonText}>Upload</Text>
            </TouchableOpacity>
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
    padding: spacing.xs,
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
  uploadButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    fontSize: typography.h2,
    color: colors.text.inverse,
    fontWeight: typography.bold,
  },
  categoriesContainer: {
    backgroundColor: colors.neutral.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  categoriesContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.neutral.bg,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  categoryText: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.secondary,
  },
  categoryTextActive: {
    color: colors.text.inverse,
  },
  documentsContainer: {
    padding: spacing.md,
  },
  documentCard: {
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
  documentInitial: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  documentInitialText: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.inverse,
  },
  docInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: typography.tiny,
    color: colors.text.secondary,
  },
  metaSeparator: {
    fontSize: typography.tiny,
    color: colors.text.disabled,
    marginHorizontal: spacing.xs,
  },
  documentArrow: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.neutral.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: typography.h3,
    color: colors.text.secondary,
    fontWeight: typography.bold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.small,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  emptyButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.sm,
  },
  emptyButtonText: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.inverse,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  uploadBanner: {
    backgroundColor: colors.primary.bg,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
  },
  bannerContent: {
    marginBottom: spacing.md,
  },
  bannerTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.primary.main,
    marginBottom: spacing.xs,
  },
  bannerText: {
    fontSize: typography.small,
    color: colors.primary.main,
  },
  bannerButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  bannerButtonText: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text.inverse,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: colors.neutral.bg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.neutral.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
    ...shadows.sm,
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.neutral.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  modalCloseIcon: {
    fontSize: typography.h3,
    color: colors.text.primary,
    fontWeight: typography.bold,
  },
  modalHeaderContent: {
    flex: 1,
  },
  modalTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
  },
  modalSubtitle: {
    fontSize: typography.tiny,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  modalBody: {
    flex: 1,
  },
  documentPreview: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  previewIcon: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  previewIconText: {
    fontSize: 48,
  },
  previewTitle: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  previewMeta: {
    fontSize: typography.small,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  previewContent: {
    width: '100%',
    marginTop: spacing.lg,
  },
  documentPage: {
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.md,
  },
  documentPageText: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  documentPageSubtext: {
    fontSize: typography.small,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  documentLines: {
    gap: spacing.sm,
  },
  documentLine: {
    height: 12,
    backgroundColor: colors.neutral.bg,
    borderRadius: borderRadius.xs,
  },
  infoSection: {
    margin: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.neutral.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  infoTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  infoLabel: {
    fontSize: typography.small,
    color: colors.text.secondary,
    fontWeight: typography.semibold,
  },
  infoValue: {
    fontSize: typography.small,
    color: colors.text.primary,
    fontWeight: typography.medium,
  },
  modalActions: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.neutral.surface,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    backgroundColor: colors.primary.main,
    borderRadius: borderRadius.sm,
  },
  actionButtonIcon: {
    fontSize: typography.h3,
    marginBottom: spacing.xs,
  },
  actionButtonText: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
    color: colors.text.inverse,
  },
  actionButtonDanger: {
    backgroundColor: colors.neutral.bg,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  actionButtonIconDanger: {
    color: '#EF4444',
  },
  actionButtonTextDanger: {
    color: '#EF4444',
  },
});

export default DocumentsScreen;
