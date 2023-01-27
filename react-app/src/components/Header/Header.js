import React from "react";
import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";
import "./Header.css";
import logo from '../../Media/logo1.png'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = ({cart}) => {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const userCart = useSelector(state => state.session.activeCart.cartProducts)

    return (
        <header>
        <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
            {/* top nav logo */}
            <div className="flex mt-2 items-center flex-grow sm:flex-grow-0 cursor-pointer" onClick={()=> {
            history.push("/") }}>
                <img
                    className="w-[150px] h-[40px] object-contain cursor-pointer mt-3"
                    src={logo}
                />
            </div>
            {/* top nav search */}
            <div className="hidden items-center h-10 rounded-md flex-grow cursor-pointer sm:flex bg-yellow-400 hover:bg-yellow-500 ">
                <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
                <MagnifyingGlassIcon className="h-14 p-4" />
            </div>
            {/* top nav right side */}
            <div className="text-white flex items-center text-sm space-x-6 mx-6 whitespace-nowrap">
                {/* user account & login */}
                <div className="link" onClick={()=>{history.push('/login')}}>
                    <p>{user ? `Hello, ${user.Name}` : "Sign In"}</p>
                    <p className="font-extrabold md:text-sm">Account & Lists</p>
                </div>
                {/* list user's completed shopping carts */}
                <div className="link">
                    <p>Returns</p>
                    <p className="font-extrabold md:text-sm">& Orders</p>
                </div>

                <div className="link relative flex items-center" onClick={()=>{history.push('/checkout')}}>
                    <span className="absolute top-0 right-0 md:right-7 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                        {/* 0 */}
                        {user && userCart ? userCart.length : 0}
                    </span>
                    <ShoppingCartIcon className="h-10 "/>
                    <p className="hidden md:inline mt-2 font-extrabold md:text-sm ">Cart</p>
                </div>
            </div>
        </div>
        {/* lower nav */}
        <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm ">
            {/* vertical menu */}
            {/* <p className="link flex items-center">
                <Bars3Icon  className="h-6 mr-1"/>
                All
            </p> */}
            {/* links to category queries */}
            {/* <p className="link">Customer Service</p> */}
            <p className="link">Today's Deals</p>
            <p className="link">Buy Again</p>
            <p className="link ">Groceries</p>
            <p className="link hidden lg:inline-flex">Electronics</p>
            <p className="link hidden lg:inline-flex">Books</p>
            <p className="link hidden lg:inline-flex">Clothing, Shoes & Jewelry</p>
            <p className="link hidden lg:inline-flex">Health & Household</p>
            <p className="link hidden lg:inline-flex">Video Games</p>
            <p className="link hidden lg:inline-flex">Beauty & Personal Care</p>
            <p className="link hidden lg:inline-flex">Pet Supplies</p>
            {/* <p className="link hidden lg:inline-flex">Find a Gift</p> */}
        </div>
        </header>
    );
};

export default Header;
