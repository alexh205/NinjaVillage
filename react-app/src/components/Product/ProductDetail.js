import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import Currency from "react-currency-formatter";
import { addCartItemThunk } from '../../store/sessionReducer';
import {FaStar} from 'react-icons/fa'
import ReviewContainer from '../Review/ReviewContainer';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch()

  const product = useSelector(state=> state.productStore.products[productId])
  const userCart = useSelector(state => state.session.activeCart)
  const userSession = useSelector(state => state.session.user)

  let ratingTotal = 0;
  let ratingAvg;

  if (product && product.productReviews) {
    product.productReviews.forEach(el => { ratingTotal += el.rating})
    ratingAvg = (ratingTotal/product.productReviews.length)}

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
    <>
    <Header />
    <div className='flex flex-col mt-6 mx-4'>
      {product && (<div className='flex flex-row'>
        <div className='flex flex-row '>
          <div className='flex flex-col '>
          {(product.ownerId === userSession.id) && (<div className='flex flex-row items-center justify-center my-4'><button className='button mr-3'>Edit listing</button> <button className='button'>Delete listing</button></div>)}
            <img className='w-[250px] object-contain' src={product.image} alt=''/>
            <p className='text-center text-sm text-gray-500'>Roll over image to zoom in</p>
          </div>
          <div className='flex flex-col ml-14'>

            <div className='text-[28px] font-semibold'>{product.title}</div>
            <div className='text-sm cursor-pointer text-sky-600 text-semibold'>Visit {product.brand}</div>
            <div className='flex flex-row items-center'>
              <div className='flex flex-row items-center my-2 mr-4'> {ratingAvg ?[...Array(Math.floor(ratingAvg))].map((i)=> <FaStar size={17} className="text-yellow-500" key={i}/>): <FaStar size={20} color={"#e4e5e9"}/>}</div>
                <div>{product && product.productReviews.length === 1 ? <div className='text-sm text-sky-600 mt-1'>{product.productReviews.length} rating</div> : product && product.productReviews.length > 1 ? <div className='text-sm text-sky-600 mt-1'>{product.productReviews.length}ratings </div>: <div className='text-sm text-sky-600 mt-1'>0 rating</div>}</div>
              </div>
            <div className='border-b border-1'></div>
            <div className='flex flex-row'>
            <p className='mr-2'>List Price:</p>
            <p></p>

            </div>
            <div className='flex flex-row'>
              <p className='mr-2'>Price: </p>
              <p className='text-orange-700 text-lg'><Currency quantity={product.price}/></p>
              </div>
              <div className='border-b border-1'></div>
          <div className='flex flex-col'>
          <p className='mb-1'>About this item:</p>
          <div>
            <p className='text-sm mb-1 ml-2 text-teal-600'>Description: </p>
            <p className='text-xs block ml-7'>{product.description}</p>
            </div>
          <div>
            <p className='text-sm my-1 ml-2 text-teal-600'>Brand: </p>
            <p className='text-xs block ml-7'>{product.brand}</p>
            </div>
          <div>
            <p className='text-sm my-1 ml-2 text-teal-600'>Category: </p>
            <p className='text-xs block ml-7'>{product.category}</p>
            </div>

          </div>
          </div>
          <div className='border-b border-1'></div>
        </div>
        <div>
          <button className="mt-auto button" onClick={addItemToCart}>
                Add to Cart
            </button></div>
      </div>)}
    <div>
      <ReviewContainer product={product} user={userSession}/>
    </div>
    </div>
    </>
  )
}

export default ProductDetail
