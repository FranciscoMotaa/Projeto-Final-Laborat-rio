import React, { useContext } from "react";
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
import DetalhesRotaScreen from "./screens/DetalhesRotaScreen";
import NavegacaoScreen from "./screens/NavegacaoScreen";
import NavegacaoGPSScreen from "./screens/NavegacaoGPSScreen";
import AccessibilityScreen from "./screens/AccessibilityScreen";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { palette, theme } = useTheme();

  const navigationTheme = {
    dark: theme === "escuro",
    colors: {
      primary: palette.primary,
      background: palette.background,
      card: palette.card,
      text: palette.text,
      border: palette.textSecondary,
      notification: palette.warning,
    },
    fonts: {
      regular: {
        fontFamily: undefined,
        fontWeight: "normal",
      },
      medium: {
        fontFamily: undefined,
        fontWeight: "bold",
      },
      light: {
        fontFamily: undefined,
        fontWeight: "300",
      },
      thin: {
        fontFamily: undefined,
        fontWeight: "200",
      },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
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
        <Stack.Screen
          name="DetalhesRota"
          component={DetalhesRotaScreen}
          options={{ title: "Detalhes da Rota" }}
        />
        <Stack.Screen
          name="NavegacaoGPS"
          component={NavegacaoGPSScreen}
          options={{
            title: "Navegação GPS",
            headerShown: false, // Ocultamos o cabeçalho para ter a experiência de tela cheia
          }}
        />
        <Stack.Screen name="Clima" component={ClimaScreen} />
        <Stack.Screen name="Análise" component={AnaliseScreen} />
        <Stack.Screen name="Comunidade" component={ComunidadeScreen} />
        <Stack.Screen name="Navegação" component={NavegacaoScreen} />
        <Stack.Screen name="Acessibilidade" component={AccessibilityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
