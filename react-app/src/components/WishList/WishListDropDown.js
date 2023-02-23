import React, { useState } from "react";
import { GiNinjaStar } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { addProductToListThunk } from "../../store/wishListReducer";

const WishListDropDown = ({ product, userWishLists, showDropDown }) => {
    const dispatch = useDispatch();
 

    return (
        <div>
            {userWishLists &&
                userWishLists.map((list, i) => (
                    <div key={i} className="hover:text-amber-600">
                        <div
                            className="flex flex-row items-center justify-start my-1 mx-1"
                            onClick={async e => {
                                // add the current product to the selected list
                                await dispatch(
                                    addProductToListThunk(list.id, product.id)
                                );
                                // set the drop down div to 'false' once a list is selected.
                                showDropDown();
                            }}>

                            <GiNinjaStar className="mr-[3px] h-3"/>

                            <div value={list.name} className="text-[11px]">
                                {list.name}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default WishListDropDown;
