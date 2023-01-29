import React from "react";
import { useState } from "react";
import {FaStar} from 'react-icons/fa'
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addCartItemThunk } from "../../store/sessionReducer";


const Product = ({ product, userCart }) => {
    let ratingTotal = 0
    let ratingAvg;

    if (product && product.productReviews) {
    product.productReviews.forEach(el => { ratingTotal += el.rating})
    ratingAvg = (ratingTotal/product.productReviews.length)}

    const dispatch = useDispatch();

    const addItemToCart = async () => {
        const item = {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            brand: product.brand,
            image: product.image,
        }


        await dispatch(addCartItemThunk(item, userCart.id))
    };

    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10">
            <p className="absolute top-2 right-2 text-sm italic text-gray-400">
                {product.category}
            </p>
            <a href={`/products/${product.id}`}>
            <img
                className="object-contain h-[200px] w-[200px]"
                src={product.image}
                alt=""
            /> </a>
            <h4>{product.title}</h4>
            <div className="flex">
            {ratingAvg ?[...Array(Math.floor(ratingAvg))].map((i)=> <FaStar size={23} className="text-yellow-500" key={i}/>): <FaStar size={23} color={"#e4e5e9"}/>}
            </div>
            <p className="text-sm my-2 line-clamp-2">{product.description}</p>
            <div className="mb-5">
                <Currency quantity={product.price} />
            </div>
            <button className="mt-auto button" onClick={addItemToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default Product;
