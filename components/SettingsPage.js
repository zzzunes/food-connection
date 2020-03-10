import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { connect } from 'react-redux';

class SettingsPage extends React.Component {
    render() {
        return (
            <View style={styles.viewStyle}>
                <Text style = {styles.textStyle}>{JSON.stringify(this.props.user)}</Text>
            </View>
        );
    }
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
        color: "white",
    },
});

const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(SettingsPage);
