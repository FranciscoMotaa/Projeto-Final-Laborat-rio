import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { WebView } from "react-native-webview";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import RNHTMLtoPDF from "react-native-html-to-pdf";

export default function DiagnosticoScreen({ navigation }) {
  const { palette } = useTheme();
  const [pdfUri, setPdfUri] = useState(null);
  const [diagnosticoVisivel, setDiagnosticoVisivel] = useState(false);

  const menuItems = [
    { name: "Início", icon: "home-outline", route: "Home" },
    { name: "Bateria", icon: "battery-charging-outline", route: "Bateria" },
    { name: "Navegação", icon: "navigate-outline", route: "Navegação" },
    { name: "Controlo", icon: "game-controller-outline", route: "Controlo" },
    { name: "Manutenção", icon: "construct-outline", route: "Manutenção" },
    { name: "Comunidade", icon: "people-outline", route: "Comunidade" },
    { name: "Definições", icon: "settings-outline", route: "Definições" },
  ];

  async function gerarRelatorioCompleto() {
    const htmlContent = `
    <h1 style="color:${palette.primary};">Relatório Completo de Diagnóstico</h1>
    <p><b>Última verificação:</b> 12 Mar 2025, 14:30</p>
    <p><b>Saúde do Sistema:</b> 92%</p>
    <ul>
      <li><b>Sistema de Bateria:</b> Ótimo</li>
      <li><b>Sistema de Controle:</b> Ótimo</li>
      <li><b>Sistema de Refrigeração:</b> Bom</li>
      <li><b>Sensores:</b> Atenção</li>
    </ul>
    <h3 style="color:${palette.warning || "#fb8c00"};">Alertas Detectados</h3>
    <p><b>Código:</b> E-1203 (Baixo)</p>
    <p>Sensor de temperatura com leitura intermitente</p>
  `;

    const options = {
      html: htmlContent,
      fileName: "relatorio_completo_diagnostico",
      directory: "Documents",
      base64: true,
    };

    const file = await RNHTMLtoPDF.convert(options);

    // Compartilhar PDF
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.filePath);
    } else {
      alert("Partilha não disponível neste dispositivo");
    }
  }

  function iniciarDiagnostico() {
    setDiagnosticoVisivel(true);
    setTimeout(() => {
      setDiagnosticoVisivel(false);
      // Aqui você pode adicionar lógica para atualizar o estado do diagnóstico
    }, 3000); // 3 segundos de simulação
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: palette.background }]}
    >
      {pdfUri ? (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ padding: 12, backgroundColor: palette.primary }}
            onPress={() => setPdfUri(null)}
          >
            <Text
              style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}
            >
              Fechar Relatório
            </Text>
          </TouchableOpacity>
          <Pdf
            source={{ uri: `file://${pdfUri}` }}
            style={{ flex: 1 }}
            trustAllCerts={true}
          />
        </View>
      ) : (
        <>
          <View
            style={[styles.menuContainer, { backgroundColor: palette.card }]}
          >
            <View style={styles.grid}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={[styles.cell, { backgroundColor: palette.card }]}
                  onPress={() => navigation.navigate(item.route)}
                >
                  <Ionicons
                    name={item.icon}
                    size={32}
                    color={palette.primary}
                  />
                  <Text style={[styles.label, { color: palette.primary }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.submenuContainer}>
            <TouchableOpacity
              style={styles.submenuButton}
              onPress={() => navigation.navigate("Manutenção")}
            >
              <Ionicons
                name="construct-outline"
                size={24}
                color={palette.primary}
              />
              <Text style={styles.submenuLabel}>Manutenção</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submenuButton}
              onPress={() => navigation.navigate("Histórico")}
            >
              <Ionicons name="time-outline" size={24} color={palette.primary} />
              <Text style={styles.submenuLabel}>Histórico</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submenuButton}
              onPress={() => navigation.navigate("Diagnóstico")}
            >
              <Ionicons
                name="medkit-outline"
                size={24}
                color={palette.primary}
              />
              <Text style={styles.submenuLabel}>Diagnóstico</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submenuButton}
              onPress={() => navigation.navigate("Análise")}
            >
              <Ionicons
                name="analytics-outline"
                size={24}
                color={palette.primary}
              />
              <Text style={styles.submenuLabel}>Análise</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            <View style={[styles.card, { backgroundColor: palette.card }]}>
              <View style={styles.cardHeader}>
                <Ionicons
                  name="pulse-outline"
                  size={22}
                  color={palette.primary}
                />
                <Text style={[styles.cardTitle, { color: palette.primary }]}>
                  {" "}
                  Diagnóstico do Sistema
                </Text>
              </View>
              <Text style={styles.cardSubtext}>
                Última verificação: 12 Mar 2025, 14:30
              </Text>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { backgroundColor: palette.primary },
                  ]}
                />
                <Text style={[styles.progressBarText, { color: palette.text }]}>
                  92%
                </Text>
              </View>
              <Text
                style={[
                  styles.statusOk,
                  { color: palette.success || "#388e3c" },
                ]}
              >
                Sistema funcionando perfeitamente
              </Text>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Sistema de Bateria</Text>
                <Text
                  style={[
                    styles.statusBadge,
                    { backgroundColor: "#e3f2fd", color: palette.primary },
                  ]}
                >
                  Ótimo
                </Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Sistema de Controle</Text>
                <Text
                  style={[
                    styles.statusBadge,
                    { backgroundColor: "#e3f2fd", color: palette.primary },
                  ]}
                >
                  Ótimo
                </Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Sistema de Refrigeração</Text>
                <Text
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: "#e8f5e9",
                      color: palette.success || "#388e3c",
                    },
                  ]}
                >
                  Bom
                </Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Sensores</Text>
                <Text
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: "#fffde7",
                      color: palette.warning || "#fbc02d",
                    },
                  ]}
                >
                  Atenção
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.card,
                {
                  backgroundColor: "#fffde7",
                  borderColor: "#ffe082",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Ionicons
                  name="warning-outline"
                  size={20}
                  color={palette.warning || "#fb8c00"}
                />
                <Text
                  style={[
                    styles.cardTitle,
                    { color: palette.warning || "#fb8c00", marginLeft: 6 },
                  ]}
                >
                  Alertas Detectados
                </Text>
              </View>
              <Text
                style={{
                  color: palette.warning || "#fb8c00",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Código: E-1203{" "}
                <Text
                  style={{
                    backgroundColor: "#fffde7",
                    color: palette.warning || "#fbc02d",
                    borderRadius: 6,
                    paddingHorizontal: 8,
                    fontSize: 13,
                  }}
                >
                  Baixo
                </Text>
              </Text>
              <Text style={{ color: palette.text }}>
                Sensor de temperatura com leitura intermitente
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 12,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: palette.background,
                    borderColor: palette.primary,
                    borderWidth: 1,
                  },
                ]}
                onPress={gerarRelatorioCompleto}
              >
                <Text
                  style={[styles.actionButtonText, { color: palette.primary }]}
                >
                  Relatório Completo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: palette.primary },
                ]}
                onPress={iniciarDiagnostico}
              >
                <Text style={[styles.actionButtonText, { color: "#fff" }]}>
                  Iniciar Diagnóstico
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <Modal visible={diagnosticoVisivel} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <ActivityIndicator size="large" color={palette.primary} />
                <Text
                  style={{
                    marginTop: 18,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: palette.primary,
                  }}
                >
                  A fazer diagnóstico
                </Text>
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    margin: 12,
    padding: 8,
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
    margin: 12,
    marginBottom: 0,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 8,
    color: "#222",
  },
  cardSubtext: {
    color: "#888",
    fontSize: 13,
    marginBottom: 10,
  },
  progressBarBg: {
    height: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 2,
    justifyContent: "center",
  },
  progressBarFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "92%",
    borderRadius: 8,
  },
  progressBarText: {
    alignSelf: "flex-end",
    marginRight: 8,
    fontWeight: "bold",
    fontSize: 13,
    position: "absolute",
    right: 0,
    top: 0,
  },
  statusOk: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 13,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  statusLabel: {
    color: "#333",
    fontSize: 15,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    fontWeight: "bold",
    fontSize: 13,
    overflow: "hidden",
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
});
