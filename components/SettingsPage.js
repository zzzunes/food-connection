import React from 'react';
import { StyleSheet, Text, View, Button, Settings, Image } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import SettingsList from 'react-native-settings-list';

const dateFormat = require('dateformat');

const user = require('../assets/user.png');
const email = require('../assets/email.png');
const scale = require('../assets/scale.png');
const dumbell = require('../assets/dumbell.png');
const school = require('../assets/school.png');
const time = require('../assets/time.png');
const gender = require('../assets/gender.png');
const globe = require('../assets/globe.png');
const ruler = require('../assets/ruler.png');
const cake = require('../assets/cake.png');

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
                        icon = {<Image style = {styles.imageStyle} source = {user}/>}
                        title = {this.props.user.username}
                        titleInfo = "Change Username"
                        onPress = {() => this.props.navigation.navigate("Change Username Page")}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {email}/>}
                        title = {this.props.user.email}
                        titleInfo = "Change Email"
                        //onPress = {() => route}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {cake}/>}
                        title = {`Age: ` + this.props.user.age}
                        titleInfo = "Change Age"
                        //onPress = {() => route}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {ruler}/>}
                        title = {`Height: ` + this.props.user.height}
                        titleInfo = "Change Height"
                        //onPress = {() => route}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {scale}/>}
                        title = {`Weight: ` + this.props.user.weight}
                        titleInfo = "Change Weight"
                        //onPress = {() => route}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {dumbell}/>}
                        title = {`Activity Level: ` + this.props.user.activityLevel}
                        titleInfo = "Change Major"
                        //onPress = {() => route}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {school}/>}
                        title = {`Major: ` + this.props.user.major}
                        titleInfo = "Change Major"
                        //onPress = {() => route}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {gender}/>}
                        title = {`Gender: ` + this.props.user.gender}
                        titleInfo = "Change Gender"
                        //onPress = {() => route}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {globe}/>}
                        title = {`Race: ` + this.props.user.race}
                        titleInfo = "Change Race"
                        //onPress = {() => route}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {time}/>}
                        title = {`Account created: \n` + dateFormat(Date.parse(this.props.user.signUpDate), "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                        hasNavArrow = {false}
                    />
                </SettingsList>
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
        width:30,
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
