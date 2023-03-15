import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeItem } from '../../store/cartReducer';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import Loading from '../Loading';

const CheckoutProduct = ({ product }) => {
    const dispatch = useDispatch();
    const [hasClicked, setHasClicked] = useState(false);
    const [hasClickedRemove, setHasClickedRemove] = useState(false);

    const addItemToCart = async () => {
        const item = {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            brand: product.brand,
            image: product.image,
        };
        setHasClicked(true);
        await dispatch(addToCart(item));
        setHasClicked(false);
    };

    const productImageArr = product.productImages;


    const removeItemFromCart = () => {
        setHasClickedRemove(true);
        dispatch(removeItem(product));
        setHasClickedRemove(false);
    };
    return (
        <div className="flex flex-row ml-4 my-2">
            <img
                src={productImageArr.length > 0 ? productImageArr[0].url : "image"}
                alt="product"
                className="object-contain h-[110px] md:h-[150px] w-[90px] md:w-[140px] mr-4 rounded-lg shadow-lg border-4 border-white hover:shadow-xl"
            />
            <div className="flex flex-col mt-5">
                <div className="text-sm md:text-lg font-bold">
                    {product.title}
                </div>
                <div className="text-sm font-bold text-orange-700">
                    <p>${product.price}</p>
                </div>
                <div className="flex">
                    <p className="text-sm text-gray-500">Sold by:</p>
                    <p className="ml-1 text-sm text-gray-500">
                        {product.brand}
                    </p>
                </div>
                <div className="flex flex-col mt-2">
                    <div className="flex flex-row items-center text-sm ml-1">
                        <p className="mr-2">Quantity:</p>
                        <p className="font-bold text-orange-700">
                            {product.quantity}
                        </p>
                    </div>
                    <div className="flex flex-row">
                        {hasClicked && <Loading />}
                        <button
                            className="button mr-2 mt-3"
                            disabled={hasClicked}
                            onClick={() => {
                                addItemToCart();
                            }}>
                            <BsPlus />
                        </button>
                        {hasClickedRemove && <Loading />}
                        <button
                            className="button mt-3"
                            disabled={hasClickedRemove}
                            onClick={removeItemFromCart}>
                            <BiMinus />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutProduct;
