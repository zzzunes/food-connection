import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';

import SearchPage from './components/SearchPage';
import ProfilePage from './components/ProfilePage';
import DataPage from './components/DataPage';
import SettingsPage from './components/SettingsPage';

const Drawer = createDrawerNavigator();
enableScreens();

export default class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName = "Search">
                    <Drawer.Screen name = "Search" component = {SearchPage}/>
                    <Drawer.Screen name = "Profile" component = {ProfilePage}/>
                    <Drawer.Screen name = "Data" component = {DataPage}/>
                    <Drawer.Screen name = "Settings" component = {SettingsPage}/>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
