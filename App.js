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

/* Settings Screens */
import ChangeUsernamePage from './components/settings_subpages/ChangeUsernamePage';
import ChangeEmailPage from './components/settings_subpages/ChangeEmailPage';
import ChangeAgePage from './components/settings_subpages/ChangeAgePage';
import ChangeHeightPage from './components/settings_subpages/ChangeHeightPage';
import ChangeWeightPage from './components/settings_subpages/ChangeWeightPage';
import ChangeALPage from './components/settings_subpages/ChangeALPage';
import ChangeGenderPage from './components/settings_subpages/ChangeGenderPage';
import ChangeRacePage from './components/settings_subpages/ChangeRacePage';
import ChangeMajorPage from './components/settings_subpages/ChangeMajorPage';

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
                        <Stack.Screen name = "Change Username Page" component = {ChangeUsernamePage}/>
                        <Stack.Screen name = "Change Email Page"    component = {ChangeEmailPage}/>
                        <Stack.Screen name = "Change Age Page"      component = {ChangeAgePage}/>
                        <Stack.Screen name = "Change Height Page"   component = {ChangeHeightPage}/>
                        <Stack.Screen name = "Change Weight Page"   component = {ChangeWeightPage}/>
                        <Stack.Screen name = "Change AL Page"       component = {ChangeALPage}/>
                        <Stack.Screen name = "Change Major Page"    component = {ChangeMajorPage}/>
                        <Stack.Screen name = "Change Gender Page"   component = {ChangeGenderPage}/>
                        <Stack.Screen name = "Change Race Page"     component = {ChangeRacePage}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}
