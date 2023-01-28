const initialState = {
    user: null,
    activeCart: {},
};

// *************** User ****************************
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
// *************** Cart ****************************
const SET_ACTIVE_CART = "cart/SET_ACTIVE_CART";
const ADD_ITEM = "cart/ADD_ITEM";
const REMOVE_ITEM = "cart/REMOVE_ITEM";
const CART_CHECKOUT = "cart/CART_CHECKOUT";

// ACTION CREATORS
// *************** User ****************************
const setUser = user => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

// *************** Cart ****************************

export const setActiveCart = cart => {
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
// *************** User ****************************
export const authenticate = () => async dispatch => {
    const request = await fetch("/api/auth/", {
        headers: { "Content-Type": "application/json" },
    });

    if (request.ok) {
        const data = await request.json();

        if (data.errors) return;

        dispatch(setUser(data));
    }
};

export const login = (email, password) => async dispatch => {
    const request = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (request.ok) {
        const data = await request.json();

        dispatch(setUser(data));

        return null;
    } else if (request.status < 500) {
        const data = await request.json();

        if (data.errors) return data.errors;
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const logout = () => async dispatch => {
    const request = await fetch("/api/auth/logout", {
        headers: { "Content-Type": "application/json" },
    });

    if (request.ok) dispatch(removeUser());
};

export const signUp = (username, name, email, streetAddress, city, state,zipCode, password,  profileImage) => async dispatch => {
    const request = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            name,
            email,
            street_address: streetAddress,
            city,
            state,
            zip_code: zipCode,
            password,
            profile_img: profileImage,
        }),
    });

    if (request.ok) {
        const data = await request.json();

        dispatch(setUser(data));

        return null;
    } else if (request.status < 500) {
        const data = await request.json();

        if (data.errors) return data.errors;
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const getUserThunk = userId => async dispatch => {
    const request = await fetch(`/api/users/${userId}`, {
        method: "GET",
    });

    const response = await request.json();

    dispatch(setUser(response));
};

export const editUserThunk = user => async dispatch => {
    const request = await fetch(`/api/users/${user.userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_img: user.profile_img,
            user_name: user.username,
        }),
    });

    if (request.ok) {
        const data = await request.json();
        dispatch(setUser(data));
    }
};

// *************** Cart ****************************

export const createCartThunk = () => async dispatch => {
    const request = await fetch("/api/shopping_carts/new", {
        method: "POST",
        headers: { "Content-Type:": "application/json" },
    });
    const response = await request.json();

    dispatch(setActiveCart(response));
};

export const addCartItemThunk = (item, cartId) => async dispatch => {
    const request = await fetch(`/api/shopping_carts/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({item}),
    });
    const response = await request.json();

    dispatch(addItem(response));
};

export const removeCartItemThunk = (cartId, itemId) => async dispatch => {
    const request = await fetch(`/api/shopping_carts/${cartId}/${itemId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    const response = await request.json();

    dispatch(removeItem(response));
};

export const cartCheckoutThunk = cartId => async dispatch => {
    await fetch(`/api/shopping_carts/update/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    });
    // const response = await request.json();

    dispatch(cartCheckout());
};


// REDUCER


const sessionReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case SET_USER: {
            currentState.user = action.payload;

            return currentState;
        }

        case REMOVE_USER:
            return initialState;

        case SET_ACTIVE_CART: {
            currentState.activeCart = {...action.payload[0]};

            return currentState;
        }

        case ADD_ITEM: {
            let cartArr = Object.keys(action.payload.cartProducts).reduce((acc, products) => {
                return acc.concat(action.payload.cartProducts[products])
            }, [])
            currentState.activeCart.cartProducts = {...cartArr}
            return currentState;
        }

        case REMOVE_ITEM: {
            currentState.activeCart.cartProducts = action.payload.cartProducts;
            return currentState;
        }
        case CART_CHECKOUT: {
            return currentState.activeCart = {};
        }

        default:
            return currentState;
    }
};

export default sessionReducer;
