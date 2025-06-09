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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useTheme } from "../context/ThemeContext"; // já está correto

export default function AccessibilityScreen({ navigation }) {
  const { cor, setCor, palette } = useTheme(); // usa o contexto global

  const menuItems = [
    { name: "Início", icon: "home-outline", route: "Home" },
    { name: "Bateria", icon: "battery-charging-outline", route: "Bateria" },
    { name: "Navegação", icon: "navigate-outline", route: "Navegação" },
    { name: "Controlo", icon: "game-controller-outline", route: "Controlo" },
    { name: "Manutenção", icon: "construct-outline", route: "Manutenção" },
    { name: "Comunidade", icon: "people-outline", route: "Comunidade" },
    { name: "Definições", icon: "settings-outline", route: "Definições" },
  ];

  // Estados para acessibilidade
  const [menu, setMenu] = useState("icones_texto");
  const [tema, setTema] = useState("claro");
  const [tamanho, setTamanho] = useState(100);
  const [feedbackSonoro, setFeedbackSonoro] = useState(false);
  const [feedbackTat, setFeedbackTat] = useState(true);
  const [reduzirAnim, setReduzirAnim] = useState(false);
  const [leitorTela, setLeitorTela] = useState(false);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: palette.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Menu de ícones */}
        <View style={styles.menuContainer}>
          <View style={styles.grid}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[styles.cell, { backgroundColor: palette.card }]}
                onPress={() => navigation.navigate(item.route)}
              >
                {/* Só mostra ícone se NÃO for "Apenas Texto" */}
                {menu !== "texto" && (
                  <Ionicons
                    name={item.icon}
                    size={32}
                    color={palette.primary}
                  />
                )}
                {/* Só mostra texto se NÃO for "Apenas Ícones" */}
                {menu !== "icones" && (
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
            style={[styles.submenuButton, styles.submenuButtonActive]}
          >
            <Ionicons name="accessibility-outline" size={20} color="#2e7d32" />
            <Text style={styles.submenuLabelActive}>Acessibilidade</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submenuButton}
            onPress={() => navigation.navigate("Idioma")}
          >
            <Ionicons name="language-outline" size={20} color="#888" />
            <Text style={styles.submenuLabel}>Idioma</Text>
          </TouchableOpacity>
        </View>

        {/* Cartão de acessibilidade */}
        <View style={[styles.card, { backgroundColor: palette.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="accessibility-outline" size={20} color="#2e7d32" />
            <Text style={styles.cardTitle}>
              Configurações de Acessibilidade
            </Text>
          </View>
          <Text style={styles.cardDesc}>
            Personalize a aplicação para melhorar a sua{" "}
            <Text style={{ color: "#2e7d32", fontWeight: "bold" }}>
              experiência
            </Text>
          </Text>

          {/* Exibição do Menu */}
          <Text style={styles.sectionTitle}>Exibição do Menu</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                menu === "icones_texto" && styles.radioButtonActive,
              ]}
              onPress={() => setMenu("icones_texto")}
            >
              <MaterialCommunityIcons
                name="format-list-bulleted-square"
                size={20}
                color={menu === "icones_texto" ? "#2e7d32" : "#888"}
              />
              <Text style={styles.radioText}>Ícones e Texto</Text>
              {menu === "icones_texto" && (
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#2e7d32"
                  style={{ marginLeft: 6 }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                menu === "icones" && styles.radioButtonActive,
              ]}
              onPress={() => setMenu("icones")}
            >
              <Ionicons
                name="apps-outline"
                size={20}
                color={menu === "icones" ? "#2e7d32" : "#888"}
              />
              <Text style={styles.radioText}>Apenas Ícones</Text>
              {menu === "icones" && (
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#2e7d32"
                  style={{ marginLeft: 6 }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                menu === "texto" && styles.radioButtonActive,
              ]}
              onPress={() => setMenu("texto")}
            >
              <Ionicons
                name="text-outline"
                size={20}
                color={menu === "texto" ? "#2e7d32" : "#888"}
              />
              <Text style={styles.radioText}>Apenas Texto</Text>
              {menu === "texto" && (
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#2e7d32"
                  style={{ marginLeft: 6 }}
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Tema */}
          <Text style={styles.sectionTitle}>Tema</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.themeButton,
                tema === "claro" && styles.themeButtonActive,
              ]}
              onPress={() => setTema("claro")}
            >
              <Ionicons
                name="sunny-outline"
                size={18}
                color={tema === "claro" ? "#fff" : "#2e7d32"}
              />
              <Text
                style={[
                  styles.themeText,
                  tema === "claro" && { color: "#fff" },
                ]}
              >
                Claro
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.themeButton,
                tema === "escuro" && styles.themeButtonActive,
              ]}
              onPress={() => setTema("escuro")}
            >
              <Ionicons
                name="moon-outline"
                size={18}
                color={tema === "escuro" ? "#fff" : "#2e7d32"}
              />
              <Text
                style={[
                  styles.themeText,
                  tema === "escuro" && { color: "#fff" },
                ]}
              >
                Escuro
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.themeButton,
                tema === "sistema" && styles.themeButtonActive,
              ]}
              onPress={() => setTema("sistema")}
            >
              <Ionicons
                name="phone-portrait-outline"
                size={18}
                color={tema === "sistema" ? "#fff" : "#2e7d32"}
              />
              <Text
                style={[
                  styles.themeText,
                  tema === "sistema" && { color: "#fff" },
                ]}
              >
                Sistema
              </Text>
            </TouchableOpacity>
          </View>

          {/* Modo de Cor */}
          <Text style={styles.sectionTitle}>Modo de Cor</Text>
          <View style={styles.rowWrap}>
            {[
              { key: "padrao", label: "Padrão" },
              { key: "contraste", label: "Alto Contraste" },
              { key: "protano", label: "Protanopia" },
              { key: "deutero", label: "Deuteranopia" },
              { key: "tritano", label: "Tritanopia" },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.key}
                style={[
                  styles.colorButton,
                  cor === opt.key && styles.colorButtonActive,
                ]}
                onPress={() => setCor(opt.key)} // usa o setCor do contexto
              >
                <Text
                  style={[
                    styles.colorText,
                    cor === opt.key && {
                      color: palette.primary,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tamanho do Texto */}
          <Text style={styles.sectionTitle}>Tamanho do Texto</Text>
          <View style={styles.sliderRow}>
            <Text style={{ color: "#888" }}>A</Text>
            <Slider
              style={{ flex: 1, marginHorizontal: 10 }}
              minimumValue={80}
              maximumValue={150}
              value={tamanho}
              minimumTrackTintColor="#2e7d32"
              maximumTrackTintColor="#e0e0e0"
              thumbTintColor="#2e7d32"
              step={1}
              onValueChange={setTamanho}
            />
            <Text style={{ color: "#888" }}>A</Text>
            <Text
              style={{ color: "#2e7d32", marginLeft: 8, fontWeight: "bold" }}
            >
              {tamanho}%
            </Text>
          </View>

          {/* Feedback Adicional */}
          <Text style={styles.sectionTitle}>Feedback Adicional</Text>
          <View style={styles.switchRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="volume-high-outline"
                size={18}
                color="#888"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.switchLabel}>Feedback Sonoro</Text>
            </View>
            <Switch
              value={feedbackSonoro}
              onValueChange={setFeedbackSonoro}
              trackColor={{ true: "#2e7d32" }}
              thumbColor={feedbackSonoro ? "#2e7d32" : "#f4f3f4"}
            />
          </View>
          <View style={styles.switchRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="phone-vibrate-outline"
                size={18}
                color="#888"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.switchLabel}>Feedback Tátil</Text>
            </View>
            <Switch
              value={feedbackTat}
              onValueChange={setFeedbackTat}
              trackColor={{ true: "#2e7d32" }}
              thumbColor={feedbackTat ? "#2e7d32" : "#f4f3f4"}
            />
          </View>

          {/* Outras Opções */}
          <Text style={styles.sectionTitle}>Outras Opções</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Reduzir Animações</Text>
            <Switch
              value={reduzirAnim}
              onValueChange={setReduzirAnim}
              trackColor={{ true: "#2e7d32" }}
              thumbColor={reduzirAnim ? "#2e7d32" : "#f4f3f4"}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>
              Otimizado para Leitor de Tela
            </Text>
            <Switch
              value={leitorTela}
              onValueChange={setLeitorTela}
              trackColor={{ true: "#2e7d32" }}
              thumbColor={leitorTela ? "#2e7d32" : "#f4f3f4"}
            />
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
  sectionTitle: {
    fontWeight: "bold",
    color: "#2e7d32",
    marginTop: 16,
    marginBottom: 8,
    fontSize: 15,
  },
  radioGroup: {
    gap: 8,
    marginBottom: 8,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
    backgroundColor: "#fff",
  },
  radioButtonActive: {
    borderColor: "#2e7d32",
    backgroundColor: "#e8f5e9",
  },
  radioText: {
    marginLeft: 8,
    color: "#222",
    fontSize: 15,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  themeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2e7d32",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  themeButtonActive: {
    backgroundColor: "#2e7d32",
    borderColor: "#2e7d32",
  },
  themeText: {
    marginLeft: 6,
    color: "#2e7d32",
    fontWeight: "bold",
    fontSize: 15,
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  colorButton: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  colorButtonActive: {
    borderColor: "#2e7d32",
    backgroundColor: "#e8f5e9",
  },
  colorText: {
    color: "#222",
    fontSize: 15,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 4,
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
});
