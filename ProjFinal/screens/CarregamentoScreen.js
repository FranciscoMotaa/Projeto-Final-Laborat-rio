import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default function CarregamentoScreen({ navigation }) {
  const { palette } = useTheme();

  const menuItems = [
    { name: "Início", icon: "home-outline", route: "Home" },
    { name: "Bateria", icon: "battery-charging-outline", route: "Bateria" },
    { name: "Navegação", icon: "navigate-outline", route: "Navegação" },
    { name: "Controlo", icon: "game-controller-outline", route: "Controlo" },
    { name: "Manutenção", icon: "construct-outline", route: "Manutenção" },
    { name: "Comunidade", icon: "people-outline", route: "Comunidade" },
    { name: "Definições", icon: "settings-outline", route: "Definições" },
  ];

  // Estado para as estações
  const [stations, setStations] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setUserLocation({
          latitude: 38.736946,
          longitude: -9.142685,
        });
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    if (!userLocation) return;
    const fetchStations = async () => {
      try {
        const response = await axios.get(
          `https://api.openchargemap.io/v3/poi/?output=json&latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&distance=10&distanceunit=KM&maxresults=20&compact=true&verbose=false&key=f225c6bc-b5c3-40bd-aa06-70d1048acc29`
        );
        const results = response.data.map((place) => ({
          id: place.ID,
          nome: place.AddressInfo.Title,
          endereco: place.AddressInfo.AddressLine1,
          latitude: place.AddressInfo.Latitude,
          longitude: place.AddressInfo.Longitude,
        }));
        setStations(results);
      } catch (error) {
        console.log("Erro ao buscar estações:", error);
      }
    };
    fetchStations();
  }, [userLocation]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: palette.background }]}
    >
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

      {/* Submenu */}
      <View style={styles.submenuContainer}>
        <TouchableOpacity
          style={[
            styles.submenuButton,
            navigation.getState().routes[navigation.getState().index].name ===
              "Bateria" && styles.submenuButtonActive,
          ]}
          onPress={() => navigation.navigate("Bateria")}
        >
          <Ionicons
            name="battery-charging-outline"
            size={24}
            color={palette.primary}
          />
          <Text
            style={[
              styles.submenuLabel,
              navigation.getState().routes[navigation.getState().index].name ===
                "Bateria" && styles.submenuLabelActive,
            ]}
          >
            Bateria
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.submenuButton,
            navigation.getState().routes[navigation.getState().index].name ===
              "Carregamento" && styles.submenuButtonActive,
          ]}
          onPress={() => navigation.navigate("Carregamento")}
        >
          <Ionicons name="flash-outline" size={24} color={palette.primary} />
          <Text
            style={[
              styles.submenuLabel,
              navigation.getState().routes[navigation.getState().index].name ===
                "Carregamento" && styles.submenuLabelActive,
            ]}
          >
            Carregamento
          </Text>
        </TouchableOpacity>
      </View>

      {showMap ? (
        <View
          style={{
            flex: 1,
            margin: 12,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {userLocation ? (
            <MapView
              style={{ flex: 1, minHeight: 350, borderRadius: 12 }}
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
              }}
              provider="google"
            >
              {/* Marcador do utilizador */}
              <Marker
                coordinate={userLocation}
                title="Você está aqui"
                pinColor="#388e3c"
              />
              {/* Marcadores das estações */}
              {stations.map((station) => (
                <Marker
                  key={station.id}
                  coordinate={{
                    latitude: station.latitude,
                    longitude: station.longitude,
                  }}
                >
                  <Callout
                    tooltip={false}
                    onPress={() =>
                      navigation.navigate("Rotas", { destino: station.nome })
                    }
                  >
                    <View
                      style={{
                        minWidth: 240,
                        maxWidth: 300,
                        padding: 14,
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        elevation: 4,
                        shadowColor: "#000",
                        shadowOpacity: 0.12,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 6,
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          marginBottom: 8,
                          fontSize: 17,
                          color: "#222",
                        }}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {station.nome}
                      </Text>
                      <Text
                        style={{
                          color: "#388e3c",
                          marginBottom: 10,
                          fontSize: 14,
                          fontWeight: "600",
                        }}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {station.endereco}
                      </Text>
                      <View
                        style={{
                          backgroundColor: "#388e3c",
                          borderRadius: 8,
                          paddingVertical: 10,
                          paddingHorizontal: 24,
                          alignItems: "center",
                          alignSelf: "stretch",
                          marginTop: 6,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 15,
                            textAlign: "center",
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          Ir para Rotas
                        </Text>
                      </View>
                      <Text style={{ color: "#888", fontSize: 12, marginTop: 8 }}>
                        Toque no balão para navegar
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          ) : (
            <Text style={{ color: "#388e3c", fontSize: 16, marginTop: 40 }}>
              A obter localização...
            </Text>
          )}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 10,
              elevation: 3,
            }}
            onPress={() => setShowMap(false)}
          >
            <Ionicons name="close" size={24} color="#2e7d32" />
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          {/* Cartão de Estações de Carregamento */}
          <View style={[styles.card, { backgroundColor: palette.card }]}>
            <View style={styles.cardHeader}>
              <Ionicons
                name="flash-outline"
                size={22}
                color={palette.primary}
              />
              <Text style={[styles.sectionTitle, { color: palette.text }]}>
                Estações de Carregamento
              </Text>
            </View>
            <Text style={styles.cardSubtext}>
              Estações próximas da sua localização
            </Text>
            <View style={styles.mapPlaceholder}>
              <MaterialIcons name="navigation" size={40} color="#b0bec5" />
            </View>
          </View>

          {/* Renderização dinâmica das estações */}
          {stations.map((station) => (
            <View
              key={station.id}
              style={[styles.stationCard, { backgroundColor: palette.card }]}
            >
              <View style={styles.stationHeader}>
                <Text style={styles.stationTitle}>
                  {station.nome}
                  {station.destaque && (
                    <Text style={{ color: "#fbc02d" }}> ★</Text>
                  )}
                </Text>
                <View style={styles.stationStatus}>
                  <Text
                    style={
                      station.status === "available"
                        ? styles.stationStatusAvailable
                        : station.status === "low"
                        ? styles.stationStatusAvailableLow
                        : styles.stationStatusOccupied
                    }
                  >
                    {station.disponiveis}
                  </Text>
                </View>
                <Text style={styles.stationRating}>{station.rating}</Text>
              </View>
              <Text style={styles.stationAddress}>{station.endereco}</Text>
              <Text style={styles.stationDetails}>{station.detalhes}</Text>
              <View style={styles.stationActions}>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Detalhes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navigateButton}
                  onPress={() => navigation.navigate("Rotas", { destino: station.nome })}
                >
                  <Text style={styles.navigateButtonText}>Navegar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.moreStationsButton}
            onPress={() => setShowMap(true)}
          >
            <Text style={styles.moreStationsText}>Ver Mais Estações</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
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
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  submenuButton: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginBottom: 8,
    borderRadius: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  submenuButtonActive: {
    backgroundColor: "#e0f7fa",
  },
  submenuLabel: {
    color: "#2e7d32",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  submenuLabelActive: {
    color: "#00796b",
  },
  card: {
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  cardSubtext: {
    fontSize: 13,
    color: "#888",
    marginBottom: 10,
  },
  mapPlaceholder: {
    height: 80,
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  stationCard: {
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  stationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  stationTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
  },
  stationStatus: {
    marginLeft: 8,
    marginRight: 4,
  },
  stationStatusAvailable: {
    fontSize: 12,
    color: "#388e3c",
    fontWeight: "bold",
    backgroundColor: "#e8f5e9",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  stationStatusAvailableLow: {
    fontSize: 12,
    color: "#fb8c00",
    fontWeight: "bold",
    backgroundColor: "#fff3e0",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  stationStatusOccupied: {
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  stationRating: {
    fontSize: 13,
    color: "#388e3c",
    fontWeight: "bold",
    marginLeft: 4,
  },
  stationAddress: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  stationDetails: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
  },
  stationActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  detailsButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginRight: 8,
  },
  detailsButtonText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 13,
  },
  navigateButton: {
    backgroundColor: "#388e3c",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  navigateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  moreStationsButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 12,
    marginBottom: 20,
    alignItems: "center",
    elevation: 1,
  },
  moreStationsText: {
    color: "#2e7d32",
    fontWeight: "bold",
    fontSize: 14,
  },
});
