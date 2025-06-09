import React from "react";
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

export default function BateriaScreen({ navigation }) {
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: palette.background }]}
    >
      {/* Menu de opções */}
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

      {/* Submenu de Bateria */}
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
            size={26}
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
          <Ionicons name="flash-outline" size={26} color={palette.primary} />
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

      <ScrollView style={{ flex: 1 }}>
        {/* Estado da Bateria */}
        <View style={[styles.card, { backgroundColor: palette.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="battery-charging-outline"
              size={28}
              color={palette.primary}
            />
            <Text style={[styles.sectionTitle, { color: palette.primary }]}>
              Estado da Bateria
            </Text>
          </View>
          <View style={styles.centerContent}>
            <Text
              style={[styles.batteryPercentage, { color: palette.primary }]}
            >
              78%
            </Text>
            <Text style={[styles.status, { color: palette.text }]}>Bom</Text>
            <Text style={[styles.subtext, { color: palette.text }]}>
              Não está a carregar
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Ionicons
                name="speedometer-outline"
                size={22}
                color={palette.primary}
                style={styles.infoIcon}
              />
              <Text style={[styles.infoTitle, { color: palette.text }]}>
                Autonomia
              </Text>
              <Text style={[styles.infoValue, { color: palette.text }]}>
                120 km
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons
                name="heart-outline"
                size={22}
                color={palette.primary}
                style={styles.infoIcon}
              />
              <Text style={[styles.infoTitle, { color: palette.text }]}>
                Saúde
              </Text>
              <Text style={[styles.infoValue, { color: palette.text }]}>
                96%
              </Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Ionicons
                name="thermometer-outline"
                size={22}
                color={palette.primary}
                style={styles.infoIcon}
              />
              <Text style={[styles.infoTitle, { color: palette.text }]}>
                Temperatura
              </Text>
              <Text style={[styles.infoValue, { color: palette.text }]}>
                24°C
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons
                name="time-outline"
                size={22}
                color={palette.primary}
                style={styles.infoIcon}
              />
              <Text style={[styles.infoTitle, { color: palette.text }]}>
                Últ. Carregamento
              </Text>
              <Text style={[styles.infoValue, { color: palette.text }]}>
                Ontem, 22:15
              </Text>
            </View>
          </View>
          <View style={styles.separator} />
          <Text
            style={[
              styles.subtext,
              { color: palette.text, textAlign: "center" },
            ]}
          >
            🔋 Ciclos de carga:{" "}
            <Text style={{ color: palette.primary, fontWeight: "bold" }}>
              124
            </Text>{" "}
            (Vida útil estimada:{" "}
            <Text style={{ color: palette.primary, fontWeight: "bold" }}>
              88%
            </Text>
            )
          </Text>
        </View>

        {/* Consumo de Energia */}
        <View style={[styles.card, { backgroundColor: palette.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="flash-outline" size={26} color={palette.primary} />
            <Text style={[styles.sectionTitle, { color: palette.primary }]}>
              Consumo de Energia
            </Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={[styles.infoTitle, { color: palette.text }]}>
                Média hoje
              </Text>
              <Text style={[styles.infoValue, { color: palette.text }]}>
                7.5 kWh/100km
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={[styles.infoTitle, { color: palette.text }]}>
                Última viagem
              </Text>
              <Text style={[styles.infoValue, { color: palette.text }]}>
                7.8 kWh/100km
              </Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text style={[styles.infoTitle, { color: palette.text }]}>
              Melhor desempenho
            </Text>
            <Text style={[styles.infoValue, { color: palette.primary }]}>
              6.9 kWh/100km
            </Text>
          </View>
        </View>

        {/* Histórico de Carregamento */}
        <View style={[styles.card, { backgroundColor: palette.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="calendar-outline"
              size={22}
              color={palette.primary}
            />
            <Text style={[styles.sectionTitle, { color: palette.text }]}>
              Histórico de Carregamento
            </Text>
          </View>
          <View style={styles.chargeHistoryItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.chargeHistoryTitle}>Ontem, 22:15</Text>
              <Text style={styles.chargeHistorySub}>Casa</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[styles.chargeHistoryPercent, { color: "#43a047" }]}>
                78%
              </Text>
              <Text style={styles.chargeHistoryKwh}>12.4 kWh</Text>
            </View>
          </View>
          <View style={styles.chargeHistoryItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.chargeHistoryTitle}>Mar, 14:30</Text>
              <Text style={styles.chargeHistorySub}>Estação Central</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[styles.chargeHistoryPercent, { color: "#fb8c00" }]}>
                45%
              </Text>
              <Text style={styles.chargeHistoryKwh}>7.2 kWh</Text>
            </View>
          </View>
          <View style={styles.chargeHistoryItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.chargeHistoryTitle}>08 Mar, 19:45</Text>
              <Text style={styles.chargeHistorySub}>Casa</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[styles.chargeHistoryPercent, { color: "#388e3c" }]}>
                85%
              </Text>
              <Text style={styles.chargeHistoryKwh}>13.6 kWh</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  card: {
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  centerContent: {
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
  },
  batteryPercentage: {
    fontSize: 44,
    fontWeight: "bold",
    marginVertical: 4,
  },
  subtext: {
    fontSize: 13,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  infoBox: {
    flex: 1,
    marginHorizontal: 6,
    alignItems: "center",
  },
  infoIcon: {
    marginBottom: 2,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
    borderRadius: 2,
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
  chargeHistoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  chargeHistoryTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  chargeHistorySub: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  chargeHistoryPercent: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chargeHistoryKwh: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
});
