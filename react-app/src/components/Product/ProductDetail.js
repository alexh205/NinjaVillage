import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartReducer";
import { FaStar } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import ReviewContainer from "../Review/ReviewContainer";
import {
    getAllProductThunk,
    deleteProductThunk,
} from "../../store/productReducer";
import { getUserThunk, authenticate } from "../../store/sessionReducer";
import Loading from "../Loading";
import WishListDropDown from "../WishList/WishListDropDown";

const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [hasClickedEdit, setHasClickedEdit] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);
    const [buttonAction, setButtonAction] = useState(false);

    const [dropDown, setDropDown] = useState(false);
    const showDropDown = Boolean => setDropDown(false);

    const user = useSelector(state => state.session.user);
    const owner = useSelector(state => state.session.productOwner);
    const userWishLists = useSelector(state => state.listStore.userLists);

    const product = useSelector(
        state => state.productStore.products[productId]
    );

    if (!product) {
        history.push("/");
    }

    useEffect(() => {
        (async () => {
            await dispatch(getUserThunk(product.ownerId));
        })();
    }, [dispatch]);

    let ratingTotal = 0;
    let ratingAvg;

    if (product && product.productReviews) {
        product.productReviews.forEach(el => {
            ratingTotal += Number(el.rating);
        });
        ratingAvg = ratingTotal / product.productReviews.length;
    }

    const addItemToCart = async () => {
        setButtonAction(true);
        try {
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
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setButtonAction(false);
            }, 600);
        }
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
            <div className="flex flex-col mt-6 mx-10 ">
                {product && owner && (
                    <div className="flex flex-row mb-5">
                        <div className="flex flex-row ">
                            <div className="flex flex-col justify-center">
                                {user && product.ownerId === user.id ? (
                                    <div className="flex flex-col sm:flex-row items-center justify-start sm:justify-center my-4">
                                        {hasClickedEdit && <Loading />}
                                        <button
                                            className="mt-2 mb-2  text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow mr-2"
                                            disabled={hasClickedEdit}
                                            onClick={e => {
                                                setHasClickedEdit(true);
                                                history.push(
                                                    `/products/edit/${productId}`
                                                );
                                                setHasClickedEdit(false);
                                            }}>
                                            Edit listing
                                        </button>
                                        {hasClicked && <Loading />}
                                        <button
                                            className="flex mt-2 mb-2  text-xs bg-white hover:bg-gray-100 text-gray-800  font-semibold px-2 border border-gray-400 rounded shadow"
                                            disabled={hasClicked}
                                            onClick={async e => {
                                                deleteItem(e);
                                            }}>
                                            Delete listing
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

                            <div className="flex flex-col ml-7 mr-2">
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
                                <div className="border-b border-1 mr-2"></div>
                                <div className="flex flex-row"></div>
                                <div className="flex flex-row">
                                    <p className="mr-2 my-2">Price: </p>
                                    <p className="text-orange-700 text-lg my-2">
                                        ${product.price}
                                    </p>
                                </div>
                                <div className="border-b border-1 mr-2"></div>

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
                            <div className="border-b border-1 mr-2"></div>
                        </div>
                        {user ? (
                            <div
                                className={`${
                                    user.id === product.ownerId
                                        ? "hidden "
                                        : "flex flex-col justify-center items-center self-start md:w-[215px] sm:min-w-[180px] md:min-w-[215px] min-w-[100px] w-[100px] sm:text-[9px] md:text-[10px] text-[14px] mr-5 sm:mr-10 border-[2px] p-3"
                                }`}>
                                <div>
                                    {user && (
                                        <button
                                            disabled={
                                                user.id === product.ownerId ||
                                                buttonAction
                                            }
                                            className={`${
                                                user.id === product.ownerId
                                                    ? "hidden cursor-not-allowed"
                                                    : buttonAction
                                                    ? "mt-auto cursor-pointer p-2 font-bold text-[11px] md:text-sm  text-white rounded-sm bg-green-600 border-green-600 focus:ring-2 focus:ring-green-700 focus:outline-none"
                                                    : "mt-auto button"
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
                                                : buttonAction
                                                ? "Added"
                                                : "Add to Cart"}
                                        </button>
                                    )}
                                </div>
                                <hr className="w-[140%] sm:w-[115%] mt-4"></hr>
                                <div className="flex flex-row mt-5 items-center justify-center border-[2px] rounded-lg ">
                                    <div className="text-[9px] sm:text-[13px] font-semibold sm:pl-[6px] pl-[4px] py-[4px] border-r-[1px]">
                                        <div
                                            className="hover:text-amber-700 w-[80px] sm:w-[145px] cursor-pointer"
                                            onClick={() =>
                                                setDropDown(!dropDown)
                                            }>
                                            Add to List
                                        </div>
                                        {dropDown && (
                                            <div className="fixed border-[2px] bg-white z-10 w-[170px] mt-[7px] h-[90px] overflow-y-scroll">
                                                {user && userWishLists && (
                                                    <WishListDropDown
                                                        userWishLists={
                                                            userWishLists
                                                        }
                                                        product={product}
                                                        showDropDown={
                                                            showDropDown
                                                        }
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="md:flex hidden">
                                        <ChevronDownIcon
                                            className="h-5 pl-[1px] pr-[2px] w-[100%] hover:text-amber-700 cursor-pointer"
                                            onClick={() =>
                                                setDropDown(!dropDown)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="flex flex-col justify-center items-center self-start md:w-[215px] sm:min-w-[180px] md:min-w-[215px] min-w-[100px] w-[100px] sm:text-[9px] md:text-[10px] text-[14px] mr-5 sm:mr-10 border-[2px] p-3"
                                onClick={() => history.push("/login")}>
                                <div>
                                    <button className="mt-2 mb-2 self-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 text-[10px] sm:text-[13px] border border-gray-600 rounded shadow">
                                        Sign in to add items
                                    </button>
                                </div>
                                <hr className="w-[140%] sm:w-[115%] mt-4"></hr>
                                <div className="flex flex-row mt-5 items-center justify-center border-[2px] rounded-lg cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800  border-gray-600  shadow">
                                    <div
                                        className="text-[9px] sm:text-[13px] font-semibold sm:pl-[6px] pl-[4px] py-[4px] border-r-[1px]"
                                        onClick={() => history.push("/login")}>
                                        <div className="  w-[80px] sm:w-[145px]">
                                            Sign in for Lists
                                        </div>
                                    </div>
                                    <div className="md:flex hidden">
                                        <ChevronDownIcon className="h-5 pl-[1px] pr-[2px] w-[100%]" />
                                    </div>
                                </div>
                            </div>
                        )}
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
