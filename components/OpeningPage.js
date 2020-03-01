import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import Constants from 'expo-constants';

export default class OpeningPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.viewStyle}>
                <Text style = {styles.textStyle}>
                    Login - or Register now!
                </Text>
                <Button onPress={() => 
                    this.props.navigation.navigate("Login Page")} title="Login" color="#CC5CFF"/>
                <Button onPress={() => 
                    this.props.navigation.navigate("Signup Page")} title="Sign up!" color="#11CC33"/>
                <Button onPress={() => 
                    this.props.navigation.replace("Drawer")} title="Development tool - Skip" color="#CC3333"/>
            </View>
        )
    }  
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        padding: 20,
    },
    textStyle: {
        color: "black",
        alignContent: 'center',
        fontSize: 30,
    },
});