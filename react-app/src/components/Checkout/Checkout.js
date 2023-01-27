import React, {useEffect} from "react";
import Header from "../Header/Header";
import amazon_banner_checkout from "../../Media/Banner Images/amazon_banner_checkout.png";
import { useSelector, useDispatch } from "react-redux";
import CheckoutProduct from "./CheckoutProduct";
import Currency from "react-currency-formatter";
import { cartTotal } from "../../store/sessionReducer";

const Checkout = ({user, cart}) => {
    const total = useSelector(cartTotal)

    const dispatch = useDispatch()

    useEffect(() => {})

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
                        {user && cart && (cart.map((item, i) => (
                            <CheckoutProduct
                                key={item.id}
                                item={item}
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
                            <Currency quantity={total} />
                            </span>
                            </h2>
                            <button
                            disabled={!user}
                            className={`button mt-2 ${!user && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!user ? "Sign in to checkout" : "Proceed to checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Checkout;
