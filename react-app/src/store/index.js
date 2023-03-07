import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './sessionReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import wishListReducer from './wishListReducer';

// Global store
const rootReducer = combineReducers({
    session: sessionReducer,
    productStore: productReducer,
    cartStore: cartReducer,
    listStore: wishListReducer,
});

// export const cartTotal = (state) => state.session.activeCart.cartProducts.reduce((total, item) => total + item.price, 0)

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = preloadedState => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
