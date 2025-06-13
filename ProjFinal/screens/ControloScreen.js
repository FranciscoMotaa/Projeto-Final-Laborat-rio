import React, { useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../context/ThemeContext' // Caminho atualizado
import Slider from "@react-native-community/slider";

export default function ControloScreen({ navigation }) {
  const [luzesAtivas, setLuzesAtivas] = useState(false);
  const [rastreamentoAtivo, setRastreamentoAtivo] = useState(true);
  const [alarmeAtivo, setAlarmeAtivo] = useState(true);
  const [motaBloqueada, setMotaBloqueada] = useState(true);
  const [modo, setModo] = useState("Eco");
  const modos = ["Eco", "Normal", "Sport"];
  const [motor, setMotor] = useState(60);
  const [regen, setRegen] = useState(80);
  const [acel, setAcel] = useState(40);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  
  // Valores predefinidos para cada modo
  const modoConfig = {
    Eco: { motor: 60, regen: 80, acel: 40 },
    Normal: { motor: 75, regen: 60, acel: 60 },
    Sport: { motor: 100, regen: 40, acel: 90 }
  };
  
  const { palette, menuDisplay } = useTheme();

  const menuItems = [
    { name: 'Início',      icon: 'home-outline' ,           route: 'Home' },
    { name: 'Bateria',     icon: 'battery-charging-outline', route: 'Bateria' },
    { name: 'Navegação',  icon: 'navigate-outline',          route: 'Navegação' },
    { name: 'Controlo',    icon: 'game-controller-outline', route: 'Controlo' },
    { name: 'Manutenção',  icon: 'construct-outline', route: 'Manutenção' },
    { name: 'Comunidade',  icon: 'people-outline', route: 'Comunidade' },
    { name: 'Definições',     icon: 'settings-outline', route: 'Definições' },
  ]
  const alternarBloqueio = () => {
    setMotaBloqueada(!motaBloqueada);
    // Aqui seria feita a comunicação com a API da mota para a bloquear/desbloquear
  };
  const tocarAlarme = () => {
    // Aqui enviamos um sinal para a mota ativar o alarme sonoro
    alert('Alarme ativado!');
  };  const localizarMota = () => {
    // Vamos para o ecrã de navegação para vermos onde está a mota
    navigation.navigate('Navegação');
  };

  return (
    <SafeAreaView style={styles.container}>      <ScrollView paddingBottom={24}>
        {/* Fundo branco para os botões do menu */}
      <View style={styles.menuContainer}>
        <View style={styles.grid}>
          {menuItems.map(item => (            <TouchableOpacity
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
      </View>      {/* Painel de Controlo Remoto da Mota */}
      <View style={styles.controlContainer}>
        <View style={styles.controlHeader}>
          <Ionicons name="power-outline" size={24} color="#444" />
          <Text style={styles.controlTitle}>Controlo Remoto</Text>
        </View>
        <Text style={styles.controlSubtitle}>Controle funções básicas da sua mota</Text>        <View style={styles.controloGrid}>
          {/* Botão para bloquear ou desbloquear a mota */}
          <TouchableOpacity 
            style={[styles.controlBox, styles.controlBoxLarge]}
            onPress={alternarBloqueio}
          >
            <View style={styles.controlBoxContent}>
              <Ionicons 
                name={motaBloqueada ? "lock-closed" : "lock-open"} 
                size={36} 
                color="#2e7d32" 
              />
              <Text style={styles.controlBoxTitle}>
                {motaBloqueada ? "Mota Bloqueada" : "Mota Desbloqueada"}
              </Text>
              <Text style={styles.controlBoxSubtitle}>Atualizado: 15:30</Text>
            </View>
          </TouchableOpacity>          {/* Botão para fazer soar o alarme da mota */}
          <TouchableOpacity 
            style={[styles.controlBox, styles.controlBoxLarge]}
            onPress={tocarAlarme}
          >
            <View style={[styles.controlBoxContent, {backgroundColor: '#f5f5f5'}]}>
              <Ionicons name="notifications-outline" size={36} color="#444" />
              <Text style={styles.controlBoxTitle}>Tocar Alarme</Text>
            </View>
          </TouchableOpacity>
        </View>        {/* Comandos Rápidos - Interruptores de funções */}
        <View style={styles.switchesContainer}>
          {/* Controlo das luzes da mota */}
          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <Ionicons name="flashlight-outline" size={24} color="#444" />
              <Text style={styles.switchText}>Luzes</Text>
            </View>
            <Switch
              trackColor={{ false: '#d9d9d9', true: '#aed581' }}
              thumbColor={luzesAtivas ? '#2e7d32' : '#f4f3f4'}
              onValueChange={setLuzesAtivas}
              value={luzesAtivas}
            />
          </View>          {/* Sistema de localização GPS */}
          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <Ionicons name="location-outline" size={24} color="#444" />
              <Text style={styles.switchText}>Rastreamento</Text>
            </View>
            <Switch
              trackColor={{ false: '#d9d9d9', true: '#aed581' }}
              thumbColor={rastreamentoAtivo ? '#2e7d32' : '#f4f3f4'}
              onValueChange={setRastreamentoAtivo}
              value={rastreamentoAtivo}
            />
          </View>          {/* Sistema de segurança e alarme */}
          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <Ionicons name="alert-circle-outline" size={24} color="#444" />
              <Text style={styles.switchText}>Sistema de Alarme</Text>
            </View>
            <Switch
              trackColor={{ false: '#d9d9d9', true: '#aed581' }}
              thumbColor={alarmeAtivo ? '#2e7d32' : '#f4f3f4'}
              onValueChange={setAlarmeAtivo}
              value={alarmeAtivo}
            />
          </View>        </View>
          {/* Secção para encontrar a mota no mapa */}
        <View style={styles.locateContainer}>
          <View style={styles.locateHeader}>
            <Ionicons name="locate-outline" size={24} color="#444" />
            <Text style={styles.locateTitle}>Localizar Mota</Text>
          </View>
          <TouchableOpacity 
            style={[styles.locateButton, !rastreamentoAtivo && styles.locateButtonDisabled]}
            onPress={rastreamentoAtivo ? localizarMota : null}
            disabled={!rastreamentoAtivo}
          >
            <Text style={[styles.locateButtonText, !rastreamentoAtivo && styles.locateButtonTextDisabled]}>
              {rastreamentoAtivo ? "Localizar Agora" : "Rastreamento Desativado"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.locateDescription}>
            {rastreamentoAtivo 
              ? "Esta função irá mostrar a localização exata da sua mota no mapa"
              : "Ative o rastreamento para poder localizar a sua mota"}
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="settings-outline" size={20} color="#2e7d32" />
          <Text style={styles.cardTitle}>Ajustes</Text>
        </View>        {/* Dropdown com seleção */}        <View>
          <Text style={styles.modeLabel}>Modo de Condução</Text>
          <TouchableOpacity 
            style={[
              styles.dropdown,
              { borderColor: modo === "Eco" ? "#4caf50" : modo === "Normal" ? "#28662a" : "#0e470f" }
            ]} 
            onPress={() => setDropdownAberto(!dropdownAberto)}
          >
            <View style={styles.modeIconContainer}>
              <Ionicons 
                name={
                  modo === "Eco" ? "leaf-outline" : 
                  modo === "Normal" ? "speedometer-outline" : "flash-outline"
                } 
                size={18} 
                color={
                  modo === "Eco" ? "#4caf50" : 
                  modo === "Normal" ? "#28662a" : "#0e470f"
                } 
              />
              <Text 
                style={[
                  styles.dropdownText,
                  { 
                    color: modo === "Eco" ? "#4caf50" : 
                           modo === "Normal" ? "#28662a" : "#0e470f",
                    fontWeight: "bold"
                  }
                ]}
              >{modo}</Text>
            </View>
            <Ionicons 
              name={dropdownAberto ? "chevron-up-outline" : "chevron-down-outline"} 
              size={18} 
              color="#888" 
            />
          </TouchableOpacity>
          
          {dropdownAberto && (
            <View style={styles.dropdownOptions}>
              {modos.map((modoOpcao) => (
                <TouchableOpacity
                  key={modoOpcao}
                  style={[
                    styles.dropdownOption, 
                    modo === modoOpcao && styles.dropdownOptionSelected
                  ]}                  onPress={() => {
                    // Atualiza o modo e fecha o dropdown
                    setModo(modoOpcao);
                    setDropdownAberto(false);
                    
                    // Atualiza os valores dos sliders de acordo com o modo selecionado
                    const config = modoConfig[modoOpcao];
                    setMotor(config.motor);
                    setRegen(config.regen);
                    setAcel(config.acel);
                  }}
                >
                  <Text style={[
                    styles.dropdownOptionText,
                    modo === modoOpcao && styles.dropdownOptionTextSelected
                  ]}>
                    {modoOpcao}
                  </Text>
                  {modo === modoOpcao && (
                    <Ionicons name="checkmark" size={16} color="#2e7d32" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {/* Sliders */}        <View style={styles.sliderRow}>
          <Text style={styles.sliderLabel}>Potência do Motor</Text>
          <Text style={[
            styles.sliderValue, 
            { 
              color: modo === "Eco" ? "#4caf50" : 
                    modo === "Normal" ? "#28662a" : "#0e470f"
            }
          ]}>{motor}%</Text>
        </View><Slider
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={100}
          value={motor}
          minimumTrackTintColor={
            modo === "Eco" ? "#4caf50" : 
            modo === "Normal" ? "#28662a" : "#0e470f"
          }
          maximumTrackTintColor="#e0e0e0"
          thumbTintColor={
            modo === "Eco" ? "#4caf50" : 
            modo === "Normal" ? "#28662a" : "#0e470f"
          }
          onValueChange={value => setMotor(Math.round(value))}
        />        <View style={styles.sliderRow}>
          <Text style={styles.sliderLabel}>Regeneração de Travagem</Text>
          <Text style={[
            styles.sliderValue, 
            { 
              color: modo === "Eco" ? "#4caf50" : 
                    modo === "Normal" ? "#28662a" : "#0e470f"
            }
          ]}>{regen}%</Text>
        </View><Slider
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={100}
          value={regen}
          minimumTrackTintColor={
            modo === "Eco" ? "#4caf50" : 
            modo === "Normal" ? "#28662a" : "#0e470f"
          }
          maximumTrackTintColor="#e0e0e0"
          thumbTintColor={
            modo === "Eco" ? "#4caf50" : 
            modo === "Normal" ? "#28662a" : "#0e470f"
          }
          onValueChange={value => setRegen(Math.round(value))}
        />        <View style={styles.sliderRow}>
          <Text style={styles.sliderLabel}>Resposta do Acelerador</Text>
          <Text style={[
            styles.sliderValue, 
            { 
              color: modo === "Eco" ? "#4caf50" : 
                    modo === "Normal" ? "#28662a" : "#0e470f"
            }
          ]}>{acel}%</Text>
        </View><Slider
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={100}
          value={acel}
          minimumTrackTintColor={
            modo === "Eco" ? "#4caf50" : 
            modo === "Normal" ? "#28662a" : "#0e470f"
          }
          maximumTrackTintColor="#e0e0e0"
          thumbTintColor={
            modo === "Eco" ? "#4caf50" : 
            modo === "Normal" ? "#28662a" : "#0e470f"
          }
          onValueChange={value => setAcel(Math.round(value))}
        />        <TouchableOpacity style={[
          styles.saveButton,
          {
            backgroundColor: "#2e7d32",
          }
        ]}>
          <Text style={styles.saveButtonText}>Guardar Configurações</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7'
  },
  menuContainer: {    margin: 12,
    padding:8,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignSelf: 'stretch',
    // Efeito de elevação para dispositivos Android
    elevation: 3,
    // Efeito de sombra para dispositivos iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  cell: {    width: '31%',
    height: 60,
    backgroundColor: '#fff',  // Fundo branco para os botões
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // Ligeiro efeito de elevação para os botões
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
    textAlign: 'center'
  },  // Estilos do painel de controlo da mota
  controlContainer: {
    margin: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    // sombra Android
    elevation: 3,
    // sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  controlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  controlTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#444',
    marginLeft: 8
  },
  controlSubtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  controloGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  controlBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 16,
    marginHorizontal: 4,
  },
  controlBoxLarge: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  controlBoxContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  controlBoxTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center'
  },
  controlBoxSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4
  },
  switchesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  switchLabel: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  switchText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 12
  },
  locateContainer: {
    padding: 16,
    borderTopWidth: 6,
    borderTopColor: '#f0f0f0',
  },
  locateHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginLeft: 8
  },
  locateButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16
  },  locateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  locateButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed'
  },
  locateButtonTextDisabled: {
    color: '#888888'
  },
  locateDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center'
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
  },  modeLabel: {
    fontSize: 15,
    color: "#555",
    marginBottom: 6,
    fontWeight: "600",
  },
  modeIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 15,
    color: "#222",
    marginLeft: 6,
  },
  dropdownOptions: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginTop: 4,
    zIndex: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownOptionSelected: {
    backgroundColor: "#f5f5f5",
  },
  dropdownOptionText: {
    fontSize: 15,
    color: "#222",
  },
  dropdownOptionTextSelected: {
    color: "#2e7d32",
    fontWeight: "bold",
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
  },  sliderValue: {
    fontWeight: "bold",
    fontSize: 15,
  },  saveButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 18,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  }
})