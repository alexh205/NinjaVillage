import React from 'react';
import {GiNinjaStar} from 'react-icons/gi';
import {useDispatch} from 'react-redux';
import {
  addProductToListThunk,
  removeItemFromListThunk,
} from '../../store/wishListReducer';

const ProductRelocation = ({
  product,
  userWishLists,
  showDropDown,
  startingList,
}) => {
  const dispatch = useDispatch();

  const handleListClick = async list => {
    await dispatch(addProductToListThunk(list.id, product.id));

    await dispatch(removeItemFromListThunk(startingList.id, product.id));

    showDropDown();
  };

  return (
    <div>
      {userWishLists &&
        userWishLists.map(list => (
          <div key={list.id} className="hover:text-amber-600">
            <div
              className={`${
                list.name === startingList.name
                  ? 'hidden'
                  : 'flex flex-row items-center justify-start my-1 mx-1'
              }`}
              onClick={() => {
                handleListClick(list);
              }}>
              <GiNinjaStar className="mr-[3px] h-3" />

              <div className="text-[11px] cursor-pointer">{list.name}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductRelocation;
