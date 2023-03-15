import React from 'react';
import OrderProduct from '../Product/OrderProduct';

const Order = ({ cart }) => {
    const date = new Date(cart.orderPlaced);
    const f = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'medium',
    });
    const orderDate = f.format(date);

    return (
        <>
            {cart && cart.cartProducts && (
                <div className="border-4 border-ninja_green border-double m-3 p-3  ">
                    <div className="flex flex-row justify-center md:justify-evenly border-b-2 border-solid bg-gray-500 text-white text-[15px] ">
                        <div className="flex flex-col items-center justify-center">
                            <p className="mr-2">Order Placed</p>
                            <p className="text-sm md:text-base font-bold">
                                {orderDate}
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center ml-1 md:ml-3">
                            <p className="mr-2">Total:</p>
                            <p className="font-bold text-sm md:text-base">
                                $ {cart.total}
                            </p>
                        </div>
                        <div className="flex text-sm md:text-base flex-col items-center justify-center ml-2">
                            <p className="mr-2">Order #</p>
                            <p className="text-sm md:text-base font-bold">
                                NVORD-{cart.id}
                            </p>
                        </div>
                        <div className="flex text-sm md:text-base flex-col items-center justify-center ml-2">
                            <p className="mr-2">Estimated delivery Date</p>
                            <p className="text-sm md:text-base font-bold">
                                {cart.estimatedDate}
                            </p>
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
