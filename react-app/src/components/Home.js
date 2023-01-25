import React,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import Header from './Header/Header'
import ProductFeed from './Product List/ProductFeed'
import Banner from './Banner/Banner'
import { getAllProductThunk} from '../store/productReducer'


const Home = () => {
  const dispatch = useDispatch()

  useEffect(()=> {

    dispatch(getAllProductThunk())

  },[])

  const allProducts = useSelector(state => state.productStore.products)
  const currentCart = useSelector(state => state.activeCart)

  return (
    <div>
        <Header />
         <main className="max-w-screen-2xl mx-auto">
                <Banner />

                <ProductFeed products={allProducts} />
                </main>
    </div>
  )
}

export default Home
