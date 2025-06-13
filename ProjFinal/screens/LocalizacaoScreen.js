import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Plataform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { useTheme } from "../context/ThemeContext"; // Caminho atualizado
import { Platform } from "react-native";

export default function ComunidadeScreen({ navigation }) {
  const { palette, menuDisplay } = useTheme();

  const menuItems = [
    { name: "Início", icon: "home-outline", route: "Home" },
    { name: "Bateria", icon: "battery-charging-outline", route: "Bateria" },
    { name: "Navegação", icon: "navigate-outline", route: "Navegação" },
    { name: "Controlo", icon: "game-controller-outline", route: "Controlo" },
    { name: "Manutenção", icon: "construct-outline", route: "Manutenção" },
    { name: "Comunidade", icon: "people-outline", route: "Comunidade" },
    { name: "Definições", icon: "settings-outline", route: "Definições" },
  ];

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("A obter localização...");
  const now = new Date();
  const hora = now.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setAddress("Permissão negada");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      let addr = await Location.reverseGeocodeAsync(loc.coords);
      if (addr && addr.length > 0) {
        setAddress(
          `${addr[0].street || ""} ${addr[0].name || ""}, ${addr[0].city || ""}`
        );
      } else {
        setAddress("Localização obtida");
      }
    })();
  }, []);

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
      };

  return (
    <SafeAreaView style={styles.container}>
      {/* container branco atrás dos botões */}
      <View style={styles.menuContainer}>
        <View style={styles.grid}>          {menuItems.map((item) => (
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

      {/* Cartão de localização */}
      <View style={styles.locationCard}>
        <View style={styles.locationHeader}>
          <Ionicons name="location-outline" size={20} color="#2e7d32" />
          <Text style={styles.locationTitle}> Localização Atual da Mota</Text>
        </View>
        {Platform.OS === "web" ? (
          <Text>Mapa não suportado no navegador.</Text>
        ) : (
          <MapView
            style={styles.mapBox}
            provider={PROVIDER_DEFAULT}
            region={initialRegion}
          >
            <Marker coordinate={initialRegion} title="Você está aqui" />
          </MapView>
        )}
        <Text style={styles.address}>{address}</Text>
        <Text>Atualizado: Hoje, {hora}</Text>
      </View>
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
    // sombra Android
    elevation: 3,
    // sombra iOS
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
    backgroundColor: "#fff", // botão branco
    margin: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    // botão com sombra leve
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
  locationCard: {
    backgroundColor: "#fff", // cartão claro
    borderRadius: 8,
    padding: 8,
    margin: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2e7d32", // verde
  },
  mapBox: {
    backgroundColor: "#f0f4f7", // caixa clara
    borderRadius: 10,
    height: 330, // Aumenta o tamanho do mapa
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  mapText: {
    color: "#2e7d32", // verde
    marginTop: 6,
  },
  address: {
    color: "#333",
    fontSize: 14,
    marginTop: 2,
  },
});
