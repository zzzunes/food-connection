import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { connect } from 'react-redux';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            foods: this.props.foods.list,
        };
    }

    searchList = () => {
        const newFoods = [];
        const allFoods = this.props.foods.list;
        var searchText = this.state.text.toLowerCase().trim();
        allFoods.forEach((item) => {
            var itemName = item.name.toLowerCase();
            if (itemName.indexOf(searchText) !== -1) {
                newFoods.push(item);
            }
        });
        this.setState({foods: newFoods});
    }

    FoodItem = ({ food }) => {
        return (
            <View style = {styles.foodItem}>
                <TouchableHighlight onPress = {() => {
                        this.props.selectFood(food);
                        this.props.navigation.navigate("Food Page");
                    }}>
                    <Text style = {styles.foodName}>{food.healthScore} - {food.name}</Text>
                </TouchableHighlight>
                <Text style = {styles.foodName}>{food.restaurant.name}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <SearchBar
                    round
                    searchIcon = {{ size: 20 }}
                    onChangeText={(text) => {
                        this.setState({text: text});
                        this.searchList();
                    }}
                    placeholder = "Search for a food..."
                    value = {this.state.text}
                    onKeyPress = {({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace') this.searchList();
                    }}
                />
                <FlatList
                    data = { this.state.foods }
                    renderItem = {({ item }) => <this.FoodItem food = {item}/>}
                    keyExtractor = {item => item._id }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    foodItem: {
        backgroundColor: '#AA22AA',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 30,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    foodName: {
        fontSize: 20,
        color: "white",
    },
    viewStyle: {
      flex: 1,
      backgroundColor: '#AA6688',
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

const mapDispatchToProps = (dispatch) => {
    return {
        selectFood: (food) => {
            dispatch({
                type: "SELECT_FOOD",
                payload: food,
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
