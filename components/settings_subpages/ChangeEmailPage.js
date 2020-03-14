import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

class ChangeEmailPage extends Component {
    constructor() {
        super();
        this.state = {
            newEmail: "",
            isLoading: false,
        };
    }

    save = () => {
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.email = this.state.newEmail;
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
                this.props.changeEmail(this.state.newEmail);
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
            <View style={styles.viewStyle}>
                <Text style = {styles.textStyleTitle}>
                    Change Email
                </Text>
                <Text style = {styles.textStyle}>
                    Current Email: {this.props.user.email}
                </Text>
                <Text style = {styles.textStyle}></Text>
                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="New Email"
                    value={this.state.newEmail}
                    onChangeText={text => { this.setState({newEmail: text}) }}
                />
                <Text style = {styles.textStyle}> </Text>
                <Button onPress={this.save} title="Save"/>
            </View>
        )
    }  
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        padding: 20,
    },
    textStyle: {
        color: "black",
        fontSize: 20,
        marginBottom: 0,
        justifyContent: 'center',
    },
    textStyleTitle: {
        color: "black",
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30,
    },
});

const mapStateToProps = (state) => {
    const { user } = state
    return { user }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeEmail: (email) => {
            dispatch({
                type: "CHANGE_EMAIL",
                payload: email,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmailPage);
