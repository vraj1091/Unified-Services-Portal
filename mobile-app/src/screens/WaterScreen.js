import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ServiceHeader = ({ title, icon, color, navigation }) => (
    <View style={styles.header}>
        <LinearGradient
            colors={['#FFFFFF', '#F8FAFC']}
            style={styles.headerBackground}
        />
        <SafeAreaView style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#1E293B" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
                    <Ionicons name={icon} size={28} color={color} />
                </View>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
        </SafeAreaView>
        <View style={styles.headerBorder} />
    </View>
);

const ApplicationCard = ({ id, type, date, status, color }) => (
    <View style={styles.appCard}>
        <View style={styles.appHeader}>
            <Text style={styles.appId}>App ID: {id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: status === 'Approved' ? '#F0FDF4' : '#FFFBEB' }]}>
                <Text style={[styles.statusText, { color: status === 'Approved' ? '#16A34A' : '#0369A1' }]}>
                    {status}
                </Text>
            </View>
        </View>
        <Text style={styles.appType}>{type}</Text>
        <Text style={styles.appDate}>Applied on: {date}</Text>
        <TouchableOpacity style={styles.trackButton}>
            <Text style={[styles.trackText, { color: color }]}>Track Status</Text>
            <Ionicons name="arrow-forward" size={14} color={color} />
        </TouchableOpacity>
    </View>
);

const ServiceOption = ({ title, icon, onPress, color }) => (
    <TouchableOpacity style={styles.serviceOption} onPress={onPress}>
        <View style={[styles.optionIcon, { backgroundColor: color + '10' }]}>
            <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.optionText}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
    </TouchableOpacity>
);

export default function WaterScreen({ navigation }) {

    // Helper to navigate to form
    const navigateToForm = (formTitle) => {
        navigation.navigate('ApplicationForm', {
            title: formTitle,
            service: 'Water Department'
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ServiceHeader
                title="Water Applications"
                icon="water"
                color="#0284C7" // Sky-600
                navigation={navigation}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Available Services Section */}
                <Text style={styles.sectionTitle}>Available Services</Text>
                <View style={styles.optionsContainer}>
                    <ServiceOption
                        title="New Water Connection"
                        icon="add-circle"
                        color="#0284C7"
                        onPress={() => navigateToForm('New Water Connection')}
                    />
                    <ServiceOption
                        title="Name Change Request"
                        icon="person"
                        color="#0284C7"
                        onPress={() => navigateToForm('Name Change Request')}
                    />
                    <ServiceOption
                        title="Report Leakage / Repair"
                        icon="construct"
                        color="#0284C7"
                        onPress={() => navigateToForm('Report Leakage')}
                    />
                </View>

                {/* Recent Applications Section */}
                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Recent Applications</Text>
                <ApplicationCard
                    id="WAT-2026-1102"
                    type="New Connection Application"
                    date="02 Feb 2026"
                    status="Processing"
                    color="#0284C7"
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        backgroundColor: '#FFFFFF',
    },
    headerBackground: {
        ...StyleSheet.absoluteFillObject,
    },
    headerContent: {
        padding: 20,
        paddingBottom: 20,
    },
    headerBorder: {
        height: 1,
        backgroundColor: '#F1F5F9',
    },
    backButton: {
        marginBottom: 16,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        padding: 10,
        borderRadius: 12,
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 16,
    },
    optionsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    serviceOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    optionIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    appCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    appHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    appId: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#94A3B8',
        textTransform: 'uppercase',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    appType: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 4,
    },
    appDate: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 16,
    },
    trackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    trackText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});
