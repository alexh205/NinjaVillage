import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';
import ReviewImages from '../Images/ReviewImages';
import {
  getAllProductThunk,
  deleteReviewThunk,
} from '../../store/productReducer';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../Loading';
import { authenticate } from '../../store/sessionReducer';

const UserReviews = ({review, productId, user}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productObj = useSelector(
    state => state.productStore.products[review.productId]
  );

  let rating = 0;
  if (review && review.rating) {
    rating = review.rating;
  }

  //? Truncate review text beyond 100 characters
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const max_length = 100; // Maximum number of characters to display before truncating the text

  const truncatedText =
    review.review.length > max_length
      ? review.review.slice(0, max_length) + '...'
      : review.review;

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
    <div className="ml-4 px-3 border-[2px] flex flex-col items-start justify-center h-fit">
      {review && review.owner && productObj && (
        <div className="flex flex-col">
          <div className="flex flex-row items-center mt-2">
            <img
              className="hidden md:block rounded-full h-12 w-12 mr-2"
              src={review.owner.profileImage}
              alt="user"
            />
            <div className="text-base text-ninja_green">
              {review.owner.name}
            </div>
          </div>
          <div className="flex flex-row items-center mt-2 ">
            <p className="text-sm text-gray-500">{productObj.title}</p>
          </div>
        </div>
      )}
      {user && review.owner.id === user.id ? (
        <div className="flex flex-row items-center my-2">
          {hasClickedEdit && <Loading />}
          <button
            className=" mb-2 self-center text-sm bg-gray-300 hover:bg-amber-600 hover:text-white font-semibold px-2 border border-gray-400 rounded shadow mr-2"
            disabled={hasClickedEdit}
            onClick={async e => {
              setHasClickedEdit(true);

              history.push(`/reviews/edit/${productId}`);

              setHasClickedEdit(false);
            }}>
            Edit review
          </button>
          {hasClickedDelete && <Loading />}
          <button
            className=" mb-2 self-center text-sm bg-gray-300 hover:bg-amber-600 hover:text-white font-semibold px-2 border border-gray-400 rounded shadow"
            disabled={hasClickedDelete}
            onClick={async e => {
              await deleteReview(e);
              await dispatch(authenticate())
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
              <FaStar size={14} className="text-yellow-500" key={i} />
            ))
          ) : (
            <FaStar size={14} color={'#e4e5e9'} />
          )}
        </div>
        {review && (
          <div
            className=" ml-3 text-sm text-blue-500 hover:text-amber-600 font-semibold cursor-pointer"
            onClick={() => history.push(`/products/${productId}`)}>
            {review.title}
          </div>
        )}
      </div>
      <div className="w-full">
        <p className="text-gray-600 text-sm truncate truncate-2-lines overflow-hidden whitespace-pre-line">
          {isExpanded ? review.review : truncatedText}
          {review.review.length > max_length && (
            <span
              className="text-blue-500 cursor-pointer text-sm ml-1"
              onClick={toggleExpansion}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </span>
          )}
        </p>
      </div>
      <div>{review && <ReviewImages reviewImages={review.reviewImages} />}</div>
    </div>
  );
};

export default UserReviews;
