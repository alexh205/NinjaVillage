import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItemThunk } from "../../store/sessionReducer";

const CartProduct = ({ product }) => {
    const MAX_RATING = 5;
    const MIN_RATING = 1;

    const dispatch =useDispatch()
    const cart = useSelector(state => state.session.activeCart)

    const removeItemFromCart = () => {

      dispatch(removeCartItemThunk(product.id, cart.id))
  };

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    return (
        <div className="grid grid-cols-5">
             <a href={`/products/${product.id}`}>
            <img
                src={product.image} alt=''
                className="h-[200px] w-[200px] object-contain"
            /></a>
            {/* middle section  */}
            <div className="col-span-3 mx-5">
                <p className="font-semibold text-lg">{product.title}</p>
                <div className="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon className="h-5 text-yellow-500" key={i} />
                        ))}
                </div>
            {/* Right side to add and remove buttons */}
                <p className="text-xs my-2 line-clamp-3">{product.description}</p>
            <button className="button mt-3" onClick={removeItemFromCart}> Remove from Cart</button>
            </div>
            <div className="flex flex-col space-y-2 justify-self-end font-semibold text-lg self-start">
                <p>${product.price} </p>
            </div>
        </div>
    );
};

export default CartProduct;
