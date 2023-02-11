import React from "react";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import Product from "./Product";
import { useHistory } from "react-router-dom";

const UserProducts = () => {
    const history= useHistory()
    const storeOwner = useSelector(state => state.session.productOwner);

    let storeProducts;

    if (storeOwner) {
        storeProducts = storeOwner.ownedProducts;
    }

    if (!storeOwner){
      history.push('/')
    }
    return (
        <>
            <Header />
            {storeOwner && storeProducts &&
            <div className="flex flex-col items-center mt-7">
                <div className="flex flex-row items-center">
                    <img src={storeOwner.profileImage} alt='user' className="hidden md:flex rounded-full max-h-[100px] mr-3"/>
                    <p className="font-bold text-2xl"> {storeOwner.name}'s' Store</p>
                </div>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-7 gap-5 my-7">
                        {storeOwner &&
                            storeProducts &&
                            storeProducts.length > 0 &&
                            storeProducts.map((product, i) => (
                                <div  key={i} >
                                    <Product product={product} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>}
        </>
    );
};

export default UserProducts;
