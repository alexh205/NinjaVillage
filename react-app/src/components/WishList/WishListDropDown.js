import React, { useState, useEffect } from "react";
import { GiNinjaStar } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { addProductToListThunk } from "../../store/wishListReducer";
import AddedToWishList from "./AddedToWishList";

const WishListDropDown = ({ product, userWishLists, showDropDown }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [activeList, setActiveList] = useState(null);

    const closeModal = () => {
        setShowModal(false);
    };

    const handleListClick = async list => {
        await dispatch(addProductToListThunk(list.id, product.id));
        setShowModal(true);
        setActiveList(list);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowModal(false);
            showDropDown();
        }, 3500);

        return () => {
            clearTimeout(timeout);
        };
    }, [showModal, showDropDown]); // add an empty dependency array to ensure the useEffect hook only runs once
    return (
        <div>
            {userWishLists &&
                userWishLists.map(list => (
                    <div key={list.id} className="hover:text-amber-600">
                        <div
                            className="flex flex-row items-center justify-start my-1 mx-1"
                            onClick={() => {
                                handleListClick(list);
                            }}>
                            <GiNinjaStar className="mr-[3px] h-3" />

                            <div className="text-[11px] cursor-pointer">
                                {list.name}
                            </div>
                        </div>
                    </div>
                ))}
            {showModal && (
                <AddedToWishList
                    product={product}
                    list={activeList}
                    closeModal={closeModal}
                    showDropDown={showDropDown}
                />
            )}
        </div>
    );
};

export default WishListDropDown;
