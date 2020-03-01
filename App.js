import React from 'react';
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
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import OpeningPage from './components/OpeningPage';

enableScreens();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Search" drawerStyle={{ backgroundColor: '#444444', width: 250 }} edgeWidth={125}>
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
                <Stack.Navigator initialRouteName="Opening Page" screenOptions = {{headerTransparent: true, headerTitle: null}}>
                    <Stack.Screen name = "Drawer" component = {DrawerNavigator}/>
                    <Stack.Screen name = "Food Page" component = {FoodPage}/>
                    <Stack.Screen name = "Login Page" component = {LoginPage}/>
                    <Stack.Screen name = "Signup Page" component = {SignupPage}/>
                    <Stack.Screen name = "Opening Page" component = {OpeningPage}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
