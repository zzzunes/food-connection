import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

/* Components */
import SearchPage from './components/SearchPage';
import ProfilePage from './components/ProfilePage';
import DataPage from './components/DataPage';
import SettingsPage from './components/SettingsPage';
import FoodPage from './components/FoodPage';
import { StackView } from '@react-navigation/stack';

enableScreens();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Search" drawerStyle={{ backgroundColor: 'orange', width: 250 }} edgeWidth={125}>
            <Drawer.Screen name="Search" component={SearchPage} />
            <Drawer.Screen name="Profile" component={ProfilePage} />
            <Drawer.Screen name="Data" component={DataPage} />
            <Drawer.Screen name="Settings" component={SettingsPage} />
        </Drawer.Navigator>
    );
}

export default class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions = {{headerTransparent: true, headerTitle: null}}>
                    <Stack.Screen name = "Drawer" component = {DrawerNavigator}/>
                    <Stack.Screen name = "Food Page" component = {FoodPage}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
