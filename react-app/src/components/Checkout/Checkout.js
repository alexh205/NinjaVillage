import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutProduct from './CheckoutProduct';
import stateTaxes from '../../media/stateTaxes.json';
import { cartCheckoutThunk } from '../../store/cartReducer';
import { authenticate } from '../../store/sessionReducer';
import ConfirmationModal from './ConfirmationModal';
import Footer from '../Footer/Footer';

const Checkout = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [cartObj, setCartObj] = useState('');
    const [valTotal, setValTotal] = useState('');

    const showModal = Boolean => setModal(false);

    const user = useSelector(state => state.session.user);
    const cart = useSelector(state => state.cartStore);
    const cartArr = useSelector(state => state.cartStore.addedItems);
    const total = useSelector(state => state.cartStore.total);

    let cartItems;
    if (cartArr) {
        cartItems = cartArr.reduce((accum, product) => {
            return accum + product.quantity;
        }, 0);
    }

    const preTax_total = Math.round((total + 10 + Number.EPSILON) * 100) / 100;
    const shippingHandling = Number(10);

    const tax =
        Math.round(
            (preTax_total *
                Number(
                    Object.entries(stateTaxes).reduce((accum, current) => {
                        const [key, value] = current;
                        if (key === user.state) {
                            return [...accum, value];
                        }
                        if (key === user.state && user.state === 0) {
                            return 1;
                        }
                        return [...accum];
                    }, [])
                ).toString() +
                Number.EPSILON) *
                100
        ) / 100;

    const cartTotal =
        Math.round((preTax_total + tax + Number.EPSILON) * 100) / 100;

    const addWeekdays = (date, weekdays) => {
        // Copy the date object to avoid modifying the original date
        const newDate = new Date(date);

        // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
        const dayOfWeek = newDate.getDay();

        // Calculate the number of days to add, taking weekends into account
        let daysToAdd =
            weekdays + parseInt((weekdays + dayOfWeek - 1) / 5, 10) * 2;

        // Add the days to the date object, skipping over weekends
        while (daysToAdd > 0) {
            newDate.setDate(newDate.getDate() + 1);
            if (newDate.getDay() !== 0 && newDate.getDay() !== 6) {
                daysToAdd--;
            }
        }

        return newDate;
    };

    const date = new Date();
    const month = new Intl.DateTimeFormat('en-US', {
        month: 'short',
    }).format(date);
    const day = date.getDate();
    const year = date.getFullYear();
    const orderDate = `${day}-${month}-${year}`;

    const deliveryDate = addWeekdays(date, 3).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    const endDeliveryDate = addWeekdays(date, 7).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    const handleCheckout = async () => {
        const cartObj = {
            id: cart.id,
            total: cartTotal,
            checkedOut: true,
            products: cart.addedItems,
            estimated_delivery: deliveryDate,
        };

        try {
            await dispatch(cartCheckoutThunk(cartObj));
            await dispatch(authenticate());
            setModal(true);
        } catch (error) {
            console.log('Error during dispatch:', error);
        }
    };

    const handleButtonClick = useCallback(() => {
        setCartObj(cart);
        setValTotal(cartTotal);
        handleCheckout();
    }, [cart, cartTotal, handleCheckout]);

    useEffect(() => {
        if (modal) {
            const timeout = setTimeout(() => {
                setModal(false);
                history.push('/orders');
            }, 3000);

            return () => {
                clearTimeout(timeout);
                setModal(false);
            };
        }
    }, []);

    return (
        <>
            {user && cartArr && (
                <div className="flex items-center py-3  bg-ninja_green justify-between md:justify-around">
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => history.push('/')}>
                        <img
                            className="w-20 h-10 object-contain mt-1 md:w-26 md:h-16 md:mr-4"
                            src="https://ninjastore.s3.amazonaws.com/site_backgrounds/ninjaVillage_image.png"
                            alt="ninja village logo"
                        />
                    </div>
                    <div className="flex font-semibold text-xl md:text-3xl text-white items-center md:mr-0 mr-5">
                        Checkout (
                        <p className="text-amber-600 text-lg md:text-2xl cursor-pointer" onClick={() => history.push('/cart')}>
                            {cartItems > 1
                                ? `${cartItems} items`
                                : `${cartItems} item`}
                        </p>
                        )
                    </div>
                    <div className="hidden md:flex items-center">
                        <LockClosedIcon className="h-7 opacity-80 pr-4 text-white" />
                    </div>
                </div>
            )}
            <div className="flex flex-row pb-[50px] ml-4">
                <div className="mx-auto">
                    <div>
                        <div>
                            <div className="flex flex-row mt-3 items-start md:items-center">
                                <div className="font-semibold text-xl mr-2 md:mr-6">
                                    1
                                </div>
                                <div className="font-semibold text-lg md:text-xl mr-2 md:mr-12">
                                    Shipping address
                                </div>
                                <div className="text-sm md:text-base">
                                    <p>{user.name}</p>
                                    {user?.street_address ? (
                                        <p>{user.street_address}</p>
                                    ) : (
                                        <p
                                            className="text-sky-600 hover:text-amber-700 cursor-pointer"
                                            onClick={() =>
                                                history.push(
                                                    `/profile/${user.id}`
                                                )
                                            }>
                                            Please populate your address details
                                        </p>
                                    )}
                                    {user?.city ||
                                    user?.state ||
                                    user?.zip_code ? (
                                        <p>
                                            {user.city}, {user.state},{' '}
                                            {user.zip_code}
                                        </p>
                                    ) : (
                                        <p
                                            className="text-sky-600 hover:text-amber-700 cursor-pointer"
                                            onClick={() =>
                                                history.push(
                                                    `/profile/${user.id}`
                                                )
                                            }>
                                            Please populate your address details
                                        </p>
                                    )}
                                </div>
                            </div>
                            <hr className="w-full mt-3"></hr>
                        </div>
                        <div>
                            <div className="flex flex-row mt-3 items-start md:items-center">
                                <div className="font-semibold text-xl mr-2 md:mr-6">
                                    2
                                </div>
                                <div className="font-semibold text-lg md:text-xl mr-2 md:mr-12">
                                    Payment method
                                </div>
                                <div className="text-sm md:text-base">
                                    <div>Visa ending in 000</div>
                                    <div className="flex text-sky-600">
                                        Billing address:
                                        <p className="text-gray-700 ml-1">
                                            Same as shipping address
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr className="w-full mt-3"></hr>
                        </div>
                        <div>
                            <div className="flex flex-row mt-3 ">
                                <div className="font-semibold text-xl mr-2 md:mr-6">
                                    3
                                </div>
                                <div className="font-semibold text-lg md:text-xl">
                                    Review items
                                    <div className="border-[1px] p-3 rounded-lg flex flex-col mt-2 object-contain mr-2">
                                        <img
                                            src={
                                                'https://ninjastore.s3.amazonaws.com/site_backgrounds/villageImage.png'
                                            }
                                            alt="trees"
                                            className=" object-contain w-[100%] border-2"
                                        />
                                        <div className="text-orange-700 ml-2">
                                            Estimated delivery: {deliveryDate} -
                                            {endDeliveryDate}
                                        </div>
                                        <div className="text-sm text-gray-500 ml-2">
                                            Items Shipped from NinjaVillage.com
                                        </div>
                                        {cartArr.map(product => (
                                            <CheckoutProduct
                                                product={product}
                                                key={product.id}
                                            />
                                        ))}
                                    </div>
                                    {/* order + total  */}
                                    <div className="border-[1px] rounded-lg mt-5 flex p-1 items-center mb-2 mr-2">
                                        {user.city &&
                                        user.state &&
                                        user.zip_code &&
                                        user.street_address ? (
                                            <div className="flex md:block">
                                                {' '}
                                                <button
                                                    className="cursor-pointer px-1 md:p-2 my-5 md:m-2 text-[12px] md:text-[14px] bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600 md:w-[130px] w-[110px] whitespace-nowrap"
                                                    disabled={total < 1}
                                                    onClick={handleButtonClick}>
                                                    Place your order
                                                </button>
                                                <div className="flex flex-col pl-2">
                                                    <div className=" flex text-md text-orange-700 p-0 m-0 ">
                                                        Order total:
                                                        <div className="ml-2 ">
                                                            {total > 0 ? (
                                                                <p>
                                                                    ${cartTotal}
                                                                </p>
                                                            ) : (
                                                                <p>$0</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 p-0 m-0">
                                                        By placing your order,
                                                        you agree to
                                                        NinjaVillage's privacy
                                                        notice and conditions of
                                                        use
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p
                                                className=" text-sky-600 hover:text-amber-700 cursor-pointer flex flex-row justify-center ml-[300px] text-2xl"
                                                onClick={() =>
                                                    history.push(
                                                        `/profile/${user.id}`
                                                    )
                                                }>
                                                Please populate your address
                                                details
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden md:sticky md:flex top-28 flex-col border rounded-lg h-full relative p-4 mx-4">
                    {user.city &&
                    user.state &&
                    user.zip_code &&
                    user.street_address ? (
                        <>
                            <div className="flex flex-col items-center justify-center h-3/4 md:h-5/6 border-b pb-2 ">
                                <button
                                    className="cursor-pointer p-2 m-2 text-[12px] md:text-[14px] bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400 rounded-md  focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600 w-[130px] whitespace-nowrap font-semibold"
                                    disabled={total < 1}
                                    onClick={handleButtonClick}>
                                    Place your order
                                </button>
                                <p className="text-sm hidden md:flex text-gray-500 text-start px-1 mt-2">
                                    By placing your order, you agree to
                                    NinjaVillage's privacy notice and conditions
                                    of use
                                </p>
                            </div>
                            <div className="flex flex-col justify-between h-1/4 md:h-1/6">
                                <div className="font-semibold text-sm md:text-base ml-4 mt-2">
                                    Order Summary
                                </div>
                                <div className="grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-3 mx-3 text-sm md:text-sm mt-4 border-b pb-2">
                                    <p>Items:</p>
                                    <p className="justify-self-end font-medium">
                                        $
                                        {Math.round(
                                            (total + Number.EPSILON) * 100
                                        ) / 100}
                                    </p>
                                    <p className="whitespace-nowrap">
                                        Shipping & handling:
                                    </p>
                                    <p className="justify-self-end font-medium">
                                        {total > 0
                                            ? `$${shippingHandling}`
                                            : '$0'}
                                    </p>
                                    <p className="whitespace-nowrap">
                                        Total before tax:
                                    </p>
                                    <p className="justify-self-end font-medium">
                                        {total > 0 ? `$${preTax_total}` : '$0'}
                                    </p>
                                    <p>Estimated tax to be collected:</p>
                                    <p className="justify-self-end font-medium">
                                        {total > 0 ? `$${tax}` : '$0'}
                                    </p>
                                </div>
                                <div className="font-semibold text-orange-700 text-sm md:text-base ml-2 md:ml-5 my-3 md:my-4 flex justify-between items-center">
                                    <p className="mr-2">Order total:</p>
                                    <p>{total > 0 ? `$${cartTotal}` : '$0'}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p
                            className="text-sky-600 hover:text-amber-700 cursor-pointer flex flex-row justify-center items-center mt-[50%] font-medium whitespace-nowrap text-lg"
                            onClick={() => history.push(`/profile/${user.id}`)}>
                            Please populate your address details
                        </p>
                    )}
                </div>
            </div>
            {modal && (
                <ConfirmationModal
                    showModal={showModal}
                    cart={cartObj}
                    total={valTotal}
                    isOpen={modal}
                    orderDate={orderDate}
                    deliveryDate={deliveryDate}
                />
            )}
            <Footer />
        </>
    );
};

export default Checkout;
