import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import Currency from "react-currency-formatter";

const ProductDetail = () => {
  const { productId } = useParams();

  const product = useSelector(state=> state.productStore.products[productId])
  console.log(product)
  return (
    <>
    <Header />
    <div className='flex flex-col mt-6 mx-4'>
      {product && (<div className='flex flex-row'>
        <div className='flex flex-row'>
          <div className='flex flex-col'>
            <img className='w-[350px] object-contain' src={product.image} alt=''/>
            <p className='text-center text-sm text-gray-500'>Roll over image to zoom in</p>
          </div>
          <div className='flex flex-col'>
            <div className='text-2xl font-semibold'>{product.title}</div>
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
            <div></div>
          </div>
        </div>
        <div></div>
      </div>)}

    </div>
    </>
  )
}

export default ProductDetail
