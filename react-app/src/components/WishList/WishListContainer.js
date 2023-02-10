import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import WishList from "./WishList";

const WishListContainer = () => {
    const whishLists = useSelector(state => state.session.user.ownedLists);
    const user = useSelector(state => state.session.user);
    const history = useHistory()

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-xl border-2 p-2">Your Lists</h1>
            <div className="container mx-auto grid grid-cols-2 gap-5 my-7">
                <div className=""></div>
                {user && whishLists && (
                    <div className="flex flex-col">
                        {whishLists.map((list, i) => (
                            <div key={i} className="cursor-pointer" onClick={() => history.push(`/wishLists/${list.id}`)}>
                                {list.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishListContainer;
