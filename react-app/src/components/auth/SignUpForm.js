import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/sessionReducer';
import login_page from '../../Media/login_page.png'
import { Link } from 'react-router-dom';
import {
  ChevronRightIcon
} from "@heroicons/react/24/solid";

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const [errors, setErrors] = useState([]);
  const [passError, setPassError] = useState('')

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, name, email, password,  profileImage));
      if (data) {
        setErrors(data)
      }
    }
    if(password !== repeatPassword) setPassword("Both passwords must match.");
  };


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='bg-white h-[100vh] flex flex-col items-center'>
      <Link to='/'>
        <img className='object-contain my-[20px] mx-auto w-[100px]' src={login_page} alt='' />
      </Link>
      <div className='w-[350px] h-fit flex flex-col rounded-md border-[1px] border-gray-300 p-[20px]'>
        <h1 className='font-medium mb-4 text-[27px]'>Create Account</h1>
    <form>
    <div className='text-[10px] text-red-600 mb-[4px]'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}{passError.length > 0 && <div>{passError}</div>}
      </div>
      <div className='mb-[5px] flex flex-col'>
       <label className='font-semibold text-sm my-1'>User Name</label>
        <input
            className='border-[1px] border-gray-600 p-1'
          type='text'
          name='username'
          onChange={ e=> setUsername(e.target.value)}
          value={username}
          required={true}
        ></input>
      </div>
      <div className='mb-[5px] flex flex-col'>
       <label className='font-semibold text-sm my-1'>Your Name</label>
        <input
            className='border-[1px] border-gray-600 p-1'
          type='text'
          name='name'
          placeholder='First and Last name'
          onChange={e => setName(e.target.value)}
          value={name}
          required={true}
        ></input>
      </div>
      <div className='mb-[5px] flex flex-col'>
       <label className='font-semibold text-sm my-1'>Email</label>
        <input
            className='border-[1px] border-gray-600 p-1'
          type='text'
          name='email'
          onChange={e=> setEmail(e.target.value)}
          value={email}
          required={true}
        ></input>
      </div>
      <div className='mb-[5px] flex flex-col'>
       <label className='font-semibold text-sm my-1'>Password</label>
        <input
            className='border-[1px] border-gray-600 p-1'
          type='password'
          name='password'
          onChange={e=> setPassword(e.target.value)}
          value={password}
          required={true}
        ></input>
      </div>
      <div className='mb-[5px] flex flex-col'>
       <label className='font-semibold text-sm my-1'>Re-enter Password</label>
        <input
            className='border-[1px] border-gray-600'
          type='password'
          name='repeat_password'
          onChange={e=> setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='mb-[5px] flex flex-col'>
       <label className='font-semibold text-sm my-1'>Profile Image</label>
        <input
            className='border-[1px] border-gray-600 p-1'
          type='text'
          name='profileImage'
          placeholder='image url'
          onChange={e=> setProfileImage(e.target.value)}
          value={profileImage}
        ></input>
      </div>
      <button className='my-3 button p-[5px] border-[1px] border-gray-400 w-[100%]' onClick={e => {
        setErrors([])
        setPassError('')

        onSignUp(e)
      }}>Sign Up</button>
    </form>
    <p className='text-[11px]'>By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
    <hr className='w-[60%] self-center my-4 drop-shadow-lg'></hr>
   <div className='flex items-center'><p className='text-[12px] font-medium mr-1'>Already have an account? </p><a className='text-[12px] text-blue-600 flex flex-row items-center font-medium' href='/login'>Sign in <ChevronRightIcon className='h-[9px]'/></a></div>
    </div>
    </div>
  );
};

export default SignUpForm;
