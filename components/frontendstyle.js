import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity, Platform } from 'react-native';
import Constants from 'expo-constants';
const {width,height} = Dimensions.get("window");
const image = (require('../assets/background.jpg'));

export default styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#AA6688',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    buttonContainer1: {
        marginTop: 60,
        width: 380,
    },
    buttonContainer2: {
        marginTop: 20,
        width: 380,
    },
    viewStyle1: {
      flex: 1,
      backgroundColor: '#664466',
      marginTop: Constants.statusBarHeight,
      justifyContent: 'center',
      padding: 20,
  },
  textStyle1: {
      color: "white",
      fontSize: 20,
      marginBottom: 0,
      justifyContent: 'center',
  },
  textStyleTitle1: {
      color: "white",
      textAlign: 'center',
      fontSize: 30,
      marginBottom: 30,
  },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        padding: 10,
        color: "green",
        fontSize: 20,
        fontWeight: "bold",
    },
    navigateStyle: {
        marginTop: 40,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    restaurantStyle: {
        marginBottom: 40,
        padding: 10,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        alignContent:'center',
        justifyContent:'center'
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
      Healthscore: {
          fontSize:15,
          lineHeight:40,
          width:130,
          alignContent: "space-between",
          
          fontWeight: 'bold',
          color: "white",
          marginLeft:30
      },
      row: {
          paddingVertical:25,
          paddingHorizontal:15,
          borderBottomWidth: 1,
          borderBottomColor: 'white'
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
          color:'red',
          fontSize: 20,
          fontWeight: '500',
          marginTop: 10,
          textAlign: 'center',
          
          marginBottom:30,          
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
        color: "white",
      },
      button: {
        width: width - 55,
        height: 45,
        borderRadius: 25,
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
        resizeMode: 'cover',
       //alignItems: "center",
        //opacity: 0.7,
    },
    align: {
      ...Platform.select({
        ios: {
          marginTop: 35,
        },
        android: {
          marginTop: Constants.statusBarHeight,
        },
      })
    },
    viewStyle2: {
      flex: 1,
      backgroundColor: 'white',
      marginTop: Constants.statusBarHeight,
  },
  textStyle2: {
      color: "black",
  },
  headerStyle2: {
      borderBottomWidth:1,
      backgroundColor:'#FFFFFF',
      borderColor:'#FFFFFF'
  },
  textTitle2: {
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 10,
      fontWeight: "bold",
      fontSize: 16,
  },
  imageStyle:{
      marginLeft:15,
      alignSelf:'center',
      height:30,
      width:30,
  },
  background2: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    mainView3: {
      flex: 1,
      backgroundColor: '#AA6688',
      marginTop: Constants.statusBarHeight,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
  },
  buttonContainer3: {
      marginTop: 60,
      width: 380,
  },
  buttonContainer4: {
      marginTop: 20,
      width: 380,
  },
  textContainer3: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  },
  textStyle3: {
      padding: 10,
      color: "green",
      fontSize: 20,
      fontWeight: "bold",
  },
  navigateStyle3: {
      marginTop: 40,
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
  },
  restaurantStyle3: {
      marginBottom: 40,
      padding: 10,
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
  },
  foodItem: {
    flex:1,
    paddingHorizontal: 15,
    paddingVertical:25,
    flexDirection:'row',
    justifyContent: 'space-between',
    borderBottomColor:'white',
    borderBottomWidth:1,
    
  },
  foodName: {
    fontSize:20,
    color:'red',
  },
});