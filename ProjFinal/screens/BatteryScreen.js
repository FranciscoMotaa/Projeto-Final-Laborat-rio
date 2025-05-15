import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BatteryScreen() {
  const batteryLevel = 76; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estado da Bateria</Text>
      <Text style={styles.batteryText}>{batteryLevel}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  batteryText: {
    fontSize: 48,
    color: 'green',
  },
});
