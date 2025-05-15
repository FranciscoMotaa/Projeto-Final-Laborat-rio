import React from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'

export default function BateriaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bateria</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '600' }
})