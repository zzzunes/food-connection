import React, { Component } from 'react';
import { AppRegistry,Picker, StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));
const {width,height} = Dimensions.get("window");

class ChangeRacePage extends Component {
    constructor() {
        super();
        this.state = {
            newRace: "White",
            isLoading: false,
        };
    }

    save = () => {
        if (this.state.newRace === this.props.user.race) return;
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.race = this.state.newRace;
        fetch('http://192.168.1.204:5000/users/update', {
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
                this.props.changeRace(this.state.newRace);
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
                    Change Race
                </Text>
                <Text style = {styles.logoText}>
                    Current Race: {this.props.user.race}
                </Text>
                <Text style = {styles.textStyle}></Text>
                <Picker
                    itemStyle = {{color:'white'}}
                    selectedValue={this.state.newRace}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ newRace: itemValue })
                    }
                    prompt = "New Race">
                    <Picker.Item label="White" value="White" />
                    <Picker.Item label="Black" value="Black" />
                    <Picker.Item label="Asian" value="Asian" />
                    <Picker.Item label="American Native" value="Native American" />
                    <Picker.Item label="Hawaiian Native" value="Native Hawaiian" />
                    <Picker.Item label="Other" value="Other" />
                    <Picker.Item label="Two or More Races" value="Multiracial" />
                </Picker>
                <Text style={styles.textStyle}> </Text>
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
        changeRace: (race) => {
            dispatch({
                type: "CHANGE_RACE",
                payload: race,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeRacePage);
