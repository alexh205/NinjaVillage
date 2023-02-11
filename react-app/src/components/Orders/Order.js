import React from "react";
import OrderProduct from "./OrderProduct";

const Order = ({ cart }) => {
    return (
        <>
            {cart && cart.cartProducts && (
                <div className="border-4 border-ninja_green border-double m-2 p-2  ">
                    <div className="flex flex-row justify-center md:justify-evenly border-b-2 border-solid bg-gray-500 text-white text-[15px] ">
                        <div className="flex flex-col items-center">
                            <p className="mr-2">Order Placed</p>
                            <p className="text-sm md:text-md font-bold">{cart.orderPlaced}</p>
                        </div>
                        <div className="flex flex-col items-center ml-1 md:ml-3">
                            <p className="mr-2">Total:</p>
                            <p className="font-bold text-sm md:text-md">$ {cart.total}</p>
                        </div>
                        <div className="hidden md:flex flex-col items-center">
                            <p className="mr-2">Order #</p>
                            <p className="text-md font-bold">NVORD-{cart.id}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {cart.cartProducts.map((product, i) => (
                            <OrderProduct key={i} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Order;
