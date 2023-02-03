import React from "react";
import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import NinjaVillage_logo from '../../Media/NinjaVillage_logo.png'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDownMenu from "../DropDownMenu";


const Header = () => {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const userCart = useSelector(state => state.session.activeCart.cartProducts)

    return (
        <header>
        <div className="flex items-center bg-ninja_green p-1 flex-grow py-2">
            {/* top nav logo */}
            <div className="flex mt-2 items-center flex-grow sm:flex-grow-0 cursor-pointer" onClick={()=> {
            history.push("/") }}>
                <img
                    className="w-[140px] h-[40px] object-contain cursor-pointer mt-2"
                    src={NinjaVillage_logo} alt=''
                />
            </div>
            {/* top nav search */}
            <div className="hidden items-center h-10 rounded-md flex-grow cursor-pointer sm:flex bg-amber-500 hover:bg-amber-600 ">
                <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
                <MagnifyingGlassIcon className="h-14 p-4" />
            </div>
            {/* top nav right side */}
            <div className="text-white flex items-center text-sm space-x-6 mx-6 whitespace-nowrap">
                    <DropDownMenu />
                {/* <div className="link" onClick={()=>{history.push('/login')}}>
                    <p>{user ? `Hello, ${user.name}` : "Sign In"}</p>
                    <p className="font-extrabold md:text-sm">Account & Lists</p>
                </div> */}
                {/* list user's completed shopping carts */}
                <div className="link">
                    <p>Returns</p>
                    <p className="font-extrabold md:text-sm">& Orders</p>
                </div>

                <div className="link relative flex items-center" onClick={()=>{history.push('/cart')}}>
                    <span className="absolute top-0 right-0 text-xs md:right-7 h-4 w-4 bg-amber-400 text-center rounded-full text-black font-bold">
                        {user && userCart.length ? userCart.length : 0}
                    </span>
                    <ShoppingCartIcon className="h-10 "/>
                    <p className="hidden md:inline mt-2 font-extrabold md:text-sm ">Cart</p>
                </div>
            </div>
        </div>
        {/* lower nav */}
        <div className="flex items-center space-x-3 p-2 pl-6 bg-ninja_green-light text-white text-sm ">
            {/* vertical menu */}
            {/* <p className="link flex items-center">
                <Bars3Icon  className="h-6 mr-1"/>
                All
            </p> */}

            {/* <p className="link">Today's Deals</p> */}
            <p className="link">Buy Again</p>
            <p className="link">Books</p>
            <p className="link ">Groceries</p>
            <p className="link hidden lg:inline-flex">Beauty & Personal Care</p>
            <p className="link hidden lg:inline-flex">Clothing, Shoes & Jewelry</p>
            <p className="link hidden lg:inline-flex">Electronics</p>
            <p className="link hidden lg:inline-flex">Health & Household</p>
            <p className="link hidden lg:inline-flex">Pet Supplies</p>
            <p className="link hidden lg:inline-flex">Video Games</p>
        </div>
        </header>
    );
};

export default Header;
