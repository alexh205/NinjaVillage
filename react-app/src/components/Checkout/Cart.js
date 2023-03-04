import React from "react";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import { useHistory } from "react-router-dom";

const Cart = ({ user }) => {
    const history = useHistory();
    const cart = useSelector(state => state.cartStore.addedItems);
    let cartTotal = useSelector(state => state.cartStore.total);
    if (cartTotal < 1) cartTotal = 0;

    return (
        <div className="bg-gray-100">
            <Header />
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* left */}
                <div className="flex-grow m-4 shadow-sm">
                    <img
                        className="w-[100%] h-[250px] mb-3 border-[2px]"
                        src={
                            "https://ninjastore.s3.amazonaws.com/site_backgrounds/register.png"
                        }
                        alt="checkout register"
                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <div className="flex border-b pb-4 justify-between ">
                            <h1 className="text-3xl">Shopping Cart</h1>
                            <h5 className="self-end mr-4 text-gray-600 ">
                                {" "}
                                Price
                            </h5>
                        </div>
                        {cart &&
                            cart.map((product, i) => (
                                <CartProduct key={i} product={product} />
                            ))}
                    </div>
                </div>
                {/* right */}
                <div className="flex flex-col bg-white p-9 shadow-md">
                    {user && cart && cart.length > 0 ? (
                        <>
                            <h2 className="whitespace-nowrap font-bold text-lg static">
                                Subtotal ({cart.length} items):{" "}
                                <p>
                                    $
                                    {cartTotal > 0
                                        ? Math.round(
                                              (cartTotal + Number.EPSILON) * 100
                                          ) / 100
                                        : 0}
                                </p>
                            </h2>
                            <button
                                className={`button mt-2 ${
                                    !user &&
                                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                                }`}
                                onClick={() => history.push("/checkout")}>
                                {"Proceed to checkout"}
                            </button>
                        </>
                    ) : user && cart && cart.length === 0 ? (
                        <>
                            <h2 className="whitespace-nowrap">
                                Subtotal ({cart.length} items):{" "}
                                <span className="font-bold">
                                    <p>${cartTotal}</p>
                                </span>
                            </h2>
                            <button
                                disabled={cart.length < 1}
                                className={`button mt-2 ${
                                    (!user || cart.length < 1) &&
                                    "from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed"
                                }`}>
                                {"Please add at least one item to proceed"}
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="whitespace-nowrap">
                                Subtotal (0 item):{" "}
                                <span className="font-bold">
                                    <p>$0</p>
                                </span>
                            </h2>
                            <button
                                disabled={!user}
                                className={`button mt-2 ${
                                    !user &&
                                    "from-gray-200 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                                }`}>
                                {!user && "Sign in to checkout"}
                            </button>{" "}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Cart;
