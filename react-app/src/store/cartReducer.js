const initialState = {
    id: null,
    items: [],
    addedItems: [],
    total: 0,
    checkedOut: null,
};

// *************** Cart ****************************
const SET_ACTIVE_CART = "cart/SET_ACTIVE_CART";
const ADD_TO_CART = "cart/ADD_ITEM";
const REMOVE_ITEM = "cart/REMOVE_ITEM";
const CART_CHECKOUT = "cart/CART_CHECKOUT";

//? ACTION CREATORS

// set active cart
export const setActiveCart = cart => {
    return {
        type: SET_ACTIVE_CART,
        payload: cart,
    };
};

// add product to cart
export const addToCart = prod => {
    return {
        type: ADD_TO_CART,
        payload: prod,
    };
};
// remove product from cart
export const removeItem = prod => {
    return {
        type: REMOVE_ITEM,
        payload: prod,
    };
};

// process cart for checkout
export const cartCheckout = cart => {
    return {
        type: CART_CHECKOUT,
        payload: cart,
    };
};

//? THUNK
// *************** Cart ****************************

const createCartThunk = () => async dispatch => {
    const request = await fetch("/api/shopping_carts/new", {
        method: "POST",
        headers: { "Content-Type:": "application/json" },
    });
    const response = await request.json();

    dispatch(setActiveCart(response));
};

const cartCheckoutThunk = cartId => async dispatch => {
    await fetch(`/api/shopping_carts/update/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    });

    dispatch(cartCheckout());
};

// REDUCER

const cartReducer = (state = initialState, action) => {
    const currentState = { ...state };
    switch (action.type) {
        case SET_ACTIVE_CART: {
            return {
                ...currentState,
                id: action.payload[0].id,
                checkedOut: action.payload[0].checkedOut,
            };
        }

        case ADD_TO_CART: {
            let new_item;
            let addedItem = currentState.items.find(
                item => item.id === action.payload.id
            );

            let existed_item = currentState.addedItems.find(
                item => action.payload.id === item.id
            );
            if (!addedItem && !existed_item) {
                new_item = action.payload;
            }
            if (existed_item) {
                existed_item.quantity += 1;
                return {
                    ...currentState,
                    total: currentState.total + existed_item.price,
                };
            } else if (addedItem) {
                addedItem.quantity = 1;

                let newTotal = currentState.total + addedItem.price;

                return {
                    ...state,
                    addedItems: [...currentState.addedItems, addedItem],
                    total: newTotal,
                };
            } else {
                new_item.quantity = 1;

                let newTotal = currentState.total + new_item.price;

                return {
                    ...state,
                    addedItems: [...currentState.addedItems, new_item],
                    total: newTotal,
                };
            }
        }

        case REMOVE_ITEM: {
            let itemToRemove = currentState.addedItems.find(
                item => action.payload.id === item.id
            );
            let new_items = currentState.addedItems.filter(
                item => action.payload.id !== item.id
            );

            if (itemToRemove.quantity > 1) {
                itemToRemove.quantity -= 1;
                let newTotal = currentState.total - itemToRemove.price;
                new_items.push(itemToRemove);
                return {
                    ...currentState,
                    total: newTotal,
                };
            } else {
                let newTotal = currentState.total - itemToRemove.price;
                return {
                    ...currentState,
                    addedItems: new_items,
                    total: newTotal,
                };
            }
        }

        default:
            return currentState;
    }
};

export default cartReducer;
