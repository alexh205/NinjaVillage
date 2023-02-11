import React from 'react'

const ReviewImages = ({reviewImages}) => {
  return (
    <div className='flex flex-row mb-2'>
      {reviewImages.map((image, i) => (<img className='flex w-[70px] h-[90px] border-2 p-1 m-1' key={i} src={image.url} alt='user review'/>))}

    </div>
  )
}

export default ReviewImages
