import React from 'react'
import Header from './Header/Header'
import ProductFeed from './Product List/ProductFeed'
import Banner from './Banner/Banner'
import products from "../Media/products.json"

const Home = () => {
  return (
    <div>
        <Header />
         <main className="max-w-screen-2xl mx-auto">
                <Banner />

                <ProductFeed products={products} />
                </main>
    </div>
  )
}

export default Home
