import { SET_USER, REMOVE_USER } from "../types";

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const removeUser = () => ({
    type: REMOVE_USER,
});

const initialState = {
    user: null,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default user;
