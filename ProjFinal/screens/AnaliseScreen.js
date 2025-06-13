import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { Share } from "react-native";
import { WebView } from "react-native-webview";

export default function AnaliseScreen({ navigation }) {
  const { palette, menuDisplay } = useTheme();
  const [pdfUri, setPdfUri] = useState(null);

  const menuItems = [
    { name: "Início", icon: "home-outline", route: "Home" },
    { name: "Bateria", icon: "battery-charging-outline", route: "Bateria" },
    { name: "Navegação", icon: "navigate-outline", route: "Navegação" },
    { name: "Controlo", icon: "game-controller-outline", route: "Controlo" },
    { name: "Manutenção", icon: "construct-outline", route: "Manutenção" },
    { name: "Comunidade", icon: "people-outline", route: "Comunidade" },
    { name: "Definições", icon: "settings-outline", route: "Definições" },
  ];

  async function gerarRelatorioPDF() {
    const htmlContent = `
      <h1 style="color:#2e7d32;">Relatório Detalhado de Condução</h1>
      <p><b>Pontuação:</b> 82</p>
      <p><b>Frenagem:</b> Equilibrado</p>
      <p><b>Consistência de Velocidade:</b> Muito Consistente</p>
      <p><b>Eficiência de Rota:</b> Eficiente</p>
      <h3>Dicas para Melhorar</h3>
      <ul>
        <li>Acelere mais suavemente para melhorar a eficiência</li>
        <li>Utilize mais a frenagem regenerativa</li>
      </ul>
    `;

    const options = {
      html: htmlContent,
      fileName: "relatorio_detalhado_conducao",
      directory: "Documents",
    };

    const file = await RNHTMLtoPDF.convert(options);
    setPdfUri(file.filePath); // Mostra o PDF na app
  }

  return (
    <SafeAreaView style={styles.container}>
      {pdfUri ? (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ padding: 12, backgroundColor: "#2e7d32" }}
            onPress={() => setPdfUri(null)}
          >
            <Text
              style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}
            >
              Fechar Relatório
            </Text>
          </TouchableOpacity>
          <WebView source={{ uri: `file://${pdfUri}` }} style={{ flex: 1 }} />
        </View>
      ) : (
        <>
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
                  {menuDisplay !== "texto" && (
                    <Ionicons
                      name={item.icon}
                      size={32}
                      color={palette.primary}
                    />
                  )}
                  {/* Só mostra texto se NÃO for "Apenas Ícones" */}
                  {menuDisplay !== "icones" && (
                    <Text style={[styles.label, { color: palette.primary }]}>
                      {item.name}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Submenu - deve aparecer só aqui! */}
          <View style={styles.submenuContainer}>
            <TouchableOpacity
              style={styles.submenuButton}
              onPress={() => navigation.navigate("Manutenção")}
            >
              <Ionicons name="construct-outline" size={24} color="#2e7d32" />
              <Text style={styles.submenuLabel}>Manutenção</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submenuButton}
              onPress={() => navigation.navigate("Histórico")}
            >
              <Ionicons name="time-outline" size={24} color="#2e7d32" />
              <Text style={styles.submenuLabel}>Histórico</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submenuButton}
              onPress={() => navigation.navigate("Diagnóstico")}
            >
              <Ionicons name="medkit-outline" size={24} color="#2e7d32" />
              <Text style={styles.submenuLabel}>Diagnóstico</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submenuButton}
              onPress={() => navigation.navigate("Análise")}
            >
              <Ionicons name="analytics-outline" size={24} color="#2e7d32" />
              <Text style={styles.submenuLabel}>Análise</Text>
            </TouchableOpacity>
          </View>

          {/* Conteúdo da análise */}
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            {/* Cartão de Análise de Condução */}
            <View style={[styles.card, { backgroundColor: palette.card }]}>
              <View style={styles.cardHeader}>
                <Ionicons
                  name="analytics-outline"
                  size={22}
                  color={palette.primary}
                />
                <Text style={[styles.cardTitle, { color: palette.primary }]}>
                  Análise de Condução
                </Text>
              </View>
              <Text style={styles.cardSubtitle}>
                Insights sobre o seu estilo de condução
              </Text>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreValue}>82</Text>
                <Text style={styles.scoreLabel}>Pontuação</Text>
              </View>
              <Text style={styles.scoreDesc}>
                Melhor que 15% dos condutores
              </Text>

              {/* Barras de análise */}
              <View style={styles.row}>
                <Text style={styles.label}>Aceleração</Text>
                <View style={styles.barBg}>
                  <View
                    style={[
                      styles.barFill,
                      { width: "80%", backgroundColor: palette.primary },
                    ]}
                  />
                </View>
                <Text style={styles.value}>Equilibrado</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Frenagem</Text>
                <View style={styles.barBg}>
                  <View
                    style={[
                      styles.barFill,
                      { width: "60%", backgroundColor: palette.primary },
                    ]}
                  />
                </View>
                <Text style={styles.value}>Equilibrado</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Consistência de Velocidade</Text>
                <View style={styles.barBg}>
                  <View
                    style={[
                      styles.barFill,
                      { width: "95%", backgroundColor: palette.primary },
                    ]}
                  />
                </View>
                <Text style={styles.value}>Muito Consistente</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Eficiência de Rota</Text>
                <View style={styles.barBg}>
                  <View
                    style={[
                      styles.barFill,
                      { width: "85%", backgroundColor: palette.primary },
                    ]}
                  />
                </View>
                <Text style={styles.value}>Eficiente</Text>
              </View>

              {/* Dicas */}
              <View style={styles.tipsBox}>
                <Ionicons
                  name="warning-outline"
                  size={18}
                  color={palette.warning || "#ff9800"}
                />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.tipTitle}>Dicas para Melhorar</Text>
                  <Text style={styles.tipText}>
                    • Acelere mais suavemente para melhorar a eficiência
                  </Text>
                  <Text style={styles.tipText}>
                    • Utilize mais a frenagem regenerativa
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={gerarRelatorioPDF}
              >
                <Text style={styles.buttonText}>Ver Relatório Detalhado</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
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
  submenuLabel: {
    color: "#2e7d32",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    borderRadius: 14,
    padding: 18,
    margin: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  cardTitle: { fontWeight: "bold", fontSize: 18, marginLeft: 8 },
  cardSubtitle: { color: "#888", marginBottom: 10 },
  scoreCircle: {
    alignSelf: "center",
    width: 130, // aumentado
    height: 130, // aumentado
    borderRadius: 65, // metade do width/height
    borderWidth: 10, // mais grosso
    borderColor: "#2e7d32",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  scoreValue: {
    fontSize: 48, // aumentado
    fontWeight: "bold",
    color: "#2e7d32",
  },
  scoreLabel: { color: "#888", fontSize: 13 },
  scoreDesc: {
    color: "#888",
    fontSize: 13,
    alignSelf: "center",
    marginBottom: 12,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  label: { flex: 1, color: "#333", fontSize: 14 },
  barBg: {
    flex: 2,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 6,
  },
  value: {
    flex: 1,
    color: "#2e7d32",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "right",
  },
  tipsBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fffde7",
    borderRadius: 8,
    padding: 10,
    marginTop: 14,
    marginBottom: 10,
  },
  tipTitle: { color: "#fb8c00", fontWeight: "bold", marginBottom: 2 },
  tipText: { color: "#666", fontSize: 13 },
  button: {
    backgroundColor: "#2e7d32",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
