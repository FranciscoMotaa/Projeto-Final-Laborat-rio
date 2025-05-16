import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function LocalizacaoScreen({ navigation }) {
  const menuItems = [
    { name: 'Bateria',    icon: 'battery-charging-outline' },
    { name: 'Localização',icon: 'location-outline' },
    { name: 'Manutenção', icon: 'construct-outline' },
    { name: 'Histórico',  icon: 'time-outline' },
    { name: 'Diagnóstico',icon: 'medkit-outline' },
    { name: 'Carregamento',icon:'flash-outline' },
    { name: 'Controlo',   icon: 'game-controller-outline' },
    { name: 'Ajustes',    icon: 'settings-outline' },
    { name: 'Rotas',      icon: 'map-outline' },
    { name: 'Clima',      icon: 'sunny-outline' },
    { name: 'Análise',    icon: 'analytics-outline' },
    { name: 'Comunidade', icon: 'people-outline' }
  ]

  return (
    <SafeAreaView style={styles.container}>
      {/* container branco atrás dos botões */}
      <View style={styles.menuContainer}>
        <View style={styles.grid}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.name}
              style={styles.cell}
              onPress={() => navigation.navigate(item.name)}
            >
              <Ionicons name={item.icon} size={32} color="#2e7d32" />
              <Text style={styles.label}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    padding:8,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignSelf: 'stretch',
    // sombra Android
    elevation: 3,
    // sombra iOS
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
    width: '28%',
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
  }
})