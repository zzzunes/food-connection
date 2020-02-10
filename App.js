import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';

/* Components */
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
                <Drawer.Navigator initialRouteName = "Search" drawerStyle = {{ backgroundColor: '#d6cbff', width: 250 }} edgeWidth = {80}>
                    <Drawer.Screen name = "Search"      component = {SearchPage}/>
                    <Drawer.Screen name = "Profile"     component = {ProfilePage}/>
                    <Drawer.Screen name = "Data"        component = {DataPage}/>
                    <Drawer.Screen name = "Settings"    component = {SettingsPage}/>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}
