import React, { useState } from 'react';
import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

const Header = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const userCart = useSelector(state => state.cartStore.addedItems);
    const products = useSelector(state => state.productStore.products);
    const [input, setInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    let cartTotal;
    if (userCart) {
        cartTotal = userCart.reduce((accum, product) => {
            return accum + product.quantity;
        }, 0);
    }
    const handleChange = e => {
        const searchTerm = e.target.value;
        setInput(searchTerm);
        const filteredProducts = Object.values(products).filter(product => {
            return (
                product.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                product.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                product.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        });
        if (searchTerm === '') {
            setFilteredData([]);
        } else {
            setFilteredData(filteredProducts);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setInput('');
    };

    return (
        <header>
            <div className="flex items-center bg-ninja_green p-1 flex-grow py-2">
                {/* top nav logo */}
                <div
                    className="flex mt-2 items-center flex-grow sm:flex-grow-0 cursor-pointer"
                    onClick={() => {
                        history.push('/');
                    }}>
                    <img
                        className="w-[140px] h-[40px] object-contain cursor-pointer mt-2"
                        src={
                            'https://ninjastore.s3.amazonaws.com/site_backgrounds/ninjaVillage_image.png'
                        }
                        alt="ninja village logo"
                    />
                </div>
                {/* top nav search */}
                {products && (
                    <div className="flex-grow flex flex-col relative ">
                        <div className="hidden sm:flex placeholder:pl-1 items-center h-10 rounded-md cursor-pointer  bg-amber-500 hover:bg-amber-600 ">
                            <input
                                className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
                                type="text"
                                autoComplete="off"
                                placeholder={`Search for a product by name, description, or category...`}
                                onChange={handleChange}
                                value={input}></input>

                            {filteredData.length === 0 ? (
                                <MagnifyingGlassIcon className="h-14 p-4" />
                            ) : (
                                <XMarkIcon
                                    className="h-14 p-4"
                                    onClick={clearInput}
                                />
                            )}
                        </div>
                        {filteredData.length !== 0 && (
                            <div className="hidden sm:block absolute top-[44px] z-50 cursor-pointer bg-white overflow-hidden overflow-y-auto shadow-md md:w-[80%] lg:w-[90%]">
                                {filteredData.slice(0, 12).map((product, i) => {
                                    return (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                clearInput();
                                                history.push(
                                                    `/products/${product.id}`
                                                );
                                            }}
                                            className="flex items-center text-black hover:bg-gray-200 hover:text-ninja_green hover:font-bold">
                                            <div className="flex flex-row m-1">
                                                <img
                                                    className="w-8"
                                                    src={product.image}
                                                    alt="product"
                                                />
                                                <p className="ml-[10px]">
                                                    {product.title}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* top nav right side */}
                <div className="text-white flex items-center text-sm space-x-6 mx-6 whitespace-nowrap ">
                    <DropDownMenu />

                    {!user ? (
                        <div
                            className="link rounded-lg hover:text-amber-500"
                            onClick={() => history.push('/login')}>
                            <p>Past</p>
                            <p className="font-extrabold md:text-sm">Orders</p>
                        </div>
                    ) : (
                        <div
                            className="link rounded-lg hover:text-amber-500"
                            onClick={() => history.push('/orders')}>
                            <p>Past</p>
                            <p className="font-extrabold md:text-sm">Orders</p>
                        </div>
                    )}

                    <div
                        className="link relative flex items-center hover:text-amber-500"
                        onClick={() => {
                            history.push('/cart');
                        }}>
                        <span className="absolute top-0 right-0 text-xs md:right-7 h-4 w-4 bg-amber-400 text-center rounded-full text-black font-bold">
                            {user && cartTotal ? cartTotal : 0}
                        </span>
                        <ShoppingCartIcon className="h-10 " />
                        <p className="hidden md:inline mt-2 font-extrabold md:text-sm ">
                            Cart
                        </p>
                    </div>
                </div>
            </div>
            {/* lower nav */}
            <div className="flex items-center space-x-3 p-2 pl-6 bg-ninja_green-dark text-white text-sm ">
                <p
                    className="link   rounded-lg shadow-md border-2 border-ninja_green-dark outline-none hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-amber-500"
                    onClick={e => {
                        history.push(`/filters/${'All'}`);
                    }}>
                    All
                </p>

                <p
                    className="link  rounded-lg shadow-md border-2 border-ninja_green-dark outline-none hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-amber-500"
                    onClick={e => {
                        history.push(`/filters/${'Books'}`);
                    }}>
                    Books
                </p>
                <p
                    className="link  rounded-lg shadow-md border-2 border-ninja_green-dark outline-none hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-amber-500"
                    onClick={e => {
                        history.push(`/filters/${'Groceries'}`);
                    }}>
                    Groceries
                </p>
                <p
                    className="link  hidden lg:inline-flex rounded-lg shadow-md border-2 border-ninja_green-dark outline-none hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-amber-500"
                    onClick={e => {
                        history.push(`/filters/${'Beauty & Personal Care'}`);
                    }}>
                    Beauty & Personal Care
                </p>
                <p
                    className="link  hidden lg:inline-flex rounded-lg shadow-md border-2 border-ninja_green-dark outline-none hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-amber-500"
                    onClick={e => {
                        history.push(`/filters/${'Clothing, Shoes & Jewelry'}`);
                    }}>
                    Clothing, Shoes & Jewelry
                </p>
                <p
                    className="link  hidden lg:inline-flex rounded-lg shadow-md border-2 border-ninja_green-dark outline-none hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-amber-500"
                    onClick={e => {
                        history.push(`/filters/${'Electronics'}`);
                    }}>
                    Electronics
                </p>
                <p
                    className="link  hidden lg:inline-flex rounded-lg shadow-md border-2 border-ninja_green-dark outline-none hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-amber-500"
                    onClick={e => {
                        history.push(`/filters/${'Health & Household'}`);
                    }}>
                    Health & Household
                </p>
                <p
                    className="link  hidden lg:inline-flex rounded-lg shadow-md border-2 border-ninja_green-dark outline-none hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-amber-500"
                    onClick={e => {
                        history.push(`/filters/${'Pet Supplies'}`);
                    }}>
                    Pet Supplies
                </p>
                <p
                    className="link  hidden lg:inline-flex rounded-lg shadow-md border-2 border-ninja_green-dark outline-none hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-amber-500"
                    onClick={e => {
                        history.push(`/filters/${'Video Games'}`);
                    }}>
                    Video Games
                </p>
            </div>
        </header>
    );
};

export default Header;
