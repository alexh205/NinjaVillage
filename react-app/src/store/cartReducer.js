const initialState = {};

export const addItem = item => {
    return {
        type: "ADD_ITEM",
        payload: item,
    };
};

//! REDUCER

const cartReducer = (state = initialState, action) => {
    const currentState = { ...state };

    return currentState;
};

export default cartReducer;
