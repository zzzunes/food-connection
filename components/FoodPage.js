import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import Constants from 'expo-constants';

export default function FoodPage({ route, navigation }) {
    const food = route.params.params.food;
    console.log(JSON.stringify(food));
    var address = `https://maps.google.com/?q=` + food.restaurant.location;
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>
                Food name: {food.name}{"\n"}
                Food score: {food.score}{"\n"}
            </Text>
            <Text style={styles.textStyle} onPress = {() => Linking.openURL(address)}>
                Click here to Navigate!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: 'black',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        padding: 10,
        color: "white"
    },
});
