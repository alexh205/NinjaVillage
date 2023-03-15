import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Header from '../Header/Header';
import EditProfile from './EditProfile';
import Product from '../Product/Product';
import UserReviews from '../Review/UserReviews';
import {GiRunningNinja} from 'react-icons/gi';
import Footer from '../Footer/Footer';

const Profile = () => {
  const history = useHistory();
  const [listingClick, setListingClick] = useState(false);
  const [reviewClick, setReviewClick] = useState(false);

  const user = useSelector(state => state.session.user);

  let userProducts;
  let userReviews;

  if (user) {
    userProducts = user.ownedProducts;
    userReviews = user.userReviews;
  }

  const [clicked, setClicked] = useState(false);
  const showProfile = boolean => setClicked(boolean);

  const handleClickProfileImage = e => {
    e.preventDefault();
    setClicked(!clicked);
  };

  return (
    <>
      <Header />
      {user && !clicked && (
        <div className="flex flex-col ">
          <div className="flex flex-col md:max-w-[600px] max-w-[440px] justify-start lg:justify-center lg:ml-[33%] ml-[15%] flex-grow mt-10 border-2 p-2 ">
            <h1 className="flex justify-center font-bold text-2xl md:text-3xl border-b-[6px] border-double pb-2">
              About Me
            </h1>
            <div className=" flex flex-row ml-3 items-center mt-3">
              <img
                className="hidden md:flex rounded-full max-h-[100px] md:max-h-[120px] mr-2"
                src={user.profileImage}
                alt="user"></img>
              <div className="flex flex-row items-center justify-center">
                <div className="px-2">
                  <div className="flex flex-row items-center mb-1">
                    <label className="text-sm md:text-[16px] font-semibold mr-2  text-purple-700">
                      Username:
                    </label>
                    <p className="text-sm md:text-lg text-ninja_green">
                      {user.username}
                    </p>
                  </div>
                  <div className="flex flex-row items-center mb-1">
                    <label className="text-sm md:text-[16px] font-semibold mr-2  text-purple-700">
                      Email:
                    </label>
                    <p className="text-sm md:text-[16px] text-ninja_green">
                      {user.email}
                    </p>
                  </div>

                  <div className="flex flex-row items-center mb-2">
                    <label className="text-sm md:text-[16px] font-semibold mr-2  text-purple-700">
                      Name:
                    </label>
                    <p className="text-sm md:text-[16px] text-ninja_green">
                      {user.name}
                    </p>
                  </div>

                  <div className="flex flex-row items-center mb-2 w-full">
                    <label className="text-sm md:text-[16px] font-semibold mr-2  text-purple-700">
                      Address:
                    </label>
                    <div className="flex flex-col items-center">
                      <p className="text-sm md:text-[16px] text-ninja_green">
                        {user.street_address}
                      </p>
                      <p className="text-sm md:text-[16px] text-ninja_green">
                        {user.city}, {user.state} {user.zip_code}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="items-center mx-3">
                  <div className="flex flex-row items-center mb-2">
                    <div className="flex flex-row items-center justify-center">
                      <GiRunningNinja className="h-5 w-5" />
                      <label className="text-sm md:text-[17px] whitespace-nowrap font-semibold mr-2 ml-1 text-purple-700">
                        Products:
                      </label>
                    </div>
                    {user?.ownedProducts && (
                      <div
                        className="text-sm md:text-[20px] text-blue-500 underline underline-offset-1 cursor-pointer font-semibold hover:text-amber-600"
                        onClick={() => {
                          setListingClick(!listingClick);
                          setReviewClick(false);
                        }}>
                        {user.ownedProducts.length || 0}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row items-center mb-2">
                    <div className="flex flex-row items-center justify-center">
                      <GiRunningNinja className="h-5 w-5" />
                      <label className="text-sm md:text-[17px] whitespace-nowrap font-semibold mr-2 ml-1 text-purple-700">
                        Reviews:
                      </label>
                    </div>
                    {user?.userReviews && (
                      <div
                        className="text-sm md:text-[20px] text-blue-500 underline underline-offset-1 cursor-pointer font-semibold hover:text-amber-600 "
                        onClick={() => {
                          setReviewClick(!reviewClick);
                          setListingClick(false);
                        }}>
                        {user.userReviews.length || 0}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row items-center mb-2">
                    <div className="flex flex-row items-center justify-center">
                      <GiRunningNinja className="h-5 w-5" />
                      <label className="text-sm md:text-[17px] whitespace-nowrap font-semibold mr-2 ml-1 text-purple-700">
                        Wish Lists:
                      </label>
                    </div>
                    {user?.ownedLists && (
                      <div
                        className="text-sm md:text-[20px] text-blue-500 underline underline-offset-1 cursor-pointer font-semibold hover:text-amber-600"
                        onClick={() => history.push('/wishlists')}>
                        {user.ownedLists.length || 0}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row items-center mb-2">
                    <div className="flex flex-row items-center justify-center">
                      <GiRunningNinja className="h-5 w-5" />
                      <label className="text-sm md:text-[17px] whitespace-nowrap font-semibold mr-2 ml-1 text-purple-700">
                        Orders:
                      </label>
                    </div>
                    {user?.ownedCarts && (
                      <div
                        className="text-sm md:text-[20px] text-blue-500 underline underline-offset-1 cursor-pointer font-semibold hover:text-amber-600"
                        onClick={() => history.push('/orders')}>
                        {user.ownedCarts.length > 0
                          ? user.ownedCarts.length - 1
                          : 0}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 ">
                    {user?.username === 'Demo' ? (
                      <p className="text-sm whitespace-nowrap font-semibold">
                        "Demo user is not Editable"
                      </p>
                    ) : (
                      <button
                        className="text-sky-600 text-base cursor-pointer font-bold hover:text-amber-600 hover:shadow-lg"
                        onClick={e => {
                          handleClickProfileImage(e);
                        }}>
                        Edit profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div
              className={`${
                !listingClick
                  ? 'hidden'
                  : !reviewClick &&
                    'my-3 flex flex-col items-center justify-center'
              }`}>
              <h1 className="text-3xl text-ninja_green font-bold">Products</h1>
              <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4 mb-16">
                {userProducts?.map(product => (
                  <Product
                    product={product}
                    className="mb-8"
                    key={product.id}
                  />
                ))}
              </div>
            </div>
            <div
              className={`${
                !reviewClick
                  ? 'hidden'
                  : !listingClick &&
                    'my-3 flex flex-col items-center justify-center '
              }`}>
              <h1 className="text-3xl text-ninja_green font-bold ">Reviews</h1>
              <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4 mb-16">
                {userReviews?.map(review => (
                  <UserReviews
                    review={review}
                    productId={review.productId}
                    user={user}
                    key={review.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {user && clicked && <EditProfile user={user} showProfile={showProfile} />}
      <Footer />
    </>
  );
};

export default Profile;
