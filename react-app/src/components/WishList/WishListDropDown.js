import React, { useState } from "react";
import { GiNinjaStar } from "react-icons/gi";

const WishListDropDown = ({ userLists, product, settingList }) => {

    // const [activeList, setActiveList] = useState()
    return (
        <div>
            {userLists &&
                userLists.map((list, i) => (
                    <div key={i} className="hover:text-amber-600">
                        <div className="flex flex-row items-center justify-start my-1 mx-1">
                            <GiNinjaStar className="mr-[3px] h-3" />
                            <div className="text-[11px]" value={list.name} onClick={(e)=> settingList(e.target.value)}>{list.name}</div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default WishListDropDown;
