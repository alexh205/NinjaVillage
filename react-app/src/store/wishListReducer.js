const initialState = {
    id: null,
    name: null,
    addedItems: [],
};

const SET_ACTIVE_LIST = "list/SET_ACTIVE_LIST";
const ADD_TO_LIST = "list/ADD_ITEM";
const REMOVE_ITEM = "list/REMOVE_ITEM";
const SAVE_LIST = "list/AVE_LIST";

//? ACTION CREATORS

// set active list
export const setActiveList = list => {
    return {
        type: SET_ACTIVE_LIST,
        payload: list,
    };
};

// add product to List
export const addToList = prod => {
    return {
        type: ADD_TO_LIST,
        payload: prod,
    };
};

// remove product from List
export const removeItem = prod => {
    return {
        type: REMOVE_ITEM,
        payload: prod,
    };
};

// save list
export const saveList = List => {
    return {
        type: SAVE_LIST,
        payload: List,
    };
};

//? THUNK

const createListThunk = () => async dispatch => {
    const request = await fetch("/api/shopping_carts/new", {
        method: "POST",
        headers: { "Content-Type:": "application/json" },
    });
    const response = await request.json();

    dispatch(setActiveList(response));
};

const saveListThunk = cartId => async dispatch => {
    await fetch(`/api/shopping_carts/update/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    });

    dispatch(saveList());
};

// REDUCER

const wishListReducer = (state = initialState, action) => {
    const currentState = { ...state };
    switch (action.type) {
        case SET_ACTIVE_LIST: {
            return {
                ...currentState,
                id: action.payload[0].id,
                name: action.payload[0].name,
            };
        }

        case ADD_TO_LIST: {
            let addedItem;
            let existed_item = currentState.addedItems.find(
                item => action.payload.id === item.id
            );
            if (!existed_item) {
                addedItem = action.payload;
            }
            if (existed_item) {
                return {
                    ...currentState,
                };
            } else {
                return {
                    ...currentState,
                    addedItems: [...currentState.addedItems, addedItem],
                };
            }
        }

        case REMOVE_ITEM: {
            let new_items = currentState.addedItems.filter(
                item => action.payload.id !== item.id
            );

            return {
                ...currentState,
                addedItems: new_items,
            };
        }

        default:
            return currentState;
    }
};

export default wishListReducer;
