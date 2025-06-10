import React, { useEffect } from 'react'
import { SafeAreaView, ActivityIndicator } from 'react-native'
import { useTheme } from '../context/ThemeContext' // Caminho atualizado

export default function NavegacaoScreen({ navigation }) {
  const { palette } = useTheme();

  useEffect(() => {
    navigation.replace('Localização')
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#2e7d32" />
    </SafeAreaView>
  )
}