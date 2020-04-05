import React from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
const {width,height} = Dimensions.get("window");
const image = {uri: "https://www.flavorofindia.com/wp-content/uploads/2014/07/photodune-6761938-food-background-on-dark-slate-m1-1024x1024.jpg"}

export default function DataPage({navigation}) {
    return (
        <View style = {styles.container}>
           <ImageBackground style= {styles.backgroundImage} source= {image}> 
            <Text style = {styles.signupLinkText}>Data Page</Text>
        </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    marginTop: 10,
    
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 5,
    height: 40,
    borderBottomWidth: 1,
    borderRadius: 25,
    paddingLeft: 25,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
      width :200,
      height: 200,
  },
  logoText: {
      color:'lightgreen',
      fontSize: 20,
      fontWeight: '500',
      marginTop: 10,
  },
  icon: {
    height: 20,
    width: 20,
  },
  logoContainer: {
      alignItems: 'center',
  },
  input: {
    width: width - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,.5)",
    marginHorizontal: 25,
    marginTop: 20,
    paddingLeft: 45,
    color: "rgba(255,255,255,0.7)",
  },
  button: {
    width: width - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: "lightgreen",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingLeft: 4,
    marginHorizontal: 25,
  },
  buttonText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 20,
    
    textAlign: 'center',
    
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    fontWeight:'bold',
    color: "white",
    textAlign: 'center',
    fontSize: 40,
    paddingVertical: 0,
    marginBottom: 10,
    
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
   //alignItems: "center",
    //opacity: 0.7,
},
align: {
    marginBottom: 40,
},
});
