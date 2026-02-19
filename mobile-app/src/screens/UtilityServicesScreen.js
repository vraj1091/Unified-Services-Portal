import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const UtilityCard = ({ title, icon, color, onPress }) => (
    <TouchableOpacity style={styles.utilityCard} onPress={onPress}>
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
            <Ionicons name={icon} size={32} color={color} />
        </View>
        <Text style={styles.utilityTitle}>{title}</Text>
        <Ionicons name="arrow-forward-circle" size={24} color={color} style={styles.arrowIcon} />
    </TouchableOpacity>
);

export default function UtilityServicesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Utility Services</Text>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.subtitle}>Select a department to proceed with your application</Text>

                    <View style={styles.grid}>
                        <UtilityCard
                            title="Electricity Department"
                            icon="flash"
                            color="#D97706"
                            onPress={() => navigation.navigate('Electricity')}
                        />
                        <UtilityCard
                            title="Water Department"
                            icon="water"
                            color="#0284C7"
                            onPress={() => navigation.navigate('Water')}
                        />
                        <UtilityCard
                            title="Gas Department"
                            icon="flame"
                            color="#EF4444"
                            onPress={() => navigation.navigate('Gas')}
                        />
                        <UtilityCard
                            title="Property & Tax"
                            icon="business"
                            color="#7C3AED"
                            onPress={() => navigation.navigate('Property')}
                        />
                    </View>
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
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F172A',
    },
    content: {
        padding: 20,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 24,
    },
    grid: {
        gap: 16,
    },
    utilityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 12,
        marginRight: 16,
    },
    utilityTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
    },
});
