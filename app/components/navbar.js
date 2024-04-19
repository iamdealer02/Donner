import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Navbar() {
  return (
    <View style ={styles.navbarContainer}  >
        <Image style ={styles.navbarIcons} source={require('../assets/profileIcon.png')}/>
        <Image style ={styles.navbarIcons} source={require('../assets/fav.png')}/>
        <Image style ={styles.navbarIcons} source={require('../assets/tickets.png')}/>
        <Image style ={styles.navbarIcons} source={require('../assets/searchIcon.png')}/>
        
    </View>
  )
}

const styles = StyleSheet.create({
    navbarContainer: {
        borderTopColor: '#403B3B',
        position: 'relative',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    navbarIcons: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    }
 
})