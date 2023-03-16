import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { removeItemFromListThunk } from "../../store/wishListReducer";
import { addToCart } from "../../store/cartReducer";
import ProductRelocation from "./ProductRelocation";

const WishListProd = ({ product, activeList }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const list = useSelector(state =>
        state.listStore.userLists.find(list => list.id === activeList.id)
    );
    const userWishLists = useSelector(state => state.listStore.userLists);

    const item = list.listProducts.find(prod => prod.id === product.id);
    const [dropDown, setDropDown] = useState(false);
    const [buttonAction, setButtonAction] = useState(false);

    const showDropDown = Boolean => setDropDown(false);

    const productImageArr = product.productImages;

    const addItemToCart = async () => {
        setButtonAction(true);
        try {
            const itemObj = {
                id: item.id,
                title: item.title,
                price: item.price,
                description: item.description,
                category: item.category,
                brand: item.brand,
                image: item.image,
            };

            await dispatch(addToCart(itemObj));
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setButtonAction(false);
            }, 600);
        }
    };

    const removeItemFromList = async () => {
        await dispatch(removeItemFromListThunk(activeList.id, item.id));
    };

    let ratingTotal = 0;
    let ratingAvg;

    if (item && item.productReviews) {
        item.productReviews.forEach(el => {
            ratingTotal += Number(el.rating);
        });
        ratingAvg = ratingTotal / item.productReviews.length;
    }

    return (
        <>
            {item ? (
                <div className="grid grid-cols-4 gap-x-2 mb-3 m-2  bg-white px-5 border-4 border-double rounded-2xl ">
                    <div
                        className="cursor-pointer "
                        onClick={() => history.push(`/products/${item.id}`)}>
                        <img
                            className="object-contain m-2  h-[200px] w-[200px] rounded-lg shadow-lg border-4 border-white hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 "
                            src={productImageArr.length > 0 ? productImageArr[0].url : "image"}
                            alt="product"
                        />
                    </div>
                    <div className="col-span-2 mx-7 pt-7">
                        <h4
                            className="cursor-pointer text-blue-500 hover:text-amber-600 text-[17px]"
                            onClick={() =>
                                history.push(`/products/${item.id}`)
                            }>
                            {item.title}
                        </h4>

                        <div className="flex my-2">
                            {product &&
                            product.productReviews.length &&
                            ratingAvg ? (
                                [...Array(Math.floor(ratingAvg))].map(
                                    (star, i) => (
                                        <FaStar
                                            size={23}
                                            className="text-yellow-500"
                                            key={i}
                                        />
                                    )
                                )
                            ) : (
                                <FaStar size={23} color={"#e4e5e9"} />
                            )}
                        </div>

                        <div className="mb-5">
                            <p className=" text-amber-700 font-semibold">
                                ${item.price}
                            </p>
                        </div>
                    </div>

                    {user && (
                        <div className="flex flex-col items-center justify-center pb-4 cursor-pointer">
                            <button
                                onClick={addItemToCart}
                                disabled={buttonAction}
                                className={`${
                                    buttonAction
                                        ? "text-sm max-w-fit bg-gradient-to-b from-green-300 to-green-500 border-green-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 active:from-green-600 px-4 sm:px-6 md:px-8 py-[2px] md:py-2 mb-1 whitespace-nowrap"
                                        : "text-sm max-w-fit bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600 px-4 sm:px-6 md:px-8 py-[2px] md:py-2 mb-1 whitespace-nowrap"
                                }`}>
                                Add to Cart
                            </button>
                            <div className="flex flex-row items-center justify-center mt-1 max-w-fit">
                                {userWishLists.length > 1 ? (
                                    <div>
                                        <button
                                            className="mr-[10px] cursor-pointer text-sm bg-gray-500 hover:bg-gray-600
                                    active:bg-gray-400 text-white px-3 py-1 rounded-lg whitespace-nowrap "
                                            onClick={() => {
                                                setDropDown(!dropDown);
                                            }}>
                                            Move
                                        </button>

                                        {dropDown && (
                                            <div className="fixed border-[2px] bg-white z-10 w-[170px] mt-[5px] h-[90px] overflow-y-scroll">
                                                {userWishLists && (
                                                    <ProductRelocation
                                                        userWishLists={
                                                            userWishLists
                                                        }
                                                        product={product}
                                                        showDropDown={
                                                            showDropDown
                                                        }
                                                        startingList={list}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <button
                                            className="mr-[10px] cursor-pointer text-sm bg-gray-500 hover:bg-gray-600
                                active:bg-gray-400 text-white px-3 py-1 rounded-lg whitespace-nowrap "
                                            onClick={() => {
                                                alert(
                                                    "2 or more lists are required"
                                                );
                                            }}>
                                            Move
                                        </button>
                                    </div>
                                )}

                                <button
                                    className="cursor-pointer text-sm bg-gray-500 hover:bg-gray-600
                                    active:bg-gray-400 text-white px-3 py-1 rounded-lg whitespace-nowrap "
                                    onClick={removeItemFromList}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default WishListProd;
