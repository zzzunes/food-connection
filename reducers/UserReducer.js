const INITIAL_USER_STATE = {
    username: "",
    email: "",
    age: 0,
    weight: 0,
    height: 0,
    activityLevel: "lol",
    race: "",
    major: "",
    signUpDate: Date.now(),
}

const userReducer = (state = INITIAL_USER_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            state = action.payload;
            break;
        case 'CHANGE_USERNAME':
            state = {
                ...state,
                username: action.payload,
            };
            break;
        case 'CHANGE_AGE':
            state = {
                ...state,
                age: action.payload,
            };
            break;
        case 'CHANGE_EMAIL':
            state = {
                ...state,
                email: action.payload,
            };
            break;
        case 'CHANGE_WEIGHT':
            state = {
                ...state,
                weight: action.payload,
            };
            break;
        case 'CHANGE_HEIGHT':
            state = {
                ...state,
                height: action.payload,
            };
            break;
        case 'CHANGE_ACTIVITY_LEVEL':
            state = {
                ...state,
                activityLevel: action.payload,
            };
            break;
        case 'CHANGE_RACE':
            state = {
                ...state,
                race: action.payload,
            };
            break;
        case 'CHANGE_MAJOR':
            state = {
                ...state,
                major: action.payload,
            };
            break;
        case 'CHANGE_GENDER':
            state = {
                ...state,
                gender: action.payload,
            };
            break;
        default:
            break;
    }
    return state;
}

export default userReducer;
