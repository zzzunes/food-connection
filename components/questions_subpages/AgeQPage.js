import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, ImageBackground, Text, View, Button, Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));

class AgeQPage extends Component {
    constructor() {
        super();
        this.state = {
            newAge: "",
            isLoading: false,
            updateSuccess: false,
        };
    }

    save = () => {
        this.setState({ isLoading: true });
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.age = this.state.newAge;
        fetch('http://192.168.10.239:5000/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: newUser
            }),
        }).then(res => res.json()).then(json => {
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                    updateSuccess: true,
                });
                this.props.changeAge(this.state.newAge);
            }
            else {
                Alert.alert("Warning: ", json.message);
                this.setState({
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
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        if (this.state.updateSuccess) {
            this.props.navigation.navigate("AL Question Page");
        }

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={image} >
                    <Text style={styles.signupLinkText}>
                        Set Age
                    </Text>
                    <View style={styles.wrapper}>
                        <TextInput
                            placeholderTextColor='white'
                            style={styles.input}
                            placeholder="Age"
                            keyboardType={'numeric'}
                            value={this.state.newAge}
                            onChangeText={text => { this.setState({ newAge: text }) }}
                        />
                    </View>
                    <View style = {styles.buttonContainerAlt}>
                        <Button onPress={this.save} style={styles.button} title="Next" />
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state
    return { user }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeAge: (age) => {
            dispatch({
                type: "CHANGE_AGE",
                payload: age,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgeQPage);
