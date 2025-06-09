import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Alert, Platform, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import * as Location from 'expo-location'

export default function ClimaScreen({ navigation }) {
  // Estado para armazenar os dados do clima
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('Obtendo localização...');

  // Substitua pela sua chave API OpenWeatherMap
  const API_KEY = 'b8f7ef8df892260bedc5df393d15a18b';
  
  // Solicitar permissões de localização e obter a localização atual
  const getLocation = async () => {
    try {
      setLoading(true);
      
      // Solicitar permissão de localização
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permissão para acessar a localização foi negada. Usando dados de Lisboa como padrão.');
        // Se permissão for negada, usar Lisboa como padrão
        fetchWeatherByCity('Lisboa');
        return;
      }
      
      // Obter localização atual
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 100,
      });
      
      setLocation(currentLocation);
      
      // Buscar dados de clima com base na localização
      fetchWeatherByCoords(currentLocation.coords.latitude, currentLocation.coords.longitude);
      
    } catch (err) {
      console.error('Erro ao obter localização:', err);
      setError('Não foi possível obter sua localização atual. Usando dados de Lisboa.');
      fetchWeatherByCity('Lisboa');
    }
  };
  
  // Função para buscar dados do clima por coordenadas
  const fetchWeatherByCoords = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}&lang=pt`
      );
      setWeatherData(response.data);
      setLocationName(response.data.name);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar dados do clima. Verifique sua conexão.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Função para buscar dados do clima por nome da cidade (backup)
  const fetchWeatherByCity = async (cityName) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}&lang=pt`
      );
      setWeatherData(response.data);
      setLocationName(cityName);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar dados do clima. Verifique sua conexão.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  // Busca dados ao carregar o componente
  useEffect(() => {
    getLocation();
  }, []);

  // Função para atualizar os dados
  const onRefresh = () => {
    setRefreshing(true);
    getLocation();
  };

  // Função para converter valores de timestamp para hora local
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
  };

  // Menu de navegação
  const menuItems = [
    { name: 'Início',      icon: 'home-outline' ,           route: 'Home' },
    { name: 'Bateria',     icon: 'battery-charging-outline', route: 'Bateria' },
    { name: 'Navegação',  icon: 'navigate-outline',          route: 'Navegação' },
    { name: 'Controlo',    icon: 'game-controller-outline', route: 'Controlo' },
    { name: 'Manutenção',  icon: 'construct-outline', route: 'Manutenção' },
    { name: 'Comunidade',  icon: 'people-outline', route: 'Comunidade' },
    { name: 'Definições',     icon: 'settings-outline', route: 'Definições' },
  ]
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Menu superior */}
        
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
      
      {/* Submenu de navegação */}
      <View style={styles.submenuContainer}>
        <TouchableOpacity
          style={styles.submenuButton}
          onPress={() => navigation.navigate('Localização')}
        >
          <Ionicons name="location-outline" size={24} color="#2e7d32" />
          <Text style={styles.submenuLabel}>Localização</Text>
        </TouchableOpacity>
                
        <TouchableOpacity
          style={styles.submenuButton}
          onPress={() => navigation.navigate('Rotas')}
        >
          <Ionicons name="map-outline" size={24} color="#2e7d32" />
          <Text style={styles.submenuLabel}>Rotas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.submenuButton, styles.activeSubmenu]}
          onPress={() => navigation.navigate('Clima')}
        >
          <Ionicons name="sunny-outline" size={24} color="#2e7d32" />
          <Text style={styles.submenuLabel}>Clima</Text>
        </TouchableOpacity>      </View>
      
      {/* Área de conteúdo para exibir dados climáticos */}
      <View style={styles.contentContainer}>
        <View style={styles.weatherContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2e7d32" />
              <Text style={styles.loadingText}>A carregar dados do clima...</Text>
            </View>          ) : error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="cloud-offline-outline" size={50} color="#e53935" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={getLocation}>
                <Text style={styles.retryButtonText}>Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          ) : weatherData && (
            <>              <View style={styles.locationContainer}>
                <Ionicons name="location" size={24} color="#2e7d32" />
                <Text style={styles.locationText}>{weatherData.name}, {weatherData.sys.country}</Text>
                <TouchableOpacity 
                  style={styles.refreshButton} 
                  onPress={getLocation}
                >
                  <Ionicons name="refresh-outline" size={22} color="#2e7d32" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.mainWeatherInfo}>
                <Image 
                  style={styles.weatherIcon} 
                  source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png` }} 
                />
                <Text style={styles.temperature}>{Math.round(weatherData.main.temp)}°C</Text>
                <Text style={styles.weatherDescription}>{weatherData.weather[0].description}</Text>
              </View>
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Ionicons name="thermometer-outline" size={22} color="#2e7d32" />
                  <Text style={styles.detailLabel}>Sensação</Text>
                  <Text style={styles.detailValue}>{Math.round(weatherData.main.feels_like)}°C</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons name="water-outline" size={22} color="#2e7d32" />
                  <Text style={styles.detailLabel}>Humidade</Text>
                  <Text style={styles.detailValue}>{weatherData.main.humidity}%</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons name="speedometer-outline" size={22} color="#2e7d32" />
                  <Text style={styles.detailLabel}>Pressão</Text>
                  <Text style={styles.detailValue}>{weatherData.main.pressure} hPa</Text>
                </View>
              </View>
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Ionicons name="eye-outline" size={22} color="#2e7d32" />
                  <Text style={styles.detailLabel}>Visibilidade</Text>
                  <Text style={styles.detailValue}>{(weatherData.visibility / 1000).toFixed(1)} km</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons name="navigate-outline" size={22} color="#2e7d32" />
                  <Text style={styles.detailLabel}>Vento</Text>
                  <Text style={styles.detailValue}>{Math.round(weatherData.wind.speed * 3.6)} km/h</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons name="compass-outline" size={22} color="#2e7d32" />
                  <Text style={styles.detailLabel}>Direção</Text>
                  <Text style={styles.detailValue}>{weatherData.wind.deg}°</Text>
                </View>
              </View>
              
              <View style={styles.sunContainer}>
                <View style={styles.sunItem}>
                  <Ionicons name="sunny-outline" size={24} color="#ff9800" />
                  <Text style={styles.sunLabel}>Nascer do Sol</Text>
                  <Text style={styles.sunTime}>{formatTime(weatherData.sys.sunrise)}</Text>
                </View>
                
                <View style={styles.sunItem}>
                  <Ionicons name="moon-outline" size={24} color="#3f51b5" />
                  <Text style={styles.sunLabel}>Pôr do Sol</Text>
                  <Text style={styles.sunTime}>{formatTime(weatherData.sys.sunset)}</Text>
                </View>
              </View>                <Text style={styles.disclaimerText}>
                  Dados fornecidos por OpenWeatherMap
                </Text>
            </>
          )}
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
  scrollContainer: {
    flexGrow: 1,
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
  submenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 12
  },
  submenuButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  activeSubmenu: {
    backgroundColor: '#e8f5e9',
    borderColor: '#2e7d32',
    borderWidth: 1,
  },
  submenuLabel: {
    color: '#2e7d32',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600'
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  weatherContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#e53935',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2e7d32',
    borderRadius: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },  locationText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  refreshButton: {
    padding: 8,
  },
  mainWeatherInfo: {
    alignItems: 'center',
    marginVertical: 16,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 48,
    fontWeight: '700',
    color: '#2e7d32',
  },
  weatherDescription: {
    fontSize: 18,
    color: '#555',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  sunContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingBottom: 8,
  },
  sunItem: {
    alignItems: 'center',
    flex: 1,
  },
  sunLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sunTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  }
})