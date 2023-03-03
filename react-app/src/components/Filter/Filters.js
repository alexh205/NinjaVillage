import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FilteredProd } from "./FilteredProd";
import Header from "../Header/Header";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const Filters = () => {
    const { filterId } = useParams();

    const products = useSelector(state => state.productStore.products);

    const userCart = useSelector(state => state.session.activeCart);
    const user = useSelector(state => state.session.user);

    let filteredProd = [];
    Object.values(products).map(product => {
        if (product.category === filterId) {
            filteredProd.push(product);
        }
        if (filterId === "All") {
            filteredProd = Object.values(products);
        }
        return null;
    });
    // const randomizedProducts = filteredProd.sort(() => Math.random() - 0.5)

    return (
        <>
            <section id="filters">
                <Header />
            </section>
            <div>
                <div className="flex flex-row items-center text-[17px] text-gray-500 m-2 ml-4">
                    <p>Category </p>
                    <MdOutlineArrowRightAlt className="mt-[2px]" />
                    <p className="ml-1">{filterId}</p>
                </div>

                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-7">
                    {filteredProd &&
                        filteredProd.map((product, i) => (
                            <div
                                className={
                                    "w-max-[8vw] h-max-[9vh] w-min-[8vw] h-min-[9vh]"
                                }
                                key={i}>
                                <FilteredProd
                                    product={product}
                                    user={user}
                                    userCart={userCart}
                                />
                            </div>
                        ))}
                </div>
            </div>
            <footer>
                <a href="#filters">
                    <div className="flex flex-col items-center justify-center cursor-pointer mb-5">
                        <p className="text-[10px] md:text-lg text-teal-700 hover:text-amber-600">
                            Back to the top
                        </p>
                    </div>
                </a>
            </footer>
        </>
    );
};

export default Filters;
