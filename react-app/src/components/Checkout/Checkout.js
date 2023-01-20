import React from "react";
import Header from "../Header/Header";
import amazon_banner_checkout from "../../Media/Banner Images/amazon_banner_checkout.png";
import { useSelector } from "react-redux";

const Checkout = () => {
    
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
                        <h1 className="text-3xl border-b pb-4 ">
                            Your Shopping Cart
                        </h1>
                    </div>
                </div>
                {/* right */}
                <div></div>
            </main>
        </div>
    );
};

export default Checkout;
