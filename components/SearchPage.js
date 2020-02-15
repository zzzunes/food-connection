import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

const dummyData = [
    {
        id: '0',
        name: "burrito",
        score: 10
    },
    {
        id: '1',
        name: "chocolate",
        score: 20
    },
    {
        id: '2',
        name: "beer",
        score: 99
    },
    {
        id: '3',
        name: "quesadilla",
        score: 10
    },
    {
        id: '4',
        name: "tofu block",
        score: 20
    },
    {
        id: '5',
        name: "rice",
        score: 99
    },
    {
        id: '6',
        name: "orange",
        score: 10
    },
    {
        id: '7',
        name: "tempura",
        score: 20
    },
    {
        id: '8',
        name: "soup",
        score: 99
    },
];

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: dummyData
        };
    }

    FoodItem = ({ food }) => {
        return (
            <View style = {styles.foodItem}>
                <TouchableHighlight onPress = {() => 
                    this.props.navigation.navigate("Food Page", {
                        params: { food: food }
                    })}>
                    <Text style = {styles.foodName}>{food.score + ` - ` + food.name}</Text>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <SearchBar
                    round
                    searchIcon = {{ size: 20 }}
                    onChangeText={(text) => this.setState({text: text})}
                    placeholder = "Search for a food..."
                    value = {this.state.text}
                />
                <FlatList
                    data = { this.state.data }
                    renderItem = {({ item }) => <this.FoodItem food = {item}/>}
                    keyExtractor = {item => item.id }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    foodItem: {
        backgroundColor: 'orange',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 30,
    },
    foodName: {
        fontSize: 22,
    },
    viewStyle: {
      flex: 1,
      backgroundColor: 'green',
      marginTop: Constants.statusBarHeight
    },
    textStyle: {
      padding: 10,
    },
});
