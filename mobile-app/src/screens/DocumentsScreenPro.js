import React, { useMemo, useState } from 'react';
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
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { useDocuments } from '../context/DocumentContext';
import mobileTheme from '../theme/mobileTheme';

const DocumentsScreenPro = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewingDocument, setViewingDocument] = useState(null);
  const { documents, addDocument, removeDocument } = useDocuments();

  const categories = useMemo(
    () => [
      { key: 'all', label: 'All', count: documents.length },
      { key: 'identity', label: 'Identity', count: documents.filter((d) => d.category === 'identity').length },
      { key: 'address', label: 'Address', count: documents.filter((d) => d.category === 'address').length },
      { key: 'financial', label: 'Financial', count: documents.filter((d) => d.category === 'financial').length },
      { key: 'other', label: 'Other', count: documents.filter((d) => d.category === 'other').length },
    ],
    [documents]
  );

  const filteredDocuments = documents.filter((doc) => selectedCategory === 'all' || doc.category === selectedCategory);

  const parseFileType = (type) => (type || '').toLowerCase().includes('pdf') ? 'PDF' : 'Image';

  const handleUploadWeb = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf';
    input.style.display = 'none';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) {
        document.body.removeChild(input);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = event.target.result;
        const fileType = parseFileType(file.type);

        addDocument({
          name: file.name,
          category: 'other',
          type: fileType,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          source: 'manual',
          fileData,
          fileType: file.type,
        });

        window.alert(`${file.name} uploaded successfully.`);
      };

      reader.readAsDataURL(file);
      document.body.removeChild(input);
    };

    document.body.appendChild(input);
    input.click();
  };

  const handleUploadNative = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled || !result.assets?.length) return;

      const file = result.assets[0];
      const type = parseFileType(file.mimeType);
      addDocument({
        name: file.name,
        category: 'other',
        type,
        size: `${((file.size || 0) / 1024 / 1024).toFixed(2)} MB`,
        source: 'manual',
        fileType: file.mimeType,
        uri: file.uri,
      });

      Alert.alert('Uploaded', `${file.name} uploaded successfully.`);
    } catch (error) {
      Alert.alert('Upload Failed', 'Unable to upload document. Please try again.');
    }
  };

  const handleUploadDocument = async () => {
    if (Platform.OS === 'web') {
      handleUploadWeb();
      return;
    }
    await handleUploadNative();
  };

  const handleDownload = (doc) => {
    if (Platform.OS === 'web' && doc.fileData) {
      const link = document.createElement('a');
      link.href = doc.fileData;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    Alert.alert('Download', 'Download is currently supported on web preview mode.');
  };

  const handleDelete = (doc) => {
    Alert.alert('Delete Document', `Delete "${doc.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          removeDocument(doc.id);
          setViewingDocument(null);
        },
      },
    ]);
  };

  const isImage = (doc) => {
    const mime = (doc.fileType || '').toLowerCase();
    return mime.includes('image') || doc.type === 'Image';
  };

  const previewUri = (doc) => doc.fileData || doc.uri || null;

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={viewingDocument !== null}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setViewingDocument(null)}
      >
        {viewingDocument && (
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setViewingDocument(null)} style={styles.iconButton}>
                <Ionicons name="arrow-back" size={22} color={mobileTheme.colors.textPrimary} />
              </TouchableOpacity>
              <Text numberOfLines={1} style={styles.modalTitle}>{viewingDocument.name}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <View style={styles.previewCard}>
                {isImage(viewingDocument) && previewUri(viewingDocument) ? (
                  <Image source={{ uri: previewUri(viewingDocument) }} style={styles.previewImage} resizeMode="contain" />
                ) : (
                  <View style={styles.pdfState}>
                    <Ionicons name="document-text-outline" size={54} color={mobileTheme.colors.primary} />
                    <Text style={styles.pdfText}>PDF document preview</Text>
                  </View>
                )}
              </View>

              <View style={styles.infoCard}>
                <InfoRow label="Type" value={viewingDocument.type} />
                <InfoRow label="Size" value={viewingDocument.size} />
                <InfoRow label="Category" value={viewingDocument.category} />
                <InfoRow label="Uploaded" value={viewingDocument.uploadedDate} />
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => handleDownload(viewingDocument)}>
                <Text style={styles.secondaryButtonText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dangerButton} onPress={() => handleDelete(viewingDocument)}>
                <Text style={styles.dangerButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Document Vault</Text>
          <Text style={styles.headerSubtitle}>{documents.length} stored files</Text>
        </View>
        <TouchableOpacity onPress={handleUploadDocument} style={styles.uploadButton} activeOpacity={0.85}>
          <Ionicons name="add" size={24} color={mobileTheme.colors.textOnPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filterContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            onPress={() => setSelectedCategory(cat.key)}
            style={[styles.filterChip, selectedCategory === cat.key && styles.filterChipActive]}
          >
            <Text style={[styles.filterChipText, selectedCategory === cat.key && styles.filterChipTextActive]}>
              {cat.label} ({cat.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.listContent}>
          {filteredDocuments.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="folder-open-outline" size={30} color={mobileTheme.colors.textTertiary} />
              <Text style={styles.emptyTitle}>No Documents Yet</Text>
              <Text style={styles.emptyText}>Upload your first file to start your document vault.</Text>
              <TouchableOpacity style={styles.primaryButton} onPress={handleUploadDocument} activeOpacity={0.85}>
                <Text style={styles.primaryButtonText}>Upload Document</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredDocuments.map((doc) => (
              <TouchableOpacity key={doc.id} onPress={() => setViewingDocument(doc)} style={styles.docCard} activeOpacity={0.85}>
                <View style={styles.docIcon}>
                  <Ionicons
                    name={doc.type === 'PDF' ? 'document-text-outline' : 'image-outline'}
                    size={20}
                    color={mobileTheme.colors.primary}
                  />
                </View>
                <View style={styles.docInfo}>
                  <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
                  <Text style={styles.docMeta}>{doc.type} - {doc.size}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={mobileTheme.colors.textTertiary} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || 'N/A'}</Text>
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
    paddingBottom: mobileTheme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: mobileTheme.typography.h1,
    color: mobileTheme.colors.textPrimary,
    fontWeight: mobileTheme.typography.bold,
  },
  headerSubtitle: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
  },
  uploadButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.primary,
    ...mobileTheme.shadows.sm,
  },
  filterBar: {
    maxHeight: 52,
  },
  filterContent: {
    paddingHorizontal: mobileTheme.spacing.lg,
    alignItems: 'center',
    gap: mobileTheme.spacing.sm,
  },
  filterChip: {
    borderRadius: mobileTheme.radius.full,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    paddingHorizontal: mobileTheme.spacing.md,
    paddingVertical: mobileTheme.spacing.sm,
  },
  filterChipActive: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  filterChipText: {
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
    fontWeight: mobileTheme.typography.semibold,
  },
  filterChipTextActive: {
    color: mobileTheme.colors.textOnPrimary,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: mobileTheme.spacing.lg,
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: mobileTheme.spacing.md,
    borderRadius: mobileTheme.radius.lg,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    marginBottom: mobileTheme.spacing.sm,
    ...mobileTheme.shadows.sm,
  },
  docIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: mobileTheme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: mobileTheme.spacing.md,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  docMeta: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  emptyCard: {
    borderRadius: mobileTheme.radius.xl,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing.xxxl,
    paddingHorizontal: mobileTheme.spacing.xl,
  },
  emptyTitle: {
    marginTop: mobileTheme.spacing.md,
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h3,
    fontWeight: mobileTheme.typography.semibold,
  },
  emptyText: {
    marginTop: mobileTheme.spacing.xs,
    textAlign: 'center',
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
  },
  primaryButton: {
    marginTop: mobileTheme.spacing.lg,
    backgroundColor: mobileTheme.colors.primary,
    borderRadius: mobileTheme.radius.md,
    paddingHorizontal: mobileTheme.spacing.xl,
    paddingVertical: mobileTheme.spacing.md,
  },
  primaryButtonText: {
    color: mobileTheme.colors.textOnPrimary,
    fontWeight: mobileTheme.typography.semibold,
    fontSize: mobileTheme.typography.small,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  modalHeader: {
    paddingHorizontal: mobileTheme.spacing.lg,
    paddingVertical: mobileTheme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    marginRight: mobileTheme.spacing.sm,
  },
  modalTitle: {
    flex: 1,
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h3,
    fontWeight: mobileTheme.typography.semibold,
  },
  modalBody: {
    padding: mobileTheme.spacing.lg,
  },
  previewCard: {
    borderRadius: mobileTheme.radius.lg,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    minHeight: 280,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 280,
  },
  pdfState: {
    alignItems: 'center',
    padding: mobileTheme.spacing.xl,
  },
  pdfText: {
    marginTop: mobileTheme.spacing.sm,
    color: mobileTheme.colors.textSecondary,
  },
  infoCard: {
    marginTop: mobileTheme.spacing.lg,
    borderRadius: mobileTheme.radius.lg,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    paddingHorizontal: mobileTheme.spacing.md,
  },
  infoRow: {
    paddingVertical: mobileTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
  },
  infoValue: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  modalActions: {
    flexDirection: 'row',
    gap: mobileTheme.spacing.sm,
    padding: mobileTheme.spacing.lg,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: mobileTheme.radius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.surface,
    paddingVertical: mobileTheme.spacing.md,
  },
  secondaryButtonText: {
    color: mobileTheme.colors.textPrimary,
    fontWeight: mobileTheme.typography.semibold,
  },
  dangerButton: {
    flex: 1,
    borderRadius: mobileTheme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.danger,
    paddingVertical: mobileTheme.spacing.md,
  },
  dangerButtonText: {
    color: mobileTheme.colors.textOnPrimary,
    fontWeight: mobileTheme.typography.semibold,
  },
});

export default DocumentsScreenPro;
