import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Platform, Modal } from 'react-native';
import { useDocuments } from '../../context/DocumentContext';

const DocumentUploadScreen = ({ navigation, route }) => {
  const { service, provider } = route.params || {};
  const [uploadedDocs, setUploadedDocs] = useState({});
  const { addDocument, documents } = useDocuments();
  const [showDocumentPicker, setShowDocumentPicker] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);
  const [currentDocTitle, setCurrentDocTitle] = useState(null);

  const requiredDocuments = [
    { id: 'identity', title: 'Identity Proof', subtitle: 'Aadhaar Card / PAN Card / Driving License', required: true },
    { id: 'address', title: 'Address Proof', subtitle: 'Utility Bill / Rent Agreement', required: true },
    { id: 'namechange', title: 'Name Change Proof', subtitle: 'Gazette / Affidavit', required: true },
  ];

  const handleUpload = (docId, docTitle) => {
    console.log('Upload button clicked for:', docId, docTitle);
    setCurrentDocId(docId);
    setCurrentDocTitle(docTitle);
    setShowDocumentPicker(true);
  };

  const handleSelectExistingDocument = (doc) => {
    console.log('Selected existing document:', doc);
    
    const docData = {
      name: doc.name,
      size: doc.size || '0 MB',
      method: 'existing',
      date: new Date().toLocaleString(),
      fileData: doc.fileData,
      fileType: doc.fileType,
    };
    
    setUploadedDocs(prev => ({
      ...prev,
      [currentDocId]: docData
    }));

    setShowDocumentPicker(false);
    
    if (Platform.OS === 'web') {
      alert(`✓ Document Selected!\n\n${doc.name} has been added`);
    }
  };

  const handleUploadNewDocument = () => {
    setShowDocumentPicker(false);
    
    if (Platform.OS === 'web') {
      // Create a hidden file input element
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,.pdf';
      input.style.display = 'none';
      
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          console.log('File selected:', file.name);
          
          // Read file as data URL for preview
          const reader = new FileReader();
          reader.onload = (event) => {
            const fileData = event.target.result;
            const fileName = file.name;
            const fileSize = file.size;
            const fileType = file.type.includes('pdf') ? 'PDF' : 'JPG';
            
            const docData = {
              name: fileName,
              size: fileSize,
              method: 'file',
              date: new Date().toLocaleString(),
              fileData: fileData,
              fileType: file.type,
            };
            
            setUploadedDocs(prev => ({
              ...prev,
              [currentDocId]: docData
            }));

            // Add to global documents
            addDocument({
              name: currentDocTitle,
              category: currentDocId,
              type: fileType,
              size: (fileSize / 1024 / 1024).toFixed(2) + ' MB',
              source: 'file',
              serviceType: service?.title,
              provider: provider?.name,
              fileData: fileData,
              fileType: file.type,
            });

            alert(`✓ Success!\n\nDocument uploaded: ${fileName}\nSize: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
          };
          
          reader.readAsDataURL(file);
        }
        
        // Clean up
        document.body.removeChild(input);
      };
      
      input.oncancel = () => {
        console.log('Upload cancelled');
        document.body.removeChild(input);
      };
      
      // Add to DOM and trigger click
      document.body.appendChild(input);
      input.click();
    }
  };

  const handleRemove = (docId) => {
    console.log('Remove clicked for:', docId);
    
    if (Platform.OS === 'web') {
      if (window.confirm('Remove this document?')) {
        const newDocs = { ...uploadedDocs };
        delete newDocs[docId];
        setUploadedDocs(newDocs);
        window.alert('✓ Document removed');
      }
    }
  };

  const handleContinue = () => {
    console.log('Continue clicked');
    
    if (canContinue) {
      navigation.navigate('FinalForm', { service, provider, documents: uploadedDocs });
    } else {
      if (Platform.OS === 'web') {
        window.alert(`⚠️ Missing Documents\n\nPlease upload all ${progress.total} required documents`);
      }
    }
  };

  const formatSize = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  const progress = {
    uploaded: requiredDocuments.filter(doc => uploadedDocs[doc.id]).length,
    total: requiredDocuments.length,
  };

  const canContinue = progress.uploaded === progress.total;

  return (
    <SafeAreaView style={styles.container}>
      {/* Document Picker Modal */}
      <Modal
        visible={showDocumentPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDocumentPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Document</Text>
              <TouchableOpacity
                onPress={() => setShowDocumentPicker(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Upload New Option */}
              <TouchableOpacity
                onPress={handleUploadNewDocument}
                style={styles.uploadNewOption}
                activeOpacity={0.7}
              >
                <View style={styles.uploadNewIcon}>
                  <Text style={styles.uploadNewIconText}>+</Text>
                </View>
                <View style={styles.uploadNewInfo}>
                  <Text style={styles.uploadNewTitle}>Upload New Document</Text>
                  <Text style={styles.uploadNewSubtitle}>Choose from device</Text>
                </View>
              </TouchableOpacity>

              {/* Existing Documents */}
              {documents.length > 0 && (
                <>
                  <Text style={styles.sectionLabel}>Or select from uploaded documents:</Text>
                  {documents.map((doc) => (
                    <TouchableOpacity
                      key={doc.id}
                      onPress={() => handleSelectExistingDocument(doc)}
                      style={styles.existingDocOption}
                      activeOpacity={0.7}
                    >
                      <View style={styles.existingDocIcon}>
                        <Text style={styles.existingDocIconText}>
                          {doc.type === 'PDF' ? '📄' : '🖼'}
                        </Text>
                      </View>
                      <View style={styles.existingDocInfo}>
                        <Text style={styles.existingDocTitle}>{doc.name}</Text>
                        <Text style={styles.existingDocSubtitle}>
                          {doc.type} • {doc.size} • {doc.uploadedDate}
                        </Text>
                      </View>
                      <Text style={styles.selectArrow}>→</Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}

              {documents.length === 0 && (
                <View style={styles.noDocsMessage}>
                  <Text style={styles.noDocsText}>
                    No documents uploaded yet. Upload a new document to get started.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Upload Documents</Text>
          <Text style={styles.headerSubtitle}>
            {provider?.name || 'Provider'} • {service?.title || 'Service'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Progress */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>
            Progress: {progress.uploaded}/{progress.total}
          </Text>
          <View style={styles.progressBarBg}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${(progress.uploaded / progress.total) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {canContinue ? '✓ All documents uploaded!' : `${progress.total - progress.uploaded} more needed`}
          </Text>
        </View>

        {/* Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Documents</Text>
          
          {requiredDocuments.map((doc) => {
            const uploaded = uploadedDocs[doc.id];
            
            return (
              <View key={doc.id} style={styles.docCard}>
                <View style={styles.docHeader}>
                  <View style={[styles.badge, uploaded && styles.badgeSuccess]}>
                    <Text style={styles.badgeText}>
                      {uploaded ? '✓' : doc.title.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.docInfo}>
                    <Text style={styles.docTitle}>{doc.title}</Text>
                    <Text style={styles.docSubtitle}>{doc.subtitle}</Text>
                  </View>
                </View>

                {uploaded ? (
                  <View style={styles.uploadedBox}>
                    <Text style={styles.uploadedText}>
                      📄 {uploaded.name}
                    </Text>
                    <Text style={styles.uploadedMeta}>
                      {formatSize(uploaded.size)} • {uploaded.method} • {uploaded.date}
                    </Text>
                    <View style={styles.buttonRow}>
                      <TouchableOpacity
                        onPress={() => handleUpload(doc.id, doc.title)}
                        style={styles.replaceButton}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.replaceButtonText}>Replace</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleRemove(doc.id)}
                        style={styles.removeButton}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.removeButtonText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleUpload(doc.id, doc.title)}
                    style={styles.uploadButton}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.uploadButtonText}>Upload Document +</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* Continue */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!canContinue}
            style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
            activeOpacity={0.7}
          >
            <Text style={styles.continueButtonText}>
              {canContinue ? 'Continue to Form →' : `Upload ${progress.total - progress.uploaded} More`}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  progressCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1E40AF',
  },
  progressText: {
    fontSize: 14,
    color: '#475569',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  docCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  docHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  badgeSuccess: {
    backgroundColor: '#10B981',
  },
  badgeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  docInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  docTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  docSubtitle: {
    fontSize: 14,
    color: '#475569',
  },
  uploadedBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
  },
  uploadedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  uploadedMeta: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  uploadButton: {
    width: '100%',
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  replaceButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1E40AF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  replaceButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
  },
  removeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#EF4444',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  continueButton: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 20,
    color: '#475569',
    fontWeight: '600',
  },
  modalBody: {
    padding: 20,
  },
  uploadNewOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#6366F1',
    borderStyle: 'dashed',
  },
  uploadNewIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  uploadNewIconText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  uploadNewInfo: {
    flex: 1,
  },
  uploadNewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  uploadNewSubtitle: {
    fontSize: 14,
    color: '#475569',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  existingDocOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  existingDocIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  existingDocIconText: {
    fontSize: 24,
  },
  existingDocInfo: {
    flex: 1,
  },
  existingDocTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  existingDocSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  selectArrow: {
    fontSize: 20,
    color: '#1E40AF',
    fontWeight: '600',
  },
  noDocsMessage: {
    padding: 20,
    alignItems: 'center',
  },
  noDocsText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default DocumentUploadScreen;
