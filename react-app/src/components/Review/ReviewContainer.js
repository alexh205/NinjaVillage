import React from 'react'
import {FaStar} from 'react-icons/fa'
import Review from './Review'
import { useHistory } from 'react-router-dom'


const ReviewContainer = ({product, user}) => {
    const history = useHistory()


    let ratingTotal = 0
    let ratingAvg;

    if (product && product.productReviews) {
    product.productReviews.forEach(el => { ratingTotal += Number(el.rating)})
    ratingAvg = (ratingTotal/product.productReviews.length)}

  return (
    <div className='flex flex-row border-t border-double mx-3'>

        <div className='flex flex-col mr-20'>
            <div className='mt-6'>
                <div className='text-2xl font-bold'>Customer reviews</div>
                <div className='flex flex-row mt-1'>
                    <div className='mr-3 flex flex-row items-center'>
                        {ratingAvg ? [...Array(Math.floor(ratingAvg))].map((i)=> <FaStar size={23} className="text-yellow-500" key={i}/>) : <FaStar size={23} color={"#e4e5e9"}/>}
                    </div>
                    {ratingAvg && ratingAvg !== NaN ? <div className='text-lg'>{ratingAvg.toFixed(1)} out of 5.0</div> : !ratingAvg && <div>0 out of 5.0</div>}
                </div>
                {product && product.productReviews.length === 1 ? <div className='text-sm text-gray-500 mt-1'>{product.productReviews.length} rating</div> : product && product.productReviews.length > 1 ? <div className='text-sm text-gray-500 mt-1'>{product.productReviews.length} ratings </div>: <div className='text-sm text-gray-500 mt-1'>0 rating</div>}
            </div>
            <div></div>
            {user && product && product.ownerId && product.productReviews && user.id === product.ownerId ? null : !user ? (<div className='flex flex-col border-t border-b mt-3'>
                <div className='mt-4 font-semibold text-lg'>Review this product</div>
                <div className='mt-2 text-sm'>Share your thoughts with other customers</div>
                <button className='mt-2 mb-4 self-center text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-10 border border-gray-600 rounded shadow ' onClick={()=> history.push('/login')}>{!user && 'Sign in to write a review'}</button>
            </div>): product && product.productReviews && (<div className='flex flex-col border-t border-b mt-3'>
                <div className='mt-4 font-semibold text-lg'>Review this product</div>
                <div className='mt-2 text-sm'>Share your thoughts with other customers</div>
                <button disabled={product.productReviews.find(review => review.owner.id === user.id)} className='mt-2 mb-4 self-center text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-10 border border-gray-400 rounded shadow' onClick={()=> history.push(`/reviews/${product.id}`)}>Write a customer review</button>
            </div>)}
        </div>
        <div className='flex flex-col mt-5'>
            <div>
                <div className='text-2xl font-bold mb-2'>User reviews</div>
                <div>
                    {product && product.productReviews && product.productReviews.map((review, i) => <Review review={review} product={product} user={user} key={i}/>)}
                </div>

            </div>
        </div>
    </div>
  )
}

export default ReviewContainer