import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/sessionReducer";
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
            <Switch>
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
