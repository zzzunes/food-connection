import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';

export default class ProfilePage extends Component {
    render() {
        return (
            <View style = {styles.viewStyle}>
                <Text>Profile Page</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewStyle: {
      flex: 1,
      backgroundColor: 'green',
      marginTop: Constants.statusBarHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      padding: 10,
    },
});
