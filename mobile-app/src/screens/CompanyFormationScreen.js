import React from 'react';
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

const ServiceOption = ({ title, icon, onPress, color }) => (
    <TouchableOpacity style={styles.serviceOption} onPress={onPress}>
        <View style={[styles.optionIcon, { backgroundColor: color + '10' }]}>
            <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.optionText}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
    </TouchableOpacity>
);

export default function CompanyFormationScreen({ navigation }) {

    // Helper to navigate to form
    const navigateToForm = (formTitle) => {
        navigation.navigate('ApplicationForm', {
            title: formTitle,
            service: 'Business Registration'
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ServiceHeader
                title="Business Registration"
                icon="briefcase"
                color="#2563EB" // Blue-600
                navigation={navigation}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Available Services Section */}
                <Text style={styles.sectionTitle}>Registration Services</Text>
                <View style={styles.optionsContainer}>
                    <ServiceOption
                        title="New Company Incorporation"
                        icon="business"
                        color="#2563EB"
                        onPress={() => navigateToForm('New Company Incorporation')}
                    />
                    <ServiceOption
                        title="GST Registration"
                        icon="receipt"
                        color="#2563EB"
                        onPress={() => navigateToForm('GST Registration')}
                    />
                    <ServiceOption
                        title="MSME / Udyam Registration"
                        icon="ribbon"
                        color="#2563EB"
                        onPress={() => navigateToForm('MSME Registration')}
                    />
                    <ServiceOption
                        title="Startup India Recognition"
                        icon="rocket"
                        color="#2563EB"
                        onPress={() => navigateToForm('Startup India Recognition')}
                    />
                </View>

                {/* Empty State for Applications */}
                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Recent Applications</Text>
                <View style={styles.emptyState}>
                    <Ionicons name="folder-open-outline" size={48} color="#CBD5E1" />
                    <Text style={styles.emptyText}>Start your business journey today</Text>
                    <TouchableOpacity style={styles.applyButton} onPress={() => navigateToForm('New Business Application')}>
                        <Text style={styles.applyButtonText}>Register Now</Text>
                    </TouchableOpacity>
                </View>
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
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
    },
    emptyText: {
        color: '#94A3B8',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 12,
        marginBottom: 16,
    },
    applyButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#2563EB',
        borderRadius: 8,
    },
    applyButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    }
});
