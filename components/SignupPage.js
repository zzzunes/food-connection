import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

class SignupPage extends Component {
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
            alert(json);
            if (json === "User added!") {
                this.setState({
                    isLoading: false,
                    signUpSuccess: true,
                });
            }
            else {
                this.setState({
                    signUpError: json,
                    isLoading: false,
                });
            }
        }).catch(err => {
            this.setState({
                isLoading: false,
            });
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
                    },
                ],
            }))
        }
        return (
            <View style={styles.viewStyle}>
                <Text style = {styles.textStyleTitle}>
                    Sign Up
                </Text>
                <TextInput
                    style={{ color: "black", fontSize: 20 }}
                    placeholder="Username"
                    value={this.state.username}
                    onChangeText={text => { this.setState({username: text}) }}
                />
                <Text style = {styles.textStyle}> </Text>
                <TextInput
                    style={{ color: "black", fontSize: 20 }}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={text => { this.setState({email: text}) }}
                />
                <Text style = {styles.textStyle}> </Text>
                <TextInput
                    style={{ color: "black", fontSize: 20 }}
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={text => { this.setState({password: text}) }}
                />
                <Text style = {styles.textStyle}> </Text>
                <Button onPress={this.onSignUp} title="Sign Up"/>
            </View>
        )
    }  
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: '#664466',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        padding: 20,
    },
    textStyle: {
        color: "white",
        marginBottom: 0,
        justifyContent: 'center',
    },
    textStyleTitle: {
        color: "white",
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30,
    },
});

const mapStateToProps = (state) => {
    const { user } = state
    return { user }
};

export default connect(mapStateToProps)(SignupPage);
