import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const WishList = () => {
    const { listId } = useParams();
    const whishLists = useSelector(state => state.session.user.ownedLists);
    const user = useSelector(state => state.session.user);
    const list = whishLists.find(listObj => listObj.id === Number(listId));

    if (user && list) {
        return (
            <>
                {user.id === list.ownerId && (
                    <div>
                        <div>
                            <p>{list.name}</p>
                            <p>{list.createdDate}</p>
                            {list.listProducts.map((product, i) => (
                                <li>{product.title}</li>
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    } else {
        return "...Loading";
    }
};

export default WishList;
