import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeItem } from "../../store/wishListReducer";

const WishListProd = ({ product }) => {
    const dispatch = useDispatch();
    const listObj = useSelector(state=> state.listStore)

    const addItemToList = async () => {
        const item = {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            brand: product.brand,
            image: product.image,
        }
        await dispatch(addToList(item))
    };

    const removeItemFromList = () => {
        dispatch(removeItem(product));
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
