import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../context/ThemeContext' // Caminho atualizado

export default function ComunidadeScreen({ navigation }) {
  const menuItems = [
    { name: 'Início',      icon: 'home-outline' ,           route: 'Home' },
    { name: 'Bateria',     icon: 'battery-charging-outline', route: 'Bateria' },
    { name: 'Navegação',  icon: 'navigate-outline',          route: 'Navegação' },
    { name: 'Controlo',    icon: 'game-controller-outline', route: 'Controlo' },
    { name: 'Manutenção',  icon: 'construct-outline', route: 'Manutenção' },
    { name: 'Comunidade',  icon: 'people-outline', route: 'Comunidade' },
    { name: 'Definições',     icon: 'settings-outline', route: 'Definições' },
  ]

  // Exemplo de viagens recentes
  const viagens = [
    { origem: 'Casa', destino: 'Trabalho', data: '12 Mar', km: '12.5 km', tempo: '25 min', energia: '1.8 kWh' },
    { origem: 'Trabalho', destino: 'Casa', data: '11 Mar', km: '12.7 km', tempo: '28 min', energia: '2.0 kWh' },
    { origem: 'Casa', destino: 'Ginásio', data: '10 Mar', km: '5.3 km', tempo: '12 min', energia: '0.8 kWh' },
    { origem: 'Ginásio', destino: 'Casa', data: '10 Mar', km: '5.5 km', tempo: '13 min', energia: '0.9 kWh' }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Menu de ícones */}
        <View style={styles.menuContainer}>
          <View style={styles.grid}>
            {menuItems.map(item => (
              <TouchableOpacity
                key={item.name}
                style={styles.cell}
                onPress={() => navigation.navigate(item.route)}
              >
                <Ionicons name={item.icon} size={32} color="#2e7d32" />
                <Text style={styles.label}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.submenuContainer}>
                      <TouchableOpacity
                        style={styles.submenuButton}
                        onPress={() => navigation.navigate('Manutenção')}
                      >
                        <Ionicons name="construct-outline" size={24} color="#2e7d32" />
                        <Text style={styles.submenuLabel}>Manutenção</Text>
                      </TouchableOpacity>
                              
                      <TouchableOpacity
                        style={styles.submenuButton}
                        onPress={() => navigation.navigate('Histórico')}
                      >
                        <Ionicons name="time-outline" size={24} color="#2e7d32" />
                        <Text style={styles.submenuLabel}>Histórico</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.submenuButton}
                        onPress={() => navigation.navigate('Diagnóstico')}
                      >
                        <Ionicons name="medkit-outline" size={24} color="#2e7d32" />
                        <Text style={styles.submenuLabel}>Diagnóstico</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.submenuButton}
                        onPress={() => navigation.navigate('Análise')}
                      >
                        <Ionicons name="analytics-outline" size={24} color="#2e7d32" />
                        <Text style={styles.submenuLabel}>Análise</Text>
                      </TouchableOpacity>
                    </View>

        {/* Cartão Viagens Recentes */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="git-compare-outline" size={26} color="#2e7d32" />
            <Text style={styles.cardTitle}> Viagens Recentes</Text>
          </View>
          {viagens.map((v, idx) => (
            <View key={idx} style={[styles.viagemRow, idx < viagens.length - 1 && styles.viagemBorder]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.viagemRota}>
                  <Text style={{ fontWeight: 'bold' }}>{v.origem}</Text> &rarr; <Text style={{ fontWeight: 'bold' }}>{v.destino}</Text>
                </Text>
                <View style={styles.viagemInfo}>
                  <Text style={styles.viagemInfoText}>{v.km}</Text>
                  <Text style={styles.viagemInfoText}>{v.tempo}</Text>
                  <Text style={styles.viagemInfoText}>{v.energia}</Text>
                </View>
              </View>
              <Text style={styles.viagemData}>{v.data}</Text>
            </View>
          ))}
        </View>

        {/* Cartão Estatísticas */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="stats-chart-outline" size={26} color="#2e7d32" />
            <Text style={styles.cardTitle}> Estatísticas</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Total de viagens (mês)</Text>
            <Text style={styles.statsValue}>42</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Distância total (mês)</Text>
            <Text style={styles.statsValue}>385 km</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Energia consumida (mês)</Text>
            <Text style={styles.statsValue}>31.6 kWh</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Tempo de condução (mês)</Text>
            <Text style={styles.statsValue}>14h 45m</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7'
  },
  menuContainer: {
    margin: 12,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignSelf: 'stretch',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  cell: {
    width: '31%',
    height: 60,
    backgroundColor: '#fff',  // botão branco
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // botão com sombra leve
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
    textAlign: 'center'
  },
  submenuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',               // permite quebra de linha
    justifyContent: 'space-between',
    paddingHorizontal: 12
  },
  submenuButton: {
    width: '48%',                   // duas colunas de ~48%
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 8,                // espaço entre as linhas
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  submenuLabel: {
    color: '#2e7d32',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28, // maior
    marginHorizontal: 12,
    marginTop: 24, // maior espaço
    marginBottom: 0,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2e7d32',
    marginLeft: 6
  },
  viagemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16 // maior
  },
  viagemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  viagemRota: {
    color: '#333',
    fontSize: 18, // maior
    marginBottom: 4
  },
  viagemInfo: {
    flexDirection: 'row',
    gap: 24 // maior
  },
  viagemInfoText: {
    color: '#888',
    marginRight: 24,
    fontSize: 16 // maior
  },
  viagemData: {
    color: '#888',
    fontSize: 16, // maior
    marginLeft: 16,
    marginTop: 2
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10 // maior
  },
  statsLabel: {
    color: '#888',
    fontSize: 16 // maior
  },
  statsValue: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 18 // maior
  }
})