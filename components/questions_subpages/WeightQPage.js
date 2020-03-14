import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

class WeightQPage extends Component {
    constructor() {
        super();
        this.state = {
            newWeight: "",
            isLoading: false,
            updateSuccess: false,
        };
    }

    save = () => {
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.weight = this.state.newWeight;
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
                this.props.changeWeight(this.state.newWeight);
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
            this.props.navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Drawer',
                    },
                ],
            }));
        }

        return (
            <View style={styles.viewStyle}>
                <Text style = {styles.textStyleTitle}>
                    Set Weight
                </Text>
                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="Weight"
                    value={this.state.newWeight}
                    onChangeText={text => { this.setState({newWeight: text}) }}
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
        changeWeight: (weight) => {
            dispatch({
                type: "CHANGE_WEIGHT",
                payload: weight,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeightQPage);
