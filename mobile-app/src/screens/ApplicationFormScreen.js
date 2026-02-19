import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function ApplicationFormScreen({ route, navigation }) {
    const { title, service } = route.params || { title: 'Application', service: 'General' };
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        description: ''
    });

    const [documents, setDocuments] = useState([
        { id: 1, name: 'Identity Proof', status: 'Pending', file: null },
        { id: 2, name: 'Address Proof', status: 'Pending', file: null }
    ]);

    const handleUploadDoc = (id) => {
        Alert.alert('Upload Document', 'Choose a file from your wallet or device:', [
            {
                text: 'Select from Wallet', onPress: () => {
                    const newDocs = documents.map(doc =>
                        doc.id === id ? { ...doc, status: 'Uploaded', file: 'wallet_doc.pdf' } : doc
                    );
                    setDocuments(newDocs);
                }
            },
            {
                text: 'Take Photo', onPress: () => {
                    const newDocs = documents.map(doc =>
                        doc.id === id ? { ...doc, status: 'Uploaded', file: 'camera_capture.jpg' } : doc
                    );
                    setDocuments(newDocs);
                }
            },
            { text: 'Cancel', style: 'cancel' }
        ]);
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.mobile) {
            Alert.alert('Missing Information', 'Please fill in all required fields.');
            return;
        }

        const pendingDocs = documents.filter(d => d.status === 'Pending');
        if (pendingDocs.length > 0) {
            Alert.alert('Documents Required', 'Please upload all required documents to proceed.');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Application Submitted',
                `Your ${title} for ${service} has been submitted successfully.\n\nApplication ID: APP-${Math.floor(Math.random() * 10000)}`,
                [
                    { text: 'Return to Dashboard', onPress: () => navigation.popToTop() }
                ]
            );
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.infoCard}>
                    <Ionicons name="information-circle" size={24} color="#3B82F6" />
                    <Text style={styles.infoText}>
                        Applying for <Text style={{ fontWeight: 'bold' }}>{service}</Text>. Please provide accurate details and valid documents.
                    </Text>
                </View>

                {/* Form Fields */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Applicant Details</Text>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Applicant Name <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter full name"
                            value={formData.name}
                            onChangeText={(t) => setFormData({ ...formData, name: t })}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Mobile Number <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter mobile number"
                            keyboardType="phone-pad"
                            value={formData.mobile}
                            onChangeText={(t) => setFormData({ ...formData, mobile: t })}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Description / Purpose</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe your request..."
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={formData.description}
                            onChangeText={(t) => setFormData({ ...formData, description: t })}
                        />
                    </View>
                </View>

                {/* Document Upload Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Required Documents</Text>
                    <Text style={styles.sectionSubHeader}>Upload from your device or select from Document Wallet.</Text>

                    {documents.map((doc) => (
                        <View key={doc.id} style={styles.docUploadCard}>
                            <View style={styles.docInfo}>
                                <Text style={styles.docLabel}>{doc.name} <Text style={styles.required}>*</Text></Text>
                                {doc.status === 'Uploaded' ? (
                                    <Text style={styles.uploadedFile} numberOfLines={1}>
                                        <Ionicons name="checkmark-circle" size={14} color="#16A34A" /> {doc.file}
                                    </Text>
                                ) : (
                                    <Text style={styles.pendingText}>Not uploaded yet</Text>
                                )}
                            </View>
                            <TouchableOpacity
                                style={[styles.uploadBtn, doc.status === 'Uploaded' && styles.uploadedBtn]}
                                onPress={() => handleUploadDoc(doc.id)}
                            >
                                <Text style={[styles.uploadBtnText, doc.status === 'Uploaded' && styles.uploadedBtnText]}>
                                    {doc.status === 'Uploaded' ? 'Change' : 'Upload'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.submitButton, loading && styles.disabledButton]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>Submit Application</Text>
                    )}
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        padding: 5,
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#EFF6FF',
        padding: 15,
        borderRadius: 12,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#DBEAFE',
        alignItems: 'center',
        gap: 10,
    },
    infoText: {
        flex: 1,
        color: '#1E40AF',
        fontSize: 14,
        lineHeight: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 8,
    },
    sectionSubHeader: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
        marginBottom: 8,
    },
    required: {
        color: '#EF4444',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#334155',
    },
    textArea: {
        height: 80,
    },
    docUploadCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    docInfo: {
        flex: 1,
        marginRight: 10,
    },
    docLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 4,
    },
    pendingText: {
        fontSize: 12,
        color: '#94A3B8',
        fontStyle: 'italic',
    },
    uploadedFile: {
        fontSize: 12,
        color: '#16A34A',
        fontWeight: '500',
    },
    uploadBtn: {
        backgroundColor: '#F1F5F9',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    uploadedBtn: {
        backgroundColor: '#FFF',
        borderColor: '#DBEAFE',
    },
    uploadBtnText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475569',
    },
    uploadedBtnText: {
        color: '#3B82F6',
    },
    submitButton: {
        backgroundColor: '#2563EB',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    disabledButton: {
        backgroundColor: '#94A3B8',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
