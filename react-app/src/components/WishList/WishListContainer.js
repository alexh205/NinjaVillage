import React, { useState } from "react";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createListThunk } from "../../store/wishListReducer";
import { authenticate } from "../../store/sessionReducer";

const WishListContainer = () => {
    const wishLists = useSelector(state => state.session.user.ownedLists);
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const [listName, setListName] = useState("");
    const [clicked, setClicked] = useState(false);

    const handelListCreation = async e => {
        e.preventDefault();
        await createListThunk(listName);
        await dispatch(authenticate());
        setClicked(false);
    };

    return (
        <>
            <Header />
            <div className="grid grid-rows-2">
                <div className="flex flex-row justify-between mx-[120px] mt-7">
                    <h2 className="font-bold text-2xl">Your Lists</h2>
                    {!clicked ? (
                        <div
                            className="cursor-pointer text-sm font-bold"
                            onClick={() => setClicked(true)}>
                            <h2>Create a List</h2>
                        </div>
                    ) : (
                        <form className="mt-2 ">
                            <div className="flex flex-col items-end">
                                <div className="flex flex-row items-center">
                                    <label className="font-bold text-md mr-3">
                                        List Name
                                    </label>
                                    <input
                                        className=" border-[1px] p-1 rounded-sm"
                                        value={listName}
                                        onChange={e =>
                                            setListName(e.target.value)
                                        }></input>
                                </div>
                                <div className="flex flex-row mr-2">
                                    <button
                                        onClick={() => setClicked(false)}
                                        className="cursor-pointer p-[2px] border-[1px] text-md font-bold my-1 bg-amber-600 ">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={e => handelListCreation(e)}
                                        className="cursor-pointer p-[2px] border-[1px] text-md font-bold my-1 bg-amber-600 ">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
                <div className="grid grid-cols-2">
                    {wishLists &&
                        wishLists.map((list, i) => (
                            <div
                                key={i}
                                className="cursor-pointer hover:bg-amber-500"
                                value={list.name}
                                onClick={e => setListName(e.target.name)}>
                                {list.name}
                            </div>
                        ))}
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default WishListContainer;
