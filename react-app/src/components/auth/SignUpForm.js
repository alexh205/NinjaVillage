import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../../store/sessionReducer';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Loading from '../Loading';
import ninjaLogo from '../../media/ninjaVillage_image.png';

const SignUpForm = () => {
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [profileImage, setProfileImage] = useState('');
	const [validateErrors, setValidateErrors] = useState([]);
	const [hasClicked, setHasClicked] = useState(false);

	const validateEmail = email => {
		const check =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return check.test(email.toLowerCase());
	};

	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const validate = () => {
		const errors = [];
		const emailVal = validateEmail(email);

		if (!username) errors.push("Please provide a 'Username'");
		if (!name) errors.push("Please provide a 'Name'");
		if (!email) errors.push("Please provide an 'Email'");
		if (email && !emailVal)
			errors.push(
				"Please provide a valid email syntax 'thisemail@ninjaVillage.com'"
			);
		if (!password) errors.push("Please provide a 'Password'");
		if (!repeatPassword) errors.push("Please provide a 'Repeat Password'");
		if (!profileImage) errors.push("Please provide a 'Profile Image'");
		if (password !== repeatPassword)
			errors.push('Both passwords must match');
		return errors;
	};

	const onSignUp = async e => {
		e.preventDefault();
		const errors = validate();

		if (errors.length > 0) return setValidateErrors(errors);
		setHasClicked(true);

		if (password === repeatPassword) {
			await dispatch(
				signUp(username, name, email, password, profileImage)
			);
		}

		setUsername('');
		setName('');
		setEmail('');
		setPassword('');
		setRepeatPassword('');
		setProfileImage('');
		setValidateErrors([]);
		setHasClicked(false);
	};

	if (user) {
		return <Redirect to='/' />;
	}

	return (
		<div className='flex flex-col items-center h-screen mt-8'>
			<div className='w-[500px] flex flex-col rounded-md border-[1px] border-gray-300 p-[30px] bg-ninja_green'>
				<div>
					<h1 className='font-medium mb-2 text-[27px] text-white'>
						Create Account
					</h1>
					<Link to='/'>
						<img
							className='object-contain my-[20px] mx-auto w-[100px]'
							src={ninjaLogo}
							alt='ninja Village logo'
						/>
					</Link>
				</div>

				<form>
					<ul className='text-yellow-500 text-[13px] font-semibold ml-2'>
						{validateErrors.map((error, i) => (
							<li key={i}>{error}</li>
						))}
					</ul>

					<div className='mb-[5px] flex flex-col'>
						<label className='font-semibold text-sm my-1 text-white'>
							User Name
						</label>
						<input
							className='border-[1px] border-gray-600 p-1'
							type='text'
							name='username'
							placeholder='Username'
							onChange={e => setUsername(e.target.value)}
							value={username}
							required={true}></input>
					</div>
					<div className='mb-[5px] flex flex-col'>
						<label className='font-semibold text-sm my-1 text-white'>
							Your Name
						</label>
						<input
							className='border-[1px] border-gray-600 p-1'
							type='text'
							name='name'
							placeholder='First and Last name'
							onChange={e => setName(e.target.value)}
							value={name}
							required={true}></input>
					</div>
					<div className='mb-[5px] flex flex-col'>
						<label className='font-semibold text-sm my-1 text-white'>
							Email
						</label>
						<input
							className='border-[1px] border-gray-600 p-1'
							type='text'
							name='email'
							placeholder='user01@ninjaVillage.com'
							onChange={e => setEmail(e.target.value)}
							value={email}
							required={true}></input>
					</div>
					<div className='mb-[5px] flex flex-col'>
						<label className='font-semibold text-sm my-1 text-white'>
							Password
						</label>
						<input
							className='border-[1px] border-gray-600 p-1'
							type='password'
							name='password'
							placeholder='password'
							onChange={e => setPassword(e.target.value)}
							value={password}
							required={true}></input>
					</div>
					<div className='mb-[5px] flex flex-col'>
						<label className='font-semibold text-sm my-1 text-white'>
							Re-enter Password
						</label>
						<input
							className='border-[1px] border-gray-600 p-1'
							type='password'
							name='repeat_password'
							placeholder='password'
							onChange={e => setRepeatPassword(e.target.value)}
							value={repeatPassword}
							required={true}></input>
					</div>
					<div className='mb-[5px] flex flex-col'>
						<label className='font-semibold text-sm my-1 text-white'>
							Profile Image
						</label>
						<input
							className='border-[1px] border-gray-600 p-1'
							type='text'
							name='profileImage'
							placeholder='image url'
							onChange={e => setProfileImage(e.target.value)}
							value={profileImage}></input>
					</div>
					{hasClicked && <Loading />}
					<button
						className='my-3 button p-[5px] border-[1px] border-gray-400 w-[100%]'
						onClick={e => {
							onSignUp(e);
						}}>
						Sign Up
					</button>
				</form>
				<p className='text-[11px] text-white'>
					By creating an account, you agree to NinjaVillage's
					Conditions of Use and Privacy Notice.
				</p>
				<hr className='w-[60%] self-center my-4 drop-shadow-lg'></hr>
				<div className='flex justify-center items-center'>
					<p className='text-[12px] font-medium mr-1 text-white'>
						Already have an account?{' '}
					</p>
					<div
						className='text-[12px] text-yellow-400 font-bold flex flex-row items-center cursor-pointer'
						onClick={() => history.push('/login')}>
						Sign in <ChevronRightIcon className='h-[9px]' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
