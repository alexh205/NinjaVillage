import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { removeCartItemThunk } from "../../store/sessionReducer";

const CheckoutProduct = ({ item, cart }) => {
    const MAX_RATING = 5;
    const MIN_RATING = 1;

    const dispatch =useDispatch()

    const removeItemFromCart = () => {

      dispatch(removeCartItemThunk(item.id, cart.id))
  };

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    return (
        <div className="grid grid-cols-5">
            <img
                src={item.image}
                className="h-[200px] w-[200px] object-contain"
            />
            {/* middle section  */}
            <div className="col-span-3 mx-5">
                <p className="font-semibold text-lg">{item.title}</p>
                <div className="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon className="h-5 text-yellow-500" />
                        ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{item.description}</p>
            <button className="button mt-3" onClick={removeItemFromCart}> Remove from Cart</button>
            </div>
            {/* Right side to add and remove buttons */}
            <div className="flex flex-col space-y-2 justify-self-end font-semibold text-lg self-start">
                <Currency quantity={item.price} />
            </div>
        </div>
    );
};

export default CheckoutProduct;
