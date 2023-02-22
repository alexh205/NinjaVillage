const initialState = {
    userLists: null,
};

const SET_USER_LISTS = "list/SET_USER_LISTS";
const ADD_TO_LIST = "list/ADD_ITEM";
const REMOVE_ITEM = "list/REMOVE_ITEM";
const SAVE_LIST = "list/AVE_LIST";

//? ACTION CREATORS

// set active list
const setActiveUserLists = lists => {
    return {
        type: SET_USER_LISTS,
        payload: lists,
    };
};

// add product to List
const addToList = prod => {
    return {
        type: ADD_TO_LIST,
        payload: prod,
    };
};

// remove product from List
const removeItem = prod => {
    return {
        type: REMOVE_ITEM,
        payload: prod,
    };
};

// save list
const saveList = List => {
    return {
        type: SAVE_LIST,
        payload: List,
    };
};

//? THUNK

export const createListThunk = listName => async dispatch => {
    await fetch("/api/wish_lists/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: listName,
        }),
    });
};

export const getAllUserListsThunk = user => async dispatch => {
    const request = await fetch(`/api/wish_lists/all/${user}`, {
        method: "GET",
    });
    const response = await request.json();

    dispatch(setActiveUserLists(response));
};

export const deleteWishListThunk = listId => async dispatch => {
    await fetch(`/api/wish_lists/${listId}`, {
        method: "DELETE",
    });
};

export const addProductToListThunk = (listId, productId) => async dispatch => {
    const request = await fetch(`/api/wish_lists/${listId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            productId,
        }),
    });
    const response = await request.json();
    dispatch(addToList(response));
};
export const removeProductFromListThunk =
    (listId, productId) => async dispatch => {
        const request = await fetch(`/api/wish_lists/remove/${listId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId,
            }),
        });
        const response = await request.json();
        dispatch(addToList(response));
    };

//! REDUCER

const wishListReducer = (state = initialState, action) => {
    const currentState = { ...state };
    switch (action.type) {
        case SET_USER_LISTS: {
            currentState.userLists = [...Object.values(action.payload)[0]];
            return currentState;
        }
        case ADD_TO_LIST: {
            let copyNewList = currentState.userLists;
            for (let i = 0; i < copyNewList.length; i++) {
                if (copyNewList[i].id === action.payload.id) {
                    copyNewList[i] = { ...action.payload };
                }
            }
            currentState.userLists = [...copyNewList];
            return currentState;
        }

        default:
            return currentState;
    }
};

export default wishListReducer;
