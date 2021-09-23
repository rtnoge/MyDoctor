import { createStore } from "redux";

const initState = {
    loading: false,
};

const reducer = (state = initState, action) => {
    if (action.type === 'SET_LOADING') {
        return {
            ...state,
            loading: action.value,
        }
    }
    return state;
};

const store = createStore(reducer);

export default store;