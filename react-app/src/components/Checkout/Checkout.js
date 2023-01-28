import React, { useEffect } from "react";
import logo from "../../Media/logo1.png";
import { useHistory } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import CheckoutProduct from "./CheckoutProduct";
import checkoutImg from "../../Media/checkoutImg.png";
import Currency from "react-currency-formatter";

const Payment = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const cartArr = useSelector(state => state.session.activeCart.cartProducts);
    const cartTotal = cartArr.reduce((total, item) => total + item.price, 0);

    return (
        <>
            {user && cartArr && (
                <div className="flex items-center py-3 bg-gray-100 justify-between">
                    <div
                        className="flex ml-[160px] items-center  cursor-pointer bg-slate-600"
                        onClick={() => {
                            history.push("/");
                        }}>
                        <img
                            className="w-[120px] h-[40px] object-contain cursor-pointer mt-2"
                            src={logo}
                        />
                    </div>
                    <div className="flex font-semibold text-3xl items-center">
                        Checkout (
                        <p className="text-sky-600 text-2xl">
                            {cartArr.length > 1
                                ? `${cartArr.length} items`
                                : `${cartArr.length} item`}
                        </p>
                        )
                    </div>
                    <LockClosedIcon className="h-7 opacity-40 pr-14 cursor-pointer" />
                </div>
            )}
            <div className="flex flex-row">
                {/* checkout header  */}

                {/* lower checkout components */}
                <div>
                    {/* outer container */}
                    <div className="ml-[160px] mr-7">
                        {/* shipping address */}
                        <div>
                            <div className="flex flex-row mt-3">
                                <div className="font-semibold text-xl mr-6">
                                    1
                                </div>
                                <div className="font-semibold text-xl mr-24">
                                    Shipping address
                                </div>
                                <div>
                                    <p>{user.name}</p>
                                    <p>{user.street_address}</p>
                                    <p>
                                        {user.city}, {user.state},
                                        {user.zip_code}
                                    </p>
                                </div>
                            </div>
                            <hr className="w-[100%] mt-3"></hr>
                        </div>
                        {/* payment method  */}
                        <div>
                            <div className="flex flex-row mt-3">
                                <div className="font-semibold text-xl mr-6">
                                    2
                                </div>
                                <div className="font-semibold text-xl mr-24">
                                    Payment method
                                </div>
                                <div>
                                    <div>Visa ending in 000</div>
                                    <div className="flex text-sky-600">
                                        Billing address:
                                        <p className="text-gray-700 ml-1">
                                            Same as shipping address
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr className="w-[100%] mt-3"></hr>
                        </div>
                        <div>
                            <div className="flex flex-row mt-3 ">
                                <div className="font-semibold text-xl mr-6"> 3 </div>
                                <div className="font-semibold text-xl">
                                    Review items
                                    <div className="border-[1px] p-3 rounded-lg flex flex-col mt-2 object-contain">
                                        <img
                                            src={checkoutImg}
                                            alt=""
                                            className=" object-contain w-[100%] border-2"/>
                                        <div className="text-orange-700 ml-2">
                                            Estimated delivery: May. 20, 2045 -
                                            May. 22, 2045
                                        </div>
                                        <div className="text-sm text-gray-500 ml-2">
                                            Items Shipped from NinjaVillage.com
                                        </div>
                                        {cartArr.map(product => (
                                            <CheckoutProduct
                                                product={product} key={product.id}/> ))}
                                    </div>
                                    {/* order + total  */}
                                    <div className="border-[1px] rounded-lg mt-5 flex p-1 items-center">
                                        <button className=" cursor-pointer p-1 m-2 text-[10px] md:text-[12px] bg-gradient-to-b from-yellow-200 to-yellow-400 border-yellow-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 w-[120px]">
                                            Place your order
                                        </button>
                                        <div className="flex flex-col pl-2">
                                            <div className=" flex text-md text-orange-700 p-0 m-0">
                                                Order total:
                                                <p className="ml-2">
                                                    <Currency quantity={cartTotal}/>
                                                </p>
                                            </div>
                                            <p className="text-[10px] text-gray-500 p-0 m-0">
                                                By placing your order, you agree
                                                to NinjaVillage's
                                                privacy notice and conditions of use
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-[1px] rounded-lg mt-3 w-[290px] h-[378px] relative mr-14">
                    <div className="flex flex-col items-center">
                        <button className=" cursor-pointer py-2 m-2 text-[12px] md:text-[14px] bg-gradient-to-b from-yellow-200 to-yellow-400  border-yellow-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 w-[120px] flex-grow">
                        Place your order</button>
                        <p className="text-[10px] text-gray-500 text-center px-1"> By placing your order, you agree to NinjaVillage's privacy notice and conditions of use</p>
                        <hr className="w-[85%] mt-2"></hr>
                    </div>
                    <div>
                        <div className="font-semibold text-lg ml-4 mt-2">Order Summary</div>
                        <div className="flex flex-row justify-between mx-4 text-xs mt-4">
                            <p>Items:</p>
                            <p><Currency quantity={cartTotal}/> </p>
                        </div>
                        <div className="flex flex-row justify-between mx-4 text-xs mt-1">
                            <p>Shipping & handling:</p>
                            <div>
                                <p>$10.00</p>
                                <hr className="w-[100%] mt-2"></hr>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mx-4 text-xs mt-1">
                        <p>Total before tax:</p>
                        <p></p>
                    </div>
                    <div className="flex flex-row justify-between mx-4 text-xs mt-1 border-b pb-2">
                        <p>Estimated tax to be collected:</p>
                        <p></p>
                    </div>
                    <div className="font-semibold text-lg ml-4 mt-2 mx-4 text-orange-700 flex flex-row justify-between">
                        <p>Order total</p>
                        <p>$200</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
