// filepath: d:\Users\almed\GitHub\Projeto-Final-Laborat-rio\ProjFinal\screens\RotasScreen.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { buscarRota, buscarSugestoesLocais } from "../services/routeService";
import { useTheme } from "../context/ThemeContext";

export default function RotasScreen({ navigation, route }) {
  const { palette, menuDisplay } = useTheme();
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState(route?.params?.destino || ""); // <-- aqui
  const [carregando, setCarregando] = useState(false);
  const [sugestoesOrigem, setSugestoesOrigem] = useState([]);
  const [sugestoesDestino, setSugestoesDestino] = useState([]);
  const [buscandoSugestoes, setBuscandoSugestoes] = useState(false);
  const [campoAtivo, setCampoAtivo] = useState(null); // 'origem' ou 'destino'
  const [detectandoLocalizacao, setDetectandoLocalizacao] = useState(false);

  const menuItems = [
    { name: "Início", icon: "home-outline", route: "Home" },
    { name: "Bateria", icon: "battery-charging-outline", route: "Bateria" },
    { name: "Navegação", icon: "navigate-outline", route: "Navegação" },
    { name: "Controlo", icon: "game-controller-outline", route: "Controlo" },
    { name: "Manutenção", icon: "construct-outline", route: "Manutenção" },
    { name: "Comunidade", icon: "people-outline", route: "Comunidade" },
    { name: "Definições", icon: "settings-outline", route: "Definições" },
  ];

  // Buscar sugestões ao digitar
  useEffect(() => {
    const buscarSugestoes = async () => {
      if (campoAtivo === "origem" && origem.length >= 3) {
        setBuscandoSugestoes(true);
        try {
          const sugestoes = await buscarSugestoesLocais(origem, "pt");
          setSugestoesOrigem(sugestoes);
          setSugestoesDestino([]); // Limpa as sugestões do outro campo
        } catch (error) {
          console.error("Erro ao buscar sugestões:", error);
        } finally {
          setBuscandoSugestoes(false);
        }
      } else if (campoAtivo === "destino" && destino.length >= 3) {
        setBuscandoSugestoes(true);
        try {
          const sugestoes = await buscarSugestoesLocais(destino, "pt");
          setSugestoesDestino(sugestoes);
          setSugestoesOrigem([]); // Limpa as sugestões do outro campo
        } catch (error) {
          console.error("Erro ao buscar sugestões:", error);
        } finally {
          setBuscandoSugestoes(false);
        }
      }
    };

    // Usa um timer para evitar muitas chamadas enquanto o usuário digita
    const timer = setTimeout(() => {
      buscarSugestoes();
    }, 500);

    return () => clearTimeout(timer);
  }, [origem, destino, campoAtivo]);

  // Função para selecionar uma sugestão
  const selecionarSugestao = (item, tipo) => {
    if (tipo === "origem") {
      setOrigem(item.nome);
      setSugestoesOrigem([]);
    } else {
      setDestino(item.nome);
      setSugestoesDestino([]);
    }
    setCampoAtivo(null);
    Keyboard.dismiss();
  };

  // Limpa as sugestões quando o usuário toca fora
  const limparSugestoes = () => {
    setSugestoesOrigem([]);
    setSugestoesDestino([]);
    setCampoAtivo(null);
    Keyboard.dismiss();
  };

  const procurarRota = async () => {
    if (origem && destino) {
      setCarregando(true);
      try {
        // Navegamos para a tela de detalhes da rota com os parâmetros
        navigation.navigate("DetalhesRota", { origem, destino });
      } catch (error) {
        console.error("Erro ao procurar rota:", error);
        alert("Erro ao procurar rota. Por favor, tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    } else {
      alert("Por favor, informe a origem e o destino para procurar uma rota.");
    }
  };

  const agendarRota = async () => {
    if (origem && destino) {
      setCarregando(true);
      try {
        // Validar se a rota existe tentando buscar primeiro
        await buscarRota(origem, destino);

        // Se chegar aqui, a rota foi encontrada, então podemos agendar
        // Futuramente, poderia salvar em uma base de dados
        alert("Rota agendada com sucesso!");
      } catch (error) {
        console.error("Erro ao agendar rota:", error);
        alert(
          "Não foi possível agendar esta rota. Verifique se os locais informados são válidos."
        );
      } finally {
        setCarregando(false);
      }
    } else {
      alert("Por favor, informe a origem e o destino para agendar uma rota.");
    }
  };

  // Função para detectar localização atual
  const detectarLocalizacaoAtual = async () => {
    setDetectandoLocalizacao(true);
    try {
      // Solicitar permissões de localização
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "É necessário permitir o acesso à sua localização para usar esta funcionalidade.",
          [{ text: "OK" }]
        );
        return;
      }

      // Obter a localização atual
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;

      // Realizar a geocodificação reversa para obter o endereço
      const [endereco] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (endereco) {
        // Formatar o endereço de forma amigável
        const localizacaoFormatada = [
          endereco.street,
          endereco.district,
          endereco.city,
          endereco.region,
          endereco.country,
        ]
          .filter(Boolean) // Remove valores undefined ou vazios
          .join(", ");

        // Atualizar o campo de origem
        setOrigem(localizacaoFormatada);
        setSugestoesOrigem([]); // Limpa sugestões após selecionar a localização atual
      } else {
        Alert.alert("Erro", "Não foi possível determinar seu endereço atual.", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      console.error("Erro ao obter localização:", error);
      Alert.alert(
        "Erro",
        "Não foi possível obter sua localização atual. Por favor, verifique as permissões do aplicativo.",
        [{ text: "OK" }]
      );
    } finally {
      setDetectandoLocalizacao(false);
    }
  };

  // Renderiza um item da lista de sugestões
  const renderItemSugestao = ({ item, tipo }) => (
    <TouchableOpacity
      style={styles.sugestaoItem}
      onPress={() => selecionarSugestao(item, tipo)}
    >
      <Ionicons
        name={tipo === "origem" ? "location-outline" : "navigate-outline"}
        size={20}
        color="#2e7d32"
      />
      <Text style={styles.sugestaoText} numberOfLines={1} ellipsizeMode="tail">
        {item.nome}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.touchableBackground}
            onPress={limparSugestoes}
          >
            {/* container branco atrás dos botões */}
            <View style={styles.menuContainer}>
              <View style={styles.grid}>                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.name}
                    style={[styles.cell, { backgroundColor: palette.card }]}
                    onPress={() => navigation.navigate(item.route)}
                  >
                    {menuDisplay !== "texto" && (
                      <Ionicons name={item.icon} size={32} color={palette.primary} />
                    )}
                    {menuDisplay !== "icones" && (
                      <Text style={[styles.label, { color: palette.primary }]}>
                        {item.name}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.submenuContainer}>
              <TouchableOpacity
                style={styles.submenuButton}
                onPress={() => navigation.navigate("Localização")}
              >
                <Ionicons name="location-outline" size={24} color="#2e7d32" />
                <Text style={styles.submenuLabel}>Localização</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submenuButton}
                onPress={() => navigation.navigate("Rotas")}
              >
                <Ionicons name="map-outline" size={24} color="#2e7d32" />
                <Text style={styles.submenuLabel}>Rotas</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submenuButton}
                onPress={() => navigation.navigate("Clima")}
              >
                <Ionicons name="sunny-outline" size={24} color="#2e7d32" />
                <Text style={styles.submenuLabel}>Clima</Text>
              </TouchableOpacity>
            </View>

            {/* Novo componente de Planeador de Rotas */}
            <View style={styles.rotasPlannerContainer}>
              <View style={styles.rotasPlannerHeader}>
                <Ionicons name="map-outline" size={24} color="#2e7d32" />
                <Text style={styles.rotasPlannerTitle}>Planeador de Rotas</Text>
              </View>{" "}
              {/* Campo de origem com autocompletar */}
              <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                  <Ionicons name="location-outline" size={24} color="#2e7d32" />
                  <TextInput
                    style={styles.input}
                    placeholder="Origem"
                    value={origem}
                    onChangeText={setOrigem}
                    onFocus={() => setCampoAtivo("origem")}
                  />
                  {buscandoSugestoes && campoAtivo === "origem" && (
                    <ActivityIndicator
                      size="small"
                      color="#2e7d32"
                      style={{ marginRight: 8 }}
                    />
                  )}
                  {/* Botão para usar localização atual */}
                  <TouchableOpacity
                    style={styles.locationButton}
                    onPress={detectarLocalizacaoAtual}
                    disabled={detectandoLocalizacao}
                  >
                    {detectandoLocalizacao ? (
                      <ActivityIndicator size="small" color="#2e7d32" />
                    ) : (
                      <Ionicons name="locate" size={24} color="#2e7d32" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Lista de sugestões para origem */}
                {sugestoesOrigem.length > 0 && (
                  <View style={styles.sugestoesContainer}>
                    <FlatList
                      data={sugestoesOrigem}
                      renderItem={({ item }) =>
                        renderItemSugestao({ item, tipo: "origem" })
                      }
                      keyExtractor={(item) => item.id.toString()}
                      keyboardShouldPersistTaps="handled"
                      style={styles.sugestoesList}
                      contentContainerStyle={styles.sugestoesContent}
                    />
                  </View>
                )}
              </View>
              {/* Campo de destino com autocompletar */}
              <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                  <Ionicons name="navigate-outline" size={24} color="#2e7d32" />
                  <TextInput
                    style={styles.input}
                    placeholder="Destino"
                    value={destino}
                    onChangeText={setDestino}
                    onFocus={() => setCampoAtivo("destino")}
                  />
                  {buscandoSugestoes && campoAtivo === "destino" && (
                    <ActivityIndicator
                      size="small"
                      color="#2e7d32"
                      style={{ marginRight: 8 }}
                    />
                  )}
                </View>

                {/* Lista de sugestões para destino */}
                {sugestoesDestino.length > 0 && (
                  <View style={styles.sugestoesContainer}>
                    <FlatList
                      data={sugestoesDestino}
                      renderItem={({ item }) =>
                        renderItemSugestao({ item, tipo: "destino" })
                      }
                      keyExtractor={(item) => item.id.toString()}
                      keyboardShouldPersistTaps="handled"
                      style={styles.sugestoesList}
                      contentContainerStyle={styles.sugestoesContent}
                    />
                  </View>
                )}
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={agendarRota}
                  disabled={carregando}
                >
                  {carregando ? (
                    <ActivityIndicator size="small" color="#2e7d32" />
                  ) : (
                    <>
                      <Ionicons
                        name="calendar-outline"
                        size={22}
                        color="#2e7d32"
                      />
                      <Text style={styles.actionButtonText}>Agendar</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.primaryButton]}
                  onPress={procurarRota}
                  disabled={carregando}
                >
                  {carregando ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Ionicons name="search-outline" size={22} color="#fff" />
                      <Text style={styles.primaryButtonText}>
                        Procurar Rota
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>{" "}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  touchableBackground: {
    flex: 1,
  },
  menuContainer: {
    margin: 12,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignSelf: "stretch",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cell: {
    width: "31%",
    height: 60,
    backgroundColor: "#fff",
    margin: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
    color: "#2e7d32",
    textAlign: "center",
  },
  submenuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  submenuButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  submenuLabel: {
    color: "#2e7d32",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  rotasPlannerContainer: {
    margin: 12,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignSelf: "stretch",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rotasPlannerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rotasPlannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
    marginLeft: 8,
  },
  inputWrapper: {
    marginBottom: 12,
    position: "relative",
    zIndex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  locationButton: {
    padding: 8,
    borderRadius: 20,
    marginLeft: 4,
  },
  sugestoesContainer: {
    position: "absolute",
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 2,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sugestoesList: {
    flex: 1,
  },
  sugestoesContent: {
    paddingVertical: 4,
  },
  sugestaoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sugestaoText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: "#2e7d32",
    flex: 1.5,
  },
  actionButtonText: {
    color: "#2e7d32",
    fontWeight: "600",
    marginLeft: 6,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
  },
});
