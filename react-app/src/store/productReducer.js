const initialState = {
    products: {},
    //! remove the nested products key
};

// ******************** Product *****************************
const POPULATE_PROD_DATA = 'product/POPULATE_PROD_DATA';
const POPULATE_ALL_PROD_DATA = 'product/POPULATE_ALL_PROD_DATA';
const ADD_PROD_DATA = 'product/ADD_PROD_DATA';
const EDIT_PROD_DATA = 'product/EDIT_PROD_DATA';
const DELETE_PROD_DATA = 'product/DELETE_PROD_DATA';
const CLEAR_PROD_DATA = 'product/CLEAR_PROD_DATA';

// // ******************** Review *****************************
// const ADD_REVIEW_DATA = "review/ADD_REVIEW_DATA";
// const EDIT_REVIEW_DATA = "review/EDIT_REVIEW_DATA";
// const DELETE_REVIEW_DATA = "review/DELETE_REVIEW_DATA";

// ACTION CREATORS

// ************** Product********************
const populateProductData = product => {
    return {
        type: POPULATE_PROD_DATA,
        payload: product,
    };
};

const allProductData = allProducts => {
    return {
        type: POPULATE_ALL_PROD_DATA,
        payload: allProducts,
    };
};

const addProduct = product => {
    return {
        type: ADD_PROD_DATA,
        payload: product,
    };
};

const editProduct = product => {
    return {
        type: EDIT_PROD_DATA,
        payload: product,
    };
};
const deleteProduct = productId => {
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

// // ************** Review ********************
// const addReview = review => {
//     return {
//         type: ADD_REVIEW_DATA,
//         payload: review,
//     };
// };

// const editReview = review => {
//     return {
//         type: EDIT_REVIEW_DATA,
//         payload: review,
//     };
// };
// const deleteReview = reviewId => {
//     return {
//         type: DELETE_REVIEW_DATA,
//         payload: reviewId,
//     };
// };

// THUNKS

// ************************* Product *****************************
export const createProductThunk =
    (title, price, description, category, brand, image) => async dispatch => {
        const request = await fetch('/api/products/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                price,
                description,
                category,
                brand,
                image,
            }),
        });
        const response = await request.json();

        dispatch(addProduct(response));

        return response;
    };

export const editProductThunk =
    (title, price, description, category, brand, image, productId) =>
    async dispatch => {
        const request = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                price,
                description,
                category,
                brand,
                image,
            }),
        });
        const response = await request.json();

        dispatch(editProduct(response));
        return response;
    };

export const deleteProductThunk = productId => async dispatch => {
    await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
    });
    dispatch(deleteProduct(productId));
};

export const getAllProductThunk = () => async dispatch => {
    const request = await fetch('/api/products/all', {
        method: 'GET',
    });
    if (request.ok) {
        const data = await request.json();

        dispatch(allProductData(data));
    }
};
export const getProductThunk = prodId => async dispatch => {
    const request = await fetch(`/api/products/${prodId}`, {
        method: 'GET',
    });
    if (request.ok) {
        const data = await request.json();

        dispatch(populateProductData(data));
    }
};

// ************************* Review *****************************

export const createReviewThunk =
    (title, review, rating, owner_id, product_id) => async dispatch => {
        const request = await fetch('/api/reviews/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                review,
                rating,
                owner_id,
                product_id,
                // images: imagesArr
            }),
        });
        const response = await request.json();

        dispatch(addProduct(response));
    };

export const editReviewThunk =
    (title, review, rating, reviewId) => async dispatch => {
        const request = await fetch(`/api/reviews/${reviewId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                review,
                rating,
            }),
        });
        const response = await request.json();

        dispatch(addProduct(response));
    };

export const deleteReviewThunk = reviewId => async dispatch => {
    const request = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    const response = await request.json();
    dispatch(addProduct(response));
};

// REDUCER

const productReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case POPULATE_PROD_DATA: {
            currentState.products.push(action.payload);
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
            currentState.products[action.payload.id] = action.payload;
            return currentState;
        }

        case EDIT_PROD_DATA: {
            currentState.products[action.payload.id] = action.payload;
            return currentState;
        }

        case DELETE_PROD_DATA: {
            for (let i = 0; i < currentState.products.length; i++) {
                if (currentState.products[i] === action.payload.id)
                    currentState.products.splice(i, 1);

                return currentState;
            }

            return currentState;
        }

        case CLEAR_PROD_DATA: {
            return initialState;
        }

        default:
            return currentState;
    }
};

export default productReducer;
