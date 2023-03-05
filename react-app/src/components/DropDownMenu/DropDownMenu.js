import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/sessionReducer";
import {
    ClipboardDocumentListIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { SlLogout } from "react-icons/sl";
import { RiUserSettingsLine } from "react-icons/ri";

const DropDownMenu = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);

    const handleClicked = e => {
        e.preventDefault();
        setClicked(!clicked);
    };

    return (
        <>
            {user ? (
                <div onClick={handleClicked} className="cursor-pointer ">
                    <div>
                        <p>{`Hello, ${user.name}`}</p>
                        <p className="font-extrabold md:text-sm">
                            Account & Lists
                        </p>
                    </div>

                    {clicked && (
                        <div className="absolute justify-center flex flex-col z-10 items-center right-[170px] md:right-[194px] h-[168px] w-[138px] mt-[2px] rounded-xl bg-gray-100 border-2 border-black">
                            <div className="flex flex-row my-1 pb-2 px-[26px] items-center border-b-[2px] border-black">
                                <div
                                    className="text-black text-[17px] font-bold flex flex-row cursor-pointer items-center hover:text-amber-500"
                                    onClick={() =>
                                        history.push(`/profile/${user.id}`)
                                    }>
                                    <RiUserSettingsLine className="text-ninja_green text-2xl mr-1" />
                                    Profile
                                </div>
                            </div>

                            <div className="flex flex-row my-1 pb-2 px-[6px] items-center border-b-[2px] border-black">
                                <div
                                    className="text-black text-[17px] font-bold flex flex-row cursor-pointer items-center hover:text-amber-500"
                                    onClick={() =>
                                        history.push("/products/new")
                                    }>
                                    <ShoppingBagIcon className="text-ninja_green h-6 mr-1" />
                                    New Listing
                                </div>
                            </div>

                            <div
                                className="text-black text-[16px] font-bold px-[14px] border-b-[2px] border-black flex flex-row my-1 pb-2 items-center cursor-pointer hover:text-amber-500"
                                onClick={() => {
                                    setClicked(false);
                                    history.push("/wishlists");
                                }}>
                                <ClipboardDocumentListIcon className="text-ninja_green h-6 mr-1" />
                                Wish Lists
                            </div>

                            <div
                                className="text-black text-[16px] font-bold mr-2 flex flex-row my-1 pb-2 items-center cursor-pointer hover:text-amber-500"
                                onClick={async () => {
                                    setClicked(false);
                                    await dispatch(logout());
                                    history.push("/");
                                }}>
                                <SlLogout className="text-ninja_green text-[19px] mr-[8px]" />
                                Sign out
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="link" onClick={() => history.push("/login")}>
                    <p>{"Sign In"}</p>
                    <p className="font-extrabold md:text-sm">Account & Lists</p>
                </div>
            )}
        </>
    );
};

export default DropDownMenu;
