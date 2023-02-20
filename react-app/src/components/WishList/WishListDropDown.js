import React, {useState} from 'react'


const WishListDropDown = ({userLists, product}) => {

  return (
    <div>
        {userLists && userLists.map((list,i) => (<div key={i} className="hover:text-amber-600">
            <div>{list.name}</div>
            <div></div>
            <div></div>
            <div></div>
        </div>))}
    </div>
  )
}

export default WishListDropDown
