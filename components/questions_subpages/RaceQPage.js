import React, { Component } from 'react';
import { AppRegistry,Picker, StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));

class RaceQPage extends Component {
    constructor() {
        super();
        this.state = {
            newRace: "White",
            isLoading: false,
            updateSuccess: false,
        };
    }

    save = () => {
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.race = this.state.newRace;
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
                this.props.changeRace(this.state.newRace);
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
            this.props.navigation.navigate("Weight Question Page");
        }

        return (
            <View style={styles.container}>
                <ImageBackground style ={styles.backgroundImage} source={image} >
                <Text style = {styles.signupLinkText}>
                    Set Race
                </Text>
                <Picker
                    itemStyle = {{color:"white"}}
                    selectedValue={this.state.newRace}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ newRace: itemValue })
                    }
                    prompt = "Set Race">
                    <Picker.Item label="White" value="White" />
                    <Picker.Item label="Black" value="Black" />
                    <Picker.Item label="Asian" value="Asian" />
                    <Picker.Item label="American Native" value="Native American" />
                    <Picker.Item label="Hawaiian Native" value="Native Hawaiian" />
                    <Picker.Item label="Other" value="Other" />
                    <Picker.Item label="Two or More Races" value="Multiracial" />
                </Picker>
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
        changeRace: (race) => {
            dispatch({
                type: "CHANGE_RACE",
                payload: race,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceQPage);
