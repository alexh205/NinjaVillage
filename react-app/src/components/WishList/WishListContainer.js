import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Modal from "../../context/Modal";
import WishList from "./WishList";

export const WishListContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const [selected, setSelected] = useState("");
    let userLists;
    const user = useSelector(state => state.session.user);
    if (user) {
        userLists = user.ownedLists;
    }
    console.log(userLists);
    const handelListSelection = e => {};

    if (!user) {
        history.push("/");
    }
    return (
        <>
            <Header />
            <div className="grid grid-rows-auto mx-12 mt-5 mb-2 items-center">
                <div className="flex flex-row justify-between mx-10">
                    <div className="text-[24px] font-bold hover:text-[#007185]">
                        Your Lists
                    </div>
                    <div className="mr-2">
                        <button
                            className="text-xs font-semibold"
                            onClick={() => setOpenModal(!openModal)}>
                            Create a List
                        </button>
                        <Modal
                            isOpen={openModal}
                            onClose={() => setOpenModal(false)}>
                            <Modal.Header>Modal Header</Modal.Header>
                            <Modal.Body></Modal.Body>
                            <Modal.Footer>
                                <Modal.DismissButton className="inline-block outline-none cursor-pointer font-semibold rounded-sm px-3 py-6 border-0 text-[#fff] bg-[#ff5000] leading-6 text-[16px] hover:ease-in hover:shadow-sm">
                                    Close
                                </Modal.DismissButton>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className="grid grid-cols-3 border-[2px] p-2">
                    <div className="mr-7 ml-3">
                        {userLists &&
                            userLists.map((list, i) => (
                                <div
                                    className="text-sm font-semibold py-3 cursor-pointer"
                                    value={`${list.name}`}
                                    onClick={e => handelListSelection(e)}
                                    key={i}>
                                    {list.name}
                                </div>
                            ))}
                    </div>

                    <div className="col-span-2">
                        <div className="flex flex-col">
                            <div>test #1</div>
                            <div>test #1</div>

                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
