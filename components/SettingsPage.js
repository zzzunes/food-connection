import React from 'react';
import { StyleSheet,Dimensions, Text, View, Button, Settings, Image,ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import SettingsList from 'react-native-settings-list';
import styles from './frontendstyle';

const {width,height} = Dimensions.get("window");
const image = (require('../assets/background.jpg'));

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

/*  Made using example found here: https://github.com/evetstech/react-native-settings-list/blob/master/Example/example.js 
    Icons come from Google Material and https://www.iconfinder.com, filtered by "free" and "No link back" type of license. */

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    convertHeight = (heightInInches) => {
        var height = Number(heightInInches);
        var feet = ~~(height / 12);
        var inches = height % 12;
        return feet.toString() + " ft. " + inches.toString() + " in."
    }

    render() {
        return (
            <View style={styles.viewStyle2}>
                <ImageBackground style= {styles.background} source= {image}>
                <View style = {styles.headerStyle2}>
                    <Text style = {styles.textTitle2}>Settings</Text>
                </View>
                <SettingsList borderColor = "#C8C7CC" defaultItemSize = {50}>
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
                        onPress = {() => this.props.navigation.navigate("Change Email Page")}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {cake}/>}
                        title = {`Age: ` + this.props.user.age}
                        titleInfo = "Change Age"
                        onPress = {() => this.props.navigation.navigate("Change Age Page")}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {ruler}/>}
                        title = {`Height: ` + this.convertHeight(this.props.user.height)}
                        titleInfo = "Change Height"
                        onPress = {() => this.props.navigation.navigate("Change Height Page")}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {scale}/>}
                        title = {`Weight: ` + this.props.user.weight + ` lbs.`}
                        titleInfo = "Change Weight"
                        onPress = {() => this.props.navigation.navigate("Change Weight Page")}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {dumbell}/>}
                        title = {`Activity Level: ` + this.props.user.activityLevel}
                        titleInfo = "Change Activity Level"
                        onPress = {() => this.props.navigation.navigate("Change AL Page")}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {school}/>}
                        title = {`Major: ` + this.props.user.major}
                        titleInfo = "Change Major"
                        onPress = {() => this.props.navigation.navigate("Change Major Page")}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {gender}/>}
                        title = {`Gender: ` + this.props.user.gender}
                        titleInfo = "Change Gender"
                        onPress = {() => this.props.navigation.navigate("Change Gender Page")}
                    />
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {globe}/>}
                        title = {`Race: ` + this.props.user.race}
                        titleInfo = "Change Race"
                        onPress = {() => this.props.navigation.navigate("Change Race Page")}
                    />
                    <SettingsList.Header/>
                    <SettingsList.Item 
                        icon = {<Image style = {styles.imageStyle} source = {time}/>}
                        title = {`Account created: \n` + dateFormat(Date.parse(this.props.user.signUpDate), "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                        hasNavArrow = {false}
                    />
                </SettingsList>
                </ImageBackground>
            </View>
        );
    }
}



const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(SettingsPage);
