import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import Loading from '../Loading';

const MainProducts = ({ product }) => {
    const [hasClicked, setHasClicked] = useState(false);
    const history = useHistory();

    let ratingTotal = 0;
    let ratingAvg;

    const productImageArr = product.productImages;
    if (product && product.productReviews) {
        product.productReviews.forEach(el => {
            ratingTotal += Number(el.rating);
        });
        ratingAvg = ratingTotal / product.productReviews.length;
    }

    return (
        <>
            {hasClicked && <Loading />}
            <div
                className="relative flex flex-col m-5 bg-white z-30 p-8 border-4 border-double rounded-2xl hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 cursor-pointer"
                onClick={() => {
                    setHasClicked(true);

                    history.push(`/products/${product.id}`);

                    setHasClicked(false);
                }}>
                <p className="absolute top-2 right-4 text-sm italic text-gray-400 ">
                    {product.category}
                </p>
                <div className="flex justify-center">
                    <img
                        className="object-contain h-[220px] w-[220px] md:h-[200px] md:w-[200px] my-3 "
                        src={productImageArr.length > 0 ? productImageArr[0].url : "image"}
                        alt="product"
                    />
                </div>
                <h4 className="text-lg font-semibold">{product.title}</h4>
                <div className="flex">
                    {product && product.productReviews.length && ratingAvg ? (
                        [...Array(Math.floor(ratingAvg))].map((star, i) => (
                            <FaStar
                                size={23}
                                className="text-yellow-500"
                                key={i}
                            />
                        ))
                    ) : (
                        <FaStar size={23} color={'#e4e5e9'} />
                    )}
                </div>
                <p className="text-sm my-2 line-clamp-3">
                    {product.description}
                </p>
                <div className="mb-5">
                    <p className=" text-amber-700 font-semibold">
                        ${product.price}
                    </p>
                </div>
            </div>
        </>
    );
};

export default MainProducts;
