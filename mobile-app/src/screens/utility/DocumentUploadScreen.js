import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { useDocuments } from '../../context/DocumentContext';

const DocumentUploadScreen = ({ navigation, route }) => {
  const { service, provider } = route.params || {};
  const [uploadedDocs, setUploadedDocs] = useState({});
  const { addDocument } = useDocuments();

  const requiredDocuments = [
    { id: 'identity', title: 'Identity Proof', subtitle: 'Aadhaar Card / PAN Card / Passport', required: true },
    { id: 'address', title: 'Address Proof', subtitle: 'Utility Bill / Rent Agreement', required: true },
    { id: 'photo', title: 'Passport Photo', subtitle: 'Recent photograph', required: true },
  ];

  const handleUpload = (docId, docTitle) => {
    console.log('Upload clicked for:', docId, docTitle);
    
    // Prevent any auto-execution
    if (!docId || !docTitle) {
      console.error('Invalid upload attempt');
      return;
    }
    
    if (Platform.OS === 'web') {
      // Add a small delay to ensure this is a real user click
      setTimeout(() => {
        const choice = window.confirm(`Upload ${docTitle}\n\nClick OK for Camera, Cancel to see more options`);
        
        if (choice) {
          // Camera selected
          const fileName = `${docId}_${Date.now()}.jpg`;
          const fileSize = Math.floor(Math.random() * 3000000) + 500000;
          
          const docData = {
            name: fileName,
            size: fileSize,
            method: 'camera',
            date: new Date().toLocaleString(),
          };
          
          setUploadedDocs(prev => ({
            ...prev,
            [docId]: docData
          }));

          // Add to global documents
          addDocument({
            name: docTitle,
            category: docId,
            type: 'JPG',
            size: (fileSize / 1024 / 1024).toFixed(2) + ' MB',
            source: 'camera',
            serviceType: service?.title,
            provider: provider?.name,
          });

          window.alert(`✓ Success!\n\nDocument uploaded: ${fileName}\nSize: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
        } else {
          // Show more options
          const method = window.prompt(`Upload ${docTitle}\n\nEnter:\n1 for Camera\n2 for Gallery\n3 for PDF\n\nOr click Cancel`, '1');
          
          if (method) {
            const methodMap = { '1': 'camera', '2': 'gallery', '3': 'pdf' };
            const selectedMethod = methodMap[method] || 'camera';
            const ext = selectedMethod === 'pdf' ? 'pdf' : 'jpg';
            const fileName = `${docId}_${Date.now()}.${ext}`;
            const fileSize = Math.floor(Math.random() * 3000000) + 500000;
            
            const docData = {
              name: fileName,
              size: fileSize,
              method: selectedMethod,
              date: new Date().toLocaleString(),
            };
            
            setUploadedDocs(prev => ({
              ...prev,
              [docId]: docData
            }));

            // Add to global documents
            addDocument({
              name: docTitle,
              category: docId,
              type: ext.toUpperCase(),
              size: (fileSize / 1024 / 1024).toFixed(2) + ' MB',
              source: selectedMethod,
              serviceType: service?.title,
              provider: provider?.name,
            });

            window.alert(`✓ Success!\n\nDocument uploaded: ${fileName}\nSize: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
          }
        }
      }, 100);
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
});

export default DocumentUploadScreen;
