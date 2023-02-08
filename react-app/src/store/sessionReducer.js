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
export const setUser = user => {
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
export const cartCheckout = () => {
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

export const editUserThunk = (username, email, name, streetAddress, city, state, zipCode, profileImg, password, userId) => async dispatch => {
    const request = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
            name,
            street_address: streetAddress,
            city,
            state,
            zip_code: zipCode,
            profile_img: profileImg,
        }),
    });

    if (request.ok) {
        const data = await request.json();
        dispatch(setUser(data));
    }
};
export const deleteUserThunk = userId => async dispatch => {
    const request = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
}); dispatch(removeUser());}

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

export const removeCartItemThunk = (productId, cartId) => async dispatch => {
    const request = await fetch(`/api/shopping_carts/remove/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({productId})
    });
    const response = await request.json();

    dispatch(removeItem(response));
};

export const cartCheckoutThunk = cartId => async dispatch => {
    await fetch(`/api/shopping_carts/update/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    });

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
            const addProd = [...currentState.activeCart.cartProducts]
            for (let i=0; i < addProd.length; i++) {

                console.log(action.payload)
                if(addProd[i].id === action.payload.id){
                   addProd[i].quantity += 1
                   currentState.activeCart.cartProducts = addProd
                    return currentState
                }
                // if(addProd[i].id !== action.payload.id){
                //     addProd.push(action.payload)
                //     currentState.activeCart.cartProducts = addProd
                //     return currentState
                // }

            }

            return currentState;
        }

        case REMOVE_ITEM: {
            const removedProd = [...currentState.activeCart.cartProducts]
           for (let i = 0; i< removedProd.length; i++) {
            if (removedProd[i].id === action.payload.id && removedProd[i].quantity > 0) {
                removedProd[i].quantity = removedProd[i].quantity -1
                currentState.activeCart.cartProducts = removedProd
                return currentState
            } if(removedProd[i].id === action.payload.id && removedProd[i].quantity === 0){
                removedProd.splice(i, 1)
                currentState.activeCart.cartProducts = removedProd
                return currentState
            }
        }
            return currentState;
        }



        case CART_CHECKOUT: {
            currentState.activeCart.checkedOut = true;
            currentState.activeCart = {}
            return currentState
        }

        default:
            return currentState;
    }
};

export default sessionReducer;
