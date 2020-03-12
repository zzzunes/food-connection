import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

/* Components */
import SearchPage from './components/SearchPage';
import ProfilePage from './components/ProfilePage';
import DataPage from './components/DataPage';
import SettingsPage from './components/SettingsPage';
import FoodPage from './components/FoodPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import OpeningPage from './components/OpeningPage';

/* Reducers */
import user from './reducers/UserReducer';
import food from './reducers/FoodReducer';

enableScreens();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const store = createStore(combineReducers({user, food}));

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Search"
            drawerStyle={{ backgroundColor: '#664466', width: 250 }}
            edgeWidth={125}
            drawerContentOptions = {{labelStyle: {color: "white"}}}>
            <Drawer.Screen name = "Search"      component = {SearchPage}    />
            <Drawer.Screen name = "Profile"     component = {ProfilePage}   />
            <Drawer.Screen name = "Data"        component = {DataPage}      />
            <Drawer.Screen name = "Settings"    component = {SettingsPage}  />
        </Drawer.Navigator>
    );
}

export default class App extends React.Component {
    render() {
        console.log(store.getState());
        return (
            <Provider store = {store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName = "Opening Page" screenOptions = {{headerTransparent: true, headerTitle: null}}>
                        <Stack.Screen name = "Drawer"       component = {DrawerNavigator}/>
                        <Stack.Screen name = "Food Page"    component = {FoodPage}/>
                        <Stack.Screen name = "Login Page"   component = {LoginPage}/>
                        <Stack.Screen name = "Signup Page"  component = {SignupPage}/>
                        <Stack.Screen name = "Opening Page" component = {OpeningPage}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}
