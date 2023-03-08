import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

export const FilteredProd = ({ product }) => {
    let ratingTotal = 0;
    let ratingAvg;

    if (product && product.productReviews) {
        product.productReviews.forEach(el => {
            ratingTotal += Number(el.rating);
        });
        ratingAvg = ratingTotal / product.productReviews.length;
    }

    const history = useHistory();

    return (
        <div
            className="flex flex-col m-2 bg-white p-3 border-4 border-double rounded-2xl hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 w-full h-full cursor-pointer "
            onClick={() => history.push(`/products/${product.id}`)}>
            <div className="flex items-center justify-center ">
                <img
                    className="object-contain h-[200px] w-[200px] my-4"
                    src={product.image}
                    alt="product"
                />{' '}
            </div>
            <h4>{product.title}</h4>
            <div className="flex">
                {product && product.productReviews.length && ratingAvg ? (
                    [...Array(Math.floor(ratingAvg))].map((star, i) => (
                        <FaStar size={23} className="text-yellow-500" key={i} />
                    ))
                ) : (
                    <FaStar size={23} color={'#e4e5e9'} />
                )}
            </div>
            <p className="text-sm my-2 line-clamp-2">{product.description}</p>
            <div className="pt-2">
                <p className="text-amber-700 font-semibold">${product.price}</p>
            </div>
            {/* {user && (
                <button
                    disabled={user.id === product.ownerId || buttonAction}
                    className={`${
                        user.id === product.ownerId
                            ? "hidden cursor-not-allowed"
                            : buttonAction
                            ? "mt-auto cursor-pointer p-2 font-bold text-[11px] md:text-sm  text-white rounded-sm bg-green-600 border-green-600 focus:ring-2 focus:ring-green-700 focus:outline-none"
                            : "mt-auto button"
                    }`}
                    onClick={addItemToCart}>
                    {buttonAction ? "Added" : "Add to Cart"}
                </button>
            )} */}
        </div>
    );
};
