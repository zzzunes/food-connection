import React, { Component } from 'react';
import { AppRegistry,Picker, StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from './frontendstyle';
const image = (require('../assets/background.jpg'));
const {width,height} = Dimensions.get("window");

class GenderQPage extends Component {
    constructor() {
        super();
        this.state = {
            newGender: "Female",
            isLoading: false,
            updateSuccess: false,
        };
    }

    save = () => {
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.gender = this.state.newGender;
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
                    updateSuccess: true,
                });
                this.props.changeGender(this.state.newGender);
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

        if (this.state.updateSuccess) {
            this.props.navigation.navigate("Height Question Page");
        }

        return (
            <View style={styles.container}>
                <ImageBackground style ={styles.backgroundImage} source={image} >
                <Text style = {styles.signupLinkText}>
                    Set Gender
                </Text>
                <Picker
                    itemStyle={{color:'white'}}
                    selectedValue={this.state.newGender}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ newGender: itemValue })
                    }
                    prompt = "New Gender">
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Non-Binary" value="Non-Binary" />
                    <Picker.Item label="Male" value="Male" />
                </Picker>
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
        changeGender: (gender) => {
            dispatch({
                type: "CHANGE_GENDER",
                payload: gender,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenderQPage);
