import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { setProvidesAudioData } from 'expo/build/AR';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    FoodItem = ({ food }) => {
        return (
            <View style = {styles.foodItem}>
                <TouchableHighlight onPress = {() => 
                    this.props.navigation.navigate("Food Page", {
                        params: { food: food }
                    })}>
                    <Text style = {styles.foodName}>{food.name}</Text>
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
                    data = { Object.values(this.props.foods) }
                    renderItem = {({ item }) => <this.FoodItem food = {item}/>}
                    keyExtractor = {item => item._id }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    foodItem: {
        backgroundColor: '#967496',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 30,
    },
    foodName: {
        fontSize: 22,
        color: "white",
    },
    viewStyle: {
      flex: 1,
      backgroundColor: '#664466',
      marginTop: Constants.statusBarHeight
    },
    textStyle: {
      padding: 10,
      color: "white",
    },
});

const mapStateToProps = (state) => {
    const { user, foods } = state;
    return { user, foods };
};

export default connect(mapStateToProps)(SearchPage);
