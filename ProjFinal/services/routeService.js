/**
 * Serviço para buscar rotas utilizando a API do OpenRouteService
 * Requer registro em https://openrouteservice.org/ para obter uma API key
 */
import axios from 'axios';

// Substitua com sua API key do OpenRouteService
const API_KEY = '5b3ce3597851110001cf6248dea6d980f26b4ea98045ef7131ac34f4';
const API_URL = 'https://api.openrouteservice.org/v2/directions/driving-car';

/**
 * Busca uma rota entre dois pontos usando geocodificação e a API OpenRouteService
 * @param {string} origem - Nome do local de origem
 * @param {string} destino - Nome do local de destino
 * @returns {Promise} - Promessa com dados da rota
 */
export const buscarRota = async (origem, destino) => {
  try {
    // Primeiro, geocodificar a origem e o destino para obter coordenadas
    const origemCoords = await geocodificarLocal(origem);
    const destinoCoords = await geocodificarLocal(destino);
    
    if (!origemCoords || !destinoCoords) {
      throw new Error('Não foi possível encontrar as coordenadas para os locais especificados');
    }
    
    // Fazer a requisição para a API de rotas
    const response = await axios.get(API_URL, {
      params: {
        api_key: API_KEY,
        start: `${origemCoords.lon},${origemCoords.lat}`,
        end: `${destinoCoords.lon},${destinoCoords.lat}`
      },
      headers: {
        'Accept': 'application/json, application/geo+json, application/gpx+xml',
        'Authorization': API_KEY
      }
    });
    
    return processarResultadoRota(response.data);
    
  } catch (error) {
    console.error('Erro ao buscar rota:', error);
    throw error;
  }
};

/**
 * Geocodifica um local para obter suas coordenadas
 * @param {string} local - Nome do local a ser geocodificado
 * @returns {Promise} - Promessa com latitude e longitude
 */
const geocodificarLocal = async (local) => {
  try {
    // URL da API de geocodificação do Nominatim (OpenStreetMap)
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(local)}`;
    
    const response = await axios.get(geocodeUrl, {
      headers: {
        'User-Agent': 'ProjFinal-App' // Identificação necessária para o Nominatim
      }
    });
    
    if (response.data && response.data.length > 0) {
      return {
        lat: response.data[0].lat,
        lon: response.data[0].lon
      };
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao geocodificar local:', error);
    return null;
  }
};

/**
 * Processa o resultado da API de rotas para um formato mais adequado para a aplicação
 * @param {Object} data - Dados da resposta da API
 * @returns {Object} - Dados formatados da rota
 */
const processarResultadoRota = (data) => {
  // Exemplo simples de processamento - pode ser expandido conforme necessário
  if (!data || !data.features || data.features.length === 0) {
    throw new Error('Dados da rota inválidos');
  }
  
  const feature = data.features[0];
  const properties = feature.properties;
  
  return {
    distancia: properties.summary.distance, // em metros
    duracao: properties.summary.duration, // em segundos
    pontos: feature.geometry.coordinates,
    instrucoes: properties.segments.flatMap(segment => segment.steps)
  };
};

/**
 * Função para simular a busca de rota quando a API não estiver disponível
 * @param {string} origem - Nome do local de origem
 * @param {string} destino - Nome do local de destino
 * @returns {Object} - Dados simulados da rota
 */
export const simularRota = (origem, destino) => {
  // Dados simulados para testes quando a API não estiver disponível
  return {
    distancia: 8500, // 8.5 km
    duracao: 1200, // 20 minutos
    pontos: [
      [-8.6291, 41.1579], // exemplo de coordenadas
      [-8.6260, 41.1580],
      [-8.6240, 41.1590],
      [-8.6220, 41.1600]
    ],
    instrucoes: [
      { 
        instruction: `Saia de ${origem} em direção à Rua Principal`, 
        distance: 500,
        duration: 120
      },
      { 
        instruction: 'Vire à direita na Avenida Central', 
        distance: 2000,
        duration: 300
      },
      { 
        instruction: 'Continue pela Estrada Nacional', 
        distance: 5000,
        duration: 600
      },
      { 
        instruction: `Chegou ao destino: ${destino}`, 
        distance: 1000,
        duration: 180
      }
    ]
  };
};

/**
 * Cache para sugestões recentes para evitar chamadas de API desnecessárias
 */
let sugestoesCache = {};

/**
 * Busca sugestões de locais à medida que o usuário digita
 * @param {string} texto - Texto digitado pelo usuário
 * @param {string} pais - Código do país para limitar a busca (opcional, ex: 'pt' para Portugal)
 * @returns {Promise<Array>} - Promessa com array de sugestões
 */
export const buscarSugestoesLocais = async (texto, pais = null) => {
  if (!texto || texto.length < 3) {
    return []; // Retorna vazio se o texto for muito curto
  }
  
  // Verifica se já temos este resultado em cache
  const cacheKey = `${texto}_${pais || 'all'}`;
  if (sugestoesCache[cacheKey]) {
    return sugestoesCache[cacheKey];
  }
  
  try {
    // URL da API de geocodificação do Nominatim (OpenStreetMap)
    let geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(texto)}&limit=5`;
    
    // Adiciona filtro por país se especificado
    if (pais) {
      geocodeUrl += `&countrycodes=${pais}`;
    }
    
    const response = await axios.get(geocodeUrl, {
      headers: {
        'User-Agent': 'ProjFinal-App' // Identificação necessária para o Nominatim
      }
    });
    
    if (response.data && response.data.length > 0) {
      // Formata os resultados para exibição mais amigável
      const sugestoes = response.data.map(item => ({
        id: item.place_id,
        nome: item.display_name,
        lat: item.lat,
        lon: item.lon
      }));
      
      // Salva no cache
      sugestoesCache[cacheKey] = sugestoes;
      
      // Limpa cache se ficar muito grande (mais de 50 entradas)
      if (Object.keys(sugestoesCache).length > 50) {
        const oldestKeys = Object.keys(sugestoesCache).slice(0, 10);
        oldestKeys.forEach(key => delete sugestoesCache[key]);
      }
      
      return sugestoes;
    }
    
    return [];
  } catch (error) {
    console.error('Erro ao buscar sugestões de locais:', error);
    return [];
  }
};
