import React from 'react'

const ReviewImages = ({reviewImages}) => {
  return (
    <div className='flex flex-row mb-2'>
      {reviewImages.map(image => (<img className='flex w-[70px] h-[90px] border-2 p-1 m-1' src={image.url} />))}

    </div>
  )
}

export default ReviewImages
