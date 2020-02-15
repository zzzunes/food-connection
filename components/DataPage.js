import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';

export default function DataPage({navigation}) {
    return (
        <View style = {styles.viewStyle}>
            <Text>Data Page</Text>
        </View>
    );
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
