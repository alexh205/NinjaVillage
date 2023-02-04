import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./store/sessionReducer";
import Home from "./components/Home";
import Cart from "./components/Checkout/Cart";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProductDetail from "./components/Product/ProductDetail";
import Checkout from "./components/Checkout/Checkout";
import { getAllProductThunk} from './store/productReducer'
import { setActiveCart } from './store/sessionReducer'
import EditReview from "./components/Review/EditReview";
import CreateReview from "./components/Review/CreateReview";
import EditProduct from "./components/Product/EditProduct";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import CreateProduct from "./components/Product/CreateProduct";

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const store = useSelector(state=> state.productStore.products)


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

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/cart" exact={true}>
                    <Cart user={user} />
                </Route>
                <Route path="/" exact={true}>
                    <Home />
                </Route>
                <Route path="/login" exact={true}>
                    <LoginForm />
                </Route>
                <Route path="/signup" exact={true}>
                    <SignUpForm />
                </Route>
                <Route path="/users/edit/:userId/" exact={true}>
                    <EditProfile />
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
                <Route path="/products/:productId/edit" user={user} exact={true} >
                    <EditProduct />
                </Route>
                <Route path="/reviews/:productId/edit" exact={true}>
                    <EditReview />
                </Route>
                <Route path="/reviews/:productId" exact={true}>
                    <CreateReview />
                </Route>
                <Route path="/checkout" exact={true}>
                    <Checkout />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
