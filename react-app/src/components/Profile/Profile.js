import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import EditProfile from "./EditProfile";
import Product from "../Product/Product";
import Review from "../Review/Review"


const Profile = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    let userProducts;
    let userReviews;

    if(user){
    userProducts = user.ownedProducts
    userReviews = user.userReviews
}
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
                <div className="flex flex-col md:max-w-[580px] max-w-[420px] justify-center  md:ml-[40%] ml-[15%] flex-grow mt-6 border-2 p-1 ">
                <h1 className="flex justify-center font-bold text-2xl md:text-3xl border-b-[6px] border-double pb-2">
                    About Me
                </h1>

                <div className=" flex flex-row ml-4 items-center mt-3">
                    <img
                        className="hidden md:flex rounded-full max-h-[175px] mr-3"
                        src={user.profileImage}
                        alt="user"></img>
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
                                    Listings:
                                </label>
                                {user && user.ownedProducts && (
                                    <p className="text-xs md:text-[14px] text-green-800">
                                        {user.ownedProducts.length}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-row items-center mb-2">
                                <label className="text-sm md:text-lg font-semibold mr-3  text-amber-700">
                                    Reviews:
                                </label>
                                {user && user.userReviews && (
                                    <p className="text-xs md:text-[14px] text-green-800">
                                        {user.userReviews.length}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-row items-center mb-2">
                                <label className="text-sm md:text-lg font-semibold mr-3  text-amber-700">
                                    Wish Lists:
                                </label>
                                {user && user.ownedLists && (
                                    <p className="text-xs md:text-[14px] text-green-800">
                                        {user.ownedLists.length}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-row items-center mb-2">
                                <label className="text-sm md:text-lg font-semibold mr-3  text-amber-700">
                                    Orders:
                                </label>
                                {user && user.ownedCarts && (
                                    <p className="text-xs md:text-[14px] text-green-800">
                                        {user.ownedCarts.length > 0 ? user.ownedCarts.length - 1 : 0 }
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
            <div className='grid grid-cols-2 items-start justify-start mt-6 ml-1'>
                <div>
                    <h2 className="text-2xl font-bold flex justify-center mb-4">User Reviews</h2>
                    <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 ">
                        {user && userReviews && userReviews.map((review, i) => <div key={i}     className='cursor-pointer border-2 m-3 flex items-center' onClick={()=> history.push(`/products/${review.productId}`)}><Review key={i} review={review} /></div>)}
                    </div>
                </div>
                <div className="mr-6">
                    <h2 className="text-2xl font-bold flex justify-center ">User Listings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user && userProducts && userProducts.map((product, i) => <Product key={i} product={product}/>)}
                    </div>
                </div>
            </div>
        </div>}

            {user && clicked && <EditProfile user={user} showProfile={showProfile}/>}
        </>
    );
};

export default Profile;
