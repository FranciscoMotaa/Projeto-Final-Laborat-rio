import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import DefinicoesScreen from "./screens/DefinicoesScreen";
import AnaliseScreen from "./screens/AnaliseScreen";
import BateriaScreen from "./screens/BateriaScreen";
import CarregamentoScreen from "./screens/CarregamentoScreen";
import ClimaScreen from "./screens/ClimaScreen";
import ComunidadeScreen from "./screens/ComunidadeScreen";
import ControloScreen from "./screens/ControloScreen";
import DiagnosticoScreen from "./screens/DiagnosticoScreen";
import HistoricoScreen from "./screens/HistoricoScreen";
import LocalizacaoScreen from "./screens/LocalizacaoScreen";
import ManutencaoScreen from "./screens/ManutencaoScreen";
import RotasScreen from "./screens/RotasScreen";
import NavegacaoScreen from "./screens/NavegacaoScreen";
import AccessibilityScreen from "./screens/AccessibilityScreen";
import IdiomaScreen from "./screens/IdiomaScreen";
import { ThemeProvider } from "./context/ThemeContext"; // Caminho atualizado

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={({ navigation }) => ({
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#2e7d32" },
            headerBackVisible: false, // <-- remove o botão de voltar
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.replace("Login")}
                style={{ marginRight: 16 }}
              >
                <Ionicons name="exit-outline" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Agenda A-MoVeR",
              headerBackVisible: false, // opcional, já herdado
              headerRight: () => null,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: "Criar Conta",
              headerBackVisible: false,
              headerRight: () => null, // oculta o botão de sair
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Início" }}
          />
          <Stack.Screen name="Bateria" component={BateriaScreen} />
          <Stack.Screen name="Localização" component={LocalizacaoScreen} />
          <Stack.Screen name="Manutenção" component={ManutencaoScreen} />
          <Stack.Screen name="Histórico" component={HistoricoScreen} />
          <Stack.Screen name="Diagnóstico" component={DiagnosticoScreen} />
          <Stack.Screen name="Carregamento" component={CarregamentoScreen} />
          <Stack.Screen name="Controlo" component={ControloScreen} />
          <Stack.Screen name="Definições" component={DefinicoesScreen} />
          <Stack.Screen name="Rotas" component={RotasScreen} />
          <Stack.Screen name="Clima" component={ClimaScreen} />
          <Stack.Screen name="Análise" component={AnaliseScreen} />
          <Stack.Screen name="Comunidade" component={ComunidadeScreen} />
          <Stack.Screen name="Navegação" component={NavegacaoScreen} />
          <Stack.Screen name="Acessibilidade" component={AccessibilityScreen} />
          <Stack.Screen name="Idioma" component={IdiomaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
