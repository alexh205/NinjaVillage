import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewImages from "../Images/ReviewImages";
import {
    getAllProductThunk,
    deleteReviewThunk,
} from "../../store/productReducer";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";

const Review = ({ review, product, user }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const productObj = useSelector(
        state => state.productStore.products[review.productId]
    );


    let rating = 0;
    if (review && review.rating) {
        rating = review.rating;
    }

    const [hasClickedEdit, setHasClickedEdit] = useState(false);
    const [hasClickedDelete, setHasClickedDelete] = useState(false);

    const deleteReview = async e => {
        e.preventDefault();
        setHasClickedDelete(true);
        await dispatch(deleteReviewThunk(review.id));
        await dispatch(getAllProductThunk());
        setHasClickedDelete(false);
    };

    return (
        <div className="ml-4 border-b">
            {review && review.owner && productObj && (
                <div className="flex flex-col">
                    <div className="flex flex-row items-center mt-2">
                        <img
                            className="hidden md:block rounded-full h-12 w-12 mr-2"
                            src={review.owner.profileImage}
                            alt="user"></img>
                        <div className="text-sm text-teal-700">
                            {review.owner.name}
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-2 ">
                    <p className="text-xs text-gray-500">{productObj.title}</p>
                    </div>
                </div>
            )}
            {user && review.owner.id === user.id ? (
                <div className="flex flex-row items-center my-2">
                    <button
                        className={`${
                            hasClickedEdit === true
                                ? "hidden"
                                : " mb-2 self-center text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow mr-2"
                        }`}
                        onClick={async e => {
                            setHasClickedEdit(true);
                            history.push(`/reviews/edit/${product.id}`);
                            setHasClickedEdit(false);
                        }}>
                        {hasClickedEdit ? <Loading /> : "Edit review"}
                    </button>
                    <button
                        className={`${
                            hasClickedDelete === true
                                ? "hidden"
                                : " mb-2 self-center text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow"
                        }`}
                        disabled={hasClickedDelete === true}
                        onClick={async e => {
                            deleteReview(e);
                        }}>
                        {hasClickedDelete ? <Loading /> : "Delete review"}
                    </button>
                </div>
            ) : (
                !user && null
            )}

            <div className="flex flex-row items-center mt-1">
                <div className="hidden md:flex flex-row ">
                    {rating ? (
                        [...Array(Math.floor(rating))].map((star, i) => (
                            <FaStar
                                size={14}
                                className="text-yellow-500"
                                key={i}
                            />
                        ))
                    ) : (
                        <FaStar size={14} color={"#e4e5e9"} />
                    )}
                </div>
                {review && (
                    <div className=" ml-3 text-sm font-semibold">
                        {review.title}
                    </div>
                )}
            </div>
            <div>
                <div className="text-sm mt-1 mb-2 line-clamp-1">
                    {review.review}
                </div>
            </div>
            <div>
                {review && <ReviewImages reviewImages={review.reviewImages} />}
            </div>
        </div>
    );
};

export default Review;
