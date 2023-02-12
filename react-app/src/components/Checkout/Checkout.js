import React, {useState} from "react";
import NinjaVillage_logo from "../../Media/NinjaVillage_logo.png";
import { useHistory } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import CheckoutProduct from "./CheckoutProduct";
import checkoutImg from "../../Media/checkoutImg.png";
import stateTaxes from "../../Media/stateTaxes.json";
import { cartCheckoutThunk } from "../../store/cartReducer";
import { authenticate } from "../../store/sessionReducer";
import Loading from "../Loading";

const Checkout = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [hasClicked, setHasClicked] = useState(false);

    const user = useSelector(state => state.session.user);
    const cart = useSelector(state => state.cartStore);
    const cartArr = useSelector(state => state.cartStore.addedItems);
    const total = useSelector(state => state.cartStore.total);

    const preTax_total = Math.round((total + 10 + Number.EPSILON) * 100) / 100;

    const tax =
        Math.round(
            (preTax_total *
                Number(
                    Object.entries(stateTaxes).reduce((accum, current) => {
                        const [key, value] = current;
                        if (key === user.state) {
                            return [...accum, value];
                        }
                        if (key === user.state && user.state === 0) {
                            return;
                        }
                        return [...accum];
                    }, [])
                ).toString() +
                Number.EPSILON) *
                100
        ) / 100;

    const cartTotal =
        Math.round((preTax_total + tax + Number.EPSILON) * 100) / 100;

    const handleCheckout = async () => {
        const cartObj = {
            id: cart.id,
            total: cartTotal,
            checkedOut: true,
            products: cart.addedItems,
        };
        setHasClicked(true);
        await dispatch(cartCheckoutThunk(cartObj));

        await dispatch(authenticate());
        setHasClicked(false);
    };

    if (total === 0) {
        history.push("/");
    }

    return (
        <>
            {user && cartArr && (
                <div className="flex items-center py-3 bg-ninja_green justify-around md:justify-between">
                    <div
                        className="flex ml-4 md:ml-[160px] items-center cursor-pointer"
                        onClick={() => {
                            history.push("/");
                        }}>
                        <img
                            className="w-[120px] h-[40px] object-contain cursor-pointer mt-2 "
                            src={NinjaVillage_logo}
                            alt="ninja village logo"
                        />
                    </div>
                    <div className="flex font-semibold text-xl md:text-3xl text-white items-center ">
                        Checkout (
                        <p className="text-amber-600 text-lg md:text-2xl">
                            {cartArr.length > 1
                                ? `${cartArr.length} items`
                                : `${cartArr.length} item`}
                        </p>
                        )
                    </div>
                    <LockClosedIcon className="hidden md:flex h-7 opacity-80 pr-4 md:pr-[160px] cursor-pointer text-white" />
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
                                <div className="font-semibold text-lg md:text-xl mr-8 md:mr-24">
                                    Shipping address
                                </div>
                                <div className="text-[12px] md:text-[16px]">
                                    <p>{user.name}</p>
                                    <p>{user.street_address}</p>
                                    <p>
                                        {user.city}, {user.state},{" "}
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
                                <div className="font-semibold text-lg md:text-xl mr-8 md:mr-24">
                                    Payment method
                                </div>
                                <div className="text-[12px] md:text-[16px]">
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
                                <div className="font-semibold text-xl mr-6">
                                    {" "}
                                    3{" "}
                                </div>
                                <div className="font-semibold text-lg md:text-xl">
                                    Review items
                                    <div className="border-[1px] p-3 rounded-lg flex flex-col mt-2 object-contain">
                                        <img
                                            src={checkoutImg}
                                            alt="trees"
                                            className=" object-contain w-[100%] border-2"
                                        />
                                        <div className="text-orange-700 ml-2">
                                            Estimated delivery: May. 20, 2045 -
                                            May. 22, 2045
                                        </div>
                                        <div className="text-sm text-gray-500 ml-2">
                                            Items Shipped from NinjaVillage.com
                                        </div>
                                        {cartArr.map(product => (
                                            <CheckoutProduct
                                                product={product}
                                                key={product.id}
                                            />
                                        ))}
                                    </div>
                                    {/* order + total  */}
                                    <div className="border-[1px] rounded-lg mt-5 flex p-1 items-center">
                                    {hasClicked && <Loading />}
                                        <button
                                            className=" cursor-pointer p-1 m-2 text-[10px] md:text-[12px] bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400 rounded-md  focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600 w-[120px]"
                                            disabled={hasClicked}
                                            onClick={e => handleCheckout(e)}>
                                            Place your order
                                        </button>
                                        <div className="flex flex-col pl-2">
                                            <div className=" flex text-md text-orange-700 p-0 m-0">
                                                Order total:
                                                <div className="ml-2">
                                                    {total > 0 ? (
                                                        <p>
                                                            $
                                                            {Math.round(
                                                                (preTax_total +
                                                                    tax +
                                                                    Number.EPSILON) *
                                                                    100
                                                            ) / 100}
                                                        </p>
                                                    ) : (
                                                        <p>$0</p>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-500 p-0 m-0">
                                                By placing your order, you agree
                                                to NinjaVillage's privacy notice
                                                and conditions of use
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-[1px] rounded-lg mt-7 w-[330px] h-[312px] md:h-[360px] mr-7 relative ">
                    <div className="flex flex-col items-center">
                    {hasClicked && <Loading />}
                        <button
                            className=" cursor-pointer py-[6px] m-2 text-[12px] md:text-[13px] bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400 rounded-md  focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600 w-[120px] flex-grow"
                            disabled={hasClicked}
                            onClick={handleCheckout}>
                            Place your order
                        </button>
                        <p className="text-[10px] hidden md:flex text-gray-500 text-center px-1">
                            {" "}
                            By placing your order, you agree to NinjaVillage's
                            privacy notice and conditions of use
                        </p>
                        <hr className="w-[85%] mt-2"></hr>
                    </div>
                    <div>
                        <div className="font-semibold text-md md:text-lg ml-4 mt-2">
                            Order Summary
                        </div>
                        <div className="flex flex-row justify-between mx-2 text-[10px] md:text-xs mt-4">
                            <p>Items:</p>
                            <p>
                                $
                                {Math.round((total + Number.EPSILON) * 100) /
                                    100}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between mx-2 text-[10px] md:text-xs my-2">
                            <p>Shipping & handling:</p>
                            <div>
                                {total > 0 ? <p>$10.00</p> : <p>$0</p>}

                                <hr className="w-[100%] mt-2"></hr>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mx-2 text-[10px] md:text-xs my-2">
                        <p>Total before tax:</p>
                        {total > 0 ? <p>${preTax_total}</p> : <p>$0</p>}
                    </div>
                    <div className="flex flex-row justify-between mx-2 text-[10px] md:text-xs my-2 border-b pb-1">
                        <p>Estimated tax to be collected:</p>
                        {total > 0 ? <p>${tax}</p> : <p>$0</p>}
                    </div>
                    <div className="font-semibold sm:text-md md:text-lg lg:text-xl ml-2 md:ml-5 my-3 md:my-4 lg:my-6 sm:mx-2 md:mx-3 lg:mx-6 text-orange-700 flex flex-row justify-between items-center">
                        <p className="mr-[2px]">Order total:</p>
                        {total > 0 ? (
                            <p>
                                $
                                {Math.round(
                                    (preTax_total + tax + Number.EPSILON) * 100
                                ) / 100}
                            </p>
                        ) : (
                            <p>$0</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
