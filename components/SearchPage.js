import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <SearchBar
                    round
                    searchIcon = {{ size: 20 }}
                    onChangeText={(text) => this.setState({text})}
                    placeholder = "Search for a food..."
                    value = {this.state.text}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
      flex: 1,
      backgroundColor: 'white',
      marginTop: 24
    },
    textStyle: {
      padding: 10,
    },
});
