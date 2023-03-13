import React from "react";
import { FaStar } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const OrderProduct = ({ product }) => {
    let ratingTotal = 0;
    let ratingAvg;

    if (product && product.productReviews) {
        product.productReviews.forEach(el => {
            ratingTotal += Number(el.rating);
        });
        ratingAvg = ratingTotal / product.productReviews.length;
    }

    const history = useHistory();

    if (!product) {
        history.push("/");
    }
    return (
        <div className="relative flex flex-col m-3 bg-white p-6 rounded-xl border-dotted shadow-lg border-4 border-slate-300 hover:shadow-xl transform transition duration-300 hover:-translate-x-1 hover:scale-110">
            <p className="absolute top-2 right-2 text-sm italic text-gray-400">
                {product.category}
            </p>
            <div
                className="cursor-pointer flex justify-center"
                onClick={() => history.push(`/products/${product.id}`)}>
                <img
                    className="object-contain h-[200px] w-[200px] md:h-[180px] md:w-[180px] my-2"
                    src={product.image}
                    alt="product"
                />{" "}
            </div>
            <h4>{product.title}</h4>
            <div className="flex">
                {product && product.productReviews.length && ratingAvg ? (
                    [...Array(Math.floor(ratingAvg))].map((star, i) => (
                        <FaStar size={23} className="text-yellow-500" key={i} />
                    ))
                ) : (
                    <FaStar size={23} color={"#e4e5e9"} />
                )}
            </div>
            <p className="text-sm my-2 line-clamp-2">{product.description}</p>
            <div className="mb-5 flex flex-row justify-between">
                <p className=" text-amber-700 font-semibold">
                    ${product.price}
                </p>
                <div className="flex flex-row items-center mr-4">
                    <p className="mr-2">Quantity:</p>
                    <p>{product.quantity}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderProduct;
