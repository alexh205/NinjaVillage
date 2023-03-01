import React from "react";
import { useHistory } from "react-router-dom";

const AddedToWishList = ({ closeModal, product, list }) => {
    const history = useHistory();

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 border-gray-700 border-[3px] border-double flex flex-col items-center justify-center">
                <div className="text-lg mb-2 font-normal flex flex-row items-center">
                    Product was added to
                    <div
                        className="font-semibold ml-1 cursor-pointer test-xl text-blue-600 hover:text-amber-600"
                        onClick={() => history.push("/wishLists")}>
                        '{list?.name}'
                    </div>
                </div>
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-[220px] w-[220px] object-contain mb-2"
                />
                <div className="font-medium mb-2">{product.title}</div>
                <div className="text-gray-600 mb-2">${product.price}</div>
                <button
                    onClick={closeModal}
                    className="bg-gray-500 active:bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                    Close
                </button>
            </div>
        </div>
    );
};

export default AddedToWishList;
