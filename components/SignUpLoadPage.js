import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Constants from 'expo-constants';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import HealthScoreCalculator from '../tools/HealthScoreCalculator';
import styles from './frontendstyle';

/* This is the last page in the sign up process, so please call calculations for health score and other adjustments here. */

var diet = {};

class SignUpLoadPage extends Component {
    constructor(props) {
        super(props);
    }

    determineDietPlan = () => {
        diet = HealthScoreCalculator.createDiet(this.props.user);
        this.props.changeDiet(diet);
        console.log("Diet calculated: " + JSON.stringify(diet));
    }

    setHealthScores = () => {
        const foods = JSON.parse(JSON.stringify(this.props.foods.list));
        HealthScoreCalculator.setHealthScore(foods, diet);
        this.props.setFoods(foods);
    }

    save = () => {
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.diet = diet;
        fetch('http://192.168.1.204:5000/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: newUser
            }),
        }).then(res => res.json()).then(json => {
            if (json.result == 1) {
                this.props.navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Drawer',
                        },
                    ],
                }));
            }
            else {
                Alert.alert("Warning: ", json.message);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.determineDietPlan();
        this.setHealthScores();
        this.save();
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <Text>Loading...</Text>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    const { user, foods } = state
    return { user, foods }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFoods: (foods) => {
            dispatch({
                type: "SET_FOODS",
                payload: foods,
            });
        },
        changeDiet: (diet) => {
            dispatch({
                type: "CHANGE_DIET",
                payload: diet,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpLoadPage);
