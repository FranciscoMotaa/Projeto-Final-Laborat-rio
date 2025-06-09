import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function ComunidadeScreen({ navigation }) {
  const { palette } = useTheme();
  const [tab, setTab] = useState("Feed");

  const menuItems = [
    { name: "Início", icon: "home-outline", route: "Home" },
    { name: "Bateria", icon: "battery-charging-outline", route: "Bateria" },
    { name: "Navegação", icon: "navigate-outline", route: "Navegação" },
    { name: "Controlo", icon: "game-controller-outline", route: "Controlo" },
    { name: "Manutenção", icon: "construct-outline", route: "Manutenção" },
    { name: "Comunidade", icon: "people-outline", route: "Comunidade" },
    { name: "Definições", icon: "settings-outline", route: "Definições" },
  ];

  // Mock de publicações
  const feed = [
    {
      id: 1,
      nome: "Carlos Silva",
      tipo: "Experiente",
      tempo: "2h",
      texto:
        "Acabei de descobrir uma rota incrível para o Parque Natural da Serra da Estrela que economiza muita bateria! Alguém quer experimentar?",
      rota: "Serra da Estrela Eco Route",
      stats: { likes: 24, comments: 8, shares: 6 },
    },
    {
      id: 2,
      nome: "Ana Martins",
      tipo: "Novato",
      tempo: "5h",
      texto:
        "Alguém pode recomendar configurações para maximizar a autonomia em dias chuvosos? Estou a ter problemas com o consumo de energia.",
      stats: { likes: 15, comments: 12, shares: 2 },
    },
    {
      id: 3,
      nome: "Miguel Costa",
      tipo: "Especialista",
      tempo: "1d",
      texto:
        "Acabei de atualizar o firmware da minha mota e a eficiência melhorou em 8%! Recomendo a todos fazerem a atualização.",
      stats: { likes: 42, comments: 16, shares: 9 },
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: palette.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Menu principal */}
        <View style={[styles.menuContainer, { backgroundColor: palette.card }]}>
          <View style={styles.grid}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[styles.cell, { backgroundColor: palette.card }]}
                onPress={() => navigation.navigate(item.route)}
              >
                <Ionicons name={item.icon} size={32} color={palette.primary} />
                <Text style={[styles.label, { color: palette.primary }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Cartão Comunidade */}
        <View style={[styles.card, { backgroundColor: palette.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="people-outline" size={20} color={palette.primary} />
            <Text style={[styles.cardTitle, { color: palette.primary }]}>
              Comunidade
            </Text>
          </View>
          <Text style={styles.cardDesc}>Conecte-se com outros condutores</Text>

          {/* Abas */}
          <View style={styles.tabsRow}>
            {["Feed", "Rotas", "Eventos"].map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.tabButton,
                  tab === t && { backgroundColor: palette.background },
                ]}
                onPress={() => setTab(t)}
              >
                <Text
                  style={[
                    styles.tabText,
                    tab === t && { color: palette.primary, fontWeight: "bold" },
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conteúdo das Abas */}
          {tab === "Feed" && (
            <>
              <View
                style={[
                  styles.searchBox,
                  { backgroundColor: palette.background },
                ]}
              >
                <Ionicons
                  name="search-outline"
                  size={18}
                  color={palette.textSecondary || "#888"}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Pesquisar publicações"
                  placeholderTextColor={palette.textSecondary || "#888"}
                />
              </View>
              {feed.map((pub) => (
                <View
                  key={pub.id}
                  style={[styles.feedCard, { backgroundColor: palette.card }]}
                >
                  <View style={styles.feedHeader}>
                    <View style={styles.avatar} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.feedName}>
                        {pub.nome}{" "}
                        <Text style={styles.feedTipo}>{pub.tipo}</Text>
                      </Text>
                      <Text style={styles.feedTime}>{pub.tempo}</Text>
                    </View>
                  </View>
                  <Text style={styles.feedText}>{pub.texto}</Text>
                  {pub.rota && (
                    <View style={styles.feedRotaRow}>
                      <Ionicons
                        name="map-outline"
                        size={16}
                        color={palette.primary}
                      />
                      <Text style={styles.feedRota}>{pub.rota}</Text>
                      <TouchableOpacity>
                        <Text style={styles.feedRotaLink}>Ver Rota</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <View style={styles.feedStatsRow}>
                    <Text style={styles.feedStat}>
                      <Ionicons name="thumbs-up-outline" size={14} />{" "}
                      {pub.stats.likes}
                    </Text>
                    <Text style={styles.feedStat}>
                      <Ionicons name="chatbubble-ellipses-outline" size={14} />{" "}
                      {pub.stats.comments}
                    </Text>
                    <Text style={styles.feedStat}>
                      <Ionicons name="share-social-outline" size={14} />{" "}
                      {pub.stats.shares}
                    </Text>
                    <TouchableOpacity style={styles.feedShareBtn}>
                      <Ionicons
                        name="share-outline"
                        size={16}
                        color={palette.primary}
                      />
                      <Text style={styles.feedShareText}>Partilhar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <TouchableOpacity
                style={[
                  styles.loadMoreBtn,
                  { backgroundColor: palette.primary },
                ]}
              >
                <Text style={styles.loadMoreText}>Carregar Mais</Text>
              </TouchableOpacity>
            </>
          )}

          {tab === "Rotas" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: palette.textSecondary || "#888",
                    fontWeight: "bold",
                  }}
                >
                  Rotas Populares
                </Text>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={20}
                    color={palette.primary}
                  />
                  <Text
                    style={{
                      color: palette.primary,
                      fontWeight: "bold",
                      marginLeft: 4,
                    }}
                  >
                    Criar
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Lista de Rotas Populares */}
              {[
                {
                  id: 1,
                  nome: "Costa Vicentina Panorâmica",
                  autor: "João Almeida",
                  distancia: "120 km",
                  tempo: "2h 30min",
                  dificuldade: "Alta",
                  rating: 4.8,
                  votos: 34,
                },
                {
                  id: 2,
                  nome: "Circuito Urbano do Porto",
                  autor: "Maria Santos",
                  distancia: "25 km",
                  tempo: "1h 15min",
                  dificuldade: "Média",
                  rating: 4.5,
                  votos: 28,
                },
                {
                  id: 3,
                  nome: "Montanhas do Gerês",
                  autor: "Pedro Oliveira",
                  distancia: "85 km",
                  tempo: "3h",
                  dificuldade: "Baixa",
                  rating: 4.9,
                  votos: 42,
                },
              ].map((rota) => (
                <View
                  key={rota.id}
                  style={{
                    backgroundColor: palette.card,
                    borderRadius: 10,
                    padding: 14,
                    marginBottom: 14,
                    shadowColor: "#000",
                    shadowOpacity: 0.03,
                    shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 2,
                    borderWidth: 1,
                    borderColor: palette.background,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          color: palette.text,
                        }}
                      >
                        {rota.nome}
                      </Text>
                      <Text
                        style={{
                          color: palette.textSecondary || "#888",
                          fontSize: 12,
                        }}
                      >
                        por {rota.autor}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Ionicons name="star" size={16} color="#fbc02d" />
                      <Text
                        style={{
                          color: palette.text,
                          fontWeight: "bold",
                          marginLeft: 2,
                        }}
                      >
                        {rota.rating}
                      </Text>
                      <Text
                        style={{
                          color: palette.textSecondary || "#888",
                          fontSize: 12,
                          marginLeft: 2,
                        }}
                      >
                        ({rota.votos})
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginBottom: 8,
                    }}
                  >
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <Ionicons
                        name="map-outline"
                        size={16}
                        color={palette.primary}
                      />
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: palette.text,
                          fontSize: 13,
                        }}
                      >
                        {rota.distancia}
                      </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <Ionicons
                        name="time-outline"
                        size={16}
                        color={palette.primary}
                      />
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: palette.text,
                          fontSize: 13,
                        }}
                      >
                        {rota.tempo}
                      </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <View
                        style={{
                          backgroundColor:
                            rota.dificuldade === "Alta"
                              ? "#e3f2fd"
                              : rota.dificuldade === "Média"
                              ? "#fffde7"
                              : "#e8f5e9",
                          borderRadius: 8,
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                        }}
                      >
                        <Text
                          style={{
                            color:
                              rota.dificuldade === "Alta"
                                ? "#1976d2"
                                : rota.dificuldade === "Média"
                                ? "#fb8c00"
                                : "#388e3c",
                            fontWeight: "bold",
                            fontSize: 12,
                          }}
                        >
                          {rota.dificuldade}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: palette.background,
                        borderRadius: 6,
                        paddingVertical: 6,
                        paddingHorizontal: 18,
                        marginRight: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: palette.text,
                          fontWeight: "bold",
                          fontSize: 13,
                        }}
                      >
                        Detalhes
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: palette.primary,
                        borderRadius: 6,
                        paddingVertical: 6,
                        paddingHorizontal: 18,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 13,
                        }}
                      >
                        Usar Rota
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {tab === "Eventos" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: palette.textSecondary || "#888",
                    fontWeight: "bold",
                  }}
                >
                  Próximos Eventos
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: palette.background,
                    borderRadius: 6,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color={palette.primary}
                  />
                  <Text
                    style={{
                      color: palette.primary,
                      fontWeight: "bold",
                      marginLeft: 4,
                      fontSize: 13,
                    }}
                  >
                    Ver Todos
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Lista de Eventos */}
              {[
                {
                  id: 1,
                  nome: "Passeio Ecológico Lisboa-Sintra",
                  data: "24 Mar, 09:00",
                  local: "Praça do Comércio, Lisboa",
                  participantes: 18,
                  distancia: "45 km",
                  dificuldade: "Médio",
                },
                {
                  id: 2,
                  nome: "Workshop: Maximizando a Vida da Bateria",
                  data: "30 Mar, 15:00",
                  local: "Centro de Inovação, Porto",
                  participantes: 32,
                  dificuldade: "Todos os níveis",
                },
              ].map((evento) => (
                <View
                  key={evento.id}
                  style={{
                    backgroundColor: palette.card,
                    borderRadius: 10,
                    padding: 14,
                    marginBottom: 14,
                    shadowColor: "#000",
                    shadowOpacity: 0.03,
                    shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 2,
                    borderWidth: 1,
                    borderColor: palette.background,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: palette.text,
                      marginBottom: 2,
                    }}
                  >
                    {evento.nome}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color={palette.primary}
                    />
                    <Text
                      style={{
                        marginLeft: 4,
                        color: palette.text,
                        fontSize: 13,
                      }}
                    >
                      {evento.data}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <Ionicons
                      name="location-outline"
                      size={16}
                      color={palette.primary}
                    />
                    <Text
                      style={{
                        marginLeft: 4,
                        color: palette.text,
                        fontSize: 13,
                      }}
                    >
                      {evento.local}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 8 }}>
                    <Text
                      style={{
                        color: palette.textSecondary || "#888",
                        fontSize: 13,
                        marginRight: 16,
                      }}
                    >
                      Participantes:{" "}
                      <Text style={{ color: palette.text, fontWeight: "bold" }}>
                        {`${evento.participantes}`}
                      </Text>
                    </Text>
                    {evento.distancia && (
                      <Text
                        style={{
                          color: palette.textSecondary || "#888",
                          fontSize: 13,
                          marginRight: 16,
                        }}
                      >
                        Distância:{" "}
                        <Text
                          style={{ color: palette.text, fontWeight: "bold" }}
                        >
                          {`${evento.distancia}`}
                        </Text>
                      </Text>
                    )}
                    <Text
                      style={{
                        color: palette.textSecondary || "#888",
                        fontSize: 13,
                      }}
                    >
                      Dificuldade:{" "}
                      <Text style={{ color: palette.text, fontWeight: "bold" }}>
                        {evento.dificuldade}
                      </Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: palette.primary,
                      borderRadius: 6,
                      paddingVertical: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 15,
                      }}
                    >
                      Participar
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f7" },
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    margin: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
    marginLeft: 6,
  },
  cardDesc: { color: "#888", marginBottom: 10 },
  tabsRow: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  tabButtonActive: { backgroundColor: "#e0f7fa" },
  tabText: { color: "#888", fontWeight: "bold" },
  tabTextActive: { color: "#2e7d32" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 36,
  },
  searchInput: { flex: 1, marginLeft: 8, color: "#222", fontSize: 14 },
  feedCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  feedHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  feedName: { fontWeight: "bold", color: "#222" },
  feedTipo: {
    backgroundColor: "#e0f7fa",
    color: "#00796b",
    fontSize: 11,
    borderRadius: 6,
    paddingHorizontal: 6,
    marginLeft: 4,
  },
  feedTime: { color: "#888", fontSize: 12 },
  feedText: { color: "#333", marginVertical: 6, fontSize: 14 },
  feedRotaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 2,
  },
  feedRota: { color: "#2e7d32", fontWeight: "bold", marginLeft: 6 },
  feedRotaLink: { color: "#007bff", marginLeft: 10, fontWeight: "bold" },
  feedStatsRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  feedStat: { color: "#888", fontSize: 13, marginRight: 18 },
  feedShareBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  feedShareText: { color: "#2e7d32", fontWeight: "bold", marginLeft: 4 },
  loadMoreBtn: {
    backgroundColor: "#00aaff",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 8,
    alignItems: "center",
  },
  loadMoreText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
