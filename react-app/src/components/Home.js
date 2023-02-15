import React from 'react'
import {useSelector} from "react-redux"
import Header from './Header/Header'
import ProductFeed from './Product/ProductFeed'
import Banner from './Banner/Banner'
import Footer from './Footer/Footer'



const Home = () => {

  const products = useSelector(state => state.productStore.products)
  const currentUser = useSelector(state => state.session.user)
  const cartArr = useSelector(state => state.cartStore.addedItems)

  const randomizedProducts = Object.values(products).sort(() => Math.random() - 0.5).slice(0, 15)
 

  return (
    <div>
      <Header cart={cartArr && cartArr.length && currentUser ? cartArr.length : 0} products={products}/>
        <main className="max-w-screen-2xl mx-auto">
          <Banner />
          <ProductFeed products={randomizedProducts} user={currentUser}/>
        </main>
        <Footer />
    </div>
  )
}

export default Home
