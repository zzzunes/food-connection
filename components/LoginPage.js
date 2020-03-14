import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Linking, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

class LoginPage extends Component {
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
            Alert.alert("Notification received: ", json.message);
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                    loginSuccess: true,
                });
                this.props.setUser(json.user);
            }
            else {
                this.setState({
                    signInError: json.message,
                    isLoading: false,
                });
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        });
    }

    render() {
        console.log(this.props.user);
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
                    },
                ],
            }))
        }
        return (
            <View style={styles.viewStyle}>
                <Text style = {styles.textStyleTitle}>
                    Login
                </Text>
                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="Username"
                    value={this.state.username}
                    onChangeText={text => { this.setState({username: text}) }}
                />
                <Text style = {styles.textStyle}> </Text>
                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="Password"
                    onChangeText={text => { this.setState({password: text}) }}
                    value={this.state.password}
                />
                <Text style = {styles.textStyle}> </Text>
                <Button onPress={this.onLogin} title="Login"/>
            </View>
        );
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
    textStyleTitle: {
        color: "white",
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30,
    },
    textStyle: {
        color: "white",
        marginBottom: 0,
        justifyContent: 'center',
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch({
                type: "SET_USER",
                payload: user,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
