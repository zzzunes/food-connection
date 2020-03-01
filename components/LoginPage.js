import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import NavigationActions, { CommonActions } from '@react-navigation/native'

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
            if (json.status != 400) {
                this.setState({
                    signInError: json.message,
                    isLoading: false,
                    loginSuccess: true,
                });
            }
            else {
                this.setState({
                    signInError: json.message,
                    isLoading: false,
                    loginSuccess: true,
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.viewStyle}>
                    <Text>Loading...</Text>
                </View>
            );
        }
        if (this.state.loginSuccess) {
            this.props.navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Drawer',
                        // params: { user: userObject of some kind. },
                        // In the future, use React-Redux to set the User object
                    },
                ],
            }))
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
                    onChangeText={text => { this.setState({password: text}) }}
                    value={this.state.password}
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
        justifyContent: 'center',
    },
});
