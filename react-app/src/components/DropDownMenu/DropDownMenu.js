import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/sessionReducer";
import { GiTiedScroll, GiScrollQuill, GiRunningNinja } from "react-icons/gi";
import { FaUserNinja } from "react-icons/fa";

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
                    <div className="hover:text-amber-500">
                        <p>{`Hello, ${user.name}`}</p>
                        <p className="font-extrabold md:text-sm">
                            Account & Lists
                        </p>
                    </div>

                    {clicked && (
                        <div className="absolute justify-center flex flex-col z-40 items-center right-[162px] md:right-[188px] h-[170px] w-[138px] mt-[2px] rounded-xl bg-gray-100 border-2 border-black">
                            <div className="flex flex-row my-1 pb-2 px-[26px] items-center border-b-[2px] border-black">
                                <div
                                    className="text-black text-[17px] font-bold flex flex-row cursor-pointer items-center hover:text-amber-500"
                                    onClick={() =>
                                        history.push(`/profile/${user.id}`)
                                    }>
                                    <FaUserNinja className="text-ninja_green text-2xl mr-2 h-5 w-5" />
                                    Profile
                                </div>
                            </div>

                            <div
                                className="text-black text-[16px] font-bold px-[14px] border-b-[2px] border-black flex flex-row my-1 pb-2 items-center cursor-pointer hover:text-amber-500"
                                onClick={() => {
                                    setClicked(false);
                                    history.push("/wishlists");
                                }}>
                                <GiScrollQuill className="text-ninja_green h-6 w-6 mr-2" />
                                Wish Lists
                            </div>

                            <div className="flex flex-row my-1 pb-2 px-[6px] items-center border-b-[2px] border-black">
                                <div
                                    className="text-black text-[17px] font-bold flex flex-row cursor-pointer items-center hover:text-amber-500"
                                    onClick={() =>
                                        history.push("/products/new")
                                    }>
                                    <GiTiedScroll className="text-ninja_green h-6 w-6 mr-2" />
                                    New Listing
                                </div>
                            </div>

                            <div
                                className="text-black text-[16px] font-bold mr-2 flex flex-row my-1 pb-2 items-center cursor-pointer hover:text-amber-500"
                                onClick={async () => {
                                    setClicked(false);
                                    await dispatch(logout());
                                    history.push("/");
                                }}>
                                <GiRunningNinja className="text-ninja_green scale-x-[-1] text-[19px] h-7 w-7 mr-2" />
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
