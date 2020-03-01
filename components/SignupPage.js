import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';

export default class SignupPage extends Component {
    constructor() {
        super();
        this.state = {
            signUpError: '',
            username: '',
            email: '',
            password: '',
            isLoading: false,
            signUpSuccess: false,
        };
    }

    onSignUp = () => {
        this.setState({isLoading: true});
        fetch('http://192.168.1.116:5000/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }),
        }).then(res => res.json()).then(json => {
            console.log(json);
            if (json.status != 400) {
                this.setState({
                    signUpError: json.message,
                    isLoading: false,
                    signUpSuccess: true,
                });
            }
            else {
                this.setState({
                    signUpError: json.message,
                    isLoading: false,
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
        if (this.state.signUpSuccess) {
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
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={text => { this.setState({email: text}) }}
                />
                <TextInput
                    style={{ color: "black", fontSize: 20 }}
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={text => { this.setState({password: text}) }}
                />
                <Button onPress={this.onSignUp} title="Sign Up"/>
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
        alignItems: 'center',
    },
    textStyle: {
        color: "white",
        padding: 10,
    },
});
