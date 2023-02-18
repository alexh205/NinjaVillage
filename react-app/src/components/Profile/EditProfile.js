import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    editUserThunk,
    deleteUserThunk,
    authenticate,
} from "../../store/sessionReducer";
import stateTaxes from "../../media/stateTaxes.json";
import Loading from "../Loading";

const EditProfile = ({ user, showProfile }) => {
    const { userId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const [hasClicked, setHasClicked] = useState(false);
    const [hasClickedDelete, setHasClickedDelete] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [valid, setValid] = useState(false);

    const [validateErrors, setValidateErrors] = useState([]);

    if (user) {
        if (!valid) {
            setUsername(user.username);
            setEmail(user.email);
            setName(user.name);
            setStreetAddress(user.street_address);
            setCity(user.city);
            setState(user.state);
            setZipCode(user.zip_code);
            setProfileImg(user.profileImage);
            setValid(true);
        }

        const validate = () => {
            const errors = [];

            if (!username) errors.push("Please provide a 'Username'");
            if (!email) errors.push("Please provide a 'Email'");
            if (!name) errors.push("Please provide a 'Name'");
            if (!streetAddress) errors.push("Please select a 'Street Address'");
            if (!city) errors.push("Please provide a 'City'");
            if (!state) errors.push("Please provide a 'State'");
            if (!zipCode) errors.push("Please provide a 'Zip Code' number");
            if (!profileImg)
                errors.push("Please provide a 'Profile Image' url");

            return errors;
        };

        const onProfileEdit = async e => {
            e.preventDefault();
            const errors = validate();

            if (errors.length > 0) return setValidateErrors(errors);

            setHasClicked(true);

            await dispatch(
                editUserThunk(
                    username,
                    email,
                    name,
                    streetAddress,
                    city,
                    state,
                    zipCode,
                    profileImg,
                    // password,
                    userId
                )
            );

            setUsername("");
            setEmail("");
            setName("");
            setStreetAddress("");
            setCity("");
            setState("");
            setZipCode("");
            setProfileImg("");
            // setPassword("");
            // setRepeatPassword("");
            setValidateErrors([]);
            setHasClicked(false);
            showProfile(false);
        };
        const onProfileDelete = async e => {
            setUsername("");
            setEmail("");
            setName("");
            setStreetAddress("");
            setCity("");
            setState("");
            setZipCode("");
            setProfileImg("");
            // setPassword("");
            // setRepeatPassword("");
            setValidateErrors([]);
            setHasClickedDelete(true);

            await dispatch(deleteUserThunk(userId));
            await dispatch(authenticate());
            setHasClickedDelete(false);
            history.push("/");
        };

        return (
            <div className=" justify-center flex flex-col mx-2 md:mx-40">
                {/* <Header /> */}
                <div className="flex flex-col mt-6 mx-10 border-b ">
                    <div className="flex flex-row justify-between">
                        <h1 className="font-bold text-4xl mb-2 text-ninja_green">
                            Edit Profile
                        </h1>
                    </div>
                    {validateErrors.length > 0 && (
                        <div className="my-2 ml-2">
                            <h3 className="font-bold text-[16px] ">
                                The following errors were found:
                            </h3>
                            <ul className="text-red-600 text-[13px] font-semibold ml-2">
                                {validateErrors.map((error, i) => (
                                    <li key={i}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <form className="mt-4 mx-10 justify-center  flex flex-col">
                    <div className="mt-3 flex flex-row border-b">
                        <label className="font-bold text-xl mr-4  my-1">
                            Username:
                        </label>
                        <input
                            className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                            type="text"
                            size="25"
                            maxLength="50"
                            name="username"
                            onChange={e => setUsername(e.target.value)}
                            value={username}></input>
                    </div>

                    <div className="mt-3 flex flex-row border-b">
                        <label className="font-bold text-xl mr-4 my-1">
                            Name:
                        </label>
                        <input
                            className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                            type="text"
                            size="25"
                            maxLength="50"
                            name="name"
                            onChange={e => setName(e.target.value)}
                            value={name}></input>
                    </div>

                    <div className="mt-3 flex flex-row border-b">
                        <label className="font-bold text-xl mr-4 my-1">
                            Email:
                        </label>
                        <input
                            className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                            type="text"
                            size="25"
                            maxLength="50"
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}></input>
                    </div>

                    <div className="mt-3 flex flex-row border-b">
                        <label className="font-bold text-xl mr-4 my-1">
                            Street Address:
                        </label>
                        <input
                            className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                            type="text"
                            size="25"
                            maxLength="50"
                            name="streetAddress"
                            onChange={e => setStreetAddress(e.target.value)}
                            value={streetAddress}></input>
                    </div>

                    <div className="mt-3 flex flex-row border-b">
                        <label className="font-bold text-xl mr-4 my-1">
                            City:
                        </label>
                        <input
                            className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                            type="text"
                            size="25"
                            maxLength="50"
                            name="city"
                            onChange={e => setCity(e.target.value)}
                            value={city}></input>
                    </div>

                    <div className="mt-3 flex flex-row border-b">
                        <label className="font-bold text-xl mr-4 my-1">
                            State:
                        </label>
                        <select
                            className="flex self-start items-center mb-6 p-1 text-left border-[2px] rounded-sm"
                            name="category"
                            onChange={e => setState(e.target.value)}
                            value={state}>
                            <option value="">--Please choose a State--</option>
                            {Object.keys(stateTaxes).map((state, i) => (
                                <option key={i} value={state} className="">
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-3 flex flex-row border-b">
                        <label className="font-bold text-xl mr-4 my-1">
                            Zip Code:
                        </label>
                        <input
                            className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                            type="text"
                            size="10"
                            maxLength="50"
                            name="zipCode"
                            onChange={e => setZipCode(e.target.value)}
                            value={zipCode}></input>
                    </div>

                    <div className="mt-3 flex flex-row border-b">
                        <label className="font-bold text-xl mr-4 my-1">
                            Profile Image:
                        </label>
                        <input
                            className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                            type="url"
                            size="40"
                            maxLength="50"
                            name="profileImg"
                            onChange={e => setProfileImg(e.target.value)}
                            value={profileImg}></input>
                    </div>

                    <div className="flex md:flex-row flex-col mt-5 justify-between">
                        <div className="flex mb-3 md:mb-0">
                            {hasClickedDelete && <Loading />}
                            <button
                                className="cursor-pointer text-white p-2 font-bold text-[9px] md:text-sm bg-gradient-to-b from-red-500 to-red-700 border-red-600 rounded-sm  focus:outline-none focus:ring-2 focus:ring-red-800 active:from-red-800"
                                disabled={hasClickedDelete}
                                onClick={e => {
                                    onProfileDelete(e);
                                }}>
                                Delete Account
                            </button>
                        </div>
                        <div>
                            <button
                                className="button mr-2"
                                onClick={e => {
                                    setUsername("");
                                    setEmail("");
                                    setName("");
                                    setStreetAddress("");
                                    setCity("");
                                    setState("");
                                    setZipCode("");
                                    setProfileImg("");
                                    setPassword("");
                                    setRepeatPassword("");
                                    setValidateErrors([]);

                                    showProfile(false);
                                }}>
                                Cancel
                            </button>
                            {hasClicked && <Loading />}
                            <button
                                className="button ml-0 md:ml-6 mt-2 md:mt-0"
                                disabled={hasClicked}
                                onClick={e => {
                                    onProfileEdit(e);
                                }}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    } else {
        return <Loading />;
    }
};

export default EditProfile;
