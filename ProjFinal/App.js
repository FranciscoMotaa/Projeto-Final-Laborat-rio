import React from 'react'
import { TouchableOpacity } from 'react-native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import AjustesScreen from './screens/AjustesScreen'
import AnaliseScreen from './screens/AnaliseScreen'
import BateriaScreen from './screens/BateriaScreen'
import CarregamentoScreen from './screens/CarregamentoScreen'
import ClimaScreen from './screens/ClimaScreen'
import ComunidadeScreen from './screens/ComunidadeScreen'
import ControloScreen from './screens/ControloScreen'
import DiagnosticoScreen from './screens/DiagnosticoScreen'
import HistoricoScreen from './screens/HistoricoScreen'
import LocalizacaoScreen from './screens/LocalizacaoScreen'
import ManutencaoScreen from './screens/ManutencaoScreen'
import RotasScreen from './screens/RotasScreen'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ backgroundColor: '#f0f4f7', flex: 1 }}
    >
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        onPress={() => props.navigation.replace('Login')}
        icon={({ color, size }) => (
          <Ionicons name="exit-outline" size={size} color={color} />
        )}
        labelStyle={{ fontWeight: '600' }}
        inactiveTintColor="#888"
        activeTintColor="#2e7d32"
      />
    </DrawerContentScrollView>
  )
}

export function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerStyle: { backgroundColor: '#f0f4f7' },
        drawerActiveTintColor: '#2e7d32',
        drawerInactiveTintColor: '#888',
        drawerLabelStyle: { fontSize: 16, fontWeight: '600' },
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#2e7d32' },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 16 }}
          >
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        )
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Início',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Bateria"
        component={BateriaScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="battery-charging-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Localização"
        component={LocalizacaoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Manutenção"
        component={ManutencaoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="construct-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Histórico"
        component={HistoricoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Diagnóstico"
        component={DiagnosticoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="medkit-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Carregamento"
        component={CarregamentoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Controlo"
        component={ControloScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="game-controller-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Ajustes"
        component={AjustesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Rotas"
        component={RotasScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Clima"
        component={ClimaScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="sunny-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Análise"
        component={AnaliseScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Comunidade"
        component={ComunidadeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#2e7d32' }
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Agenda A-MoVeR' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Criar Conta', headerBackVisible: true }}
        />
        <Stack.Screen
          name="MainDrawer"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}