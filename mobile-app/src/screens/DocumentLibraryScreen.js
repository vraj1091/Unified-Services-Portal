import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const DocumentCard = ({ title, type, status, date, color }) => (
    <View style={styles.docCard}>
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
            <Ionicons name="document-text" size={28} color={color} />
        </View>
        <View style={styles.docContent}>
            <Text style={styles.docTitle}>{title}</Text>
            <Text style={styles.docType}>{type}</Text>
            <View style={styles.metaRow}>
                {status === 'Verified' && (
                    <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-circle" size={12} color="#16A34A" />
                        <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                )}
                <Text style={styles.docDate}>{date}</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.moreBtn}>
            <Ionicons name="ellipsis-vertical" size={20} color="#94A3B8" />
        </TouchableOpacity>
    </View>
);

export default function DocumentLibraryScreen({ navigation }) {

    const handleUpload = () => {
        Alert.alert('Upload Document', 'Select source', [
            { text: 'Camera', onPress: () => console.log('Open Camera') },
            { text: 'Gallery', onPress: () => console.log('Open Gallery') },
            { text: 'DigiLocker', onPress: () => console.log('Connect DigiLocker') },
            { text: 'Cancel', style: 'cancel' }
        ]);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Document Wallet</Text>
                    <TouchableOpacity onPress={handleUpload}>
                        <Ionicons name="add-circle" size={28} color="#2563EB" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content}>

                    {/* DigiLocker Banner */}
                    <LinearGradient
                        colors={['#2563EB', '#1D4ED8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.lockerBanner}
                    >
                        <View>
                            <Text style={styles.lockerTitle}>Link DigiLocker</Text>
                            <Text style={styles.lockerText}>Access your verified government documents instantly.</Text>
                        </View>
                        <View style={styles.lockerIcon}>
                            <Ionicons name="cloud-download-outline" size={32} color="#FFF" />
                        </View>
                    </LinearGradient>

                    <Text style={styles.sectionTitle}>My Documents</Text>

                    <View style={styles.list}>
                        <DocumentCard
                            title="Aadhar Card"
                            type="Identity Proof"
                            status="Verified"
                            date="Added: 10 Jan 2025"
                            color="#2563EB"
                        />
                        <DocumentCard
                            title="PAN Card"
                            type="Identity Proof"
                            status="Verified"
                            date="Added: 12 Feb 2025"
                            color="#2563EB"
                        />
                        <DocumentCard
                            title="Electricity Bill"
                            type="Address Proof"
                            status="Pending"
                            date="Uploaded: Yesterday"
                            color="#D97706"
                        />
                        <DocumentCard
                            title="Property Deed"
                            type="Ownership Proof"
                            status="Verified"
                            date="Added: 20 Dec 2024"
                            color="#7C3AED"
                        />
                    </View>

                    <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                        <Ionicons name="cloud-upload-outline" size={20} color="#FFF" />
                        <Text style={styles.uploadText}>Upload New Document</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F172A',
    },
    content: {
        padding: 20,
    },
    lockerBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    lockerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    lockerText: {
        color: '#E0E7FF',
        fontSize: 12,
        maxWidth: 200,
    },
    lockerIcon: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 16,
    },
    list: {
        gap: 16,
    },
    docCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    docContent: {
        flex: 1,
    },
    docTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 2,
    },
    docType: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 6,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0FDF4',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        gap: 2,
    },
    verifiedText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#16A34A',
    },
    docDate: {
        fontSize: 10,
        color: '#94A3B8',
    },
    moreBtn: {
        padding: 8,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0F172A',
        padding: 16,
        borderRadius: 12,
        marginTop: 24,
        gap: 8,
    },
    uploadText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
