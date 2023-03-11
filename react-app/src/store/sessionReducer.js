const initialState = {
    user: null,
    productOwner: null,
};

// *************** User ****************************
const SET_USER = 'session/SET_USER';
const SET_PROD_OWNER = 'session/SET_PROD_OWNER';
const REMOVE_USER = 'session/REMOVE_USER';

//? ACTION CREATORS
// *************** User ****************************
export const setUser = user => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const setProdOwner = user => {
    return {
        type: SET_PROD_OWNER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

//? THUNKS
// *************** User ****************************
export const authenticate = () => async dispatch => {
    const request = await fetch('/api/auth/', {
        headers: { 'Content-Type': 'application/json' },
    });

    if (request.ok) {
        const data = await request.json();

        if (data.errors) return;

        dispatch(setUser(data));
    }
};

export const login = (email, password) => async dispatch => {
    const request = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        return ['An error occurred. Please try again.'];
    }
};

export const logout = () => async dispatch => {
    const request = await fetch('/api/auth/logout', {
        headers: { 'Content-Type': 'application/json' },
    });

    if (request.ok) dispatch(removeUser());
};

export const signUp =
    (username, name, email, password, profileImage) => async dispatch => {
        const request = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                name,
                email,
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
            return ['An error occurred. Please try again.'];
        }
    };

export const getUserThunk = userId => async dispatch => {
    const request = await fetch(`/api/users/${userId}`, {
        method: 'GET',
    });

    const response = await request.json();

    dispatch(setProdOwner(response));
};

export const editUserThunk =
    (
        username,
        email,
        name,
        streetAddress,
        city,
        state,
        zipCode,
        profileImg,
        userId
    ) =>
    async dispatch => {
        const request = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
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

export const updateUserPasswordThunk = (password, userId) => async dispatch => {
    const request = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
        }),
    });

    if (request.ok) {
        const data = await request.json();
        dispatch(setUser(data));
    }
};

export const deleteUserThunk = userId => async dispatch => {
    await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
    });
    dispatch(removeUser());
};

//? REDUCER

const sessionReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case SET_USER: {
            currentState.user = action.payload;
            return currentState;
        }

        case REMOVE_USER:
            return initialState;

        case SET_PROD_OWNER: {
            currentState.productOwner = action.payload;
            return currentState;
        }

        default:
            return currentState;
    }
};

export default sessionReducer;
