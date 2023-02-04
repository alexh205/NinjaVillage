import React, {useState} from "react";
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
            <div className="mt-5 justify-center flex">
                <div className="flex flex-col  border-[2px] justify-center items-center max-h-[320px] max-w-[500px] px-[110px] pb-2">
                    <img
                        className="rounded-full max-h-[160px] max-w-[120px] mt-2"
                        src={user.profileImage} alt=''></img>

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
                    {/* <div onClick={}> <EditProfile /></div> */}
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Profile;
