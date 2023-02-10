import React from "react";
import { useSelector } from "react-redux";
import WishList from "./WishList";

const WishListContainer = () => {
    const whishLists = useSelector(state => state.session.user.ownedLists);
    const user = useSelector(state => state.session.user);
    return (
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-xl border-2 p-2">Your Lists</h1>
            <div className="container mx-auto grid grid-cols-2 gap-5 my-7">
                <div className=""></div>
                {user && whishLists && (
                    <div className="flex flex-col">
                        {whishLists.map((list, i) => (
                            <a key={i} href={`/wishLists/${list.id}`}>
                                {list.name}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishListContainer;
