import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItemThunk } from "../../store/sessionReducer";
import {FaStar} from 'react-icons/fa'

const CartProduct = ({ product }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.session.activeCart);

    const removeItemFromCart = async () => {
        await dispatch(removeCartItemThunk(product.id, cart.id));
    };

    let ratingTotal = 0;
    let ratingAvg;

    if (product && product.productReviews) {
        product.productReviews.forEach(el => {
            ratingTotal += Number(el.rating);
        });
        ratingAvg = ratingTotal / product.productReviews.length;
    }

    return (
        <div className="grid grid-cols-5">
            <a href={`/products/${product.id}`}>
                <img
                    src={product.image}
                    alt=""
                    className="h-[200px] w-[200px] object-contain"
                />
            </a>
            {/* middle section  */}
            <div className="col-span-3 mx-5">
                <p className="font-semibold text-lg">{product.title}</p>
                <div className="flex">{ratingAvg ?[...Array(Math.floor(ratingAvg))].map((star,i)=> <FaStar size={17} className="text-yellow-500" key={i}/>): <FaStar size={20} color={"#e4e5e9"}/>}</div>
                {/* Right side to add and remove buttons */}
                <p className="text-xs my-2 line-clamp-3">
                    {product.description}
                </p>
                <div className="flex flex-row justify-between items-center">
                    
                <button className="button mt-3" onClick={removeItemFromCart}>
                    {" "}
                    Remove from Cart
                </button>
                </div>
            </div>
            <div className="flex flex-col space-y-2 justify-self-end font-semibold text-lg self-start">
                <p>${product.price} </p>
            </div>
        </div>
    );
};

export default CartProduct;
