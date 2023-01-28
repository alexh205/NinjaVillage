import React, {useEffect} from "react";
import Header from "../Header/Header";
import amazon_banner_checkout from "../../Media/Banner Images/amazon_banner_checkout.png";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "./CartProduct";
import Currency from "react-currency-formatter";
import { useHistory } from "react-router-dom";

const Cart = ({user, cart}) => {
    // const total = useSelector(cartTotal)
    const history = useHistory()
    // const dispatch = useDispatch()

    // useEffect(() => {})
    const cartTotal = cart.reduce((total, item) => total + item.price, 0) //! Not rendering the cart when new item is added to the cart and the checkout component is rendered

    return (
        <div className="bg-gray-100">
            <Header />
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* left */}
                <div className="flex-grow m-5 shadow-sm">
                    <img
                        className="w-[1020px] h-[250px] object-contain"
                        src={amazon_banner_checkout}
                        alt=""
                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <div className="flex border-b pb-4 justify-between ">
                        <h1 className="text-3xl">
                            Shopping Cart
                        </h1>
                        <h5 className="self-end mr-4 text-gray-600 "> Price</h5></div>
                        {user && cart && (cart.map((product, i) => (
                            <CartProduct
                                key={product.id}
                                product={product}
                                cart={cart}
                            />)
                        ))}
                    </div>
                </div>
                {/* right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {cart.length > 0 && (
                        <>
                        <h2 className="whitespace-nowrap">Subtotal ({cart.length} items): {" "}
                        <span className="font-bold">
                            <Currency quantity={cartTotal} />
                            </span>
                            </h2>
                            <button
                            disabled={!user}
                            className={`button mt-2 ${!user && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`} onClick={()=> history.push('/checkout')}>
                                {!user ? "Sign in to checkout" : "Proceed to checkout"}
                            </button>
                        </>
                     )}
                </div>
            </main>
        </div>
    );
};

export default Cart;
