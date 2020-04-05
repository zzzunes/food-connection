import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
const {width,height} = Dimensions.get("window");
const image = {uri: "https://www.flavorofindia.com/wp-content/uploads/2014/07/photodune-6761938-food-background-on-dark-slate-m1-1024x1024.jpg"}

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            foods: this.props.foods.list,
        };
    }

    searchList = () => {
        const newFoods = [];
        const allFoods = this.props.foods.list;
        var searchText = this.state.text.toLowerCase().trim();
        allFoods.forEach((item) => {
            var itemName = item.name.toLowerCase();
            if (itemName.indexOf(searchText) !== -1) {
                newFoods.push(item);
            }
        });
        this.setState({foods: newFoods});
    }

    FoodItem = ({ food }) => {
        return (
            <TouchableHighlight activeOpacity = {1.0} underlayColor = "#DDAADD" onPress = {() => {
                this.props.selectFood(food);
                this.props.navigation.navigate("Food Page");
            }}>
                <View style = {styles.foodItem}>
                    <Text style = {styles.foodName}>{food.healthScore} - {food.name}</Text>
                    <Text style = {styles.foodName}>{food.restaurant.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style= {styles.backgroundImage} source= {image}>
                <View style = {styles.align}>
                <SearchBar
                    round
                    searchIcon = {{ size: 20}}
                    onChangeText={(text) => {
                        this.setState({text: text});
                        this.searchList();
                    }}
                    placeholder = "Search for a food..."
                    value = {this.state.text}
                    onKeyPress = {({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace') this.searchList();
                    }}
                
                />
                </View>
                <FlatList
                    data = { this.state.foods }
                    renderItem = {({ item }) => <this.FoodItem food = {item}/>}
                    keyExtractor = {item => item._id }
                />
                <Button color="#CC5CFF" onPress={() =>
                        this.setState({ foods: this.props.foods.list })
                } title="Reload Health Scores" />
            </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    foodItem: {
        flex:1,
        paddingHorizontal:15,
        paddingVertical:25,
        flexDirection: 'row',
        justifyContent:'space-between',
        borderBottomColor:'white',
        borderBottomWidth:1,
    },
    foodName: {
        fontSize: 20,
        color: "white",
    },
    viewStyle: {
      flex: 1,
      backgroundColor: '#AA6688',
      
    },
    textStyle: {
      padding: 10,
      color: "white",
    },
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
        backgroundColor: "rgba(153,255,153,.6)",
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
        marginTop:35

    },
});

const mapStateToProps = (state) => {
    const { user, foods } = state;
    return { user, foods };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectFood: (food) => {
            dispatch({
                type: "SELECT_FOOD",
                payload: food,
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
