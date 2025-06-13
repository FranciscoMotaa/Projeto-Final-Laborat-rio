import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../context/ThemeContext'; // Certifique-se deste import!

export default function DefinicoesScreen({ navigation }) {
  const { palette } = useTheme();
  const [motor, setMotor] = useState(75);
  const [regen, setRegen] = useState(60);
  const [acel, setAcel] = useState(50);
  const [geo, setGeo] = useState(false);
  const [mov, setMov] = useState(true);
  const [pin, setPin] = useState(false);
  const [modo, setModo] = useState("Eco");

  const modos = ["Eco", "Normal", "Sport"];

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Menu de ícones */}
        <View style={styles.menuContainer}>
          <View style={styles.grid}>
            {menuItems.map((item) => (
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

        {/* Submenu */}
        <View style={styles.submenuContainer}>
          <TouchableOpacity
            style={[
              styles.submenuButton,
              /* Ativo se estiver nesta página */
              navigation.getState().routes[navigation.getState().index].name === "Definições" && styles.submenuButtonActive,
            ]}
            onPress={() => navigation.navigate("Definições")}
          >
            <Ionicons name="settings-outline" size={20}
              color={
                navigation.getState().routes[navigation.getState().index].name === "Definições"
                  ? palette.primary
                  : "#888"
              }
            />
            <Text
              style={
                navigation.getState().routes[navigation.getState().index].name === "Definições"
                  ? styles.submenuLabelActive
                  : styles.submenuLabel
              }
            >
              Ajustes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.submenuButton,
              navigation.getState().routes[navigation.getState().index].name === "Acessibilidade" && styles.submenuButtonActive,
            ]}
            onPress={() => navigation.navigate("Acessibilidade")}
          >
            <Ionicons name="accessibility-outline" size={20}
              color={
                navigation.getState().routes[navigation.getState().index].name === "Acessibilidade"
                  ? palette.primary
                  : "#888"
              }
            />
            <Text
              style={
                navigation.getState().routes[navigation.getState().index].name === "Acessibilidade"
                  ? styles.submenuLabelActive
                  : styles.submenuLabel
              }
            >
              Acessibilidade
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.submenuButton,
              navigation.getState().routes[navigation.getState().index].name === "Idioma" && styles.submenuButtonActive,
            ]}
            onPress={() => navigation.navigate("Idioma")}
          >
            <Ionicons name="language-outline" size={20}
              color={
                navigation.getState().routes[navigation.getState().index].name === "Idioma"
                  ? palette.primary
                  : "#888"
              }
            />
            <Text
              style={
                navigation.getState().routes[navigation.getState().index].name === "Idioma"
                  ? styles.submenuLabelActive
                  : styles.submenuLabel
              }
            >
              Idioma
            </Text>
          </TouchableOpacity>
        </View>
        {/* Cartão Segurança */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#2e7d32"
            />
            <Text style={styles.cardTitle}>Segurança</Text>
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Geo-Fencing</Text>
            <Switch
              value={geo}
              onValueChange={setGeo}
              trackColor={{ true: "#2e7d32" }}
              thumbColor={geo ? "#2e7d32" : "#f4f3f4"}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Deteção de Movimento</Text>
            <Switch
              value={mov}
              onValueChange={setMov}
              trackColor={{ true: "#2e7d32" }}
              thumbColor={mov ? "#2e7d32" : "#f4f3f4"}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>PIN para Iniciar</Text>
            <Switch
              value={pin}
              onValueChange={setPin}
              trackColor={{ true: "#2e7d32" }}
              thumbColor={pin ? "#2e7d32" : "#f4f3f4"}
            />
          </View>
          <TouchableOpacity style={styles.pinButton}>
            <Text style={styles.pinButtonText}>
              Configurar PIN de Segurança
            </Text>
          </TouchableOpacity>
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
  submenuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 12,
    paddingVertical: 6,
  },
  submenuButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  submenuLabel: {
    color: "#888",
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "600",
  },
  submenuLabelActive: {
    color: "#2e7d32",
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    marginHorizontal: 12,
    marginTop: 16,
    marginBottom: 0,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
    marginLeft: 8,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    marginTop: 2,
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 15,
    color: "#222",
  },
  sliderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  sliderLabel: {
    color: "#222",
    fontSize: 15,
  },
  sliderValue: {
    color: "#2e7d32",
    fontWeight: "bold",
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: "#2e7d32",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 18,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  switchLabel: {
    color: "#222",
    fontSize: 15,
  },
  pinButton: {
    borderWidth: 1,
    borderColor: "#2e7d32",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 12,
  },
  pinButtonText: {
    color: "#2e7d32",
    fontWeight: "bold",
    fontSize: 15,
  },
});
