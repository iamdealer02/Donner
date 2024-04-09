import { StyleSheet, Text, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/donner.png')} style={styles.banner}  />      
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#000', 
    },
    text: {
      color: '#fff', // White text color
    },
    banner: { 
      width: '100%', 
      height: '30%',
      resizeMode: 'contain', 
      
    }
  });