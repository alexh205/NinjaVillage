import React from "react";
import {FaStar} from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { addCartItemThunk } from "../../store/sessionReducer";


const Product = ({ product, userCart }) => {
    let ratingTotal = 0
    let ratingAvg;

    if (product && product.productReviews) {
    product.productReviews.forEach(el => { ratingTotal += Number(el.rating)})
    ratingAvg = (ratingTotal/product.productReviews.length)}

    const user = useSelector(state => state.session.user)
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
        <div className="relative flex flex-col m-5 bg-white z-30 p-10 border-4 border-double rounded-2xl ">
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
            {product && product.productReviews.length && ratingAvg ?[...Array(Math.floor(ratingAvg))].map((star,i)=> <FaStar size={23} className="text-yellow-500" key={i}/>): <FaStar size={23} color={"#e4e5e9"}/>}
            </div>
            <p className="text-sm my-2 line-clamp-2">{product.description}</p>
            <div className="mb-5">

                <p>${product.price}</p>
            </div>
            {user && (<button disabled={user.id === product.ownerId} className={`${user.id=== product.ownerId ? 'hidden cursor-not-allowed':'mt-auto button'}`} onClick={addItemToCart}>
                Add to Cart
            </button>)}

        </div>
    );
};

export default Product;
