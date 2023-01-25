const initialState = {
    product: [],
    products: {},
};

const POPULATE_PROD_DATA = "product/POPULATE_PROD_DATA";
const POPULATE_ALL_PROD_DATA = "product/POPULATE_ALL_PROD_DATA";
const ADD_PROD_DATA = "product/ADD_PROD_DATA";
const EDIT_PROD_DATA = "product/EDIT_PROD_DATA";
const DELETE_PROD_DATA = "product/DELETE_PROD_DATA";
const CLEAR_PROD_DATA = "product/CLEAR_PROD_DATA";

// ACTION CREATORS
export const populateProductData = productId => {
    return {
        type: POPULATE_PROD_DATA,
        payload: productId,
    };
};

export const allProductData = allProducts => {
    return {
        type: POPULATE_ALL_PROD_DATA,
        payload: allProducts,
    };
};

export const addProduct = product => {
    return {
        type: ADD_PROD_DATA,
        payload: product,
    };
};

export const editProduct = product => {
    return {
        type: EDIT_PROD_DATA,
        payload: product,
    };
};
export const deleteProduct = productId => {
    return {
        type: DELETE_PROD_DATA,
        payload: productId,
    };
};

export const clearProduct = () => {
    return {
        type: CLEAR_PROD_DATA,
    };
};

// THUNKS

export const createProductThunk = product => async dispatch => {
    const request = await fetch("/api/products/new", {
        method: "POST",
        headers: { "Content-Type:": "application/json" },
        body: JSON.stringify({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            brand: product.brand,
            image: product.image,
            count: product.count,
        }),
    });
    const response = await request.json();

    dispatch(addProduct(response));
};

export const editProductThunk = product => async dispatch => {
    const request = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            brand: product.brand,
            image: product.image,
            count: product.count,
        }),
    });
    const response = await request.json();

    dispatch(editProduct(response));
};

export const deleteProductThunk = productId => async dispatch => {
    await fetch(`/api/products/${productId}`, {
        method: "DELETE",
    });
    dispatch(deleteProduct(productId));
};

export const getAllProductThunk = () => async dispatch => {
    const request = await fetch("/api/products/all", {
        method: "GET",
    });
    if (request.ok) {
        const data = await request.json();

        dispatch(allProductData(data));
    }
};
export const getProductThunk = prodId => async dispatch => {
    const request = await fetch(`/api/products/${prodId}`, {
        method: "GET",
    });
    if (request.ok) {
        const data = await request.json();

        dispatch(populateProductData(data));
    }
};

// REDUCER

const productReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case POPULATE_PROD_DATA: {
            currentState.product = action.payload;
            return currentState;
        }

        case POPULATE_ALL_PROD_DATA: {
            let productsArr = action.payload.products.reduce((acc, product) => {
                acc[product.id] = product;
                return acc;
            }, {});
            currentState.products = { ...productsArr };

            return currentState;
        }

        case ADD_PROD_DATA: {
            currentState.product.push(action.payload);
            return currentState;
        }

        case EDIT_PROD_DATA: {
            currentState.product.forEach((el, i) => {
                if (el.id === action.payload.id)
                    currentState.product[i] = action.payload;
            });
            return currentState;
        }

        case DELETE_PROD_DATA: {
            const productCopy = [...currentState.product];

            for (let i = 0; i < productCopy.length; i++) {
                productCopy.splice(i, 1);
                currentState.product = productCopy;
                return currentState;
            }
        }

        case CLEAR_PROD_DATA: {
            return initialState;
        }

        default:
            return currentState;
    }
};

export default productReducer;
