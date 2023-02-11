import React from "react";
import { FaStar } from "react-icons/fa";
import ReviewImages from "../Images/ReviewImages";
import {
    getAllProductThunk,
    deleteReviewThunk,
} from "../../store/productReducer";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Review = ({ review, product, user }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    let rating = 0;
    if (review && review.rating) {
        rating = review.rating;
    }

    return (
        <div className="ml-4 border-b">
            {review && review.owner && (
                <div className="flex flex-row items-center mt-2">
                    <img
                        className="hidden md:block rounded-full h-12 w-12 mr-2"
                        src={review.owner.profileImage}
                        alt="user"></img>
                    <div className="text-sm text-teal-700">
                        {review.owner.name}
                    </div>
                </div>
            )}
            {user && review.owner.id === user.id ? (
                <div className="flex flex-row items-center my-2">
                    <button
                        className=" mb-2 self-center text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow mr-2"
                        onClick={async e => {
                            e.preventDefault();
                            history.push(`/reviews/edit/${product.id}`);
                        }}>
                        Edit review
                    </button>
                    <button
                        className=" mb-2 self-center text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow"
                        onClick={async e => {
                            e.preventDefault();

                            await dispatch(deleteReviewThunk(review.id));
                            await dispatch(getAllProductThunk());
                        }}>
                        Delete review
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
