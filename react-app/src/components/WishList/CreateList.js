import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createListThunk } from "../../store/wishListReducer";
import { authenticate } from "../../store/sessionReducer";

const CreateList = () => {
    const dispatch = useDispatch();

    const [listName, setListName] = useState("");

    const handelListCreation = async e => {
        e.preventDefault();

        await dispatch(createListThunk(listName));
        await dispatch(authenticate());
    };

    return (
        <div>
            <form className="mt-2 ">
                <div className="flex flex-col items-end">
                    <div className="flex flex-row items-center">
                        <label className="font-bold text-md mr-3">
                            List Name
                        </label>
                        <input
                            className=" border-[1px] p-1 rounded-sm"
                            value={listName}
                            onChange={e => setListName(e.target.value)}></input>
                    </div>
                    <div className="flex flex-row mr-2">
                        <button
                            onClick={e => handelListCreation(e)}
                            className="cursor-pointer p-[2px] border-[1px] text-md font-bold my-1 bg-amber-600 ">
                            Submit
                        </button>
                        <button
                            // onClick={() => setClicked(false)}
                            className="cursor-pointer p-[2px] border-[1px] text-md font-bold my-1 bg-amber-600 ">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateList;
