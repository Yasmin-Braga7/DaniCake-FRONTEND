import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions, RefreshControl, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { OrderService } from '@/src/services/orders';
import { TrendingUp, DollarSign, ShoppingBag } from 'lucide-react-native';

// Importando os estilos separados
import { styles } from './style';

// Desestruturação do width
const { width } = Dimensions.get("window");

export const DashboardScreen = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    const loadDashboard = async () => {
        setLoading(true);
        try {
            const result = await OrderService.getDashboard();
            setData(result);
        } catch (error) {
            console.log("Erro dashboard", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadDashboard();
        }, [])
    );

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(194, 59, 107, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
        strokeWidth: 3,
        barPercentage: 0.5,
        decimalCount: 0,
        propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#C23B6B"
        },
        propsForBackgroundLines: {
            strokeDasharray: "6,6",
            stroke: "#f0f0f0",
        },
    };

    const chartData = {
        labels: data?.labelsGrafico?.length > 0 ? data.labelsGrafico : ["Sem dados"],
        datasets: [
            {
                data: data?.dataGrafico?.length > 0 ? data.dataGrafico : [0],
                color: (opacity = 1) => `rgba(194, 59, 107, ${opacity})`,
                strokeWidth: 3
            }
        ],
        legend: ["Vendas do Mês"] 
    };

    if (loading && !data) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#C23B6B" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header Fixo */}
            <SafeAreaView edges={["top"]} style={styles.headerWrapper}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Dashboard Admin</Text>
                    <Text style={styles.headerSubtitle}>Acompanhe suas vendas e pedidos</Text>
                </View>
            </SafeAreaView>

            {/* Conteúdo com Scroll */}
            <ScrollView 
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={loadDashboard} />}
                showsVerticalScrollIndicator={false}
            >
                {/* Seção do gráfico */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon}>
                        <TrendingUp size={20} color="#C23B6B" strokeWidth={2} />
                    </View>
                    <Text style={styles.subTitleSection}>Desempenho Financeiro</Text>
                </View>

                <View style={styles.chartContainer}>
                    <LineChart
                        data={chartData}
                        width={width - 80} 
                        height={200}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                        yAxisLabel="R$ "
                        withInnerLines={true}
                        withOuterLines={false}
                    />
                </View>

                {/* Cards de Resumo */}
                <View style={styles.statsRow}>
                    <View style={styles.card}>
                        <View style={styles.cardIconContainer}>
                            <DollarSign size={24} color="#C23B6B" strokeWidth={2} />
                        </View>
                        <Text style={styles.cardLabel}>Total Vendido</Text>
                        <Text style={styles.cardValue}>
                            R$ {data?.totalFaturamento ? data.totalFaturamento.toFixed(2) : "0.00"}
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardIconContainer}>
                            <ShoppingBag size={24} color="#C23B6B" strokeWidth={2} />
                        </View>
                        <Text style={styles.cardLabel}>Total Pedidos</Text>
                        <Text style={styles.cardValue}>
                            {data?.totalPedidos || 0}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}