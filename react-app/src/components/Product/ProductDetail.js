import React from 'react'
import { useParams, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import Currency from "react-currency-formatter";
import { addCartItemThunk } from '../../store/sessionReducer';
import {FaStar} from 'react-icons/fa'
import ReviewContainer from '../Review/ReviewContainer';
import { getAllProductThunk, deleteProductThunk } from '../../store/productReducer';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch()
  const history = useHistory()

  const product = useSelector(state=> state.productStore.products[productId])
  const userCart = useSelector(state => state.session.activeCart)
  const user = useSelector(state => state.session.user)

  let ratingTotal = 0;
  let ratingAvg;

  if (product && product.productReviews) {
    product.productReviews.forEach(el => { ratingTotal += Number(el.rating)

    })
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
      {product && (<div className='flex flex-row mb-5'>
        <div className='flex flex-row '>
          <div className='flex flex-col '>
            {user &&
            (product.ownerId === user.id) ? (<div className='flex flex-row items-center justify-center my-4'>
              <button className='mt-2 mb-4 self-center text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold px-5 border border-gray-400 rounded shadow mr-3' onClick={e => {
                history.push(`/products/${productId}/edit`)
              }}>Edit listing</button>

              <button className='mt-2 mb-4 self-center text-xs bg-white hover:bg-gray-100 text-gray-800   font-semibold px-5 border border-gray-400 rounded shadow' onClick={ async (e) => {
                e.preventDefault()

                await dispatch(deleteProductThunk(productId))
                await dispatch(getAllProductThunk())
                history.push('/')
              }}>Delete listing</button></div>)
              :(!user) && (null)}

            <img className='w-[300px] h-[340px] object-contain' src={product.image} alt=''/>
            {/* <p className='text-center text-sm text-gray-500'>Roll over image to zoom in</p> */}
          </div>

          <div className='flex flex-col ml-8'>
            <div className='text-[28px] font-semibold'>{product.title}
            </div>

            <div className='text-sm cursor-pointer text-sky-600 text-semibold'>Visit {product.brand}</div>

            <div className='flex flex-row items-center mb-2'>
              <div className='flex flex-row items-center my-2 mr-4'>
              {ratingAvg ?[...Array(Math.floor(ratingAvg))].map((i)=> <FaStar size={17} className="text-yellow-500" key={i}/>): <FaStar size={20} color={"#e4e5e9"}/>}
              </div>

                <div>{product && product.productReviews.length === 1 ? <div className='text-sm text-sky-600'>{product.productReviews.length} rating</div> : product && product.productReviews.length > 1 ? <div className='text-sm text-sky-600 '>{product.productReviews.length} ratings </div>: <div className='text-sm text-sky-600'>0 rating</div>}</div>

              </div>
            <div className='border-b border-1'></div>
            <div className='flex flex-row'>
            {/* <p className='mr-2'>List Price:</p> */}

            </div>
            <div className='flex flex-row'>
              <p className='mr-2 my-2'>Price: </p>
              <p className='text-orange-700 text-lg my-2'><Currency quantity={product.price}/></p>
              </div>
              <div className='border-b border-1'>
              </div>

          <div className='flex flex-col'>
          <p className='my-2 text-lg font-medium'>About this item:</p>
          <div>
            <p className='text-md mb-1 ml-2 text-teal-600'>Description: </p>
            <p className='text-sm block ml-7'>{product.description}</p>
            </div>

          <div>
            <p className='text-md my-1 ml-2 text-teal-600'>Brand: </p>
            <p className='text-sm block ml-7'>{product.brand}</p>
            </div>
          <div>
            <p className='text-md my-1 ml-2 text-teal-600'>Category: </p>
            <p className='text-sm block ml-7'>{product.category}</p>
            </div>

          </div>
          </div>
          <div className='border-b border-1'></div>
        </div>
        <div>
          <button className="mt-auto button" onClick={()=> {if (!user) {history.push('/login')} else {addItemToCart()}
          }}>
                {!user ? 'Sign in to add item' : 'Add to Cart'}
            </button>
            </div>
      </div>)}
    <div>
      <ReviewContainer product={product} user={user}/>
    </div>
    </div>
    </>
  )
}

export default ProductDetail
