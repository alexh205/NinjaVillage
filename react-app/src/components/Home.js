import React,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import Header from './Header/Header'
import ProductFeed from './Product List/ProductFeed'
import Banner from './Banner/Banner'
import { getAllProductThunk} from '../store/productReducer'
import { setActiveCart } from '../store/sessionReducer'


const Home = () => {
  const dispatch = useDispatch()

  const allProducts = useSelector(state => state.productStore.products)

  const currentUser = useSelector(state => state.session.user)
  const userCart = useSelector(state => state.session.activeCart)
  const cartArr = useSelector(state => state.session.activeCart.cartProducts)

  useEffect(()=> {

    dispatch(getAllProductThunk())

  },[])


  useEffect(()=> {
    if (currentUser && !currentUser.activeCart) {
      let userCart = currentUser.ownedCarts.filter(
           cart => cart.checkedOut === false
       );
       dispatch(setActiveCart(userCart))
   }
  }, [currentUser])
  
  useEffect(()=> {
    if (currentUser && !currentUser.activeCart) {
      let userCart = currentUser.ownedCarts.filter(
           cart => cart.checkedOut === false
       );
       dispatch(setActiveCart(userCart))
   }
  }, [currentUser])


  return (
    <div>
      <Header cart={cartArr && cartArr.length && currentUser ? cartArr.length : 0}/>
        <main className="max-w-screen-2xl mx-auto">
          <Banner />
          <ProductFeed products={allProducts} user={currentUser} userCart={userCart}/>
        </main>
    </div>
  )
}

export default Home
