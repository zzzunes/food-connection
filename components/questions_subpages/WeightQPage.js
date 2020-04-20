import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));
const {width,height} = Dimensions.get("window");

class WeightQPage extends Component {
    constructor() {
        super();
        this.state = {
            newWeight: "",
            isLoading: false,
        };
    }

    save = () => {
        this.setState({ isLoading: true });
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.weight = this.state.newWeight;
        fetch('http://192.168.1.10:5000/users/update', {
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
                });
                this.props.changeWeight(this.state.newWeight);
                this.props.navigation.navigate("Signup Load Page");
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
                <View style={styles.viewStyle}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ImageBackground style ={styles.backgroundImage} source={image} >
                <Text style={styles.signupLinkText}>
                    Set Weight
                </Text>
                <TextInput
                    placeholderTextColor = 'white'
                    style={styles.input}
                    placeholder="Weight"
                    value={this.state.newWeight}
                    keyboardType = 'numeric'
                    onChangeText={text => { this.setState({ newWeight: text }) }}
                />
                <Button onPress={this.save} title="Save" />
            </ImageBackground>
            </View>
        )
    }
}



const mapStateToProps = (state) => {
    const { user, foods } = state
    return { user, foods }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeWeight: (weight) => {
            dispatch({
                type: "CHANGE_WEIGHT",
                payload: weight,
            });
        },
        setFoods: (foods) => {
            dispatch({
                type: "SET_FOODS",
                payload: foods,
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeightQPage);
