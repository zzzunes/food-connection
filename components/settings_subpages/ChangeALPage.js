import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Picker } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

class ChangeALPage extends Component {
    constructor() {
        super();
        this.state = {
            newAL: "Sedentary",
            isLoading: false,
        };
    }

    save = () => {
        if (this.state.newAL === this.props.user.activityLevel) return;
        this.setState({ isLoading: true });
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.activityLevel = this.state.newAL;
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
                this.props.changeActivityLevel(this.state.newAL);
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
        console.log(this.props.user);
        if (this.state.isLoading) {
            return (
                <View style={styles.viewStyle}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={styles.viewStyle}>
                <Text style={styles.textStyleTitle}>
                    Change Activity Level
                </Text>
                <Text style={styles.textStyle}>
                    Current Activity Level: {this.props.user.activityLevel}
                </Text>
                <Text style={styles.textStyle}></Text>
                <Picker
                    selectedValue={this.state.newAL}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ newAL: itemValue })
                    }
                    prompt = "New Activity Level">
                    <Picker.Item label="Sedentary" value="Sedentary" />
                    <Picker.Item label="Active" value="Active" />
                </Picker>
                <Text style={styles.textStyle}> </Text>
                <Button onPress={this.save} title="Save" />
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
        changeActivityLevel: (AL) => {
            dispatch({
                type: "CHANGE_ACTIVITY_LEVEL",
                payload: AL,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeALPage);
