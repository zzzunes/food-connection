import { combineReducers } from "redux";

const INITIAL_USER_STATE = {
    name: "",
    username: "",
    email: "",
    age: 0,
    weight: 0,
    height: 0,
    activityLevel: "lol",
    race: "",
    major: "",
    dataCollection: false,
    signUpDate: Date.now(),
}

const INITIAL_FOOD_STATE = {

}

const userReducer = (state = INITIAL_USER_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            state = action.payload;
            break;
        /* case 'CHANGE_NAME':
            state = {
                ...state,
                name: action.payload,
            };
            break; */
        default:
            break;
    }
    return state;
}

const foodReducer = (state = INITIAL_FOOD_STATE, action) => {
    switch (action.type) {
        default:
            break;
    }
    return state;
}

export default combineReducers({
    user: userReducer,
    food: foodReducer,
});
