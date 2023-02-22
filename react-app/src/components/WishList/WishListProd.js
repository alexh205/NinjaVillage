import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";
import { FaStar } from "react-icons/fa";
import { removeItemFromListThunk } from "../../store/wishListReducer";
import { addToCart } from "../../store/cartReducer";

const WishListProd = ({ product, list }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [hasClicked, setHasClicked] = useState(false);
    const user = useSelector(state => state.session.user);

    const addItemToCart = async () => {
        const item = {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            brand: product.brand,
            image: product.image,
        };
        setHasClicked(true);
        await dispatch(addToCart(item));
        setHasClicked(false);
    };

    const removeItemFromList = async () => {
        await dispatch(removeItemFromListThunk(list.id, product.id));
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
        <div className="grid grid-cols-4 gap-x-2 mb-3 m-2 bg-white p-[5px] border-4 border-double rounded-2xl   ">
            {/* <p className="flex justify-end text-sm italic text-gray-400">
                {product.category}
            </p> */}
            <div
                className="cursor-pointer "
                onClick={() => history.push(`/products/${product.id}`)}>
                <img
                    className="object-contain h-[200px] w-[200px] ml-3"
                    src={product.image}
                    alt="product"
                />
            </div>
            <div className="col-span-2 mx-7 pt-7">
                <h4
                    className="cursor-pointer text-[#017185] hover:text-amber-600"
                    onClick={() => history.push(`/products/${product.id}`)}>
                    {product.title}
                </h4>

                <div className="flex my-2">
                    {product && product.productReviews.length && ratingAvg ? (
                        [...Array(Math.floor(ratingAvg))].map((star, i) => (
                            <FaStar
                                size={23}
                                className="text-yellow-500"
                                key={i}
                            />
                        ))
                    ) : (
                        <FaStar size={23} color={"#e4e5e9"} />
                    )}
                </div>
                {/* <p className="text-sm my-2 line-clamp-2">{product.description}</p> */}
                <div className="mb-5">
                    <p className=" text-amber-700 font-semibold">
                        ${product.price}
                    </p>
                </div>
            </div>
            {hasClicked && <Loading />}
            {user && (
                <div className="flex flex-col items-start justify-center pb-10">
                    <div onClick={addItemToCart} className="button">
                        Add to Cart
                    </div>
                    <div className="flex flex-row items-center justify-center mt-1">
                        <div className="mr-3 cursor-pointer" onClick={() => {}}>
                            Move
                        </div>
                        <div className="cursor-pointer " onClick={() => {}}>
                            Delete
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishListProd;
