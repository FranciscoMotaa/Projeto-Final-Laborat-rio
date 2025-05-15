import React from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Bem-vindo à App!</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7'
  },
  text: {
    fontSize: 24,
    color: '#2e7d32',
    fontWeight: '600'
  }
})