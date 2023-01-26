import React from "react";
import Product from "../Product/Product";
import amazon_banner_5 from '../../Media/Banner Images/amazon_banner_5.jpg'

const ProductFeed = ({ products, user }) => {

    return (
        <div className=" grid grid-flow-row-dense md:grid-cols-2 md:-mt-52 mx-auto lg:grid-cols-3 xl:grid-cols-4">
            {Object.entries(products).slice(0, 4).map(product => (
                <Product product={product[1]} user={user} />
            ))}
            <img className="md:col-span-full" src={amazon_banner_5}alt="" />

            <div className="md:col-span-2">

                {Object.entries(products).slice(4, 5).map(product => (
                    <Product product={product[1]} user={user} />
                ))}
            </div>
            {Object.entries(products).slice(5, 15).map(product => (
                    <Product product={product[1]} user={user}/>
                ))}
        </div>
    );
};

export default ProductFeed;
