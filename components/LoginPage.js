import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, ImageBackground, Text, View, Button, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import HealthScoreCalculator from '../tools/HealthScoreCalculator';
import styles from './frontendstyle';

const image = (require('../assets/background.jpg'));

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInError: '',
            username: '',
            password: '',
            isLoading: false,
            isLoadingFoods: false,
            loginSuccess: false,
        };
    }

    setHealthScores = () => {
        const foods = JSON.parse(JSON.stringify(this.props.foods.list));
        HealthScoreCalculator.setHealthScore(foods, this.props.user.diet);
        this.props.setFoods(foods);
    }

    getFoods = () => {
        this.setState({ isLoadingFoods: true });
        fetch('http://192.168.1.116:5000/foods', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(json => {
            this.setState({ isLoadingFoods: false });
            if (json.result == 1) {
                this.props.setFoods(json.foods);
                const currentDay = new Date();
                currentDay.setHours(0, 0, 0, 0);
                if (currentDay.getTime() !== new Date(this.props.user.diet.lastCalculated).getTime()) {
                    /* The day has changed, recalculate health scores based off of a day where we haven't eaten anything */
                    this.props.changeDiet(HealthScoreCalculator.createDiet(this.props.user));
                }
                this.setHealthScores();
                this.props.navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Drawer',
                        },
                    ],
                }));
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        });
    }

    onLogin = () => {
        this.setState({ isLoading: true });
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
                this.getFoods();
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
        if (this.state.isLoading) {
            return (
                <View style={styles.viewStyle}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        if (this.state.isLoadingFoods) {
            return (
                <View style={styles.viewStyle}>
                    <Text>Loading Foods...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={image} >
                    <Text style={styles.signupLinkText}>
                        Login
                    </Text>
                    <View style={styles.wrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor="white"
                            value={this.state.username}
                            onChangeText={text => { this.setState({ username: text }) }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="white"
                            onChangeText={text => { this.setState({ password: text }) }}
                            value={this.state.password}
                            secureTextEntry
                        />
                    </View>
                    <View style = {styles.buttonContainerAlt}>
                        <Button onPress={this.onLogin} title="Login" style={styles.button} />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        foods: state.foods,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch({
                type: "SET_USER",
                payload: user,
            });
        },
        setFoods: (foods) => {
            dispatch({
                type: "SET_FOODS",
                payload: foods,
            });
        },
        changeDiet: (diet) => {
            dispatch({
                type: "CHANGE_DIET",
                payload: diet,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
