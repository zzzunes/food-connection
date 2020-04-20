import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import logo from './logo.png';
import styles from './frontendstyle';

const image = (require('../assets/background.jpg'));
const {width,height} = Dimensions.get("window");

export default class OpeningPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.container}>
                <ImageBackground style= {styles.backgroundImage} source= {image}>
                <View style= {styles.logoContainer}>
                    <Image source={logo} style = {styles.logo}/>
                    <Text style = {styles.logoText}>
                        Welcome to Food Connection
                    </Text>
                    </View>

                            <Button onPress={() => 
                                this.props.navigation.navigate("Login Page")} title="Login" style = {styles.button}/>
                                
                                    
                                    <Button onPress={() => 
                                        this.props.navigation.navigate("Signup Page")} title="Sign up" style = {styles.button}/>
                                
                        <Text style = {styles.buttonText}>Don't have an account?</Text>
                        
                    </ImageBackground>
            </View>
        )
    }  
}



