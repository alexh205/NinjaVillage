const initialState = {
    id: null,
    addedItems: [],
    total: 0,
    checkedOut: null,
    ownerId: null
};

const SET_ACTIVE_CART = "cart/SET_ACTIVE_CART";
const ADD_TO_CART = "cart/ADD_ITEM";
const REMOVE_ITEM = "cart/REMOVE_ITEM";
const SET_CART_CHECKOUT = "cart/SET_CART_CHECKOUT"

//? ACTION CREATORS

// set active cart
export const setActiveCart = cart => {
    return {
        type: SET_ACTIVE_CART,
        payload: cart,
    };
};

export const setCartCheckOut = cart => {
    return {
        type: SET_CART_CHECKOUT,
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

//? THUNK

export const createCartThunk = () => async dispatch => {
    const request = await fetch("/api/shopping_carts/new", {
        method: "POST",
        headers: { "Content-Type:": "application/json" },
    });
    const response = await request.json();

    dispatch(setActiveCart(response));
};

export const cartCheckoutThunk = cartObj => async dispatch => {

    const request = await fetch(`/api/shopping_carts/${cartObj.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: cartObj.id,
            total: cartObj.total,
            checkedOut: cartObj.checkedOut,
            orderPlaced: new Date(),
            products: cartObj.products,
        }),
    });
    const response = await request.json();

    dispatch(setCartCheckOut(response));
};

//? REDUCER

const cartReducer = (state = initialState, action) => {
    const currentState = { ...state };
    switch (action.type) {
        case SET_ACTIVE_CART: {
            return {
                ...initialState,
                id: action.payload[0].id,
                checkedOut: action.payload[0].checkedOut,
            };
        }

        case SET_CART_CHECKOUT: {

            return {
                ...initialState,
                id: action.payload.id,
                checkedOut: action.payload.checkedOut,
            };
        }
        case ADD_TO_CART: {
            let addedItem;
            let existed_item = currentState.addedItems.find(
                item => action.payload.id === item.id
            );
            if (!existed_item) {
                addedItem = action.payload;
            }
            if (existed_item) {
                existed_item.quantity += 1;
                return {
                    ...currentState,
                    total: currentState.total + existed_item.price,
                };
            } else {
                addedItem.quantity = 1;

                let newTotal = currentState.total + addedItem.price;

                return {
                    ...currentState,
                    addedItems: [...currentState.addedItems, addedItem],
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
                if (currentState.total > itemToRemove.price) {
                    let newTotal = currentState.total - itemToRemove.price;
                    return {
                        ...currentState,
                        addedItems: new_items,
                        total: newTotal,
                    };
                } else {
                    return {
                        ...currentState,
                        addedItems: new_items,
                        total: 0,
                    };
                }
            }
        }

        default:
            return currentState;
    }
};

export default cartReducer;
