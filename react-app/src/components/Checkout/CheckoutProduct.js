import React from "react";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItemThunk } from "../../store/sessionReducer";

const CheckoutProduct = ({ product }) => {
    const dispatch =useDispatch()

    const cart = useSelector(state => state.session.activeCart)

    const removeItemFromCart = () => {

        dispatch(removeCartItemThunk(product.id, cart.id))
    };
    return (
        <div className="flex flex-row ml-4 my-3">
            <img
                src={product.image}
                alt=""
                className="object-contain h-20 w-16 mr-4"/>
            <div>
                <p className="text-sm font-bold">{product.title}</p>
                <p className="text-sm font-bold text-orange-700">
                    <Currency quantity={product.price} />
                </p>
                <div className="flex">
                    <p className="text-xs text-gray-500">Sold by:</p>
                    <p className="ml-1 text-xs text-gray-500">{product.brand}</p>
                </div>
                <button className="cursor-pointer py-1 m-1 text-[8px] md:text-[10px] bg-gradient-to-b from-yellow-200 to-yellow-400    border-yellow-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 w-[120px] mr-4" onClick={removeItemFromCart}> Remove from Cart</button>
            </div>

        </div>
    );
};

export default CheckoutProduct;
