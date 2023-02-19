import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import WishListProd from "./WishListProd";
import Loading from "../Loading";

const WishList = () => {
    const { listId } = useParams();
    const whishLists = useSelector(state => state.session.user.ownedLists);
    const user = useSelector(state => state.session.user);
    const list = whishLists.find(listObj => listObj.id === Number(listId));

    if (user && list) {
        return (
            <>
                <div>
                    <p>{list.createdDate}</p>
                    {list.listProducts.map((product, i) => (
                        <WishListProd key={i} product={product} />
                    ))}
                </div>
            </>
        );
    } else {
        return <Loading />;
    }
};

export default WishList;
