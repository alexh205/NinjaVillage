import React, {useState} from "react";
import { useDispatch} from "react-redux";
import { FaStar } from "react-icons/fa";
import { addToCart, removeItem } from "../../store/cartReducer";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";

const CartProduct = ({ product }) => {
    const dispatch = useDispatch();
    const history = useHistory()
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

    const removeItemFromCart =  () => {
        setHasClickedRemove(true)
        dispatch(removeItem(product));
        setHasClickedRemove(false)

    };

    let ratingTotal = 0;
    let ratingAvg;

    if (product && product.productReviews) {
        product.productReviews.forEach(el => {
            ratingTotal += Number(el.rating);
        });
        ratingAvg = ratingTotal / product.productReviews.length;
    }

    return (
        <div className="grid grid-cols-5">
            <div className="cursor-pointer" onClick={()=> history.push(`/products/${product.id}`)}>
                <img
                    src={product.image}
                    alt="product"
                    className="h-[200px] w-[200px] object-contain"
                />
            </div>
            {/* middle section  */}
            <div className="col-span-3 mx-5">
                <p className="font-semibold text-lg">{product.title}</p>
                <div className="flex">
                    {ratingAvg ? (
                        [...Array(Math.floor(ratingAvg))].map((star, i) => (
                            <FaStar
                                size={17}
                                className="text-yellow-500"
                                key={i}
                            />
                        ))
                    ) : (
                        <FaStar size={20} color={"#e4e5e9"} />
                    )}
                </div>
                {/* Right side to add and remove buttons */}
                <p className="text-xs my-2 line-clamp-3">
                    {product.description}
                </p>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center">
                        <p className="mr-2">Quantity:</p>
                        <p className="font-semibold text-red-700">
                            {product.quantity}
                        </p>
                    </div>

                    <div className="flex flex-row items-center">
                    {hasClicked && <Loading />}
                        <button
                            className="mt-auto button mr-4"
                            disabled={hasClicked}
                            onClick={addItemToCart}>
                                Add to Cart
                        </button>
                        {hasClickedRemove && <Loading />}
                        <button
                            className="button mt-3"
                            disabled={hasClickedRemove}
                            onClick={removeItemFromCart}>
                            Remove from Cart

                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-2 justify-self-end font-semibold text-lg self-start">
                <p>${product.price} </p>
            </div>
        </div>
    );
};

export default CartProduct;
