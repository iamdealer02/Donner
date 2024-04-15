import { StyleSheet, Text, View, Image, TextInput, FlatList } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { StatusBar } from 'expo-status-bar'
import React, {useState} from 'react'
import {GEOAPIFY_API_KEY, GEOAPIFY_BASE_URL} from '@env'


export default function WelcomeScreen() {
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const fetchSuggestions = async (city) => {
    console.log('Fetching suggestions for:', city);

    try {
      if(city === '') {
        setSuggestions([]);
        return;
      }

      const response = await fetch(`${GEOAPIFY_BASE_URL}?text=${city}&apiKey=${GEOAPIFY_API_KEY}`);
      const data = await response.json();
      setSuggestions(data.features);
    } catch (error) {
      console.error(error);
    }
  }
  
  const renderItem = ({ item }) => {
    return (
      <View style={styles.cityContainer} >
        <Image source={require('../assets/location.png')} style={{width: 40, height: 30}} />
        <Text style={styles.cityName}>{item.properties.formatted}</Text>
      </View>
    );v 
  };



  return (
    <View style={styles.container}>
      <Image source={require('../assets/donner.png')} style={styles.banner}  />
      <View style = {styles.bannerContainer}>
          <Text style={styles.bannerHeading}>FIND DISTRIBUTION PACKAGES !</Text> 
            <Svg style= {styles.bannerImage} width="64" height="61" viewBox="0 0 74 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M59.5089 59.5723H5.75174V30.841L11.7406 25.0455H19.0128V13.0844L26.285 4.08275H28.9506L31.1331 1H46.8182L54.0904 9.38508V25.0455H68.0644V55.3797L59.5089 59.5723Z" fill="#CF9A9A"/>
                <Path d="M5.75174 30.841V59.5723H59.5089M5.75174 30.841L11.7406 25.0455H22.5776M5.75174 30.841H19.0128M59.5089 30.841V59.5723M59.5089 30.841L68.0644 25.0455M59.5089 30.841H46.8182M59.5089 59.5723L68.0644 55.3797V25.0455M68.0644 25.0455H54.0904M19.0128 30.841V13.0844L26.285 4.08275H39.546L46.8182 13.0844V30.841M19.0128 30.841H46.8182M54.0904 25.0455V9.38508L46.8182 1H31.1331L22.5776 13.0844V25.0455M54.0904 25.0455H22.5776" stroke="black"/>
                <Path d="M64.2855 15.0329L56.4193 18.6174L49.2472 30.2861H58.4244L64.2855 20.9054V15.0329Z" fill="#F6B149" stroke="black"/>
                <Path d="M5.71115 15.0329L4.91198 23.5012L9.14501 29.8285L16.3171 29.8285L10.9759 18.1921L5.71115 15.0329Z" fill="#F6B149" stroke="black"/>
                <Path d="M64.3626 19.4564L72.8458 27.5406L68.6042 26.0915L66.2906 36.9213L64.3626 27.5406L56.8049 32.0403L57.95 30.1336L61.1563 24.795L64.3626 19.4564Z" fill="#58C105"/>
                <Path d="M56.8049 32.0403L57.95 30.1336M56.8049 32.0403L64.3626 27.5406L66.2906 36.9213L68.6042 26.0915M56.8049 32.0403L61.1563 24.795M57.95 30.1336L64.3626 24.6425L68.6042 26.0915M57.95 30.1336L61.1563 24.795M68.6042 26.0915L72.8458 27.5406L64.3626 19.4564L61.1563 24.795" stroke="black"/>
                <Path d="M11.3029 22.8255L19.9461 30.7422L15.6764 29.3764L13.5799 40.2493L11.4646 30.9081L3.99839 35.5548L5.10513 33.6261L8.204 28.2258L11.3029 22.8255Z" fill="#58C105"/>
                <Path d="M3.99839 35.5548L5.10513 33.6261M3.99839 35.5548L11.4646 30.9081L13.5799 40.2493L15.6764 29.3764M3.99839 35.5548L8.204 28.2258M5.10513 33.6261L11.4066 28.0106L15.6764 29.3764M5.10513 33.6261L8.204 28.2258M15.6764 29.3764L19.9461 30.7422L11.3029 22.8255L8.204 28.2258" stroke="black"/>
            </Svg>
      </View>
      <View style = {styles.mainContainer}>
        <View style = {styles.citySelection}>
            {/* input box to enter the city (using api) */}
            <Image source={require('../assets/location.png')} style={{width: 40, height: 30, marginLeft: 40}} /> 
            <TextInput
              placeholder="ENTER THE CITY"
              placeholderTextColor="#fff"
              onChangeText={(text) => {
                  console.log(text);
                  if (text === '') {
                      setSuggestions([]);
                  } else {
                      setCity(text); 
                      fetchSuggestions(text); // Fetch suggestions using the updated text
                  }
              }}
              style={styles.cityInput}
          />

                  {/* suggestions */}

        </View>
        {
          suggestions.length > 0 ?
          (
            <View style={styles.suggestionList}>

            <FlatList
              data={suggestions}
              renderItem={renderItem} 
              keyExtractor={(item) => item.properties.place_id}
            
            />
          </View>

          ) : null
        }
        <View style = {styles.buttonContainer}>
          <Text style = {styles.buttonText}> FIND DISTRIBUTION </Text>
        </View>

      </View>


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
      
    },
    bannerHeading : {
      color: '#fff',
      fontSize: 47,
      textAlign: 'left',
      marginTop: 20,
      marginLeft: 20,
      lineHeight: 70,
      fontWeight: 'bold'
    },
    bannerContainer : {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent : 'space-around'
    },
    bannerImage : {
      marginBottom: 10,
      marginRight: 20
    },
    citySelection : {
      marginTop: 60,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      borderColor: '#fff',
      borderWidth: 1,
      borderRadius: 5,
     
     
    },
    cityInput : {
      color: '#fff',
      backgroundColor: '#000',
      paddingHorizontal: 20,
      fontWeight: 'bold',
      width: '100%'
      
        },

      suggestionList: {
        marginTop: 10,
        flex: 1,
        width: 275,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        position: 'absolute',
        backgroundColor: '#000',
        top: 100, 
        left: 0,
        right: 0,
        zIndex: 1,
      },
      cityName: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
      },
      cityContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,

      },
      mainContainer : {
        flex: 1,
        marginHorizontal: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',

        padding: 10,

      },
      buttonContainer : {
        marginTop: 20,
        backgroundColor: '#FF4444', 
        padding: 5,
        borderRadius: 8,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonText : {
        color: '#fff',
        fontWeight: 'bold',
      }
  });