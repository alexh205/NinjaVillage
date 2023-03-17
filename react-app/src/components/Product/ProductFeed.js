import React from 'react';
import MainProducts from './MainProducts';

const ProductFeed = ({products, user}) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 md:-mt-[510px] mx-auto lg:grid-cols-3 xl:grid-cols-4 ">
      {Object.entries(products)
        .slice(0, 4)
        .map(product => (
          <MainProducts product={product[1]} user={user} key={product[1].id} />
        ))}
      <img
        className=" flex justify-self-center md:col-span-full h-[600px] w-[1400px] mt-[9px]"
        src={
          'https://ninjastore.s3.amazonaws.com/site_backgrounds/Banner+Images/ninjas.jpg'
        }
        alt="three ninjas"
      />

      <div className="md:col-span-2">
        {Object.entries(products)
          .slice(4, 5)
          .map(product => (
            <MainProducts
              product={product[1]}
              user={user}
              key={product[1].id}
            />
          ))}
      </div>

      {Object.entries(products)
        .slice(5, 15)
        .map(product => (
          <MainProducts product={product[1]} user={user} key={product[1].id} />
        ))}
    </div>
  );
};

export default ProductFeed;
