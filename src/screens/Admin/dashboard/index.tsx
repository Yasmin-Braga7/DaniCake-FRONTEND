import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, Dimensions, RefreshControl,
  ActivityIndicator, TouchableOpacity, StyleSheet,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { OrderService } from '@/src/services/orders';
import { TrendingUp, DollarSign, ShoppingBag, ChevronLeft, ChevronRight, BarChart2 } from 'lucide-react-native';
import { styles } from './style';
import { normalize, wp } from '@/src/constants/responsive';
import { FONTS } from '@/src/constants/fonts';

const { width } = Dimensions.get('window');

const MESES = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
];

// Modo de visualização: mensal ou anual
type ViewMode = 'mensal' | 'anual';

export const DashboardScreen = () => {
  const hoje = new Date();
  const [viewMode, setViewMode] = useState<ViewMode>('mensal');

  // Mensal
  const [mes, setMes] = useState(hoje.getMonth() + 1);
  const [ano, setAno] = useState(hoje.getFullYear());
  const [data, setData] = useState<any>(null);
  const [dataPrev, setDataPrev] = useState<any>(null); // mês anterior p/ comparação

  // Anual
  const [anoAnual, setAnoAnual] = useState(hoje.getFullYear());
  const [dadosAnuais, setDadosAnuais] = useState<{ mes: string; total: number; pedidos: number }[]>([]);
  const [dadosAnoAnterior, setDadosAnoAnterior] = useState<{ mes: string; total: number }[]>([]);

  const [loading, setLoading] = useState(true);

  // ─── helpers ─────────────────────────────────────────────────────────────
  const getMesPrev = (m: number, a: number) =>
    m === 1 ? { m: 12, a: a - 1 } : { m: m - 1, a };

  // ─── carrega dados mensais ────────────────────────────────────────────────
  const loadMensal = useCallback(async (m: number, a: number) => {
    setLoading(true);
    try {
      const [cur, prev] = await Promise.all([
        OrderService.getDashboard(m, a),
        OrderService.getDashboard(...Object.values(getMesPrev(m, a)) as [number, number]),
      ]);
      setData(cur);
      setDataPrev(prev);
    } catch (e) {
      console.log('Erro dashboard mensal', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── carrega dados anuais (12 meses) ─────────────────────────────────────
  const loadAnual = useCallback(async (a: number) => {
    setLoading(true);
    try {
      const [resAno, resAnoAnt] = await Promise.all([
        Promise.all(Array.from({ length: 12 }, (_, i) => OrderService.getDashboard(i + 1, a))),
        Promise.all(Array.from({ length: 12 }, (_, i) => OrderService.getDashboard(i + 1, a - 1))),
      ]);
      setDadosAnuais(resAno.map((d, i) => ({
        mes: MESES[i].substring(0, 3),
        total: Number(d?.totalFaturamento ?? 0),
        pedidos: Number(d?.totalPedidos ?? 0),
      })));
      setDadosAnoAnterior(resAnoAnt.map((d, i) => ({
        mes: MESES[i].substring(0, 3),
        total: Number(d?.totalFaturamento ?? 0),
      })));
    } catch (e) {
      console.log('Erro dashboard anual', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── foco na tela ────────────────────────────────────────────────────────
  useFocusEffect(
    useCallback(() => {
      if (viewMode === 'mensal') loadMensal(mes, ano);
      else loadAnual(anoAnual);
    }, [viewMode, mes, ano, anoAnual])
  );

  // ─── navega mês ──────────────────────────────────────────────────────────
  const prevMes = () => {
    if (mes === 1) { setMes(12); setAno(a => a - 1); }
    else setMes(m => m - 1);
  };
  const nextMes = () => {
    const now = new Date();
    if (ano > now.getFullYear() || (ano === now.getFullYear() && mes >= now.getMonth() + 1)) return;
    if (mes === 12) { setMes(1); setAno(a => a + 1); }
    else setMes(m => m + 1);
  };

  // ─── navega ano ──────────────────────────────────────────────────────────
  const prevAno = () => setAnoAnual(a => a - 1);
  const nextAno = () => {
    if (anoAnual < hoje.getFullYear()) setAnoAnual(a => a + 1);
  };

  // ─── chart configs ───────────────────────────────────────────────────────
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(194, 59, 107, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    strokeWidth: 3,
    propsForDots: { r: '5', strokeWidth: '2', stroke: '#C23B6B' },
    propsForBackgroundLines: { strokeDasharray: '6,6', stroke: '#f0f0f0' },
    decimalPlaces: 0,
  };

  const barChartConfig = {
    ...chartConfig,
    color: (opacity = 1) => `rgba(194, 59, 107, ${opacity})`,
    barPercentage: 0.55,
  };

  // ─── comparação mês anterior ─────────────────────────────────────────────
  const fatAtual = Number(data?.totalFaturamento ?? 0);
  const fatPrev = Number(dataPrev?.totalFaturamento ?? 0);
  const variacaoFat = fatPrev === 0 ? null : ((fatAtual - fatPrev) / fatPrev) * 100;
  const pedAtual = Number(data?.totalPedidos ?? 0);
  const pedPrev = Number(dataPrev?.totalPedidos ?? 0);
  const variacaoPed = pedPrev === 0 ? null : ((pedAtual - pedPrev) / pedPrev) * 100;

  // ─── totais anuais ───────────────────────────────────────────────────────
  const totalAnoAtual = dadosAnuais.reduce((s, d) => s + d.total, 0);
  const totalAnoAnt = dadosAnoAnterior.reduce((s, d) => s + d.total, 0);
  const variacaoAnual = totalAnoAnt === 0 ? null : ((totalAnoAtual - totalAnoAnt) / totalAnoAnt) * 100;

  // ─── loading ─────────────────────────────────────────────────────────────
  if (loading && !data && dadosAnuais.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C23B6B" />
      </View>
    );
  }

  // ─── helpers de variação ─────────────────────────────────────────────────
  const VariacaoTag = ({ val }: { val: number | null }) => {
    if (val === null) return null;
    const cor = val >= 0 ? '#27AE60' : '#E53935';
    const sinal = val >= 0 ? '▲' : '▼';
    return (
      <Text style={[localStyles.varTag, { color: cor }]}>
        {sinal} {Math.abs(val).toFixed(1)}% vs mês ant.
      </Text>
    );
  };

  // ─── render ──────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard Admin</Text>
          <Text style={styles.headerSubtitle}>Acompanhe suas vendas e pedidos</Text>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => viewMode === 'mensal' ? loadMensal(mes, ano) : loadAnual(anoAnual)}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* ── Seletor de modo ── */}
        <View style={localStyles.modeRow}>
          <TouchableOpacity
            style={[localStyles.modeBtn, viewMode === 'mensal' && localStyles.modeBtnActive]}
            onPress={() => setViewMode('mensal')}
          >
            <TrendingUp size={14} color={viewMode === 'mensal' ? '#fff' : '#C23B6B'} />
            <Text style={[localStyles.modeBtnText, viewMode === 'mensal' && { color: '#fff' }]}>Mensal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[localStyles.modeBtn, viewMode === 'anual' && localStyles.modeBtnActive]}
            onPress={() => setViewMode('anual')}
          >
            <BarChart2 size={14} color={viewMode === 'anual' ? '#fff' : '#C23B6B'} />
            <Text style={[localStyles.modeBtnText, viewMode === 'anual' && { color: '#fff' }]}>Anual</Text>
          </TouchableOpacity>
        </View>

        {/* ════════════════ MODO MENSAL ════════════════ */}
        {viewMode === 'mensal' && (
          <>
            {/* Navegação mês */}
            <View style={localStyles.navRow}>
              <TouchableOpacity onPress={prevMes} style={localStyles.navBtn}>
                <ChevronLeft size={20} color="#C23B6B" />
              </TouchableOpacity>
              <Text style={localStyles.navLabel}>{MESES[mes - 1]} {ano}</Text>
              <TouchableOpacity onPress={nextMes} style={localStyles.navBtn}>
                <ChevronRight size={20} color="#C23B6B" />
              </TouchableOpacity>
            </View>

            {/* Seção gráfico */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <TrendingUp size={20} color="#C23B6B" strokeWidth={2} />
              </View>
              <Text style={styles.subTitleSection}>Desempenho Financeiro</Text>
            </View>

            <View style={styles.chartContainer}>
              <LineChart
                data={{
                  labels: data?.labelsGrafico?.length > 0 ? data.labelsGrafico : ['Sem dados'],
                  datasets: [{
                    data: data?.dataGrafico?.length > 0 ? data.dataGrafico : [0],
                    color: (o = 1) => `rgba(194, 59, 107, ${o})`,
                    strokeWidth: 3,
                  }],
                  legend: [`Vendas — ${MESES[mes - 1]}`],
                }}
                width={width - 80}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                yAxisLabel="R$ "
                withInnerLines
                withOuterLines={false}
              />
            </View>

            {/* Cards resumo */}
            <View style={styles.statsRow}>
              <View style={styles.card}>
                <View style={styles.cardIconContainer}>
                  <DollarSign size={24} color="#C23B6B" strokeWidth={2} />
                </View>
                <Text style={styles.cardLabel}>Total Vendido</Text>
                <Text style={styles.cardValue}>
                  R$ {fatAtual.toFixed(2)}
                </Text>
                <VariacaoTag val={variacaoFat} />
              </View>

              <View style={styles.card}>
                <View style={styles.cardIconContainer}>
                  <ShoppingBag size={24} color="#C23B6B" strokeWidth={2} />
                </View>
                <Text style={styles.cardLabel}>Total Pedidos</Text>
                <Text style={styles.cardValue}>{pedAtual}</Text>
                <VariacaoTag val={variacaoPed} />
              </View>
            </View>

            {/* Comparação com mês anterior */}
            <View style={localStyles.compCard}>
              <Text style={localStyles.compTitle}>
                vs {MESES[getMesPrev(mes, ano).m - 1]} {getMesPrev(mes, ano).a}
              </Text>
              <View style={localStyles.compRow}>
                <Text style={localStyles.compLabel}>Faturamento anterior</Text>
                <Text style={localStyles.compVal}>R$ {fatPrev.toFixed(2)}</Text>
              </View>
              <View style={localStyles.compRow}>
                <Text style={localStyles.compLabel}>Pedidos anteriores</Text>
                <Text style={localStyles.compVal}>{pedPrev}</Text>
              </View>
            </View>
          </>
        )}

        {/* ════════════════ MODO ANUAL ════════════════ */}
        {viewMode === 'anual' && (
          <>
            {/* Navegação ano */}
            <View style={localStyles.navRow}>
              <TouchableOpacity onPress={prevAno} style={localStyles.navBtn}>
                <ChevronLeft size={20} color="#C23B6B" />
              </TouchableOpacity>
              <Text style={localStyles.navLabel}>{anoAnual}</Text>
              <TouchableOpacity onPress={nextAno} style={localStyles.navBtn}>
                <ChevronRight size={20} color="#C23B6B" />
              </TouchableOpacity>
            </View>

            {/* Gráfico de barras anual */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <BarChart2 size={20} color="#C23B6B" strokeWidth={2} />
              </View>
              <Text style={styles.subTitleSection}>Faturamento por Mês — {anoAnual}</Text>
            </View>

            <View style={styles.chartContainer}>
              {dadosAnuais.length > 0 ? (
                <BarChart
                  data={{
                    labels: dadosAnuais.map(d => d.mes),
                    datasets: [{ data: dadosAnuais.map(d => d.total) }],
                  }}
                  width={width - 60}
                  height={220}
                  chartConfig={barChartConfig}
                  style={styles.chart}
                  yAxisLabel="R$"
                  yAxisSuffix=""
                  showValuesOnTopOfBars={false}
                  withInnerLines
                  fromZero
                />
              ) : (
                <ActivityIndicator color="#C23B6B" />
              )}
            </View>

            {/* Cards totais anuais */}
            <View style={styles.statsRow}>
              <View style={styles.card}>
                <View style={styles.cardIconContainer}>
                  <DollarSign size={24} color="#C23B6B" strokeWidth={2} />
                </View>
                <Text style={styles.cardLabel}>Total {anoAnual}</Text>
                <Text style={styles.cardValue}>R$ {totalAnoAtual.toFixed(2)}</Text>
                {variacaoAnual !== null && (
                  <Text style={[localStyles.varTag, { color: variacaoAnual >= 0 ? '#27AE60' : '#E53935' }]}>
                    {variacaoAnual >= 0 ? '▲' : '▼'} {Math.abs(variacaoAnual).toFixed(1)}% vs {anoAnual - 1}
                  </Text>
                )}
              </View>
              <View style={styles.card}>
                <View style={styles.cardIconContainer}>
                  <ShoppingBag size={24} color="#C23B6B" strokeWidth={2} />
                </View>
                <Text style={styles.cardLabel}>Pedidos {anoAnual}</Text>
                <Text style={styles.cardValue}>{dadosAnuais.reduce((s, d) => s + d.pedidos, 0)}</Text>
              </View>
            </View>

            {/* Comparação ano anterior - gráfico de linha lado a lado */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <TrendingUp size={20} color="#C23B6B" strokeWidth={2} />
              </View>
              <Text style={styles.subTitleSection}>{anoAnual} vs {anoAnual - 1}</Text>
            </View>

            <View style={styles.chartContainer}>
              {dadosAnuais.length > 0 && dadosAnoAnterior.length > 0 ? (
                <LineChart
                  data={{
                    labels: dadosAnuais.map(d => d.mes),
                    datasets: [
                      {
                        data: dadosAnuais.map(d => d.total),
                        color: (o = 1) => `rgba(194, 59, 107, ${o})`,
                        strokeWidth: 2,
                      },
                      {
                        data: dadosAnoAnterior.map(d => d.total),
                        color: (o = 1) => `rgba(100, 100, 200, ${o})`,
                        strokeWidth: 2,
                      },
                    ],
                    legend: [`${anoAnual}`, `${anoAnual - 1}`],
                  }}
                  width={width - 60}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
                  yAxisLabel="R$"
                  withInnerLines
                  withOuterLines={false}
                />
              ) : (
                <ActivityIndicator color="#C23B6B" />
              )}
            </View>

            {/* Resumo ano anterior */}
            <View style={localStyles.compCard}>
              <Text style={localStyles.compTitle}>Resumo {anoAnual - 1}</Text>
              <View style={localStyles.compRow}>
                <Text style={localStyles.compLabel}>Faturamento total</Text>
                <Text style={localStyles.compVal}>R$ {totalAnoAnt.toFixed(2)}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  modeRow: {
    flexDirection: 'row',
    gap: normalize(10),
    marginBottom: normalize(14),
    marginTop: normalize(4),
  },
  modeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(6),
    paddingVertical: normalize(10),
    borderRadius: normalize(12),
    borderWidth: 1.5,
    borderColor: '#C23B6B',
    backgroundColor: '#fff',
  },
  modeBtnActive: {
    backgroundColor: '#C23B6B',
    borderColor: '#C23B6B',
  },
  modeBtnText: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(13),
    color: '#C23B6B',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(16),
    gap: normalize(16),
  },
  navBtn: {
    padding: normalize(8),
    borderRadius: normalize(10),
    backgroundColor: '#FFF0F3',
  },
  navLabel: {
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(16),
    color: '#1a1a1a',
    minWidth: normalize(140),
    textAlign: 'center',
  },
  varTag: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(11),
    marginTop: normalize(4),
    textAlign: 'center',
  },
  compCard: {
    backgroundColor: '#fff',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginTop: normalize(8),
    borderWidth: 1,
    borderColor: '#FFF0F3',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  compTitle: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: normalize(13),
    color: '#888',
    marginBottom: normalize(10),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  compRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: normalize(6),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  compLabel: {
    fontFamily: FONTS.inter.regular,
    fontSize: normalize(13),
    color: '#555',
  },
  compVal: {
    fontFamily: FONTS.inter.bold,
    fontSize: normalize(13),
    color: '#1a1a1a',
  },
});
