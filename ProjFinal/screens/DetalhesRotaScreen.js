import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { buscarRota, simularRota } from '../services/routeService';

export default function DetalhesRotaScreen({ route, navigation }) {
  const { origem, destino } = route.params;
  const [loading, setLoading] = useState(true);
  const [rotaInfo, setRotaInfo] = useState(null);
  const [erro, setErro] = useState(null);
  
  useEffect(() => {
    carregarDadosRota();
  }, []);
  
  const carregarDadosRota = async () => {
    setLoading(true);
    setErro(null);
    
    try {
      // Tentar buscar da API real
      const dadosRota = await buscarRota(origem, destino)
        .catch(() => {
          // Se falhar, usar dados simulados
          console.log('Usando dados simulados para rota');
          return simularRota(origem, destino);
        });
      
      setRotaInfo(dadosRota);
    } catch (error) {
      console.error('Erro ao carregar dados da rota:', error);
      setErro('Não foi possível carregar a rota. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
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
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2e7d32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Rota</Text>
      </View>
      
      <View style={styles.rotaInfoContainer}>
        <View style={styles.rotaHeader}>
          <View style={styles.rotaEndpoints}>
            <View style={styles.endpointContainer}>
              <Ionicons name="location-outline" size={20} color="#2e7d32" />
              <Text style={styles.endpointText}>{origem}</Text>
            </View>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Ionicons name="arrow-down" size={16} color="#666" />
              <View style={styles.divider} />
            </View>
            <View style={styles.endpointContainer}>
              <Ionicons name="navigate-outline" size={20} color="#2e7d32" />
              <Text style={styles.endpointText}>{destino}</Text>
            </View>
          </View>
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2e7d32" />
            <Text style={styles.loadingText}>A calcular a melhor rota...</Text>
          </View>
        ) : erro ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={48} color="#d32f2f" />
            <Text style={styles.errorText}>{erro}</Text>
            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={carregarDadosRota}
            >
              <Ionicons name="refresh-outline" size={18} color="#fff" />
              <Text style={styles.retryButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        ) : rotaInfo && (
          <ScrollView style={styles.rotaDetalhes}>
            <View style={styles.rotaSummary}>
              <View style={styles.summaryItem}>
                <Ionicons name="time-outline" size={24} color="#2e7d32" />
                <Text style={styles.summaryText}>
                  {formatarDuracao(rotaInfo.duracao)}
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Ionicons name="compass-outline" size={24} color="#2e7d32" />
                <Text style={styles.summaryText}>
                  {formatarDistancia(rotaInfo.distancia)}
                </Text>
              </View>
            </View>
            
            <View style={styles.rotaInstrucoes}>
              <Text style={styles.sectionTitle}>Instruções de Navegação</Text>
              {rotaInfo.instrucoes.map((instrucao, index) => (
                <View key={index} style={styles.instrucaoItem}>
                  <View style={styles.instrucaoNumero}>
                    <Text style={styles.instrucaoNumeroText}>{index + 1}</Text>
                  </View>
                  <View style={styles.instrucaoConteudo}>
                    <Text style={styles.instrucaoTexto}>{instrucao.instruction}</Text>
                    <View style={styles.instrucaoDetalhe}>
                      <Text style={styles.instrucaoDistancia}>
                        {formatarDistancia(instrucao.distance)}
                      </Text>
                      <Text style={styles.instrucaoDuracao}>
                        {formatarDuracao(instrucao.duration)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            
            <View style={styles.botoesAcao}>
              <TouchableOpacity 
                style={[styles.botaoAcao, styles.botaoSecundario]}
                onPress={() => {
                  // Simulação de compartilhamento
                  alert('Funcionalidade de compartilhamento de rota simulada!');
                }}
              >
                <Ionicons name="share-outline" size={20} color="#2e7d32" />
                <Text style={styles.botaoSecundarioTexto}>Partilhar</Text>
              </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.botaoAcao, styles.botaoPrincipal]}
                onPress={() => {
                  // Navegar para a tela de navegação GPS
                  navigation.navigate('NavegacaoGPS', {
                    rotaInfo,
                    origem,
                    destino
                  });
                }}
              >
                <Ionicons name="navigate" size={20} color="#fff" />
                <Text style={styles.botaoPrincipalTexto}>Iniciar Navegação</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginRight: 40, // Para compensar o botão de voltar
  },
  rotaInfoContainer: {
    flex: 1,
    margin: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rotaHeader: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rotaEndpoints: {
    paddingHorizontal: 8,
  },
  endpointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  endpointText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    marginLeft: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  rotaDetalhes: {
    flex: 1,
  },
  rotaSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#f5f9f5',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#ddd',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginLeft: 8,
  },
  rotaInstrucoes: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  instrucaoItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  instrucaoNumero: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2e7d32',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  instrucaoNumeroText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  instrucaoConteudo: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  instrucaoTexto: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  instrucaoDetalhe: {
    flexDirection: 'row',
  },
  instrucaoDistancia: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
  },
  instrucaoDuracao: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    marginTop: 16,
    marginBottom: 24,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  botoesAcao: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  botaoAcao: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  botaoSecundario: {
    backgroundColor: '#f5f5f5',
  },
  botaoPrincipal: {
    backgroundColor: '#2e7d32',
    flex: 1.5,
  },
  botaoSecundarioTexto: {
    color: '#2e7d32',
    fontWeight: '600',
    marginLeft: 8,
  },
  botaoPrincipalTexto: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
});
