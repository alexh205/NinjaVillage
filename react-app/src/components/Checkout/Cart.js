import React from 'react';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import CartProduct from './CartProduct';
import { useHistory } from 'react-router-dom';
import { GiRunningNinja } from 'react-icons/gi';
import Footer from '../Footer/Footer';
import checkout from '../../media/register.png';

const Cart = ({ user }) => {
	const history = useHistory();
	const cart = useSelector(state => state.cartStore.addedItems);
	let cartTotal = useSelector(state => state.cartStore.total);
	if (cartTotal < 1) cartTotal = 0;

	return (
		<div className='bg-gray-100 mb-5 h-full'>
			<section id='headers'>
				<Header />
			</section>
			<main className='lg:flex max-w-screen-2xl mx-auto'>
				{/* left */}
				<div className='flex-grow m-4 shadow-sm'>
					<img
						className='w-[100%] h-[250px] mb-3 border-[2px]'
						src={checkout}
						alt='checkout register'
					/>
					<div className='flex flex-col p-5 space-y-10 bg-white'>
						<div className='flex border-b pb-4 justify-between '>
							<h1 className='text-3xl'>Shopping Cart</h1>
							<h5 className='self-end mr-4 text-gray-600 '>
								{' '}
								Price
							</h5>
						</div>
						{cart &&
							cart.map((product, i) => (
								<CartProduct
									key={i}
									productId={product.id}
								/>
							))}
					</div>
				</div>
				{/* right */}
				<div className='flex flex-col bg-white p-9 shadow-md my-7 '>
					{user && cart && cart.length > 0 ? (
						<div className='sticky top-32'>
							<h2 className='whitespace-nowrap font-bold text-lg static '>
								Subtotal ({cart.length} items):{' '}
								<p>
									$
									{cartTotal > 0
										? Math.round(
												(cartTotal + Number.EPSILON) *
													100
										  ) / 100
										: 0}
								</p>
							</h2>
							<button
								className={`button mt-2 ${
									!user &&
									'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
								}`}
								onClick={() => history.push('/checkout')}>
								Proceed to checkout
							</button>
						</div>
					) : user && cart && cart.length === 0 ? (
						<>
							<h2 className='whitespace-nowrap'>
								Subtotal ({cart.length} items):{' '}
								<span className='font-bold'>
									<p>${cartTotal}</p>
								</span>
							</h2>
							<button
								disabled={cart.length < 1}
								className={`button mt-2 ${
									(!user || cart.length < 1) &&
									'from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed whitespace-nowrap'
								}`}>
								{'Please add at least one item to proceed'}
							</button>
						</>
					) : (
						<>
							<h2 className='whitespace-nowrap'>
								Subtotal (0 item):{' '}
								<span className='font-bold'>
									<p>$0</p>
								</span>
							</h2>
							<button
								onClick={() => history.push('/login')}
								className={`button mt-2 ${
									!user &&
									'from-gray-200 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed whitespace-nowrap'
								}`}>
								{!user && 'Sign in to checkout'}
							</button>{' '}
						</>
					)}
				</div>
			</main>

			<footer
				className={`${
					cart.length < 4
						? 'hidden'
						: 'flex flex-row items-center justify-center cursor-pointer my-3 pb-10'
				}`}>
				<a
					href='#headers'
					className='flex  '>
					<GiRunningNinja className='h-[30px] w-[30px] mr-2' />
					<div className='text-blue-500 hover:text-amber-600 hover:shadow-lg transition duration-300 text-center text-lg md:text-xl font-bold '>
						Scroll to the top
					</div>
					<GiRunningNinja className='h-[30px] w-[30px] mr-2 ml-2 transform scale-x-[-1]' />
				</a>
			</footer>
			<Footer />
		</div>
	);
};

export default Cart;
