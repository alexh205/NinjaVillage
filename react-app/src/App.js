import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import ProductFeed from "./components/Product List/ProductFeed";
import products from "./Media/products.json"

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
        <div>
            <Header />
            <main className="max-w-screen-2xl mx-auto">
                <Banner />

                <ProductFeed products={products} />
            </main>
        </div>
    );
}

export default App;
