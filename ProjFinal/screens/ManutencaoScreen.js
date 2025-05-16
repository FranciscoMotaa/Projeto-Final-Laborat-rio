import React, { useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function ManutencaoScreen({ navigation }) {
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

  const [showPicker, setShowPicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 3, 15)) // 15 de Abril, 2025

  const onChange = (event, date) => {
    setShowPicker(false)
    if (date) setSelectedDate(date)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu de ícones */}
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

      {/* Cartão Estado de Manutenção */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="leaf-outline" size={20} color="#2e7d32" />
          <Text style={styles.cardTitle}> Estado de Manutenção</Text>
        </View>
        <View style={styles.statusRow}>
          <Ionicons name="checkmark-circle" size={20} color="#2e7d32" />
          <Text style={styles.statusLabel}>Sistema de Bateria</Text>
          <Text style={styles.statusOk}>Bom</Text>
        </View>
        <View style={styles.statusRow}>
          <Ionicons name="checkmark-circle" size={20} color="#2e7d32" />
          <Text style={styles.statusLabel}>Sistema de Travagem</Text>
          <Text style={styles.statusOk}>Bom</Text>
        </View>
        <View style={styles.statusRow}>
          <Ionicons name="alert-circle" size={20} color="#ff9800" />
          <Text style={styles.statusLabel}>Pneus</Text>
          <Text style={styles.statusWarn}>Verificar</Text>
        </View>
        <View style={styles.statusRow}>
          <Ionicons name="checkmark-circle" size={20} color="#2e7d32" />
          <Text style={styles.statusLabel}>Motor</Text>
          <Text style={styles.statusOk}>Bom</Text>
        </View>
      </View>

      {/* Cartão Próxima Manutenção */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="calendar-outline" size={20} color="#2e7d32" />
          <Text style={styles.cardTitle}> Próxima Manutenção</Text>
        </View>
        <Text style={styles.nextDate}>
          {selectedDate.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })}
        </Text>
        <Text style={styles.nextDesc}>Manutenção regular programada</Text>
        <TouchableOpacity style={styles.button} onPress={() => setShowPicker(true)}>
          <Text style={styles.buttonText}>Reagendar</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="calendar"
            onChange={onChange}
            minimumDate={new Date()}
          />
        )}
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
    width: '28%',
    backgroundColor: '#fff',
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
  card: {
    backgroundColor: '#fff', // <-- cartão claro
    borderRadius: 12,
    padding: 30,
    marginHorizontal: 12,
    marginTop: 16,
    marginBottom: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2e7d32' // verde
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  statusLabel: {
    flex: 1,
    marginLeft: 8,
    color: '#333', // texto escuro
    fontSize: 15
  },
  statusOk: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 15
  },
  statusWarn: {
    color: '#ff9800',
    fontWeight: 'bold',
    fontSize: 15
  },
  nextDate: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2
  },
  nextDesc: {
    color: '#888',
    marginBottom: 12
  },
  button: {
    borderWidth: 1,
    borderColor: '#b0bec5',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#2e7d32',
    fontWeight: 'bold'
  }
})