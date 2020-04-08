import React, { Component } from 'react';
import { AppRegistry,Picker,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
const image = {uri: "https://www.flavorofindia.com/wp-content/uploads/2014/07/photodune-6761938-food-background-on-dark-slate-m1-1024x1024.jpg"}
const {width,height} = Dimensions.get("window");

class ALQPage extends Component {
    constructor() {
        super();
        this.state = {
            newAL: "Sedentary",
            isLoading: false,
            updateSuccess: false,
        };
    }

    save = () => {
        this.setState({ isLoading: true });
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.activityLevel = this.state.newAL;
        fetch('http://192.168.1.10:5000/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: newUser
            }),
        }).then(res => res.json()).then(json => {
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                    updateSuccess: true,
                });
                this.props.changeActivityLevel(this.state.newAL);
            }
            else {
                Alert.alert("Warning: ", json.message);
                this.setState({
                    isLoading: false,
                });
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.viewStyle}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        if (this.state.updateSuccess) {
            this.props.navigation.navigate("Gender Question Page");
        }

        return (
            <View style={styles.container}>
                <ImageBackground style ={styles.backgroundImage} source={image} >
                <Text style={styles.signupLinkText}>
                    Set Activity Level
                </Text>

                <Picker
                     itemStyle = {{color:'white'}}
                    selectedValue={this.state.newAL}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ newAL: itemValue })
                    }
                    prompt = "New Activity Level">
                    <Picker.Item label="Sedentary" value="Sedentary" />
                    <Picker.Item label="Low Active" value="Low" />
                    <Picker.Item label="Active" value="Medium" />
                    <Picker.Item label="Very Active" value="High" />
                </Picker>
                <Button onPress={this.save} style = {styles.button} title="Save" />
            </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:"center",
    },
    markWrap: {
      flex: 1,
      paddingVertical: 30,
    },
    mark: {
      width: null,
      height: null,
      flex: 1,
    },
    background: {
      width,
      height,
    },
    wrapper: {
      marginTop: 10,
      
    },
    inputWrap: {
      flexDirection: "row",
      marginVertical: 5,
      height: 40,
      borderBottomWidth: 1,
      borderRadius: 25,
      paddingLeft: 25,
      backgroundColor: "rgba(0,0,0,0.35)",
    },
    iconWrap: {
      paddingHorizontal: 7,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      height: 20,
      width: 20,
    },
    input: {
      width: width - 55,
      height: 45,
      borderRadius: 25,
      fontSize: 16,
      backgroundColor: "rgba(0,0,0,.2)",
      marginHorizontal: 25,
      paddingLeft: 45,
      color: "white",
    },
    button: {
      width: width - 55,
      height: 45,
      borderRadius: 25,
      backgroundColor: "lightgreen",
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      paddingLeft: 4,
      marginHorizontal: 25,
    },
    buttonText: {
      color: "rgba(255,255,255,0.7)",
      fontSize: 10,
      textAlign: 'center',
      
    },
    forgotPasswordText: {
      color: "#D8D8D8",
      backgroundColor: "transparent",
      textAlign: "right",
      paddingRight: 15,
    },
    signupWrap: {
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    accountText: {
      color: "#D8D8D8"
    },
    signupLinkText: {
      fontWeight:'bold',
      color: "white",
      textAlign: 'center',
      fontSize: 40,
      paddingVertical: 0,
      marginBottom: 10,
      
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: "center",
     //alignItems: "center",
      //opacity: 0.7,
  },
  align: {
      marginBottom: 40,
  },
  });

const mapStateToProps = (state) => {
    const { user } = state
    return { user }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeActivityLevel: (AL) => {
            dispatch({
                type: "CHANGE_ACTIVITY_LEVEL",
                payload: AL,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ALQPage);
