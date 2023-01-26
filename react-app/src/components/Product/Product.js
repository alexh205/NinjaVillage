import React, { useSelector } from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addCartItemThunk } from "../../store/cartReducer";

const Product = ({ product, user }) => {
    const MAX_RATING = 5;
    const MIN_RATING = 1;

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    ); // Randomizing the number of stars

    const dispatch = useDispatch();
        

    const addItemToBasket = () => {
        const item = {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            brand: product.brand,
            image: product.image,
        }

        dispatch(addCartItemThunk(item, ))
    };

    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10">
            <p className="absolute top-2 right-2 text-sm italic text-gray-400">
                {product.category}
            </p>
            <img
                className="object-contain h-[200px] w-[200px]"
                src={product.image}
                alt=""
            />
            <h4>{product.title}</h4>
            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon className="h-5 text-yellow-500" />
                    ))}
            </div>
            <p className="text-sm my-2 line-clamp-2">{product.description}</p>
            <div className="mb-5">
                <Currency quantity={product.price} />
            </div>
            <button className="mt-auto button" onClick={addItemToBasket}>
                Add to Cart
            </button>
        </div>
    );
};

export default Product;
