import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));

class MajorQPage extends Component {
    constructor() {
        super();
        this.state = {
            newMajor: "",
            isLoading: false,
            updateSuccess: false,
        };
    }

    save = () => {
        this.state.newMajor = this.state.newMajor.trim();
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.major = this.state.newMajor;
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
                this.props.changeMajor(this.state.newMajor);
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
            this.props.navigation.navigate("Race Question Page");
        }

        return (
            <View style={styles.container}>
                <ImageBackground style ={styles.backgroundImage} source={image} >
                <Text style = {styles.signupLinkText}>
                    Set Major
                </Text>
                <TextInput
                    placeholderTextColor = 'white'
                    style = {styles.input}
                    placeholder="Major"
                    value={this.state.newMajor}
                    onChangeText={text => { this.setState({newMajor: text}) }}
                />
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
        changeMajor: (major) => {
            dispatch({
                type: "CHANGE_MAJOR",
                payload: major,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MajorQPage);
