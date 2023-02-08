import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItemThunk } from "../../store/sessionReducer";

const CheckoutProduct = ({ product }) => {
    const dispatch =useDispatch()

    const cart = useSelector(state => state.session.activeCart)

    const removeItemFromCart = () => {

        dispatch(removeCartItemThunk(product.id, cart.id))
    };
    return (
        <div className="flex flex-row ml-4 my-2">
            <img
                src={product.image}
                alt=""
                className="object-contain h-[110px] md:h-[150px] w-[90px] md:w-[140px] mr-4"/>
            <div className="flex flex-col mt-5">
                <div className="text-[12px] md:text-sm font-bold">{product.title}</div>
                <div className="text-sm font-bold text-orange-700">

                    <p>${product.price}</p>
                </div>
                <div className="flex">
                    <p className="text-xs text-gray-500">Sold by:</p>
                    <p className="ml-1 text-xs text-gray-500">{product.brand}</p>
                </div>
                <div className="flex flex-row items-center">
                <button className="cursor-pointer py-1 m-1 text-[8px] md:text-[10px] bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400 rounded-md  focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600 w-[100px] mr-4" onClick={removeItemFromCart}> Remove from Cart</button>
               </div>
            </div>

        </div>
    );
};

export default CheckoutProduct;
