import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import Constants from 'expo-constants';

export default function FoodPage({ route, navigation }) {
    const food = route.params.params.food;
    console.log(JSON.stringify(food));
    var address = `https://maps.google.com/?q=` + food.restaurant.location;
    return (
        <View style={styles.mainView}>
            <View style={styles.textContainer}>
                <Text style={styles.restaurantStyle}>
                    {food.restaurant.name} - {food.restaurant.location}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>
                    {food.name}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>
                    Calories: {food.calories}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>
                    Fat: {food.fat}g
                </Text>
                <Text style={styles.textStyle}>
                    Carbs: {food.carbs}g
                </Text>
                <Text style={styles.textStyle}>
                    Protein: {food.protein}g
                </Text>
            </View>
            <View style = {styles.buttonContainer1}>
                <Button color = "#CC5CFF" onPress={() => {}} title="Log Food as Consumed"/>
            </View>
            <View style={styles.buttonContainer2}>
                <Button color = "#11CC33" onPress={() => Linking.openURL(address)} title="Click here to Navigate"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#664466',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    buttonContainer1: {
        marginTop: 60,
        width: 380,
    },
    buttonContainer2: {
        marginTop: 20,
        width: 380,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        padding: 10,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    navigateStyle: {
        marginTop: 40,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    restaurantStyle: {
        marginBottom: 40,
        padding: 10,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});
