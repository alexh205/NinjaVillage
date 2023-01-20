import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import Home from "./components/Home";
import Checkout from "./components/Checkout/Checkout";

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            {/* <NavBar /> */}
            <Switch>
                {/* <Route path="/login" exact={true}>
                    <LoginForm />
                </Route> */}
                {/* <Route path="/sign-up" exact={true}>
                    <SignUpForm />
                </Route> */}
                {/* <ProtectedRoute path="/users" exact={true}>
                    <UsersList />
                </ProtectedRoute> */}
                {/* <ProtectedRoute path="/users/:userId" exact={true}>
                    <User />
                </ProtectedRoute> */}
                <Route path="/checkout" exact={true}>
                   <Checkout />
                </Route>
                <Route path="/" exact={true}>
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
