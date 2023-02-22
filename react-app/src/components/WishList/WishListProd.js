import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addProductToListThunk,
    removeProductFromListThunk,
} from "../../store/wishListReducer";

const WishListProd = ({ product, list }) => {
    const dispatch = useDispatch();
    const listObj = useSelector(state => state.session.user.ownedLists);

    const addItemToList = async () => {
        const productId = product.id;
        await dispatch(addProductToListThunk(productId, list));
    };

    const removeItemFromList = () => {
        dispatch(removeProductFromListThunk(product));
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
        <div className="flex flex-col">
            <img src={product.image} />
            <p>{product.description} Hey</p>
        </div>
    );
};

export default WishListProd;
