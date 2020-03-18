import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

class SignupPage extends Component {
    constructor() {
        super();
        this.state = {
            signUpError: '',
            username: '',
            email: '',
            password: '',
            isLoading: false,
            signUpSuccess: false,
            isLoadingFoods: false,
            foodPrepared: false,
        };
    }

    mapFoodsToState = (foods) => {
        const allFoods = {};
        foods.forEach(food => {
            allFoods[food._id] = food;
        });
        this.props.setFoodMap(allFoods);
    }

    getFoods = () => {
        this.setState({isLoadingFoods: true});
        fetch('http://192.168.1.116:5000/foods', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(json => {
            this.setState({isLoadingFoods: false});
            if (json.result == 1) {
                this.setState({
                    foodPrepared: true,
                });
                this.mapFoodsToState(json.foods);
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        });
    }

    onSignUp = () => {
        this.setState({isLoading: true});
        fetch('http://192.168.1.116:5000/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }),
        }).then(res => res.json()).then(json => {
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                    signUpSuccess: true,
                });
                this.props.setUser(json.user);
                this.getFoods();
            }
            else {
                Alert.alert("Warning: ", json.message);
                this.setState({
                    signUpError: json.message,
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
        if (this.state.isLoadingFoods) {
            return (
                <View style={styles.viewStyle}>
                    <Text>Loading Foods...</Text>
                </View>
            );
        }
        if (this.state.signUpSuccess && this.state.foodPrepared) {
            this.props.navigation.navigate("Age Question Page");
        }
        return (
            <View style={styles.viewStyle}>
                <Text style = {styles.textStyleTitle}>
                    Sign Up
                </Text>
                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="Username"
                    value={this.state.username}
                    onChangeText={text => { this.setState({username: text}) }}
                />
                <Text style = {styles.textStyle}> </Text>
                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={text => { this.setState({email: text}) }}
                />
                <Text style = {styles.textStyle}> </Text>
                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={text => { this.setState({password: text}) }}
                />
                <Text style = {styles.textStyle}> </Text>
                <Button onPress={this.onSignUp} title="Sign Up"/>
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
        setUser: (user) => {
            dispatch({
                type: "SET_USER",
                payload: user,
            });
        },
        setFoodMap: (foodMap) => {
            dispatch({
                type: "SET_FOOD_MAP",
                payload: foodMap,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
