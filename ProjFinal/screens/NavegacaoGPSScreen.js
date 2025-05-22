import React, { useState, useEffect, useRef } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function NavegacaoGPSScreen({ route, navigation }) {
  const { rotaInfo, origem, destino } = route.params;
  const mapRef = useRef(null);
  const [localizacaoAtual, setLocalizacaoAtual] = useState(null);
  const [localizacaoInicial, setLocalizacaoInicial] = useState(null);
  const [watching, setWatching] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [distanciaRestante, setDistanciaRestante] = useState(null);
  const [tempoRestante, setTempoRestante] = useState(null);
  const [proximaInstrucao, setProximaInstrucao] = useState(null);
  const [indexInstrucao, setIndexInstrucao] = useState(0);
  // Inicializar a navegação e solicitar permissões
  useEffect(() => {
    iniciarNavegacao();
    return () => {
      if (watching) {
        watching.remove();
      }
    };
  }, []);
  // Atualizar mapa quando a localização mudar
  useEffect(() => {
    if (localizacaoAtual && rotaInfo && rotaInfo.pontos.length > 0) {
      // Calcular qual instrução deve ser mostrada com base na localização atual
      atualizarInstrucoes();
      
      // Ajustar o mapa para mostrar o usuário e a próxima etapa da rota
      ajustarVisualizacaoMapa();
      
      // Salvar o estado atual da navegação (poderia ser expandido para usar AsyncStorage)
      // Isto permitiria retomar a navegação se o app fosse fechado e reaberto
      const estadoNavegacao = {
        origem,
        destino,
        indexAtual: indexInstrucao,
        ultimaLocalizacao: localizacaoAtual
      };
      
      console.log('Estado da navegação atualizado:', estadoNavegacao);
      // Em um app real, salvaria no AsyncStorage:
      // AsyncStorage.setItem('estadoNavegacao', JSON.stringify(estadoNavegacao));
    }
  }, [localizacaoAtual]);
  const iniciarNavegacao = async () => {
    try {
      setCarregando(true);
      
      // Solicitar permissões de localização em primeiro plano
      const foregroundPermission = await Location.requestForegroundPermissionsAsync();
      if (foregroundPermission.status !== 'granted') {
        Alert.alert('Permissão negada', 'A navegação GPS requer acesso à sua localização');
        navigation.goBack();
        return;
      }
      
      // Solicitar permissões de localização em segundo plano (Android)
      if (Platform.OS === 'android') {
        const backgroundPermission = await Location.requestBackgroundPermissionsAsync();
        if (backgroundPermission.status !== 'granted') {
          Alert.alert(
            'Permissão limitada', 
            'A navegação pode ser interrompida quando o aplicativo estiver em segundo plano. Recomendamos conceder permissões de localização em segundo plano nas configurações do dispositivo.',
            [
              { text: 'Continuar assim mesmo', style: 'default' },
              { text: 'Voltar', style: 'cancel', onPress: () => navigation.goBack() }
            ]
          );
        }
      }
      
      // Obter a localização inicial
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest
      });
      
      const { latitude, longitude } = location.coords;
      setLocalizacaoAtual({ latitude, longitude });
      setLocalizacaoInicial({ latitude, longitude });
      
      // Iniciar monitoramento contínuo de localização
      const watchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 10, // atualiza a cada 10 metros
          timeInterval: 5000, // ou a cada 5 segundos
          foregroundService: {
            notificationTitle: "Navegação GPS ativa",
            notificationBody: "Navegando de " + origem + " para " + destino,
            notificationColor: "#2e7d32"
          }
        },
        novaLocalizacao => {
          const { latitude, longitude } = novaLocalizacao.coords;
          setLocalizacaoAtual({ latitude, longitude });
        }
      );
      
      setWatching(watchId);
      setProximaInstrucao(rotaInfo.instrucoes[0]);
      setCarregando(false);
      } catch (error) {
      console.error('Erro ao iniciar navegação:', error);
      Alert.alert('Erro', 'Não foi possível iniciar a navegação. Tente novamente.');
      navigation.goBack();
    }
  };

  const atualizarInstrucoes = () => {
    // Lógica simplificada para atualizar instruções com base na proximidade
    // Em um app real, seria necessário um algoritmo mais complexo de mapear a localização do usuário
    // aos pontos da rota e determinar a instrução atual
    
    if (indexInstrucao < rotaInfo.instrucoes.length) {
      setProximaInstrucao(rotaInfo.instrucoes[indexInstrucao]);
      
      // Simulação de progresso - em um app real seria calculado com base na posição real
      // em relação aos pontos da rota
      const instrucaoAtual = rotaInfo.instrucoes[indexInstrucao];
      const instrucoesFaltantes = rotaInfo.instrucoes.slice(indexInstrucao);
      
      // Calcular distância e tempo restantes
      const distanciaTotal = instrucoesFaltantes.reduce((acc, curr) => acc + curr.distance, 0);
      const tempoTotal = instrucoesFaltantes.reduce((acc, curr) => acc + curr.duration, 0);
      
      setDistanciaRestante(distanciaTotal);
      setTempoRestante(tempoTotal);
    }
  };
  
  const avancarInstrucao = () => {
    // Apenas para demonstração - em um app real isto seria feito automaticamente
    // com base na localização do usuário em relação à rota
    if (indexInstrucao < rotaInfo.instrucoes.length - 1) {
      setIndexInstrucao(indexInstrucao + 1);
    } else {
      // Final da rota
      Alert.alert(
        "Destino alcançado",
        `Você chegou ao seu destino: ${destino}`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  };

  const ajustarVisualizacaoMapa = () => {
    // Ajustar o mapa para mostrar o usuário e a próxima etapa da rota
    if (mapRef.current && localizacaoAtual) {
      // Determinar região do mapa para mostrar posição atual e próximo ponto
      const proximoPonto = rotaInfo.pontos[Math.min(indexInstrucao + 1, rotaInfo.pontos.length - 1)];
      
      if (proximoPonto) {
        // Adicionar padding para que os marcadores não fiquem exatamente na borda
        mapRef.current.fitToCoordinates(
          [
            localizacaoAtual,
            { latitude: proximoPonto[1], longitude: proximoPonto[0] }
          ],
          {
            edgePadding: { top: 100, right: 100, bottom: 300, left: 100 },
            animated: true
          }
        );
      }
    }
  };

  const formatarDistancia = (metros) => {
    return metros >= 1000 
      ? `${(metros / 1000).toFixed(1)} km` 
      : `${metros.toFixed(0)} m`;
  };
  
  const formatarDuracao = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    
    if (horas > 0) {
      return `${horas}h ${minutos}min`;
    }
    return `${minutos} min`;
  };
  
  const recentralizarMapa = () => {
    if (mapRef.current && localizacaoAtual) {
      mapRef.current.animateToRegion({
        latitude: localizacaoAtual.latitude,
        longitude: localizacaoAtual.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }, 500);
    }
  };
  
  // Converter os pontos da rota para o formato esperado pelo MapView.Polyline
  const rotaCoords = rotaInfo ? rotaInfo.pontos.map(ponto => ({
    latitude: ponto[1],
    longitude: ponto[0]
  })) : [];
  
  return (
    <SafeAreaView style={styles.container}>
      {carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2e7d32" />
          <Text style={styles.loadingText}>A iniciar navegação...</Text>
        </View>
      ) : (
        <>
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              followsUserLocation={true}
              showsMyLocationButton={false}
              initialRegion={localizacaoInicial ? {
                latitude: localizacaoInicial.latitude,
                longitude: localizacaoInicial.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              } : null}
            >
              {/* Linha de rota */}
              {rotaCoords.length > 0 && (
                <Polyline
                  coordinates={rotaCoords}
                  strokeWidth={4}
                  strokeColor="#2e7d32"
                />
              )}
              
              {/* Marcador de destino */}
              {rotaCoords.length > 0 && (
                <Marker
                  coordinate={rotaCoords[rotaCoords.length - 1]}
                  title={destino}
                >
                  <Ionicons name="location" size={36} color="#e53935" />
                </Marker>
              )}
            </MapView>
            
            {/* Botão para recentralizar */}
            <TouchableOpacity
              style={styles.recentralizarButton}
              onPress={recentralizarMapa}
            >
              <Ionicons name="locate" size={24} color="#2e7d32" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.instrucaoContainer}>
            <View style={styles.instrucaoHeader}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Distância</Text>
                <Text style={styles.infoValue}>
                  {distanciaRestante ? formatarDistancia(distanciaRestante) : '--'}
                </Text>
              </View>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Tempo restante</Text>
                <Text style={styles.infoValue}>
                  {tempoRestante ? formatarDuracao(tempoRestante) : '--'}
                </Text>
              </View>
            </View>
            
            {proximaInstrucao && (
              <View style={styles.proximaInstrucao}>
                <Ionicons 
                  name="arrow-forward-circle" 
                  size={40} 
                  color="#2e7d32" 
                  style={styles.instrucaoIcon}
                />
                <View style={styles.instrucaoTextContainer}>
                  <Text style={styles.instrucaoTitle}>Próximo passo:</Text>
                  <Text style={styles.instrucaoText}>{proximaInstrucao.instruction}</Text>
                  <Text style={styles.instrucaoDistance}>
                    {formatarDistancia(proximaInstrucao.distance)}
                  </Text>
                </View>
              </View>
            )}
            
            <View style={styles.botoesContainer}>
              <TouchableOpacity
                style={styles.botaoSecundario}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="close-circle-outline" size={24} color="#d32f2f" />
                <Text style={styles.botaoSecundarioTexto}>Encerrar</Text>
              </TouchableOpacity>
              
              {/* Botão para simular progresso - em um app real seria automático */}
              <TouchableOpacity
                style={styles.botaoPrincipal}
                onPress={avancarInstrucao}
              >
                <Ionicons name="chevron-forward" size={24} color="#fff" />
                <Text style={styles.botaoPrincipalTexto}>Avançar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  recentralizarButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  instrucaoContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  instrucaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  proximaInstrucao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f9f5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 16,
  },
  instrucaoIcon: {
    marginRight: 15,
  },
  instrucaoTextContainer: {
    flex: 1,
  },
  instrucaoTitle: {
    fontSize: 14,
    color: '#666',
  },
  instrucaoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  instrucaoDistance: {
    fontSize: 14,
    color: '#666',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoSecundario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  botaoPrincipal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 8,
    flex: 1.5,
  },
  botaoSecundarioTexto: {
    color: '#d32f2f',
    fontWeight: '600',
    marginLeft: 8,
  },
  botaoPrincipalTexto: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
