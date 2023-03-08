const initialState = {
    id: null,
    addedItems: [],
    total: 0,
    checkedOut: null,
    ownerId: null,
};

const SET_ACTIVE_CART = 'cart/SET_ACTIVE_CART';
const SET_CART_USER = 'cart/SET_CART_USER';
const ADD_TO_CART = 'cart/ADD_ITEM';
const REMOVE_ITEM = 'cart/REMOVE_ITEM';
const SET_CART_CHECKOUT = 'cart/SET_CART_CHECKOUT';

//? ACTION CREATORS

// set active cart
export const setActiveCart = cart => {
    return {
        type: SET_ACTIVE_CART,
        payload: cart,
    };
};
export const setUserId = (userId, cartObj) => {
    return {
        type: SET_CART_USER,
        user: userId,
        cart: cartObj,
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
    const request = await fetch('/api/shopping_carts/new', {
        method: 'POST',
        headers: { 'Content-Type:': 'application/json' },
    });
    const response = await request.json();

    dispatch(setActiveCart(response));
};

export const cartCheckoutThunk = cartObj => async dispatch => {
    const request = await fetch(`/api/shopping_carts/${cartObj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: cartObj.id,
            total: cartObj.total,
            checkedOut: cartObj.checkedOut,
            orderPlaced: new Date(),
            products: cartObj.products,
            estimated_delivery: cartObj.estimated_delivery,
        }),
    });
    const response = await request.json();

    dispatch(setCartCheckOut(response));
};

//? REDUCER

const cartReducer = (state = initialState, action) => {
    const currentState = { ...state };
    switch (action.type) {
        case SET_CART_USER:
            const savedUserId = localStorage.getItem('userId');
            const cart = JSON.parse(localStorage.getItem('cart'));

            if (Number(savedUserId) !== action.user || !cart) {
                localStorage.removeItem('cart');
                localStorage.setItem('userId', JSON.stringify(action.user));

                return {
                    ...initialState,
                    ownerId: action.user,
                    id: action.cart[0].id,
                    checkedOut: action.cart[0].checkedOut,
                };
            }
            return { ...cart };

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
                const cartObj = {
                    ...currentState,
                    total: currentState.total + existed_item.price,
                };
                localStorage.setItem('cart', JSON.stringify(cartObj));
                return cartObj;
            } else {
                addedItem.quantity = 1;

                let newTotal = currentState.total + addedItem.price;
                const cartObj = {
                    ...currentState,
                    addedItems: [...currentState.addedItems, addedItem],
                    total: newTotal,
                };
                localStorage.setItem('cart', JSON.stringify(cartObj));

                return cartObj;
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

                const cartObj = {
                    ...currentState,
                    total: newTotal,
                };
                localStorage.setItem('cart', JSON.stringify(cartObj));

                return cartObj;
            }
            if (itemToRemove.quantity === 1) {
                let newTotal = currentState.total - itemToRemove.price;
                const cartObj = {
                    ...currentState,
                    addedItems: new_items,
                    total: newTotal >= 1 ? newTotal : 0,
                };
                localStorage.setItem('cart', JSON.stringify(cartObj));

                return cartObj;
            }
        }

        default:
            return currentState;
    }
};

export default cartReducer;
