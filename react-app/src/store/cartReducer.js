const initialState = {
    activeCart: {},
};

const SET_ACTIVE_CART = "cart/SET_ACTIVE_CART";
const ADD_ITEM = "cart/ADD_ITEM";
const REMOVE_ITEM = "cart/REMOVE_ITEM";
const CART_CHECKOUT = "cart/CART_CHECKOUT";

// ACTION CREATORS

const setActiveCart = cart => {
    return {
        type: SET_ACTIVE_CART,
        payload: cart,
    };
};

const addItem = items => {
    return {
        type: ADD_ITEM,
        payload: items,
    };
};
const removeItem = item => {
    return {
        type: REMOVE_ITEM,
        payload: item,
    };
};
const cartCheckout = () => {
    return {
        type: CART_CHECKOUT,
    };
};

// THUNKS

export const createCartThunk = () => async dispatch => {
    const request = await fetch("/api/shopping_carts/new", {
        method: "POST",
        headers: { "Content-Type:": "application/json" },
    });
    const response = await request.json();

    dispatch(setActiveCart(response));
};

export const addCartItemThunk = (product, cartId) => async dispatch => {
    const request = await fetch(`/api/shopping_carts/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type:": "application/json" },
        body: JSON.stringify({
            product
        }),
    });
    const response = await request.json();

    dispatch(addItem(response));
};

export const removeCartItemThunk = (cartId, itemId) => async dispatch => {
    const request = await fetch(`/api/shopping_carts/${cartId}/${itemId}`, {
        method: "DELETE",
        headers: { "Content-Type:": "application/json" },
    });
    const response = await request.json();

    dispatch(removeItem(response));
};

export const cartCheckoutThunk = cartId => async dispatch => {
    const request = await fetch(`/api/shopping_carts/update/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type:": "application/json" },
    });
    // const response = await request.json();

    dispatch(cartCheckout());
};

// REDUCER

const cartReducer = (state = initialState, action) => {
    const currentState = { ...state };
    switch (action.type) {
        case SET_ACTIVE_CART: {
            currentState.activeCart = action.payload;

            return currentState;
        }

        case ADD_ITEM: {
            currentState.activeCart = action.payload;
            return currentState;
        }

        case REMOVE_ITEM: {
            currentState.activeCart = action.payload;
            return currentState;
        }
        case CART_CHECKOUT: {
            return initialState;
        }

        default:
            return currentState;
    }
};

export default cartReducer;
