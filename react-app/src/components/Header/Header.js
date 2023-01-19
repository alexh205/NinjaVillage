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
            <img
                className="logo_img"
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            />
            <div className="search_header">
                <input type="text" />
                <MagnifyingGlassIcon className="search_icon" />
            </div>
            <div className="nav_header">
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Header;
