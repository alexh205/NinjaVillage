const initialState = {
    userLists: null,
};

const SET_USER_LISTS = "list/SET_USER_LISTS";
const ADD_TO_LIST = "list/ADD_ITEM";
const NEW_LIST = "list/NEW_LIST";
const REMOVE_LIST = "list/REMOVE_LIST";

//? ACTION CREATORS

// set active list
const setActiveUserLists = lists => {
    return {
        type: SET_USER_LISTS,
        payload: lists,
    };
};

// add product to List
const addToList = list => {
    return {
        type: ADD_TO_LIST,
        payload: list,
    };
};



// new list
const newList = list => {
    return {
        type: NEW_LIST,
        payload: list,
    };
};

// delete list
const removeList = listId => {
    return {
        type: REMOVE_LIST,
        payload: listId,
    };
};

//? THUNK

export const createListThunk = listName => async dispatch => {
    const request = await fetch("/api/wish_lists/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: listName,
        }),
    });
    const response = await request.json();
    dispatch(newList(response));
};

export const getAllUserListsThunk = userId => async dispatch => {
    const request = await fetch(`/api/wish_lists/all/${userId}`, {
        method: "GET",
    });
    const response = await request.json();

    dispatch(setActiveUserLists(response));
};

export const removeItemFromListThunk =
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

export const removeWishListThunk = listId => async dispatch => {
    const request = await fetch(`/api/wish_lists/${listId}`, {
        method: "DELETE",
    });
    if (request.ok) {
        dispatch(removeList(listId));
    }
};

//! REDUCER

const wishListReducer = (state = initialState, action) => {
    const currentState = { ...state };
    switch (action.type) {
        case SET_USER_LISTS: {
            currentState.userLists = [...Object.values(action.payload)[0]];
            return currentState;
        }

        case NEW_LIST: {
            let newListCopy = [...currentState.userLists];
            newListCopy.push(action.payload);
            currentState.userLists = [...newListCopy];
            return currentState;
        }
        case ADD_TO_LIST: {
            let copyNewList = [...currentState.userLists];
            for (let i = 0; i < copyNewList.length; i++) {
                if (copyNewList[i].id === action.payload.id) {
                    copyNewList[i] = { ...action.payload };
                }
            }
            currentState.userLists = [...copyNewList];
            return currentState;
        }

        case REMOVE_LIST: {
            let copyNewList = [...currentState.userLists];

            for (let i = 0; i < copyNewList.length; i++) {
                if (copyNewList[i].id === action.payload) {
                    copyNewList.splice(i, 1);
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
