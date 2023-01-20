import React from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from 'react-currency-formatter'

const Product = ({ product }) => {
    const MAX_RATING = 5;
    const MIN_RATING = 1;

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING); // Randomizing the number of stars
    return (
        <div>
            <p>{product.category}</p>
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
                        <StarIcon className="h-5" />
                    ))}
            </div>
            <p>{product.description}</p>
            <div>
                <Currency quantity={product.price}/>
            </div>
        </div>
    );
};

export default Product;
