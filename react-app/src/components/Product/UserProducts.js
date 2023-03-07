import React from "react";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import Product from "./Product";
import { useHistory } from "react-router-dom";
import { GiRunningNinja } from "react-icons/gi";

const UserProducts = () => {
    const history = useHistory();
    const storeOwner = useSelector(state => state.session.productOwner);

    let storeProducts;

    if (storeOwner) {
        storeProducts = storeOwner.ownedProducts;
    }

    if (!storeOwner) {
        history.push("/");
    }
    return (
        <>
            <section id="header">
                <Header />
            </section>
            {storeOwner && storeProducts && (
                <div className="flex flex-col items-center mt-7">
                    <div className="flex flex-row items-center">
                        <img
                            src={storeOwner.profileImage}
                            alt="user"
                            className="hidden md:flex rounded-full max-h-[100px] mr-3"
                        />
                        <p className="font-bold text-2xl">
                            {" "}
                            {storeOwner.name}'s Store
                        </p>
                    </div>

                    <div>
                        {/* <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"flex justify-center mt-2"}
                            pageClassName={
                                "mx-1 py-2 px-2 rounded-lg cursor-pointer"
                            }
                            previousClassName={
                                "mx-1 py-2 px-2 rounded-lg cursor-pointer text-teal-700"
                            }
                            nextClassName={
                                "mx-1 py-2 px-2 rounded-lg cursor-pointer text-teal-700"
                            }
                            pageLinkClassName={"hover:bg-gray-200 px-2"}
                            previousLinkClassName={"hover:text-amber-600"}
                            nextLinkClassName={"hover:text-amber-600"}
                            activeLinkClassName={"text-amber-500 font-bold "}
                        />
                        <div className="grid grid-rows-1 gap-y-3 ">
                            {displayOrders}
                        </div> */}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-7 gap-5 my-7 ">
                            {storeOwner &&
                                storeProducts &&
                                storeProducts.length > 0 &&
                                storeProducts.map((product, i) => (
                                    <div key={i}>
                                        <Product product={product} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
            <footer>
                <a
                    href="#header"
                    className="flex flex-row items-center justify-center cursor-pointer my-4">
                    <GiRunningNinja className="h-[30px] w-[30px] mr-2 " />
                    <div className="text-teal-700 hover:text-amber-600 hover:shadow-lg transition duration-300 text-center text-lg md:text-xl font-bold ">
                        Scroll to the top
                    </div>
                    <GiRunningNinja className="h-[30px] w-[30px] mr-2  ml-2 transform scale-x-[-1]" />
                </a>
            </footer>
        </>
    );
};

export default UserProducts;
