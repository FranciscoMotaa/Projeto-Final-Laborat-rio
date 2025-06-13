import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../context/ThemeContext' // Caminho atualizado

export default function ComunidadeScreen({ navigation }) {
  const [idioma, setIdioma] = useState("PT");
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

  const idiomas = [
    { key: "PT", label: "Português", icon: "flag-outline" },
    { key: "GB", label: "Inglês", icon: "flag-outline" },
    { key: "ES", label: "Espanhol", icon: "flag-outline" },
    { key: "FR", label: "Francês", icon: "flag-outline" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu principal */}
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

      {/* Submenu */}
      <View style={styles.submenuContainer}>
        <TouchableOpacity
          style={styles.submenuButton}
          onPress={() => navigation.navigate("Definições")}
        >
          <Ionicons name="settings-outline" size={20} color="#888" />
          <Text style={styles.submenuLabel}>Ajustes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submenuButton}
          onPress={() => navigation.navigate("Acessibilidade")}
        >
          <Ionicons name="accessibility-outline" size={20} color="#888" />
          <Text style={styles.submenuLabel}>Acessibilidade</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submenuButton, styles.submenuButtonActive]}
        >
          <Ionicons name="language-outline" size={20} color="#2e7d32" />
          <Text style={styles.submenuLabelActive}>Idioma</Text>
        </TouchableOpacity>
      </View>

      {/* Cartão de idioma */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="language-outline" size={20} color="#2e7d32" />
          <Text style={styles.cardTitle}>Idioma</Text>
        </View>
        <Text style={styles.cardDesc}>
          Personalize a aplicação para melhorar a sua{" "}
          <Text style={{ color: "#2e7d32", fontWeight: "bold" }}>
            experiência
          </Text>
        </Text>
        {idiomas.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[
              styles.radioButton,
              idioma === opt.key && styles.radioButtonActive,
            ]}
            onPress={() => setIdioma(opt.key)}
          >
            <Ionicons
              name={
                opt.key === "PT"
                  ? "flag-outline"
                  : opt.key === "GB"
                  ? "flag-outline"
                  : opt.key === "ES"
                  ? "flag-outline"
                  : "flag-outline"
              }
              size={20}
              color={idioma === opt.key ? "#2e7d32" : "#888"}
            />
            <Text style={styles.radioText}>{opt.label}</Text>
            {idioma === opt.key && (
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#2e7d32"
                style={{ marginLeft: 6 }}
              />
            )}
          </TouchableOpacity>
        ))}
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
  submenuButtonActive: {
    backgroundColor: "#e8f5e9",
    borderRadius: 8,
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
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
    marginLeft: 8,
  },
  cardDesc: {
    color: "#888",
    marginBottom: 12,
    fontSize: 14,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  radioButtonActive: {
    borderColor: "#2e7d32",
    backgroundColor: "#e8f5e9",
  },
  radioText: {
    marginLeft: 12,
    color: "#222",
    fontSize: 15,
    flex: 1,
  },
});
