import React, {useState} from 'react';
import Header from '../Header/Header';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import {FaStar} from 'react-icons/fa';
import {editReviewThunk, getAllProductThunk} from '../../store/productReducer';
import {authenticate} from '../../store/sessionReducer';
import Loading from '../Loading';
import ImageUpload from '../Images/ImageUpload';
import ReviewGallery from '../Images/ReviewGallery';
import {deleteImageThunk} from '../../store/productReducer';

const EditReview = () => {
  const {productId} = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);
  const product = useSelector(state => state.productStore?.products[productId]);
  const reviewObj = product?.productReviews.find(
    review => review.owner.id === user.id
  );

  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [hover, setHover] = useState('');

  const [valid, setValid] = useState(false);
  const [validateErrors, setValidateErrors] = useState([]);
  const [hasClicked, setHasClicked] = useState(false);

  const [imgDeletion, setImgDeletion] = useState([]);

  let reviewImageArr;
  if (reviewObj) {
    reviewImageArr = [...reviewObj.reviewImages];
  }

  const [galleryImages, setGalleryImages] = useState([...reviewImageArr]);

  if (product && reviewObj && user) {
    if (!valid) {
      setTitle(reviewObj.title);
      setReview(reviewObj.review);
      setRating(reviewObj.rating);
      setHover(reviewObj.rating);
      setValid(true);
    }

    const validate = () => {
      const errors = [];

      if (!title) errors.push("Please provide a 'Title'");
      if (!review) errors.push("Please provide a 'Review'");
      if (!rating) errors.push("Please provide a 'Rating'");

      return errors;
    };

    const onReviewEdit = async e => {
      e.preventDefault();

      const errors = validate();

      if (errors.length > 0) return setValidateErrors(errors);

      const updatedGalleryImages = galleryImages.filter(
        (_, index) => !imgDeletion.includes(index)
      );
      setGalleryImages(updatedGalleryImages);

      imgDeletion.map(async index => {
        const imageId = reviewImageArr[index].id;

        await dispatch(deleteImageThunk(imageId, Number(productId)));
      });
      setImgDeletion([]);
      setHasClicked(true);

      const reviewId = reviewObj.id;

      await dispatch(editReviewThunk(title, review, rating, reviewId));

      setTitle('');
      setReview('');
      setRating(0);
      setHover(0);
      setValid(false);
      setValidateErrors([]);
      await dispatch(getAllProductThunk());
      await dispatch(authenticate());

      setHasClicked(false);

      history.push(`/products/${productId}`);
    };

    return (
      <>
        <Header />
        <div className="inline-flex flex-col  lg:flex mb-6 mx-5 md:mx-40">
          <div className="flex flex-col mt-8 border-b">
            <h1 className="font-bold text-4xl text-ninja_green">Edit Review</h1>
            {validateErrors.length > 0 && (
              <div className="my-2 ml-2">
                <h3 className="font-bold text-[16px] ">
                  The following errors were found:
                </h3>
                <ul className="text-red-600 text-[13px] font-semibold ml-2">
                  {validateErrors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            {product && (
              <div className="flex flex-row items-center my-5">
                <img
                  src={product.image}
                  alt="product"
                  className="w-[60px] h-[70px] mr-4"></img>
                <div className="sm:line-clamp-4">{product.title}</div>
              </div>
            )}
          </div>
          <form className="mt-6">
            <div className="flex flex-row items-center justify-between mb-3 ml-1">
              <h1 className="font-bold text-xl ">Overall Rating</h1>
              <p
                className=" cursor-pointer text-blue-500 text-sm"
                onClick={() => {
                  setRating(0);
                  setHover(0);
                }}>
                Clear
              </p>
            </div>

            <div className="border-b">
              <div className="flex flex-row mb-5">
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={i}>
                      <input
                        className="hidden"
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        required={true}
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar
                        size={40}
                        color={
                          ratingValue <= (hover || rating)
                            ? '#ffc107'
                            : '#e4e5e9'
                        }
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover('')}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="mt-3 flex flex-col border-b ">
              <label className="font-bold text-xl my-4">Add a title</label>
              <input
                className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                type="text"
                size="57"
                maxLength="50"
                name="title"
                onChange={e => setTitle(e.target.value)}
                value={title}
                required={true}
                placeholder="The most important point"></input>
            </div>

            <div className="border-b flex flex-col">
              <label className="font-bold text-xl my-4">Add a review</label>
              <textarea
                className="mb-6 mx-42 border-[2px] p-2 rounded-sm"
                rows="5"
                maxLength="400"
                name="review"
                onChange={e => setReview(e.target.value)}
                value={review}
                required={true}
                placeholder="What did you use the product for? What did you like and dislike?"></textarea>
            </div>
            <div className="flex flex-col items-center justify-center mt-2">
              <h3 className="text-2xl font-bold">Images</h3>
              <div className="flex flex-row justify-start items-center my-4">
                <ReviewGallery
                  imgDeletion={imgDeletion}
                  setImgDeletion={setImgDeletion}
                  galleryImages={galleryImages}
                />
              </div>
              <div>
                {reviewImageArr.length < 4 ? (
                  <div className="flex flex-row items-center border-2 py-2 px-3 whitespace-nowrap">
                    <label
                      htmlFor="file-upload"
                      className="mr-2 md:mr-6 text-lg font-medium text-ninja_green">
                      Upload Image:{' '}
                    </label>
                    <ImageUpload reviewId={reviewObj.id} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-row mt-5 justify-end">
              <button
                className="button"
                onClick={e => {
                  setTitle('');
                  setReview('');
                  setRating(0);
                  setHover(0);
                  setValid(false);
                  history.push(`/products/${productId}`);
                }}>
                Cancel
              </button>
              {hasClicked && <Loading />}
              <button
                className="button ml-2 sm:ml-10"
                disabled={hasClicked}
                onClick={e => {
                  onReviewEdit(e);
                }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default EditReview;
