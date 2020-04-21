import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));
const {width,height} = Dimensions.get("window");

class ChangeUsernamePage extends Component {
    constructor() {
        super();
        this.state = {
            newUsername: "",
            isLoading: false,
        };
    }

    save = () => {
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.username = this.state.newUsername;
        fetch('http://192.168.1.116:5000/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: newUser
            }),
        }).then(res => res.json()).then(json => {
            Alert.alert("Notification received: ", json.message);
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                });
                this.props.changeUsername(this.state.newUsername);
            }
            else {
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
                <View style={styles.viewStyle}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ImageBackground style ={styles.backgroundImage} source={image} >
                <Text style = {styles.signupLinkText}>
                    Change Username
                </Text>
                <Text style = {styles.logoText}>
                    Old Username: {this.props.user.username}
                </Text>
                <Text style = {styles.textStyle}></Text>
                <TextInput
                    placeholderTextColor = 'white'
                    style= {styles.input}
                    placeholder="New Username"
                    value={this.state.newUsername}
                    onChangeText={text => { this.setState({newUsername: text}) }}
                />
                <Text style = {styles.textStyle}> </Text>
                <Button onPress={this.save} title="Save"/>
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
        changeUsername: (name) => {
            dispatch({
                type: "CHANGE_USERNAME",
                payload: name,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUsernamePage);
