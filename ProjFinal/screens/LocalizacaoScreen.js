import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps'
import * as Location from 'expo-location'

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

  const [location, setLocation] = useState(null)
  const [address, setAddress] = useState('A obter localização...')
  const now = new Date()
  const hora = now.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setAddress('Permissão negada')
        return
      }
      let loc = await Location.getCurrentPositionAsync({})
      setLocation(loc.coords)
      let addr = await Location.reverseGeocodeAsync(loc.coords)
      if (addr && addr.length > 0) {
        setAddress(`${addr[0].street || ''} ${addr[0].name || ''}, ${addr[0].city || ''}`)
      } else {
        setAddress('Localização obtida')
      }
    })()
  }, [])

  const initialRegion = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : {
        latitude: 41.1579,
        longitude: -8.6291,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
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
              <Ionicons name={item.icon} size={28} color="#2e7d32" />
              <Text style={styles.label}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Cartão de localização */}
      <View style={styles.locationCard}>
        <View style={styles.locationHeader}>
          <Ionicons name="location-outline" size={20} color="#2e7d32" />
          <Text style={styles.locationTitle}> Localização Atual da Mota</Text>
        </View>
        <MapView
          style={styles.mapBox}
          provider={PROVIDER_DEFAULT}
          region={initialRegion}
        >
          <Marker coordinate={initialRegion} title="Você está aqui" />
        </MapView>
        <Text style={styles.address}>{address}</Text>
        <Text>Atualizado: Hoje, {hora}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7', // fundo claro
    padding: 12
  },
  menuContainer: {
    backgroundColor: '#fff', // cartão claro
    borderRadius: 12,
    padding: 10,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  cell: {
    width: '28%',
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent'
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32', // verde
    textAlign: 'center'
  },
  locationCard: {
    backgroundColor: '#fff', // cartão claro
    borderRadius: 12,
    padding: 18,
    marginTop: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2e7d32' // verde
  },
  mapBox: {
    backgroundColor: '#f0f4f7', // caixa clara
    borderRadius: 10,
    height: 300, // Aumenta o tamanho do mapa
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  mapText: {
    color: '#2e7d32', // verde
    marginTop: 6
  },
  address: {
    color: '#333',
    fontSize: 14,
    marginTop: 2
  }
})