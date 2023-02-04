import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import EditProfile from "./EditProfile";
import UserProducts from "../Product/UserProducts";
import UserReviews from "../Review/UserReviews";

const Profile = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory();

    return (
        <div>
            <Header />
            <div className="mt-6 border-2 mx-[400px] p-3">
                <h1 className="flex justify-center font-bold text-2xl border-b-[6px] border-double mb-2 ">
                    {" "}
                    About Me
                </h1>
                <div className="flex flex-row ml-16 justify-start items-center">
                    <img
                        className="rounded-full max-h-[175px] mr-10"
                        src={user.profileImage}
                        alt=""></img>

                    <div className="">
                        <div className="flex flex-row items-center mb-1">
                            <label className="text-lg font-semibold mr-3">
                                Username:
                            </label>
                            <p>{user.username}</p>
                        </div>

                        <div className="flex flex-row items-center mb-2">
                            <label className="text-lg font-semibold mr-3">
                                Email:
                            </label>
                            <p>{user.email}</p>
                        </div>
                        <div className="flex flex-row items-center mb-2">
                            <label className="text-lg font-semibold mr-3">
                                Name:
                            </label>
                            <p>{user.name}</p>
                        </div>
                        <div className="flex flex-row items-center mb-2">
                            <label className="text-lg font-semibold mr-3">
                                Address:
                            </label>
                            <div className="flex flex-col items-center">
                                <p>{user.street_address}</p>
                                <p>{user.city}, {user.state}, {user.zip_code}</p>
                            </div>
                        </div>
                    </div>
                </div>
                    <button onClick={()=> history.push(`/users/edit/${user.id}`)}> </button>
                <div></div>
            </div>
        </div>
    );
};

export default Profile;
