import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import EditProfile from "./EditProfile";
import UserProducts from "../Product/UserProducts";
import WishListContainer from "../WishList/WishListContainer";


const Profile = () => {
    const user = useSelector(state => state.session.user);

    const history = useHistory();

    const [clicked, setClicked] = useState(false);
    const showProfile = (boolean) => setClicked(boolean)

    const handleClickProfileImage = (e) => {
        e.preventDefault();
        setClicked(!clicked);
    };


    return (
        <>
            <Header />
                {user && !clicked && <div className="flex flex-col">
                <div className="flex flex-col md:max-w-[580px] max-w-[420px] md:justify-center justify-start md:ml-[30%] ml-[5%]  flex-grow mt-6 border-2 p-1 ">
                <h1 className="flex justify-center font-bold text-2xl md:text-3xl border-b-[6px] border-double pb-2">
                    About Me
                </h1>

                <div className=" flex flex-row ml-4 items-center mt-3">
                    <img
                        className="hidden md:flex rounded-full max-h-[175px] mr-3"
                        src={user.profileImage}
                        alt=""></img>
                    <div className="flex flex-row items-center justify-center">
                        <div className="">
                            <div className="flex flex-row items-center mb-1">
                                <label className="text-sm md:text-lg font-semibold mr-3  text-amber-700">
                                    Username:
                                </label>
                                <p className="text-xs md:text-[14px] text-green-800">
                                    {user.username}
                                </p>
                            </div>

                            <div className="flex flex-row items-center mb-1">
                                <label className="text-sm md:text-lg font-semibold mr-3  text-amber-700">
                                    Email:
                                </label>
                                <p className="text-xs md:text-[14px] text-green-800">{user.email}</p>
                            </div>

                            <div className="flex flex-row items-center mb-2">
                                <label className="text-sm md:text-lg font-semibold mr-3  text-amber-700">
                                    Name:
                                </label>
                                <p className="text-xs md:text-[14px] text-green-800">{user.name}</p>
                            </div>

                            <div className="flex flex-row items-center mb-2">
                                <label className="text-sm md:text-lg font-semibold mr-3  text-amber-700">
                                    Address:
                                </label>
                                <div className="flex flex-col items-center">
                                    <p className="text-xs md:text-[14px] text-green-800">
                                        {user.street_address}
                                    </p>
                                    <p className="text-xs md:text-[14px] text-green-800">
                                        {user.city}, {user.state},
                                        {user.zip_code}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="items-center ml-6">
                            <div className="flex flex-row items-center mb-2">
                                <label className="text-sm md:text-lg font-semibold mr-3 text-amber-700">
                                    Listing #:
                                </label>
                                {user && user.ownedProducts && (
                                    <p className="text-xs md:text-[14px] text-green-800">
                                        {user.ownedProducts.length}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-row items-center mb-2">
                                <label className="text-sm md:text-lg font-semibold mr-3  text-amber-700">
                                    Review total:
                                </label>
                                {user && user.userReviews && (
                                    <p className="text-xs md:text-[14px] text-green-800">
                                        {user.userReviews.length}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-row items-center mb-2">
                                <label className="text-sm md:text-lg font-semibold mr-3  text-amber-700">
                                    Wish List #:
                                </label>
                                {user && user.ownedLists && (
                                    <p className="text-xs md:text-[14px] text-green-800">
                                        {user.ownedLists.length}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-row items-center mb-2">
                                <label className="text-sm md:text-lg font-semibold mr-3  text-amber-700">
                                    Total Orders:
                                </label>
                                {user && user.ownedCarts && (
                                    <p className="text-xs md:text-[14px] text-green-800">
                                        {user.ownedCarts.length}
                                    </p>
                                )}
                            </div>
                            <div className="mt-2 ml-14">
                                <button
                                    className="text-sky-600 text-sm cursor-pointer font-bold"
                                    onClick={(e) => handleClickProfileImage(e)}>
                                    Edit profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='container mx-auto grid grid-cols-2 gap-5 my-7'>
                <div> Listings</div>
                <div><WishListContainer /></div>
            </div> */}
            </div>}

            {user && clicked && <EditProfile user={user} showProfile={showProfile}/>}
        </>
    );
};

export default Profile;
