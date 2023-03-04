import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header/Header";
import ProductFeed from "./Product/ProductFeed";
import Banner from "./Banner/Banner";
import Footer from "./Footer/Footer";

const Home = () => {
    const products = useSelector(state => state.productStore.products);
    const currentUser = useSelector(state => state.session.user);
    const cartArr = useSelector(state => state.cartStore.addedItems);

    // const randomizedProducts = Object.values(products).sort(() => Math.random() - 0.5).slice(0, 15)

    return (
        <div>
            <section id="header">
                <Header
                    cart={
                        cartArr && cartArr.length && currentUser
                            ? cartArr.length
                            : 0
                    }
                    products={products}
                />
            </section>
            <main className="max-w-screen-2xl mx-auto">
                <Banner />
                <ProductFeed products={products} user={currentUser} />
            </main>
            <div>
                <a href="#header">
                    <div className="flex flex-col items-center justify-center cursor-pointer mb-5">
                        <p className="text-[12px] md:text-lg text-teal-700 hover:text-amber-600">
                            Back to the top
                        </p>
                    </div>
                </a>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
