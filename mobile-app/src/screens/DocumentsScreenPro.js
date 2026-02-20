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
  Image,
  StatusBar,
} from 'react-native';
import { useDocuments } from '../context/DocumentContext';
import professionalTheme from '../theme/professionalTheme';

const DocumentsScreenPro = ({ navigation }) => {
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
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,.pdf';
      input.style.display = 'none';
      
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const fileData = event.target.result;
            const categoryChoice = prompt(
              'Select category:\n1 - Identity\n2 - Address\n3 - Financial\n4 - Other',
              '1'
            );
            
            if (categoryChoice) {
              const categories = ['identity', 'address', 'financial', 'other'];
              const categoryIndex = parseInt(categoryChoice) - 1;
              const category = categories[categoryIndex] || 'other';
              
              addDocument({
                name: file.name,
                category: category,
                type: file.type.includes('pdf') ? 'PDF' : 'JPG',
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                source: 'manual',
                fileData: fileData,
                fileType: file.type,
              });
              
              alert(`✓ ${file.name} uploaded successfully`);
            }
          };
          reader.readAsDataURL(file);
        }
        document.body.removeChild(input);
      };
      
      input.oncancel = () => {
        document.body.removeChild(input);
      };
      
      document.body.appendChild(input);
      input.click();
    }
  };

  const handleDownload = (doc) => {
    if (Platform.OS === 'web' && doc.fileData) {
      const link = document.createElement('a');
      link.href = doc.fileData;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDelete = (doc) => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Delete ${doc.name}?`)) {
        removeDocument(doc.id);
        setViewingDocument(null);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={professionalTheme.colors.background} />
      
      {/* Document Viewer Modal */}
      <Modal
        visible={viewingDocument !== null}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setViewingDocument(null)}
      >
        {viewingDocument && (
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setViewingDocument(null)}
                style={styles.modalCloseButton}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCloseIcon}>←</Text>
              </TouchableOpacity>
              <View style={styles.modalHeaderContent}>
                <Text style={styles.modalTitle}>{viewingDocument.name}</Text>
                <Text style={styles.modalSubtitle}>
                  {viewingDocument.type} • {viewingDocument.size}
                </Text>
              </View>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.documentPreview}>
                {viewingDocument.fileData && viewingDocument.fileType && viewingDocument.fileType.includes('image') ? (
                  <Image
                    source={{ uri: viewingDocument.fileData }}
                    style={styles.imagePreview}
                    resizeMode="contain"
                  />
                ) : viewingDocument.fileData && viewingDocument.fileType && viewingDocument.fileType.includes('pdf') ? (
                  <View style={styles.pdfPreview}>
                    <Text style={styles.pdfIcon}>📄</Text>
                    <Text style={styles.pdfText}>PDF Document</Text>
                    <Text style={styles.pdfSubtext}>Click Download to view</Text>
                  </View>
                ) : (
                  <View style={styles.placeholderPreview}>
                    <Text style={styles.placeholderIcon}>📄</Text>
                    <Text style={styles.placeholderText}>Document Preview</Text>
                  </View>
                )}
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Document Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Name</Text>
                  <Text style={styles.infoValue}>{viewingDocument.name}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Type</Text>
                  <Text style={styles.infoValue}>{viewingDocument.type}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Size</Text>
                  <Text style={styles.infoValue}>{viewingDocument.size}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Category</Text>
                  <Text style={styles.infoValue}>{viewingDocument.category}</Text>
                </View>
                <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.infoLabel}>Uploaded</Text>
                  <Text style={styles.infoValue}>{viewingDocument.uploadedDate}</Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => handleDownload(viewingDocument)}
                style={styles.actionButton}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(viewingDocument)}
                style={styles.actionButtonDanger}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonTextDanger}>Delete</Text>
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
          activeOpacity={0.8}
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
          activeOpacity={0.8}
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
            activeOpacity={0.8}
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
              <View style={styles.emptyIcon}>
                <Text style={styles.emptyIconText}>📄</Text>
              </View>
              <Text style={styles.emptyTitle}>No Documents Found</Text>
              <Text style={styles.emptyText}>
                Upload your first document to get started
              </Text>
              <TouchableOpacity
                onPress={handleUploadDocument}
                style={styles.emptyButton}
                activeOpacity={0.8}
              >
                <Text style={styles.emptyButtonText}>Upload Document</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredDocuments.map((doc) => (
              <TouchableOpacity
                key={doc.id}
                onPress={() => setViewingDocument(doc)}
                style={styles.documentCard}
                activeOpacity={0.8}
              >
                <View style={styles.documentIcon}>
                  <Text style={styles.documentIconText}>
                    {doc.type === 'PDF' ? '📄' : '🖼'}
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
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: professionalTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: professionalTheme.spacing.lg,
    paddingVertical: professionalTheme.spacing.lg,
    backgroundColor: professionalTheme.colors.surface,
    ...professionalTheme.shadows.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: professionalTheme.colors.textPrimary,
    fontWeight: professionalTheme.typography.bold,
  },
  headerContent: {
    flex: 1,
    marginLeft: professionalTheme.spacing.sm,
  },
  headerTitle: {
    fontSize: professionalTheme.typography.h4,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textSecondary,
    marginTop: professionalTheme.spacing.xs,
  },
  uploadButton: {
    width: 48,
    height: 48,
    borderRadius: professionalTheme.borderRadius.md,
    backgroundColor: professionalTheme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...professionalTheme.shadows.md,
  },
  uploadIcon: {
    fontSize: 24,
    color: professionalTheme.colors.textInverse,
    fontWeight: professionalTheme.typography.bold,
  },
  categoriesContainer: {
    backgroundColor: professionalTheme.colors.surface,
    paddingVertical: professionalTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: professionalTheme.colors.borderLight,
  },
  categoriesContent: {
    paddingHorizontal: professionalTheme.spacing.lg,
  },
  categoryChip: {
    paddingHorizontal: professionalTheme.spacing.lg,
    paddingVertical: professionalTheme.spacing.md,
    borderRadius: professionalTheme.borderRadius.full,
    backgroundColor: professionalTheme.colors.backgroundDark,
    marginRight: professionalTheme.spacing.sm,
    borderWidth: 1.5,
    borderColor: professionalTheme.colors.border,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChipActive: {
    backgroundColor: professionalTheme.colors.accent,
    borderColor: professionalTheme.colors.accent,
  },
  categoryText: {
    fontSize: professionalTheme.typography.bodySmall,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textSecondary,
  },
  categoryTextActive: {
    color: professionalTheme.colors.textInverse,
  },
  documentsContainer: {
    padding: professionalTheme.spacing.lg,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.lg,
    padding: professionalTheme.spacing.lg,
    marginBottom: professionalTheme.spacing.md,
    ...professionalTheme.shadows.sm,
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: professionalTheme.borderRadius.md,
    backgroundColor: professionalTheme.colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: professionalTheme.spacing.md,
  },
  documentIconText: {
    fontSize: 24,
  },
  docInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.xs,
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textSecondary,
  },
  metaSeparator: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textTertiary,
    marginHorizontal: professionalTheme.spacing.xs,
  },
  documentArrow: {
    width: 32,
    height: 32,
    borderRadius: professionalTheme.borderRadius.md,
    backgroundColor: professionalTheme.colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 18,
    color: professionalTheme.colors.textSecondary,
    fontWeight: professionalTheme.typography.bold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: professionalTheme.colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: professionalTheme.spacing.xl,
  },
  emptyIconText: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: professionalTheme.typography.h3,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.sm,
  },
  emptyText: {
    fontSize: professionalTheme.typography.body,
    color: professionalTheme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: professionalTheme.spacing.xl,
  },
  emptyButton: {
    backgroundColor: professionalTheme.colors.accent,
    paddingHorizontal: professionalTheme.spacing.xxl,
    paddingVertical: professionalTheme.spacing.lg,
    borderRadius: professionalTheme.borderRadius.md,
    ...professionalTheme.shadows.md,
  },
  emptyButtonText: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textInverse,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: professionalTheme.colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: professionalTheme.spacing.lg,
    paddingVertical: professionalTheme.spacing.lg,
    backgroundColor: professionalTheme.colors.surface,
    ...professionalTheme.shadows.sm,
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseIcon: {
    fontSize: 24,
    color: professionalTheme.colors.textPrimary,
    fontWeight: professionalTheme.typography.bold,
  },
  modalHeaderContent: {
    flex: 1,
    marginLeft: professionalTheme.spacing.sm,
  },
  modalTitle: {
    fontSize: professionalTheme.typography.h4,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
  },
  modalSubtitle: {
    fontSize: professionalTheme.typography.caption,
    color: professionalTheme.colors.textSecondary,
    marginTop: professionalTheme.spacing.xs,
  },
  modalBody: {
    flex: 1,
  },
  documentPreview: {
    padding: professionalTheme.spacing.lg,
  },
  imagePreview: {
    width: '100%',
    height: 400,
    borderRadius: professionalTheme.borderRadius.lg,
    backgroundColor: professionalTheme.colors.backgroundDark,
  },
  pdfPreview: {
    alignItems: 'center',
    padding: professionalTheme.spacing.xxl,
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.lg,
  },
  pdfIcon: {
    fontSize: 64,
    marginBottom: professionalTheme.spacing.lg,
  },
  pdfText: {
    fontSize: professionalTheme.typography.h3,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.xs,
  },
  pdfSubtext: {
    fontSize: professionalTheme.typography.body,
    color: professionalTheme.colors.textSecondary,
    textAlign: 'center',
  },
  placeholderPreview: {
    alignItems: 'center',
    padding: professionalTheme.spacing.xxl,
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.lg,
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: professionalTheme.spacing.lg,
  },
  placeholderText: {
    fontSize: professionalTheme.typography.h3,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
  },
  infoCard: {
    margin: professionalTheme.spacing.lg,
    padding: professionalTheme.spacing.lg,
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.lg,
    ...professionalTheme.shadows.sm,
  },
  infoTitle: {
    fontSize: professionalTheme.typography.h4,
    fontWeight: professionalTheme.typography.bold,
    color: professionalTheme.colors.textPrimary,
    marginBottom: professionalTheme.spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: professionalTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: professionalTheme.colors.borderLight,
  },
  infoLabel: {
    fontSize: professionalTheme.typography.bodySmall,
    color: professionalTheme.colors.textSecondary,
    fontWeight: professionalTheme.typography.medium,
  },
  infoValue: {
    fontSize: professionalTheme.typography.bodySmall,
    color: professionalTheme.colors.textPrimary,
    fontWeight: professionalTheme.typography.semibold,
  },
  modalActions: {
    flexDirection: 'row',
    padding: professionalTheme.spacing.lg,
    backgroundColor: professionalTheme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: professionalTheme.colors.borderLight,
    gap: professionalTheme.spacing.md,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: professionalTheme.spacing.lg,
    backgroundColor: professionalTheme.colors.accent,
    borderRadius: professionalTheme.borderRadius.md,
    ...professionalTheme.shadows.sm,
  },
  actionButtonText: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.textInverse,
  },
  actionButtonDanger: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: professionalTheme.spacing.lg,
    backgroundColor: professionalTheme.colors.surface,
    borderRadius: professionalTheme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: professionalTheme.colors.error,
  },
  actionButtonTextDanger: {
    fontSize: professionalTheme.typography.body,
    fontWeight: professionalTheme.typography.semibold,
    color: professionalTheme.colors.error,
  },
});

export default DocumentsScreenPro;
