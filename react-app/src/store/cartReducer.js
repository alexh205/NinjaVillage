const initialState = {
    items: [],
    addedItems: [],
    total: 0,
};

// ACTION CREATORS
// *************** Cart ****************************
const SET_ACTIVE_CART = "cart/SET_ACTIVE_CART";
const ADD_TO_CART = "cart/ADD_ITEM";
const REMOVE_ITEM = "cart/REMOVE_ITEM";
const CART_CHECKOUT = "cart/CART_CHECKOUT";

// THUNK

// *************** Cart ****************************

const createCartThunk = () => async dispatch => {
    const request = await fetch("/api/shopping_carts/new", {
        method: "POST",
        headers: { "Content-Type:": "application/json" },
    });
    const response = await request.json();

    dispatch(setActiveCart(response));
};

const addCartItemThunk = (item, cartId) => async dispatch => {
    const request = await fetch(`/api/shopping_carts/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item }),
    });
    const response = await request.json();

    dispatch(addItem(response));
};

const removeCartItemThunk = (productId, cartId) => async dispatch => {
    const request = await fetch(`/api/shopping_carts/remove/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
    });
    const response = await request.json();

    dispatch(removeItem(response));
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
            currentState.activeCart = { ...action.payload[0] };

            return currentState;
        }

        // NON-CART ACTIONS
        case ADD_TO_CART: {
            let addedItem = currentState.items.find(
                item => item.id === action.id
            );

            let existed_item = currentState.addedItems.find(
                item => action.id === item.id
            );
            if (existed_item) {
                addedItem.quantity += 1;
                return {
                    ...currentState,
                    total: currentState.total + addedItem.price,
                };
            } else {
                addedItem.quantity = 1;

                let newTotal = currentState.total + addedItem.price;

                return {
                    ...state,
                    addedItems: [...currentState.addedItems, addedItem],
                    total: newTotal,
                };
            }
        }

        case REMOVE_ITEM: {
            let itemToRemove = currentState.addedItems.find(
                item => action.id === item.id
            );
            let new_items = currentState.addedItems.filter(
                item => action.id !== item.id
            );

            let newTotal =
                currentState.total - itemToRemove.price * itemToRemove.quantity;
            console.log(itemToRemove);
            return {
                ...currentState,
                addedItems: new_items,
                total: newTotal,
            };
        }

        //CART ACTION
        case ADD_QUANTITY: {
            let addedItem = currentState.items.find(
                item => item.id === action.id
            );
            addedItem.quantity += 1;
            let newTotal = currentState.total + addedItem.price;
            return {
                ...currentState,
                total: newTotal,
            };
        }
        case REMOVE_QUANTITY: {
            let addedItem = currentState.items.find(
                item => item.id === action.id
            );

            if (addedItem.quantity === 1) {
                let new_items = currentState.addedItems.filter(
                    item => item.id !== action.id
                );
                let newTotal = currentState.total - addedItem.price;
                return {
                    ...currentState,
                    addedItems: new_items,
                    total: newTotal,
                };
            } else {
                addedItem.quantity -= 1;
                let newTotal = currentState.total - addedItem.price;
                return {
                    ...currentState,
                    total: newTotal,
                };
            }
        }
        default:
            return currentState;
    }
};

export default cartReducer;
