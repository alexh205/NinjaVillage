import React, { useState } from "react";

import Modal from "../../context/Modal";

export const WishListContainer = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div>
            <div>
                <button
                    className="button"
                    onClick={() => setOpenModal(!openModal)}>
                    Show Modal
                </button>
                <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Modal Header</Modal.Header>
                    <Modal.Body>
                        <p>Hello i am a Modal</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.DismissButton className="inline-block outline-none cursor-pointer font-semibold rounded-sm px-3 py-6 border-0 text-[#fff] bg-[#ff5000] leading-6 text-[16px] hover:ease-in hover:shadow-sm">
                            Close
                        </Modal.DismissButton>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};
