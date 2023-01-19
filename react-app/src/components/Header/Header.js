import React from "react";
import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";
import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            {/* logo */}
            <div className="img_container">
                <img
                    className="logo_img"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                />
            </div>
            {/* search */}
            <div className="search_header">
                <input type="text" />
                <MagnifyingGlassIcon className="search_icon" />
            </div>
            {/* right side */}
            <div className="nav_header">
                <div>
                    <p style={{paddingBottom: '3px'}}>Hello Alex Hunt</p>
                    <p style={{fontWeight: 'bolder'}}>Account & Lists</p>
                </div>
                <div>
                    <p style={{paddingBottom: '3px'}}>Returns</p>
                    <p style={{fontWeight: 'bolder'}}>& Orders</p>
                </div>

                <div style={{position: "relative", alignItems: 'center', display: 'flex'}}>
                    <span>0</span>
                    <ShoppingCartIcon style={{height: '32px'}}/>
                    <p className='cart_txt' style={{display: 'inline', paddingLeft: '5px', fontWeight: 'bolder'}}>Cart</p>
                </div>

            </div>
        </div>
    );
};

export default Header;
