import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, ImageBackground, Text, View, Button, Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));

class HeightQPage extends Component {
    constructor() {
        super();
        this.state = {
            newHeight: "",
            isLoading: false,
            updateSuccess: false,
        };
    }

    save = () => {
        this.setState({ isLoading: true });
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.height = this.state.newHeight;
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
                this.props.changeHeight(this.state.newHeight);
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

    convertHeight = (heightInInches) => {
        var height = Number(heightInInches);
        var feet = ~~(height / 12);
        var inches = height % 12;
        return feet.toString() + " ft. " + inches.toString() + " in."
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.viewStyle}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        if (this.state.updateSuccess) {
            this.props.navigation.navigate("Major Question Page");
        }

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={image} >
                    <Text style={styles.signupLinkText}>
                        Set Height (in inches)
                </Text>
                    <View style={styles.wrapper}>
                        <TextInput
                            placeholderTextColor='white'
                            style={styles.input}
                            keyboardType={"numeric"}
                            placeholder="Height (in inches)"
                            value={this.state.newHeight}
                            onChangeText={text => { this.setState({ newHeight: text }) }}
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
        changeHeight: (height) => {
            dispatch({
                type: "CHANGE_HEIGHT",
                payload: height,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeightQPage);
