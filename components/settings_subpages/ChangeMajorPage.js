import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

class ChangeMajorPage extends Component {
    constructor() {
        super();
        this.state = {
            newMajor: "",
            isLoading: false,
        };
    }

    save = () => {
        this.state.newMajor = this.state.newMajor.trim();
        if (this.state.newMajor === this.props.user.major) return;
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.major = this.state.newMajor;
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
                this.props.changeMajor(this.state.newMajor);
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
                    Change Major
                </Text>
                <Text style = {styles.textStyle}>
                    Current Major: {this.props.user.major}
                </Text>
                <Text style = {styles.textStyle}></Text>
                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="New Major"
                    value={this.state.newMajor}
                    onChangeText={text => { this.setState({newMajor: text}) }}
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
        changeMajor: (major) => {
            dispatch({
                type: "CHANGE_MAJOR",
                payload: major,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMajorPage);
