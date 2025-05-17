import React, { useEffect } from 'react'
import { SafeAreaView, ActivityIndicator } from 'react-native'

export default function NavegacaoScreen({ navigation }) {
  useEffect(() => {
    navigation.replace('Localização')
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#2e7d32" />
    </SafeAreaView>
  )
}