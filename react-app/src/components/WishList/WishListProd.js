import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";
import { FaStar } from "react-icons/fa";
import { removeItemFromListThunk } from "../../store/wishListReducer";
import { addToCart } from "../../store/cartReducer";

const WishListProd = ({ product, activeList }) => {
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
        await dispatch(removeItemFromListThunk(activeList.id, product.id));
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
                    className="cursor-pointer text-[#017185] hover:text-amber-600 text-[17px]"
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
            {user &&  (
                <div className="flex flex-col items-center justify-center pb-10">
                    <div
                        onClick={addItemToCart}
                        className="text-sm bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600 px-12 py-1 mb-1">
                        Add to Cart
                    </div>
                    <div className="flex flex-row items-center justify-center mt-1 ">
                        <div
                            className="mr-2 cursor-pointer border-[2px] rounded-lg px-4 text-xs"
                            onClick={() => {}}>
                            Move
                        </div>
                        <div
                            className="cursor-pointer border-[2px] rounded-lg px-4 text-xs "
                            onClick={removeItemFromList}>
                            Delete
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishListProd;
