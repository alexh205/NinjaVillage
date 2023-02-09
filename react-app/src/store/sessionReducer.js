const initialState = {
    user: null,
};

// *************** User ****************************
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";


//? ACTION CREATORS
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

//? THUNKS
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

        default:
            return currentState;
    }
};

export default sessionReducer;
