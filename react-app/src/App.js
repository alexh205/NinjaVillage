import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate,setActiveCart } from "./store/sessionReducer";
import Home from "./components/Home";
import Cart from "./components/Checkout/Cart";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProductDetail from "./components/Product/ProductDetail";
import Checkout from "./components/Checkout/Checkout";
import { getAllProductThunk} from './store/productReducer'
import EditReview from "./components/Review/EditReview";
import CreateReview from "./components/Review/CreateReview";
import EditProduct from "./components/Product/EditProduct";
import Profile from "./components/Profile/Profile";
import CreateProduct from "./components/Product/CreateProduct";
import Filters from "./components/Filter/Filters"

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);


    useEffect(()=> {

        dispatch(getAllProductThunk())

      },[])


      useEffect(()=> {
        if (user && !user.activeCart) {
          let userCart = user.ownedCarts.filter(
               cart => cart.checkedOut === false
           );
           dispatch(setActiveCart(userCart))
       }
      }, [user])



    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    //! Manage the header within the app component through conditional navbar component

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/cart" exact={true}>
                    <Cart user={user} />
                </Route>
                <Route path="/" exact={true} >
                    <Home />
                </Route>
                <Route path="/login" exact={true}>
                    <LoginForm />
                </Route>
                <Route path="/signup" exact={true}>
                    <SignUpForm />
                </Route>

                <Route path="/profile/:userId" exact={true}>
                    <Profile />
                </Route>
                <Route path="/products/new" exact={true}>
                    <CreateProduct />
                </Route>
                <Route path="/products/:productId" exact={true}>
                    <ProductDetail />
                </Route>
                <Route path="/products/edit/:productId" user={user} exact={true} >
                    <EditProduct />
                </Route>
                <Route path="/reviews/edit/:productId" exact={true}>
                    <EditReview />
                </Route>
                <Route path="/reviews/:productId" exact={true}>
                    <CreateReview />
                </Route>
                <Route path="/checkout" exact={true}>
                    <Checkout />
                </Route>
                <Route path="/filters/:filterId" exact={true}>
                    <Filters />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
