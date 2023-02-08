import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FilteredProd } from './FilteredProd'
import Header from '../Header/Header'

const Filters = () => {
  const{filterId} = useParams()

  const products = useSelector(state => state.productStore.products)

  const userCart = useSelector(state => state.session.activeCart)
  const user = useSelector(state => state.session.user)
  let filteredProd= []
   Object.values(products).map((product, i) => {
      if(product.category === filterId){
      filteredProd.push(product)}
      if(filterId === 'All'){
        filteredProd = Object.values(products)
      }
 })


  if(filteredProd){
  return (
    <><Header />
    <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 my-7'>

      {filteredProd && filteredProd.map((product,i)=> (<div className='w-max-[9vw] h-max-[10vh] w-min-[9vw] h-min-[10vh]' key={i} >
        <FilteredProd product={product} user={user} userCart={userCart}   />
        </div>))}
    </div>
    </>
  )}

  // if()
}

export default Filters
