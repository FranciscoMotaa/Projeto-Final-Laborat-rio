import React from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'


export default function HomeScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Bem-vindo à App!</Text>
      <Button style={styles.container}
      title = "Ver Estado da Bateria"
      onPress={() => navigation.navigate('Bateria')}
      />
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