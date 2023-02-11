import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FilteredProd } from "./FilteredProd";
import Header from "../Header/Header";

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
    });

    return (
        <>
            <Header />
            <div>
                <div className="flex flex-row items-center text-[15px] text-gray-500 m-2 ml-4">
                    <p>Category -></p>
                    <p className="ml-2">{filterId}</p>
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
        </>
    );
};

export default Filters;


// className={`${
//     user && product.ownerId === user.id
//         ? "hidden"
//         : "w-max-[8vw] h-max-[9vh] w-min-[8vw] h-min-[9vh]"
// }`}
