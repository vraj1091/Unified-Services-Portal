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

const GrantCard = ({ title, description, category, onPress, color }) => (
    <TouchableOpacity style={styles.grantCard} onPress={onPress}>
        <View style={[styles.grantIcon, { backgroundColor: color + '15' }]}>
            <Ionicons name="gift" size={24} color={color} />
        </View>
        <View style={styles.grantContent}>
            <Text style={styles.grantTitle}>{title}</Text>
            <Text style={styles.grantDesc} numberOfLines={2}>{description}</Text>
            <View style={styles.grantMeta}>
                <Text style={[styles.categoryTag, { color: color }]}>{category}</Text>
            </View>
        </View>
        <Ionicons name="arrow-forward" size={20} color="#CBD5E1" />
    </TouchableOpacity>
);

export default function GovernmentGrantsScreen({ navigation }) {

    // Helper to navigate to form
    const navigateToForm = (formTitle) => {
        navigation.navigate('ApplicationForm', {
            title: formTitle,
            service: 'Government Grants'
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ServiceHeader
                title="Government Grants"
                icon="gift"
                color="#059669" // Emerald-600
                navigation={navigation}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.sectionTitle}>Recommended Schemes</Text>
                <View style={styles.listContainer}>
                    <GrantCard
                        title="Start-up Gujarat Seed Fund"
                        description="Financial assistance for seed stage startups for product development."
                        category="Startup Support"
                        color="#059669"
                        onPress={() => navigateToForm('Start-up Gujarat Seed Fund')}
                    />
                    <GrantCard
                        title="Women Entrepreneur Scheme"
                        description="Special incentives and loans for women-led business ventures."
                        category="Women Empowerment"
                        color="#D946EF" // Fuchsia
                        onPress={() => navigateToForm('Women Entrepreneur Scheme')}
                    />
                    <GrantCard
                        title="Agriculture Subsidy 2026"
                        description="Subsidies for modern farming equipment and seeds."
                        category="Agriculture"
                        color="#65A30D" // Lime
                        onPress={() => navigateToForm('Agriculture Subsidy')}
                    />
                    <GrantCard
                        title="Digital India Grant"
                        description="Support for digitizing small businesses and MSMEs."
                        category="Technology"
                        color="#2563EB" // Blue
                        onPress={() => navigateToForm('Digital India Grant')}
                    />
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
    listContainer: {
        gap: 16,
    },
    grantCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    grantIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    grantContent: {
        flex: 1,
        marginRight: 8,
    },
    grantTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 4,
    },
    grantDesc: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 8,
        lineHeight: 18,
    },
    categoryTag: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});
