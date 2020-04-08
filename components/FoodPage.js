import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import HealthScoreCalculator from '../tools/HealthScoreCalculator';
const {width,height} = Dimensions.get("window");
const image = {uri: "https://www.flavorofindia.com/wp-content/uploads/2014/07/photodune-6761938-food-background-on-dark-slate-m1-1024x1024.jpg"}

class FoodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    setHealthScores = () => {
        const foods = JSON.parse(JSON.stringify(this.props.foods.list));
        HealthScoreCalculator.setHealthScore(foods, this.props.user.diet);
        this.props.setFoods(foods);
    }

    save = () => {
        this.setState({ isLoading: true });
        fetch('http://192.168.1.10:5000/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.props.user
            }),
        }).then(res => res.json()).then(json => {
            Alert.alert("Notification received: ", json.message);
            this.setState({
                isLoading: false,
            });
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

        return (
            <View style={styles.container}>
                <Text style={{width:'100%', paddingTop:40,paddingBottom:15,backgroundColor:'lightgreen',justifyContent:'center',fontSize:20,textAlign:'center'}}>Additional Info </Text>

                <ImageBackground style= {styles.backgroundImage} source= {image}>
                <View style={styles.textContainer}>
                    <Text style={styles.restaurantStyle}>
                        {this.props.global.selectedFood.restaurant.name} - {this.props.global.selectedFood.restaurant.location}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        {this.props.global.selectedFood.name} - ${this.props.global.selectedFood.price}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        Health Score: {this.props.global.selectedFood.healthScore}
                    </Text>
                    <Text style={styles.textStyle}>
                        Calories: {this.props.global.selectedFood.calories}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        Fat: {this.props.global.selectedFood.fat}g
                    </Text>
                    <Text style={styles.textStyle}>
                        Carbs: {this.props.global.selectedFood.carbs}g
                    </Text>
                    <Text style={styles.textStyle}>
                        Protein: {this.props.global.selectedFood.protein}g
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        Fiber: {this.props.global.selectedFood.fiber}g
                    </Text>
                    <Text style={styles.textStyle}>
                        Added Sugars: {this.props.global.selectedFood.addedSugar ? "Yes" : "No"}
                    </Text>
                </View>
                <View style={styles.button}>
                    <Button  onPress={() => {
                        this.props.logFood({ food: this.props.global.selectedFood, time: Date.now() });
                        this.setHealthScores();
                        this.save();
                    }} title="Log Food as Consumed" />
                </View>
                <View style={styles.button}>
                    <Button  onPress={() =>
                        Linking.openURL(`https://maps.google.com/?q=` + this.props.global.selectedFood.restaurant.location)
                    } title="Click here to Navigate" />
                </View>
            </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#AA6688',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    buttonContainer1: {
        marginTop: 60,
        width: 380,
    },
    buttonContainer2: {
        marginTop: 20,
        width: 380,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        padding: 10,
        color: "green",
        fontSize: 20,
        fontWeight: "bold",
    },
    navigateStyle: {
        marginTop: 40,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    restaurantStyle: {
        marginBottom: 40,
        padding: 10,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        alignContent:'center',
        justifyContent:'center'
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
      Healthscore: {
          fontSize:15,
          lineHeight:40,
          width:130,
          alignContent: "space-between",
          
          fontWeight: 'bold',
          color: "white",
          marginLeft:30
      },
      row: {
          paddingVertical:25,
          paddingHorizontal:15,
          borderBottomWidth: 1,
          borderBottomColor: 'white'
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
      logo: {
          width :200,
          height: 200,
      },
      logoText: {
          color:'lightgreen',
          fontSize: 20,
          fontWeight: '500',
          marginTop: 10,
      },
      icon: {
        height: 20,
        width: 20,
      },
      logoContainer: {
          alignItems: 'center',
      },
      input: {
        width: width - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "rgba(0,0,0,.5)",
        marginHorizontal: 25,
        marginTop: 20,
        paddingLeft: 45,
        color: "rgba(255,255,255,0.7)",
      },
      button: {
        width: width - 55,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        paddingLeft: 4,
        marginHorizontal: 25,
      },
      buttonText: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 20,
        
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
    const { user, global, foods } = state;
    return { user, global, foods };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logFood: (food) => {
            dispatch({
                type: "ADD_FOOD_TO_HISTORY",
                payload: food,
            });
        },
        setFoods: (foods) => {
            dispatch({
                type: "SET_FOODS",
                payload: foods,
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodPage);
