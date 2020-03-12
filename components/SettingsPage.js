import React from 'react';
import { StyleSheet, Text, View, Button, Settings, Image } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import SettingsList from 'react-native-settings-list';

const porygon = require('../assets/porygondigital.jpeg');

/* Made using example found here: https://github.com/evetstech/react-native-settings-list/blob/master/Example/example.js */

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <View style = {styles.headerStyle}>
                    <Text style = {styles.textTitle}>Settings</Text>
                </View>
                <SettingsList borderColor = "#C8C7CC" defaultItemSize = {50}>
                    <SettingsList.Header/>
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {porygon}/>}
                        title = {this.props.user.username}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {porygon}/>}
                        title = {"Change name"}
                        titleInfo = "Please change your name"
                        hasNavArrow = {true}
                        //onPress = {() => route}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {porygon}/>}
                        title = {"Change name"}
                        titleInfo = "Please change your name"
                        hasNavArrow = {true}
                        //onPress = {() => route}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {porygon}/>}
                        title = {"Data Permissions"}
                        titleInfo = "Opt in/out of data permission"
                        hasNavArrow = {false}
                        hasSwitch = {true}
                        switchState = {true}
                        switchOnValueChange = {() => {}}
                    />
                </SettingsList>
                <Text style = {styles.textStyle}>{JSON.stringify(this.props.user)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
    },
    textStyle: {
        color: "black",
    },
    headerStyle: {
        borderBottomWidth:1,
        backgroundColor:'#f7f7f8',
        borderColor:'#c8c7cc'
    },
    textTitle: {
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 16,
    },
    imageStyle:{
        marginLeft:15,
        alignSelf:'center',
        height:30,
        width:30
    },
});

const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
