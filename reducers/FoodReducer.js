const INITIAL_FOOD_STATE = { }

const foodReducer = (state = INITIAL_FOOD_STATE, action) => {
    switch (action.type) {
        case 'SET_FOOD_MAP':
            state = action.payload;
            break;
        default:
            break;
    }
    return state;
}

export default foodReducer;
