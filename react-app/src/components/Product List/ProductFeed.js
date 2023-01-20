import React from "react";
import Product from "../Product/Product";

const ProductFeed = ({products}) => {
    console.log(products)
    return (
        <div>
            {products.map(product =>(
                <Product product={product}/>
            ))}

        </div>
    );
};

export default ProductFeed;
