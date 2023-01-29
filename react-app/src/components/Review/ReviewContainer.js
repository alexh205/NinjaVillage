import React from 'react'
import {FaStar} from 'react-icons/fa'
import ReviewImage from '../Photos/ReviewImage'
import Review from './Review'


const ReviewContainer = ({product, user}) => {
    let ratingTotal = 0
    let ratingAvg;

    if (product && product.productReviews) {
    product.productReviews.forEach(el => { ratingTotal += el.rating})
    ratingAvg = (ratingTotal/product.productReviews.length)}

  return (
    <div className='flex flex-row border-t border-double mx-3'>

        <div className='flex flex-col mr-12'>
            <div className='mt-6'>
                <div className='text-xl font-bold'>Customer reviews</div>
                <div className='flex flex-row mt-1'>
                    <div className='mr-3 flex flex-row items-center'>
                        {ratingAvg ? [...Array(Math.floor(ratingAvg))].map((i)=> <FaStar size={23} className="text-yellow-500" key={i}/>) : <FaStar size={23} color={"#e4e5e9"}/>}

                    </div>
                    {ratingAvg && ratingAvg !== NaN ? <div className='text-lg'>{ratingAvg} out of 5</div> : !ratingAvg && <div>0 out of 5</div>}
                </div>
                {product && product.productReviews.length === 1 ? <div className='text-sm text-gray-500 mt-1'>{product.productReviews.length} rating</div> : product && product.productReviews.length > 1 ? <div className='text-sm text-gray-500 mt-1'>{product.productReviews.length}ratings </div>: <div className='text-sm text-gray-500 mt-1'>0 rating</div>}
            </div>
            <div></div>
            <div></div>
        </div>
        <div className='flex flex-col mt-6'>
            <div className='flex flex-col'>
                <div className='text-lg font-bold'>Review Images</div>
                <div>
                    {product && product.productReviews && product.productReviews.map((review, i) => (<ReviewImage review={review} key={i}/>))}
                </div>
            </div>
            <div>
                <div className='text-lg font-bold'>User reviews</div>
                <div>
                    {product && product.productReviews && product.productReviews.map((review, i) => <Review review={review} key={i}/>)}
                </div>

            </div>
        </div>
    </div>
  )
}

export default ReviewContainer
