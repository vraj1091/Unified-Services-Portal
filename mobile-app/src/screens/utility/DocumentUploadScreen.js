import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { useDocuments } from '../../context/DocumentContext';
import mobileTheme from '../../theme/mobileTheme';

const requiredDocuments = [
  { id: 'identity', title: 'Identity Proof', subtitle: 'Aadhaar Card / PAN Card / Driving License', required: true },
  { id: 'address', title: 'Address Proof', subtitle: 'Utility Bill / Rent Agreement', required: true },
  { id: 'namechange', title: 'Name Change Proof', subtitle: 'Gazette / Affidavit (if applicable)', required: true },
];

const mapCategory = (docId) => {
  if (docId === 'identity') return 'identity';
  if (docId === 'address') return 'address';
  return 'other';
};

const DocumentUploadScreen = ({ navigation, route }) => {
  const { service, provider, facility } = route.params || {};
  const { addDocument, documents } = useDocuments();
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);
  const [currentDocTitle, setCurrentDocTitle] = useState('');

  const progress = useMemo(() => {
    const uploaded = requiredDocuments.filter((doc) => uploadedDocs[doc.id]).length;
    return {
      uploaded,
      total: requiredDocuments.length,
      percentage: (uploaded / requiredDocuments.length) * 100,
    };
  }, [uploadedDocs]);

  const canContinue = progress.uploaded === progress.total;

  const startUpload = (docId, docTitle) => {
    setCurrentDocId(docId);
    setCurrentDocTitle(docTitle);
    setShowPicker(true);
  };

  const handleSelectExistingDocument = (doc) => {
    setUploadedDocs((prev) => ({
      ...prev,
      [currentDocId]: {
        name: doc.name,
        size: doc.size || '0 MB',
        method: 'existing',
        date: new Date().toLocaleString(),
        fileData: doc.fileData || null,
        fileType: doc.fileType || null,
        uri: doc.uri || null,
      },
    }));
    setShowPicker(false);
    Alert.alert('Selected', `${doc.name} added to ${currentDocTitle}.`);
  };

  const saveUploadedDoc = (file) => {
    const sizeInMb = `${((file.size || 0) / 1024 / 1024).toFixed(2)} MB`;
    const isPdf = (file.fileType || '').toLowerCase().includes('pdf');
    const type = isPdf ? 'PDF' : 'Image';

    setUploadedDocs((prev) => ({
      ...prev,
      [currentDocId]: {
        name: file.name,
        size: sizeInMb,
        method: 'new',
        date: new Date().toLocaleString(),
        fileData: file.fileData || null,
        fileType: file.fileType || null,
        uri: file.uri || null,
      },
    }));

    addDocument({
      name: file.name,
      category: mapCategory(currentDocId),
      type,
      size: sizeInMb,
      source: 'file',
      serviceType: service?.title,
      provider: provider?.name,
      fileData: file.fileData || null,
      fileType: file.fileType || null,
      uri: file.uri || null,
    });
  };

  const uploadFromWeb = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf';
    input.style.display = 'none';

    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) {
        document.body.removeChild(input);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        saveUploadedDoc({
          name: file.name,
          size: file.size,
          fileData: event.target.result,
          fileType: file.type,
        });
        Alert.alert('Uploaded', `${file.name} uploaded successfully.`);
      };
      reader.readAsDataURL(file);
      setShowPicker(false);
      document.body.removeChild(input);
    };

    document.body.appendChild(input);
    input.click();
  };

  const uploadFromNative = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.length) return;
      const file = result.assets[0];

      saveUploadedDoc({
        name: file.name,
        size: file.size,
        fileType: file.mimeType,
        uri: file.uri,
      });
      setShowPicker(false);
      Alert.alert('Uploaded', `${file.name} uploaded successfully.`);
    } catch (error) {
      Alert.alert('Upload Failed', 'Please try again.');
    }
  };

  const handleUploadNewDocument = async () => {
    if (Platform.OS === 'web') {
      uploadFromWeb();
      return;
    }
    await uploadFromNative();
  };

  const handleRemove = (docId) => {
    Alert.alert('Remove Document', 'Remove selected file for this requirement?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setUploadedDocs((prev) => {
            const next = { ...prev };
            delete next[docId];
            return next;
          });
        },
      },
    ]);
  };

  const handleContinue = () => {
    if (!canContinue) {
      Alert.alert('Missing Documents', `Please upload ${progress.total - progress.uploaded} more document(s).`);
      return;
    }

    navigation.navigate('FinalForm', { service, provider, facility, documents: uploadedDocs });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={showPicker} animationType="slide" transparent onRequestClose={() => setShowPicker(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHead}>
              <Text style={styles.modalTitle}>Choose Document Source</Text>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Ionicons name="close" size={22} color={mobileTheme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.modalPrimaryRow} onPress={handleUploadNewDocument} activeOpacity={0.85}>
              <View style={styles.modalPrimaryIcon}>
                <Ionicons name="cloud-upload-outline" size={20} color={mobileTheme.colors.textOnPrimary} />
              </View>
              <View style={styles.modalPrimaryBody}>
                <Text style={styles.modalPrimaryTitle}>Upload New File</Text>
                <Text style={styles.modalPrimarySubtitle}>Select from device storage</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.modalSectionTitle}>Existing Documents</Text>
            <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
              {documents.length === 0 ? (
                <Text style={styles.modalEmpty}>No previously uploaded documents.</Text>
              ) : (
                documents.map((doc) => (
                  <TouchableOpacity
                    key={doc.id}
                    style={styles.modalItem}
                    onPress={() => handleSelectExistingDocument(doc)}
                    activeOpacity={0.85}
                  >
                    <Ionicons
                      name={doc.type === 'PDF' ? 'document-text-outline' : 'image-outline'}
                      size={18}
                      color={mobileTheme.colors.primary}
                    />
                    <View style={styles.modalItemBody}>
                      <Text numberOfLines={1} style={styles.modalItemTitle}>{doc.name}</Text>
                      <Text style={styles.modalItemMeta}>{doc.type} • {doc.size}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={mobileTheme.colors.textTertiary} />
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={20} color={mobileTheme.colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerBody}>
          <Text style={styles.headerTitle}>Upload Documents</Text>
          <Text style={styles.headerSubtitle}>{provider?.name || 'Provider'} - {service?.title || 'Service'} - {facility?.title || 'Name Change'}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Progress {progress.uploaded}/{progress.total}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressBar, { width: `${progress.percentage}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {canContinue ? 'All documents uploaded.' : `${progress.total - progress.uploaded} document(s) remaining.`}
          </Text>
        </View>

        <View style={styles.section}>
          {requiredDocuments.map((doc) => {
            const uploaded = uploadedDocs[doc.id];
            return (
              <View key={doc.id} style={styles.docCard}>
                <View style={styles.docHead}>
                  <View style={[styles.docBadge, uploaded && styles.docBadgeDone]}>
                    <Ionicons name={uploaded ? 'checkmark' : 'document-text-outline'} size={16} color={mobileTheme.colors.textOnPrimary} />
                  </View>
                  <View style={styles.docBody}>
                    <Text style={styles.docTitle}>{doc.title}</Text>
                    <Text style={styles.docSubtitle}>{doc.subtitle}</Text>
                  </View>
                </View>

                {uploaded ? (
                  <View style={styles.uploadedCard}>
                    <Text style={styles.uploadedName}>{uploaded.name}</Text>
                    <Text style={styles.uploadedMeta}>{uploaded.size} • {uploaded.method}</Text>
                    <View style={styles.uploadedActions}>
                      <TouchableOpacity style={styles.secondaryButton} onPress={() => startUpload(doc.id, doc.title)}>
                        <Text style={styles.secondaryButtonText}>Replace</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemove(doc.id)}>
                        <Text style={styles.deleteButtonText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.primaryButton} onPress={() => startUpload(doc.id, doc.title)}>
                    <Text style={styles.primaryButtonText}>Upload Document</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!canContinue}
          >
            <Text style={styles.continueButtonText}>{canContinue ? 'Continue to Final Form' : 'Complete Uploads to Continue'}</Text>
          </TouchableOpacity>
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
  progressCard: {
    marginHorizontal: mobileTheme.spacing.lg,
    marginTop: mobileTheme.spacing.lg,
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing.md,
  },
  progressTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  progressTrack: {
    marginTop: mobileTheme.spacing.sm,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DFE6F2',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: mobileTheme.colors.primary,
  },
  progressText: {
    marginTop: mobileTheme.spacing.sm,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  section: {
    marginTop: mobileTheme.spacing.lg,
    paddingHorizontal: mobileTheme.spacing.lg,
    paddingBottom: mobileTheme.spacing.lg,
  },
  docCard: {
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing.md,
    marginBottom: mobileTheme.spacing.md,
  },
  docHead: {
    flexDirection: 'row',
  },
  docBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mobileTheme.colors.primary,
    marginRight: mobileTheme.spacing.md,
  },
  docBadgeDone: {
    backgroundColor: mobileTheme.colors.success,
  },
  docBody: {
    flex: 1,
  },
  docTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  docSubtitle: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  uploadedCard: {
    marginTop: mobileTheme.spacing.md,
    padding: mobileTheme.spacing.sm,
    borderRadius: mobileTheme.radius.md,
    backgroundColor: mobileTheme.colors.surfaceMuted,
  },
  uploadedName: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  uploadedMeta: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  uploadedActions: {
    marginTop: mobileTheme.spacing.sm,
    flexDirection: 'row',
    gap: mobileTheme.spacing.sm,
  },
  primaryButton: {
    marginTop: mobileTheme.spacing.md,
    borderRadius: mobileTheme.radius.md,
    backgroundColor: mobileTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mobileTheme.spacing.sm,
  },
  primaryButtonText: {
    color: mobileTheme.colors.textOnPrimary,
    fontWeight: mobileTheme.typography.semibold,
    fontSize: mobileTheme.typography.small,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: mobileTheme.radius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mobileTheme.spacing.sm,
  },
  secondaryButtonText: {
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.semibold,
    fontSize: mobileTheme.typography.caption,
  },
  deleteButton: {
    flex: 1,
    borderRadius: mobileTheme.radius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mobileTheme.spacing.sm,
  },
  deleteButtonText: {
    color: mobileTheme.colors.danger,
    fontWeight: mobileTheme.typography.semibold,
    fontSize: mobileTheme.typography.caption,
  },
  continueButton: {
    borderRadius: mobileTheme.radius.md,
    backgroundColor: mobileTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mobileTheme.spacing.md,
  },
  continueButtonDisabled: {
    backgroundColor: '#9AA9C9',
  },
  continueButtonText: {
    color: mobileTheme.colors.textOnPrimary,
    fontWeight: mobileTheme.typography.semibold,
    fontSize: mobileTheme.typography.small,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(8, 15, 30, 0.45)',
  },
  modalCard: {
    maxHeight: '80%',
    backgroundColor: mobileTheme.colors.surface,
    borderTopLeftRadius: mobileTheme.radius.xl,
    borderTopRightRadius: mobileTheme.radius.xl,
    padding: mobileTheme.spacing.lg,
  },
  modalHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: mobileTheme.spacing.md,
  },
  modalTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.h3,
    fontWeight: mobileTheme.typography.semibold,
  },
  modalPrimaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: mobileTheme.radius.lg,
    backgroundColor: mobileTheme.colors.primarySoft,
    padding: mobileTheme.spacing.md,
    marginBottom: mobileTheme.spacing.md,
  },
  modalPrimaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: mobileTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: mobileTheme.spacing.sm,
  },
  modalPrimaryBody: {
    flex: 1,
  },
  modalPrimaryTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.semibold,
  },
  modalPrimarySubtitle: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  modalSectionTitle: {
    marginBottom: mobileTheme.spacing.sm,
    color: mobileTheme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontSize: mobileTheme.typography.caption,
    fontWeight: mobileTheme.typography.semibold,
  },
  modalList: {
    maxHeight: 280,
  },
  modalEmpty: {
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.small,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.radius.md,
    padding: mobileTheme.spacing.sm,
    marginBottom: mobileTheme.spacing.sm,
  },
  modalItemBody: {
    flex: 1,
    marginLeft: mobileTheme.spacing.sm,
  },
  modalItemTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.medium,
  },
  modalItemMeta: {
    marginTop: 2,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
});

export default DocumentUploadScreen;

