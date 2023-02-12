import React, {useState} from "react";
import { useDispatch} from "react-redux";
import { addToCart, removeItem } from "../../store/cartReducer";
import Loading from "../Loading";

const CheckoutProduct = ({ product }) => {
    const dispatch = useDispatch();
    const [hasClicked, setHasClicked] = useState(false)
    const [hasClickedRemove, setHasClickedRemove] = useState(false)

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
        setHasClicked(true)
        await dispatch(addToCart(item));
        setHasClicked(false)
    };

    const removeItemFromCart = () => {
        setHasClickedRemove(true)
        dispatch(removeItem(product));
        setHasClickedRemove(false)
    };
    return (
        <div className="flex flex-row ml-4 my-2">
            <img
                src={product.image}
                alt="product"
                className="object-contain h-[110px] md:h-[150px] w-[90px] md:w-[140px] mr-4 shadow-black"
            />
            <div className="flex flex-col mt-5">
                <div className="text-[12px] md:text-sm font-bold">
                    {product.title}
                </div>
                <div className="text-sm font-bold text-orange-700">
                    <p>${product.price}</p>
                </div>
                <div className="flex">
                    <p className="text-xs text-gray-500">Sold by:</p>
                    <p className="ml-1 text-xs text-gray-500">
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
                        className="cursor-pointer py-1 m-1 text-[8px] md:text-[10px] bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400 rounded-md  focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600 w-[100px] mr-4"
                        disabled={hasClicked}
                        onClick={() => {
                            addItemToCart();
                        }}>
                        Add to Cart
                    </button>
                    {hasClickedRemove && <Loading />}
                    <button
                        className="cursor-pointer py-1 m-1 text-[8px] md:text-[10px] bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400 rounded-md  focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600 w-[100px]"
                        disabled={hasClickedRemove}
                        onClick={removeItemFromCart}>
                         Remove from Cart
                    </button></div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutProduct;
