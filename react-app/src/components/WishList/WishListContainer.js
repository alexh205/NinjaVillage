import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Modal from "../../context/Modal";
import WishListProd from "./WishListProd";
import Loading from "../Loading";
import {
    createListThunk,
    removeWishListThunk,
} from "../../store/wishListReducer";
import { authenticate } from "../../store/sessionReducer";
import EditList from "./EditList";

export const WishListContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const [selected, setSelected] = useState("");
    const [activeList, setActiveList] = useState("");
    const [hasClicked, setHasClicked] = useState(false);
    const [hasEdit, setHasEdit] = useState(false);

    const [listName, setListName] = useState("");
    const [validateErrors, setValidateErrors] = useState([]);
    const showEdit = boolean => setHasEdit(boolean);
    const user = useSelector(state => state.session.user);
    const userWishLists = useSelector(state => state.listStore.userLists);

    if (!user) {
        history.push("/");
    }
    const validate = () => {
        const errors = [];

        if (!listName) {
            errors.push("Please provide a 'name' for the list");
        }

        if (listName.length >= 20) {
            errors.push("Please limit your name to 20 characters or less");
        }

        if (userWishLists.some(list => list.name === listName)) {
            errors.push("List name already exists.");
        }

        return errors;
    };

    if (!activeList) {
        setActiveList(userWishLists[0]);
    }

    let currentList;

    userWishLists.map(list => {
        if (activeList.id === list.id) {
            currentList = list;
        }
        return null;
    });

    const handelListCreation = async e => {
        e.preventDefault();

        const errors = validate();

        if (errors.length) {
            setValidateErrors(errors);
            return null;
        }

        setHasClicked(true);
        await dispatch(createListThunk(listName));
        await dispatch(authenticate());
        setHasClicked(false);
        setListName("");
        setValidateErrors([]);
        setOpenModal(false);
    };

    return (
        <>
            <Header />
            <div className="grid grid-rows-auto container mx-auto mt-5 mb-6 items-center">
                <div className="flex flex-row justify-between mx-10">
                    <div className="text-[24px] font-bold hover:text-[#007185]">
                        Your Lists
                    </div>
                    <div className="mr-2">
                        <button
                            className="text-sm font-semibold text-[#017185] hover:text-amber-600"
                            onClick={() => setOpenModal(!openModal)}>
                            Create a List
                        </button>
                        <Modal
                            isOpen={openModal}
                            onClose={() => setOpenModal(false)}>
                            <Modal.Header>Create a new List</Modal.Header>
                            <Modal.Body>
                                <form className="mt-2">
                                    <div className="flex flex-col justify-center ">
                                        <div className="self-center">
                                            <label className="font-bold text-md mr-3">
                                                List Name
                                            </label>
                                            <input
                                                className=" border-[1px] pr-1 rounded-sm"
                                                value={listName}
                                                placeholder="Wish List"
                                                onChange={e =>
                                                    setListName(e.target.value)
                                                }></input>
                                            {validateErrors.map((error, i) => (
                                                <div
                                                    className="text-red-500 text-[13px] font-semibold"
                                                    key={i}>
                                                    {error}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="my-2 self-center text-[15px] text-gray-600">
                                            Use lists to save items for later.
                                            All lists are private.
                                        </p>
                                        <div className="mt-3 flex flex-row justify-center ml-40 ">
                                            {hasClicked && <Loading />}
                                            <button
                                                className="border-[2px] rounded-md p-1 cursor-pointer text-[14px] font-semibold bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400   focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600"
                                                disabled={hasClicked}
                                                onClick={e => {
                                                    handelListCreation(e);
                                                }}>
                                                Submit
                                            </button>
                                            <Modal.DismissButton className="border-[2px] rounded-md p-1 cursor-pointer text-[14px] font-semibold bg-gradient-to-b from-gray-300 to-gray-500 border-gray-400   focus:outline-none focus:ring-2 focus:ring-gray-600 active:from-gray-600 ml-3">
                                                Cancel
                                            </Modal.DismissButton>
                                        </div>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
                <div className="grid grid-cols-3 border-[2px] p-2">
                    <div className="mr-4 md:mr-7 ml-2 md:ml-3">
                        {userWishLists.map(list => (
                            <div key={list.name} className="mr-1">
                                {selected === list.name ? (
                                    <div
                                        className="text-sm py-3 px-2
                                        flex flex-row justify-between hover:text-amber-600
                                        bg-[#f0f2f2]">
                                        <div className="font-semibold p-1 w-full">
                                            {hasEdit ? (
                                                <EditList
                                                    list={list}
                                                    edit={showEdit}
                                                    userLists={userWishLists}
                                                />
                                            ) : (
                                                list.name
                                            )}
                                        </div>

                                        <div className="flex justify-center items-center">
                                            <button
                                                className={`${
                                                    list.name === "Wish List"
                                                        ? "hidden"
                                                        : "text-center mr-5 cursor-pointer hover:text-amber-600 p-1"
                                                }`}
                                                onClick={() =>
                                                    setHasEdit(!hasEdit)
                                                }>
                                                {!hasEdit ? "Edit" : null}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="text-sm flex flex-row justify-between py-3 px-2 "
                                        onClick={() => {
                                            setSelected(list.name);
                                            setActiveList(list);
                                        }}>
                                        <div className="font-semibold cursor-pointer hover:text-amber-600">
                                            {list.name}
                                        </div>
                                        <div className="flex  items-center">
                                            <button
                                    
                                                className={`${
                                                    list.name === "Wish List"
                                                        ? "hidden"
                                                        : "text-center mr-5 cursor-pointer hover:text-amber-600 p-1"
                                                }`}
                                                onClick={() => {
                                                    setHasEdit(!hasEdit);
                                                }}>
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="col-span-2 mx-4">
                        <div className="flex flex-col">
                            <div className="flex flex-row mb-3 items-center justify-between border-b">
                                <div className="flex flex-row items-center mb-3">
                                    <p className="text-lg mr-3">List Name: </p>

                                    <div className="text-lg font-bold ">
                                        {activeList.name}
                                    </div>
                                </div>
                                <div
                                    className="cursor-pointer text-sm font-semibold text-amber-600 hover:text-[#007185] mt-3 mr-[30px]"
                                    onClick={() => {
                                        if (activeList?.name !== "Wish List") {
                                            const data = dispatch(
                                                removeWishListThunk(
                                                    activeList.id
                                                )
                                            );
                                            if (data) {
                                                alert(
                                                    `List '${activeList.name}' was deleted`
                                                );
                                            }
                                        } else {
                                            alert(
                                                "'Wish List' can't be deleted!"
                                            );
                                        }
                                        setActiveList("");
                                    }}>
                                    Delete List
                                </div>
                            </div>

                            <div>
                                {activeList &&
                                    activeList.listProducts.map(
                                        (product, i) => (
                                            <WishListProd
                                                key={i}
                                                product={product}
                                                activeList={currentList}
                                            />
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
