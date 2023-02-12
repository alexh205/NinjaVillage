import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartReducer";
import { FaStar } from "react-icons/fa";
import ReviewContainer from "../Review/ReviewContainer";
import {
    getAllProductThunk,
    deleteProductThunk,
} from "../../store/productReducer";
import { getUserThunk, authenticate } from "../../store/sessionReducer";
import Loading from "../Loading";

const ProductDetail = () => {
    const [hasClickedEdit, setHasClickedEdit] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);
    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const product = useSelector(
        state => state.productStore.products[productId]
    );

    if (!product) {
        history.push("/");
    }
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        (async () => {
            await dispatch(getUserThunk(product.ownerId));
        })();
    }, [dispatch]);

    const owner = useSelector(state => state.session.productOwner);

    let ratingTotal = 0;
    let ratingAvg;

    if (product && product.productReviews) {
        product.productReviews.forEach(el => {
            ratingTotal += Number(el.rating);
        });
        ratingAvg = ratingTotal / product.productReviews.length;
    }

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
        await dispatch(addToCart(item));
    };

    const deleteItem = async e => {
        e.preventDefault();
        setHasClicked(true);
        await dispatch(deleteProductThunk(productId));
        await dispatch(getAllProductThunk());
        await dispatch(authenticate());
        setHasClicked(false);
        history.push("/");
    };

    return (
        <>
            <Header />
            <div className="flex flex-col mt-6 mx-3 ">
                {product && owner && (
                    <div className="flex flex-row mb-5">
                        <div className="flex flex-row ">
                            <div className="flex flex-col justify-center">
                                {user && product.ownerId === user.id ? (
                                    <div className="flex flex-row items-center justify-center my-4">
                                        <button
                                            className={`${
                                                hasClicked === true
                                                    ? "hidden"
                                                    : " flex mt-2 mb-4 self-center text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold px-5 border border-gray-400 rounded shadow mr-3"
                                            }`}
                                            onClick={e => {
                                                setHasClickedEdit(true);
                                                history.push(
                                                    `/products/edit/${productId}`
                                                );
                                                setHasClickedEdit(false);
                                            }}>
                                            {hasClickedEdit ? (
                                                <Loading />
                                            ) : (
                                                "Edit listing"
                                            )}
                                        </button>

                                        <button
                                            className={`${
                                                hasClicked === true
                                                    ? "hidden"
                                                    : " flex mt-2 mb-4 self-center text-xs bg-white hover:bg-gray-100 text-gray-800  font-semibold px-5 border border-gray-400 rounded shadow"
                                            }`}
                                            onClick={async e => {
                                                deleteItem(e);
                                            }}>
                                            {hasClicked ? (
                                                <Loading />
                                            ) : (
                                                "Delete listing"
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    !user && null
                                )}

                                <img
                                    className="hidden md:flex md:min-w-[300px] min-w-[250px] md:min-h-[280px] max-h-[300px] object-contain"
                                    src={product.image}
                                    alt="product"
                                />
                            </div>

                            <div className="flex flex-col ml-7">
                                <div className="md:text-[28px] text-[22px] font-semibold">
                                    {product.title}
                                </div>

                                <div
                                    className="text-[15px] cursor-pointer text-sky-600 text-bold"
                                    onClick={() => history.push("/listings")}>
                                    Visit {owner.name}'s store
                                </div>

                                <div className="flex flex-row items-center mb-2">
                                    <div className="flex flex-row items-center my-2 mr-4">
                                        {ratingAvg ? (
                                            [
                                                ...Array(Math.floor(ratingAvg)),
                                            ].map((star, i) => (
                                                <FaStar
                                                    size={17}
                                                    className="text-yellow-500"
                                                    key={i}
                                                />
                                            ))
                                        ) : (
                                            <FaStar
                                                size={20}
                                                color={"#e4e5e9"}
                                            />
                                        )}
                                    </div>

                                    <div>
                                        {product &&
                                        product.productReviews.length === 1 ? (
                                            <div className="text-sm text-ninja_green">
                                                {product.productReviews.length}{" "}
                                                rating
                                            </div>
                                        ) : product &&
                                          product.productReviews.length > 1 ? (
                                            <div className="text-sm text-ninja_green ">
                                                {product.productReviews.length}{" "}
                                                ratings
                                            </div>
                                        ) : (
                                            <div className="text-sm text-sky-600">
                                                0 rating
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="border-b border-1"></div>
                                <div className="flex flex-row"></div>
                                <div className="flex flex-row">
                                    <p className="mr-2 my-2">Price: </p>
                                    <p className="text-orange-700 text-lg my-2">
                                        ${product.price}
                                    </p>
                                </div>
                                <div className="border-b border-1"></div>

                                <div className="flex flex-col">
                                    <p className="my-2 text-lg font-medium">
                                        About this item:
                                    </p>
                                    <div>
                                        <p className="text-md mb-1 ml-2 text-teal-600">
                                            Description:
                                        </p>
                                        <p className="text-sm block ml-5">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-md my-1 ml-2 text-teal-600">
                                            Brand:
                                        </p>
                                        <p className="text-sm block ml-5">
                                            {product.brand}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-md my-1 ml-2 text-teal-600">
                                            Category:
                                        </p>
                                        <p className="text-sm block ml-5">
                                            {product.category}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-1"></div>
                        </div>
                        <div className="flex flex-row justify-end self-start md:w-[140px] md:min-w-[140px] min-w-[80px] w-[80px] md:text-[10px] text-[14px] mr-20">
                            {user && (
                                <button
                                    disabled={user.id === product.ownerId}
                                    className={`${
                                        user.id === product.ownerId
                                            ? "hidden cursor-not-allowed"
                                            : "button"
                                    }`}
                                    onClick={() => {
                                        if (!user) {
                                            history.push("/login");
                                        } else {
                                            addItemToCart();
                                        }
                                    }}>
                                    {!user
                                        ? "Sign in to add item"
                                        : "Add to Cart"}
                                </button>
                            )}
                        </div>
                    </div>
                )}
                <div>
                    <ReviewContainer product={product} user={user} />
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
