import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import axios from "axios"; // se ainda não estiver importado

export default function HomeScreen({ navigation }) {
  const { palette, menuDisplay } = useTheme();

  // Estado para localização e clima
  const [localizacao, setLocalizacao] = useState("A obter localização...");
  const [clima, setClima] = useState({ temp: "--", variacao: "" });

  const API_KEY = "b8f7ef8df892260bedc5df393d15a18b"; // Usa a mesma chave do ClimaScreen

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLocalizacao("Permissão negada");
          // Fallback para Lisboa
          fetchWeatherByCity("Lisboa");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        let [place] = await Location.reverseGeocodeAsync(location.coords);
        setLocalizacao(
          `${place.street || ""}, ${place.name || ""}, ${place.city || ""}`
        );
        fetchWeatherByCoords(
          location.coords.latitude,
          location.coords.longitude
        );
      } catch (e) {
        setLocalizacao("Erro ao obter localização");
        fetchWeatherByCity("Lisboa");
      }
    })();
  }, []);

  // Função para buscar clima por coordenadas
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const resp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=pt`
      );
      setClima({
        temp: Math.round(resp.data.main.temp),
        variacao: resp.data.weather[0].description,
      });
    } catch (e) {
      setClima({ temp: "--", variacao: "Erro ao buscar clima" });
    }
  };

  // Função para buscar clima por cidade (fallback)
  const fetchWeatherByCity = async (city) => {
    try {
      const resp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=pt`
      );
      setClima({
        temp: Math.round(resp.data.main.temp),
        variacao: resp.data.weather[0].description,
      });
    } catch (e) {
      setClima({ temp: "--", variacao: "Erro ao buscar clima" });
    }
  };

  const menuItems = [
    { name: "Início", icon: "home-outline", route: "Home" },
    { name: "Bateria", icon: "battery-charging-outline", route: "Bateria" },
    { name: "Navegação", icon: "navigate-outline", route: "Navegação" },
    { name: "Controlo", icon: "game-controller-outline", route: "Controlo" },
    { name: "Manutenção", icon: "construct-outline", route: "Manutenção" },
    { name: "Comunidade", icon: "people-outline", route: "Comunidade" },
    { name: "Definições", icon: "settings-outline", route: "Definições" },
  ];

  // Exemplo de dados mock
  const resumo = {
    bateria: 78,
    autonomia: 120,
    eficiencia: 85,
    eficienciaDelta: "+5%",
    distanciaHoje: 24.5,
    manutencao: "15 Abr",
    diasManutencao: 12,
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: palette.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Menu principal */}
        <View style={[styles.menuContainer, { backgroundColor: palette.card }]}>
          <View style={styles.grid}>
            {menuItems.map((item) => (              <TouchableOpacity
                key={item.name}
                style={[
                  styles.cell,
                  { backgroundColor: palette.card, borderWidth: 0 },
                ]}
                onPress={() => navigation.navigate(item.route)}
                activeOpacity={0.7}
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

        {/* Cartão de boas-vindas */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: palette.card,
              marginTop: 0,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 22,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.titulo,
                { color: palette.primary, fontSize: 32, marginBottom: 4 }, // Aumenta o tamanho
              ]}
            >
              Bem-vindo
            </Text>
            <Text
              style={[
                styles.subtitulo,
                { color: palette.textSecondary, fontSize: 20 }, // Aumenta o tamanho
              ]}
            >
              A sua moto elétrica está pronta
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 24,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: palette.background,
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginRight: 16,
                }}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={32} // Aumenta o tamanho do ícone
                  color={palette.success || "#00c853"}
                />
                <Text
                  style={{
                    color: palette.success || "#00c853",
                    marginLeft: 10,
                    fontWeight: "bold",
                    fontSize: 20, // Aumenta o tamanho da letra
                  }}
                >
                  Segura
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: palette.background,
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
              >
                <Ionicons
                  name="battery-charging-outline"
                  size={32} // Aumenta o tamanho do ícone
                  color={palette.primary}
                />
                <Text
                  style={{
                    color: palette.primary,
                    marginLeft: 10,
                    fontWeight: "bold",
                    fontSize: 20, // Aumenta o tamanho da letra
                  }}
                >
                  {resumo.bateria}%
                </Text>
              </View>
            </View>
          </View>
          {/* Ícone de moto personalizado e maior */}
          <View
            style={{
              backgroundColor: palette.background,
              borderRadius: 28, // reduzido de 40 para 28
              padding: 8, // reduzido de 16 para 8
              marginLeft: 24,
              borderWidth: 2,
              borderColor: palette.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="bicycle"
              size={70} // reduzido de 90 para 70 (opcional, ajuste se quiser)
              color={palette.primary}
              style={{ transform: [{ rotate: "-10deg" }] }}
            />
          </View>
        </View>

        {/* Cartão Resumo Rápido */}
        <View
          style={[
            styles.card,
            { backgroundColor: palette.card, paddingVertical: 26 },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              { color: palette.primary, fontSize: 22, marginBottom: 16 },
            ]}
          >
            Resumo Rápido
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 22 }}>
            {/* Bateria */}
            <View style={{ flex: 1, marginRight: 14 }}>
              <Text
                style={[
                  styles.label,
                  { color: palette.textSecondary, fontSize: 15 },
                ]}
              >
                Nível da Bateria
              </Text>
              <Text
                style={[styles.valor, { color: palette.text, fontSize: 22 }]}
              >
                <Text
                  style={{
                    color:
                      resumo.bateria >= 70
                        ? palette.success || "#00c853"
                        : resumo.bateria >= 30
                        ? palette.warning || "#ff9800"
                        : "#e53935",
                    fontWeight: "bold",
                  }}
                >
                  {resumo.bateria}%
                </Text>{" "}
                <Text style={{ color: palette.textSecondary, fontSize: 16 }}>
                  {resumo.autonomia}km
                </Text>
              </Text>
              <View
                style={{
                  height: 16,
                  backgroundColor: palette.background,
                  borderRadius: 8,
                  marginTop: 8,
                  overflow: "hidden",
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#ddd",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: `${Math.max(0, Math.min(resumo.bateria, 100))}%`,
                    backgroundColor:
                      resumo.bateria >= 70
                        ? palette.success || "#00c853"
                        : resumo.bateria >= 30
                        ? palette.warning || "#ff9800"
                        : "#e53935",
                    borderRadius: 8,
                  }}
                />
              </View>
            </View>
            {/* Eficiência */}
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text
                style={[
                  styles.label,
                  { color: palette.textSecondary, fontSize: 15 },
                ]}
              >
                Eficiência
              </Text>
              <Text
                style={[styles.valor, { color: palette.text, fontSize: 22 }]}
              >
                <Text
                  style={{
                    color:
                      resumo.eficiencia >= 80
                        ? palette.success || "#00c853"
                        : resumo.eficiencia >= 50
                        ? palette.warning || "#ff9800"
                        : "#e53935",
                    fontWeight: "bold",
                  }}
                >
                  {resumo.eficiencia}%
                </Text>{" "}
                <Text
                  style={{ color: palette.success || "#00c853", fontSize: 16 }}
                >
                  {resumo.eficienciaDelta}
                </Text>
              </Text>
              <View
                style={{
                  height: 16,
                  backgroundColor: palette.background,
                  borderRadius: 8,
                  marginTop: 8,
                  overflow: "hidden",
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#ddd",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: `${Math.max(0, Math.min(resumo.eficiencia, 100))}%`,
                    backgroundColor:
                      resumo.eficiencia >= 80
                        ? palette.success || "#00c853"
                        : resumo.eficiencia >= 50
                        ? palette.warning || "#ff9800"
                        : "#e53935",
                    borderRadius: 8,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.label,
                  { color: palette.textSecondary, fontSize: 14 },
                ]}
              >
                Distância Hoje
              </Text>
              <Text
                style={[styles.valor, { color: palette.text, fontSize: 18 }]}
              >
                {resumo.distanciaHoje} km
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={[
                  styles.label,
                  {
                    color: palette.textSecondary,
                    fontSize: 14,
                    textAlign: "center",
                  },
                ]}
              >
                Próxima Manutenção
              </Text>
              <Text
                style={[
                  styles.valor,
                  {
                    color: palette.warning || "#ff9800",
                    fontSize: 18,
                    textAlign: "center",
                  },
                ]}
              >
                {resumo.manutencao}{" "}
                <Text style={{ color: palette.textSecondary, fontSize: 14 }}>
                  ({resumo.diasManutencao} dias)
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Ações rápidas */}
        <View
          style={[
            styles.card,
            { backgroundColor: palette.card, paddingVertical: 22 },
          ]}
        >
          <Text
            style={[styles.cardTitle, { color: palette.primary, fontSize: 20 }]}
          >
            Ações Rápidas
          </Text>
          <View style={{ flexDirection: "row", marginTop: 18 }}>
            {/* Localizar Moto */}
            <TouchableOpacity
              style={[
                styles.acaoBtn,
                {
                  backgroundColor: palette.background,
                  borderWidth: 2,
                  borderColor: palette.primary,
                  height: 70,
                  flex: 1.3,
                  marginRight: 8,
                  elevation: 3,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 6,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Navegação")}
            >
              <Ionicons
                name="locate-outline"
                size={28}
                color={palette.primary}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={[
                  styles.acaoLabel,
                  {
                    color: palette.primary,
                    fontSize: 15,
                    fontWeight: "bold",
                    letterSpacing: 0.5,
                  },
                ]}
              >
                Localizar Moto
              </Text>
            </TouchableOpacity>
            {/* Bloquear */}
            <TouchableOpacity
              style={[
                styles.acaoBtn,
                {
                  backgroundColor: palette.background,
                  borderWidth: 1,
                  borderColor: palette.card,
                  height: 70,
                  flex: 1,
                  marginRight: 8,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 6,
                },
              ]}
              activeOpacity={0.8}
            >
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={palette.primary}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={[
                  styles.acaoLabel,
                  { color: palette.primary, fontSize: 14, fontWeight: "bold" },
                ]}
              >
                Bloquear
              </Text>
            </TouchableOpacity>
            {/* Iniciar Viagem */}
            <TouchableOpacity
              style={[
                styles.acaoBtn,
                {
                  backgroundColor: palette.primary,
                  shadowColor: palette.primary,
                  shadowOpacity: 0.18,
                  shadowRadius: 8,
                  height: 70,
                  flex: 1.5,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 6,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Rotas")}
            >
              <Ionicons
                name="play-outline"
                size={26}
                color="#fff"
                style={{ marginBottom: 4 }}
              />
              <Text
                style={[
                  styles.acaoLabel,
                  {
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: "bold",
                    letterSpacing: 0.5,
                  },
                ]}
              >
                Iniciar Viagem
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Localização e Clima */}
        <View style={{ flexDirection: "row" }}>
          <View
            style={[
              styles.card,
              {
                backgroundColor: palette.card,
                flex: 1,
                marginRight: 8,
                padding: 20,
                justifyContent: "center",
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Ionicons
                name="location-outline"
                size={18}
                color={palette.primary}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.label,
                  { color: palette.textSecondary, fontSize: 15, marginTop: 0 },
                ]}
              >
                Localização
              </Text>
            </View>
            <Text
              style={[
                styles.valor,
                { color: palette.text, fontSize: 17, marginBottom: 8 },
              ]}
            >
              {localizacao}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={palette.success || "#00c853"}
              />
              <Text
                style={{
                  color: palette.success || "#00c853",
                  marginLeft: 7,
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                Segura
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.card,
              {
                backgroundColor: palette.card,
                flex: 1,
                marginLeft: 8,
                padding: 20,
                justifyContent: "center",
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Ionicons
                name="partly-sunny-outline"
                size={18}
                color={palette.primary}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.label,
                  { color: palette.textSecondary, fontSize: 15, marginTop: 0 },
                ]}
              >
                Clima Hoje
              </Text>
            </View>
            <Text style={[styles.valor, { color: palette.text, fontSize: 17 }]}>
              {clima.temp}°C{" "}
              <Text
                style={{ color: palette.success || "#00c853", fontSize: 14 }}
              >
                {clima.variacao}
              </Text>
            </Text>
          </View>
        </View>

        {/* Atividade Recente */}
        <View
          style={[
            styles.card,
            { backgroundColor: palette.card, paddingVertical: 22 },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text
              style={[
                styles.cardTitle,
                { color: palette.primary, fontSize: 20 },
              ]}
            >
              Atividade Recente
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Manutenção")}>
              <Text
                style={{
                  color: palette.primary,
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Ver Detalhes{" "}
                <Ionicons
                  name="chevron-forward-outline"
                  size={16}
                  color={palette.primary}
                />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={19}
                color={palette.primary}
                style={{ marginRight: 9 }}
              />
              <View>
                <Text
                  style={[
                    styles.atividade,
                    { color: palette.text, fontSize: 16 },
                  ]}
                >
                  Viagem concluída{" "}
                  <Text style={{ color: palette.textSecondary }}>
                    Centro → Casa
                  </Text>
                </Text>
                <Text
                  style={{
                    color: palette.textSecondary,
                    fontSize: 14,
                    marginLeft: 2,
                  }}
                >
                  8.2 km • 14:30
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Ionicons
                name="battery-charging-outline"
                size={19}
                color={palette.success || "#00c853"}
                style={{ marginRight: 9 }}
              />
              <View>
                <Text
                  style={[
                    styles.atividade,
                    { color: palette.text, fontSize: 16 },
                  ]}
                >
                  Carregamento iniciado{" "}
                  <Text style={{ color: palette.success || "#00c853" }}>
                    45% → 78%
                  </Text>
                </Text>
                <Text
                  style={{
                    color: palette.textSecondary,
                    fontSize: 14,
                    marginLeft: 2,
                  }}
                >
                  08:15
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <Ionicons
                name="construct-outline"
                size={19}
                color={palette.warning || "#ff9800"}
                style={{ marginRight: 9 }}
              />
              <View>
                <Text
                  style={[
                    styles.atividade,
                    { color: palette.text, fontSize: 16 },
                  ]}
                >
                  Manutenção verificada{" "}
                  <Text style={{ color: palette.success || "#00c853" }}>
                    Tudo OK
                  </Text>
                </Text>
                <Text
                  style={{
                    color: palette.textSecondary,
                    fontSize: 14,
                    marginLeft: 2,
                  }}
                >
                  Ontem
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Melhora os estilos:
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    margin: 12,
    padding: 8,
    borderRadius: 12,
    alignSelf: "stretch",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cell: {
    width: "31%",
    height: 60,
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
  card: {
    margin: 12,
    padding: 18,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 14,
    marginTop: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
    color: "#2e7d32",
    textAlign: "center",
  },
  valor: {
    fontSize: 15,
    fontWeight: "bold",
  },
  acaoBtn: {
    flex: 1,
    margin: 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    flexDirection: "row",
  },
  acaoLabel: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "bold",
  },
  atividade: {
    fontSize: 13,
  },
});
