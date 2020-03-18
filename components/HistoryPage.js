import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { connect } from 'react-redux';

class HistoryPage extends Component {
    constructor(props) {
        super(props);
    }

    FoodItem = ({ food }) => {
        return (
            <View style = {styles.foodItem}>
                <Text style = {styles.foodName}>{food.healthScore} - {food.name}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <FlatList
                    data = { this.props.user.foodHistory }
                    renderItem = {({ item }) => <this.FoodItem food = {item.food}/>}
                    keyExtractor = {item => item.time.toString() }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    foodItem: {
        backgroundColor: '#883355',
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

export default connect(mapStateToProps)(HistoryPage);
