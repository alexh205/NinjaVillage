import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FilteredProd } from './FilteredProd';
import Header from '../Header/Header';
import { GiRunningNinja } from 'react-icons/gi';
import { MdOutlineArrowRightAlt } from 'react-icons/md';

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
        if (filterId === 'All') {
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
                <div className="flex flex-row items-center text-[17px] text-gray-500 m-2 ml-4 sm:ml-10">
                    <p>Category </p>
                    <MdOutlineArrowRightAlt className="mt-[2px]" />
                    <p className="ml-1">{filterId}</p>
                </div>

                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-7">
                    {filteredProd?.map((product, i) => (
                        <div
                            className={`${
                                !user
                                    ? 'w-max-[8vw] h-max-[9vh] w-min-[8vw] h-min-[9vh]'
                                    : user.id === product.ownerId
                                    ? 'hidden'
                                    : 'w-max-[8vw] h-max-[9vh] w-min-[8vw] h-min-[9vh]'
                            }`}
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
            <footer
                className={`${filteredProd?.length <= 6 ? 'hidden' : 'block'}`}>
                <a
                    href="#filters"
                    className="flex flex-row items-center justify-center cursor-pointer my-4">
                    <GiRunningNinja className="h-[30px] w-[30px] mr-2 " />
                    <div className="text-blue-500 hover:text-amber-600 hover:shadow-lg transition duration-300 text-center text-lg md:text-xl font-bold ">
                        Scroll to the top
                    </div>
                    <GiRunningNinja className="h-[30px] w-[30px] mr-2  ml-2 transform scale-x-[-1]" />
                </a>
            </footer>
        </>
    );
};

export default Filters;
