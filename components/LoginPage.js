import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInError: '',
            username: '',
            password: '',
            isLoading: false,
            loginSuccess: false,
        };
    }

    onLogin = () => {
        this.setState({isLoading: true});
        fetch('http://192.168.1.116:5000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        }).then(res => res.json()).then(json => {
            console.log(json);
            if (json.success) {
                this.setState({
                    signInError: json.message,
                    isLoading: false,
                    email: '',
                    password: '',
                    loginSuccess: true,
                });
            }
            else {
                this.setState({
                    signInError: json.message,
                    isLoading: false,
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        if (this.state.isLoading) {
            return (<Text>Loading...</Text>);
        }
        return (
            <View style={styles.viewStyle}>
                <TextInput
                    style={{ color: "black", fontSize: 20 }}
                    placeholder="Username"
                    value={this.state.username}
                    onChangeText={text => { this.setState({username: text}) }}
                />
                <TextInput
                    style={{ color: "black", fontSize: 20 }}
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={text => { this.setState({password: text}) }}
                />
                 <Button onPress={this.onLogin} title="Login"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: "white",
        padding: 10,
    },
});
