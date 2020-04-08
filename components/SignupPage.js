import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
const {width,height} = Dimensions.get("window");
const image = {uri: "https://www.flavorofindia.com/wp-content/uploads/2014/07/photodune-6761938-food-background-on-dark-slate-m1-1024x1024.jpg"}
class SignupPage extends Component {
    constructor() {
        super();
        this.state = {
            signUpError: '',
            username: '',
            email: '',
            password: '',
            isLoading: false,
            signUpSuccess: false,
            isLoadingFoods: false,
            foodPrepared: false,
        };
    }

    getFoods = () => {
        this.setState({isLoadingFoods: true});
        fetch('http://192.168.1.10:5000/foods', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(json => {
            this.setState({isLoadingFoods: false});
            if (json.result == 1) {
                this.setState({
                    foodPrepared: true,
                });
                this.props.setFoods(json.foods);
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        });
    }

    onSignUp = () => {
        this.setState({isLoading: true});
        fetch('http://192.168.1.10:5000/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }),
        }).then(res => res.json()).then(json => {
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                    signUpSuccess: true,
                });
                this.props.setUser(json.user);
                this.getFoods();
            }
            else {
                Alert.alert("Warning: ", json.message);
                this.setState({
                    signUpError: json.message,
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
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }
        if (this.state.isLoadingFoods) {
            return (
                <View style={styles.container}>
                    <Text>Loading Foods...</Text>
                </View>
            );
        }
        if (this.state.signUpSuccess && this.state.foodPrepared) {
            this.props.navigation.navigate("Age Question Page");
        }
        return (
            <View style={styles.container}>
                <ImageBackground style ={styles.backgroundImage} source={image} >
                <View style = {styles.align}>
                <Text style = {styles.signupLinkText}>
                    Sign Up
                </Text>
                </View>
                <View style={styles.wrapper}>
                
                <TextInput
                    style={styles.input}
                    placeholderTextColor="white"
                    placeholder="Username"
                    value={this.state.username}
                    onChangeText={text => { this.setState({username: text}) }}
                />
                </View>
                <View style={styles.wrapper}>
                <TextInput
                    placeholderTextColor="white"
                    style={styles.input}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={text => { this.setState({email: text}) }}
                />
                </View>
                <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="white"
                    
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={text => { this.setState({password: text}) }}
                    secureTextEntry
                />
                </View>
                
                
                
                <View style ={styles.button}>
                    <Button onPress={this.onSignUp} title="Sign Up" style ={styles.button} fontSize = {20}/>
                </View>
                
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
        backgroundColor: "rgba(0,0,0,0.35)",
        marginHorizontal: 25,
        paddingLeft: 45,
        color: "white"
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
        color: "grey",
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
        setUser: (user) => {
            dispatch({
                type: "SET_USER",
                payload: user,
            });
        },
        setFoods: (foods) => {
            dispatch({
                type: "SET_FOODS",
                payload: foods,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
