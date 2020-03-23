import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Picker } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

class ALQPage extends Component {
    constructor() {
        super();
        this.state = {
            newAL: "Sedentary",
            isLoading: false,
            updateSuccess: false,
        };
    }

    save = () => {
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
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                    updateSuccess: true,
                });
                this.props.changeActivityLevel(this.state.newAL);
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
            this.props.navigation.navigate("Gender Question Page");
        }

        return (
            <View style={styles.viewStyle}>
                <Text style={styles.textStyleTitle}>
                    Set Activity Level
                </Text>
                <Text style={styles.textStyle}></Text>
                <Picker
                    selectedValue={this.state.newAL}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ newAL: itemValue })
                    }
                    prompt = "New Activity Level">
                    <Picker.Item label="Sedentary" value="Sedentary" />
                    <Picker.Item label="Low Active" value="Low" />
                    <Picker.Item label="Active" value="Medium" />
                    <Picker.Item label="Very Active" value="High" />
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
        backgroundColor: '#664466',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        padding: 20,
    },
    textStyle: {
        color: "white",
        fontSize: 20,
        marginBottom: 0,
        justifyContent: 'center',
    },
    textStyleTitle: {
        color: "white",
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

export default connect(mapStateToProps, mapDispatchToProps)(ALQPage);
