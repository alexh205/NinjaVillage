import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { authenticate } from '../../store/sessionReducer';
import {
    getAllProductThunk,
    deleteProductThunk,
} from '../../store/productReducer';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ product }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    let productOwner;
    if (product) {
        productOwner = product.ownerId;
    }

    let ratingTotal = 0;
    let ratingAvg;

    if (product && product.productReviews) {
        product.productReviews.forEach(el => {
            ratingTotal += Number(el.rating);
        });
        ratingAvg = ratingTotal / product.productReviews.length;
    }

    return (
        <div className="flex flex-col m-2 p-[10px] bg-white border-4 border-double rounded-2xl hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-110 w-full h-full cursor-pointer"  onClick={() => history.push(`/products/${product.id}`)}>
            <p className="flex justify-end text-sm italic text-gray-400">
                {product.category}
            </p>

                <img
                    className="object-contain h-[200px] w-[200px] my-4 "
                    src={product.image}
                    alt="product"
                />

            <h4
                className="text-lg font-semibold"
                onClick={() => history.push(`/products/${product.id}`)}>
                {product.title}
            </h4>
            <div className="flex">
                {product && product.productReviews.length && ratingAvg ? (
                    [...Array(Math.floor(ratingAvg))].map((star, i) => (
                        <FaStar size={23} className="text-yellow-500" key={i} />
                    ))
                ) : (
                    <FaStar size={23} color={'#e4e5e9'} />
                )}
            </div>
            <p className="text-sm my-2 line-clamp-3">{product.description}</p>
            <div>
                <p className=" text-amber-700 font-semibold">
                    ${product.price}
                </p>
            </div>
            <div
                className={`${
                    user?.id !== productOwner
                        ? 'hidden'
                        : 'flex flex-row items-center justify-center whitespace-nowrap my-3'
                }`}>
                <button
                    className=" text-sm bg-gray-300 hover:bg-amber-600 hover:text-white font-semibold px-2 border border-gray-400 rounded shadow mr-2"
                    onClick={() => {
                        history.push(`/products/edit/${product.id}`);
                    }}>
                    Edit product
                </button>

                <button
                    className="flex text-sm bg-gray-300 hover:bg-amber-600 hover:text-white text-gray-800  font-semibold px-2 border border-gray-400 rounded shadow"
                    onClick={async () => {
                        await dispatch(deleteProductThunk(product.id));
                        await dispatch(getAllProductThunk());
                        await dispatch(authenticate());

                        history.push(`/profile/${user.id}`);
                    }}>
                    Delete product
                </button>
            </div>
        </div>
    );
};

export default Product;
