import React from 'react'
import {useSelector} from "react-redux"
import Header from './Header/Header'
import ProductFeed from './Product/ProductFeed'
import Banner from './Banner/Banner'



const Home = () => {

  const products = useSelector(state => state.productStore.products)
  const currentUser = useSelector(state => state.session.user)
  const userCart = useSelector(state => state.session.activeCart)
  const cartArr = useSelector(state => state.session.activeCart.cartProducts)

  return (
    <div>
      <Header cart={cartArr && cartArr.length && currentUser ? cartArr.length : 0} products={products}/>
        <main className="max-w-screen-2xl mx-auto">
          <Banner />
          <ProductFeed products={products} user={currentUser} userCart={userCart}/>
        </main>
    </div>
  )
}

export default Home
