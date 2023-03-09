import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutProduct from './CheckoutProduct';
import stateTaxes from '../../media/stateTaxes.json';
import { cartCheckoutThunk } from '../../store/cartReducer';
import { authenticate } from '../../store/sessionReducer';
import Loading from '../Loading';
import ConfirmationModal from './ConfirmationModal';

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
        // setHasClicked(true);
        try {
            await dispatch(cartCheckoutThunk(cartObj));
            await dispatch(authenticate());
            setModal(true);
        } catch (error) {
            console.log('Error during dispatch:', error);
        } finally {
            // setHasClicked(false);
        }
    };

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
                <div className="flex items-center py-3 bg-ninja_green justify-around md:justify-between">
                    <div
                        className="flex ml-4 md:ml-[160px] items-center cursor-pointer"
                        onClick={() => {
                            history.push('/');
                        }}>
                        <img
                            className="w-[120px] h-[40px] object-contain cursor-pointer mt-2 "
                            src={
                                'https://ninjastore.s3.amazonaws.com/site_backgrounds/ninjaVillage_image.png'
                            }
                            alt="ninja village logo"
                        />
                    </div>
                    <div className="flex font-semibold text-xl md:text-3xl text-white items-center ">
                        Checkout (
                        <p className="text-amber-600 text-lg md:text-2xl">
                            {cartItems > 1
                                ? `${cartItems} items`
                                : `${cartItems} item`}
                        </p>
                        )
                    </div>
                    <LockClosedIcon className="hidden md:flex h-7 opacity-80 pr-4 md:pr-[160px] text-white" />
                </div>
            )}
            <div className="flex flex-row">
                <div>
                    <div className="ml-[160px] mr-7">
                        <div>
                            <div className="flex flex-row mt-3">
                                <div className="font-semibold text-xl mr-6">
                                    1
                                </div>
                                <div className="font-semibold text-lg md:text-xl mr-8 md:mr-24">
                                    Shipping address
                                </div>
                                <div className="text-[12px] md:text-[16px]">
                                    <p>{user.name}</p>
                                    {user?.street_address ? (
                                        <p>{user.street_address}</p>
                                    ) : (
                                        <p
                                            className=" text-sky-600 hover:text-amber-700 cursor-pointer"
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
                                            className=" text-sky-600 hover:text-amber-700 cursor-pointer"
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
                            <hr className="w-[100%] mt-3"></hr>
                        </div>
                        <div>
                            <div className="flex flex-row mt-3">
                                <div className="font-semibold text-xl mr-6">
                                    2
                                </div>
                                <div className="font-semibold text-lg md:text-xl mr-8 md:mr-24">
                                    Payment method
                                </div>
                                <div className="text-[12px] md:text-[16px]">
                                    <div>Visa ending in 000</div>
                                    <div className="flex text-sky-600">
                                        Billing address:
                                        <p className="text-gray-700 ml-1">
                                            Same as shipping address
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr className="w-[100%] mt-3"></hr>
                        </div>
                        <div>
                            <div className="flex flex-row mt-3 ">
                                <div className="font-semibold text-xl mr-6">
                                    3
                                </div>
                                <div className="font-semibold text-lg md:text-xl">
                                    Review items
                                    <div className="border-[1px] p-3 rounded-lg flex flex-col mt-2 object-contain">
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
                                    <div className="border-[1px] rounded-lg mt-5 flex p-1 items-center mb-3">
                                        {user.city &&
                                        user.state &&
                                        user.zip_code &&
                                        user.street_address ? (
                                            <>
                                                {' '}
                                                <button
                                                    className=" cursor-pointer p-1 m-2 text-[10px] md:text-[12px] bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400 rounded-md  focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600 w-[120px] whitespace-nowrap"
                                                    disabled={total < 1}
                                                    onClick={() => {
                                                        setCartObj(cart);
                                                        setValTotal(cartTotal);
                                                        handleCheckout();
                                                    }}>
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
                                            </>
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
                <div className="border-[1px] rounded-lg mt-7 w-[330px] h-[312px] md:h-[360px] mr-7 relative">
                    {user.city &&
                    user.state &&
                    user.zip_code &&
                    user.street_address ? (
                        <>
                            {' '}
                            <div className="flex flex-col items-center">
                                <button
                                    className=" cursor-pointer py-[6px] m-2 text-[12px] md:text-[13px] bg-gradient-to-b from-amber-300 to-amber-500 border-amber-400 rounded-md  focus:outline-none focus:ring-2 focus:ring-amber-600 active:from-amber-600 w-[120px] flex-grow whitespace-nowrap"
                                    disabled={total < 1}
                                    onClick={() => {
                                        setCartObj(cart);
                                        setValTotal(cartTotal);
                                        handleCheckout();
                                    }}>
                                    Place your order
                                </button>
                                <p className="text-[10px] hidden md:flex text-gray-500 text-center px-1">
                                    By placing your order, you agree to
                                    NinjaVillage's privacy notice and conditions
                                    of use
                                </p>
                                <hr className="w-[85%] mt-2"></hr>
                            </div>
                            <div>
                                <div className="font-semibold text-md md:text-lg ml-4 mt-2">
                                    Order Summary
                                </div>
                                <div className="flex flex-row justify-between mx-2 text-[10px] md:text-xs mt-4">
                                    <p>Items:</p>
                                    <p>
                                        $
                                        {Math.round(
                                            (total + Number.EPSILON) * 100
                                        ) / 100}
                                    </p>
                                </div>
                                <div className="flex flex-row justify-between mx-2 text-[10px] md:text-xs my-2">
                                    <p>Shipping & handling:</p>
                                    <div>
                                        {total > 0 ? (
                                            <p>${shippingHandling}</p>
                                        ) : (
                                            <p>$0</p>
                                        )}

                                        <hr className="w-[100%] mt-2"></hr>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between mx-2 text-[10px] md:text-xs my-2">
                                <p>Total before tax:</p>
                                {total > 0 ? <p>${preTax_total}</p> : <p>$0</p>}
                            </div>
                            <div className="flex flex-row justify-between mx-2 text-[10px] md:text-xs my-2 border-b pb-1">
                                <p>Estimated tax to be collected:</p>
                                {total > 0 ? <p>${tax}</p> : <p>$0</p>}
                            </div>
                            <div className="font-semibold sm:text-md md:text-lg lg:text-xl ml-2 md:ml-5 my-3 md:my-4 lg:my-6 sm:mx-2 md:mx-3 lg:mx-6 text-orange-700 flex flex-row justify-between items-center">
                                <p className="mr-[2px]">Order total:</p>
                                {total > 0 ? <p>${cartTotal}</p> : <p>$0</p>}
                            </div>
                        </>
                    ) : (
                        <p
                            className=" text-sky-600 hover:text-amber-700 cursor-pointer flex flex-row justify-center items-center mt-[50%] font-medium whitespace-nowrap text-lg"
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
        </>
    );
};

export default Checkout;
