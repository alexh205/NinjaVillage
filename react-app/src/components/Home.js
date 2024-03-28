import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header/Header';
import ProductFeed from './Product/ProductFeed';
import Banner from './Banner/Banner';
import Footer from './Footer/Footer';
import { GiRunningNinja } from 'react-icons/gi';

const Home = () => {
  const products = useSelector(state => state.productStore.products);
  const currentUser = useSelector(state => state.session.user);
  const cartArr = useSelector(state => state.cartStore.addedItems);

  return (
    <div>
      <section id="header">
        <Header
          cart={cartArr && cartArr.length && currentUser ? cartArr.length : 0}
          products={products}
        />
      </section>
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} user={currentUser} />
      </main>
      <div>
        <a
          href="#header"
          className="flex flex-row items-center justify-center cursor-pointer my-4 pb-10">
          <GiRunningNinja className="h-[30px] w-[30px] mr-2 " />
          <div className="text-blue-500 hover:text-amber-600 hover:shadow-lg transition duration-300 text-center text-lg md:text-xl font-bold ">
            Scroll to the top
          </div>
          <GiRunningNinja className="h-[30px] w-[30px] mr-2  ml-2 transform scale-x-[-1]" />
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
