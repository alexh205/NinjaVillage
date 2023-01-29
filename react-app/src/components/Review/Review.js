import React from 'react'
import {FaStar} from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Review = ({review, product}) => {
    const reviewOwner = useSelector(state=> state.session.user)

    let rating = 0

    if (review && review.rating) { rating = review.rating}

  return (
    <div>
        <div>
            <div></div>
            <div>

            </div>
        </div>
        <div className='flex flex-row items-center'>
            <div className='flex flex-row'>
            {rating ?[...Array(Math.floor(rating))].map((i)=> <FaStar size={14} className="text-yellow-500" key={i}/>): <FaStar size={14} color={"#e4e5e9"}/>}
            </div>
            {review && (<div className=' ml-3 text-sm font-semibold'>{review.title}</div>)}

        </div>
        <div>
            <div></div>
        </div>
        <div>
            <div className='text-sm mt-1'>{review.review}</div>
        </div>
    </div>
  )
}

export default Review
