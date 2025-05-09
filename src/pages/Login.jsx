import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login'); // 'Login' | 'Sign Up' | 'ForgotPassword'
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSumbitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          // setToken(response.data.token);
          // localStorage.setItem('token', response.data.token);
          toast.success('Account created successfully. Please login.'); // Feedback to user
          setCurrentState('Login'); //  Switch to Login
          setName('');
          setEmail('');
          setPassword('');
        } else {
          toast.error(response.data.message);
        }

      } else if (currentState === 'Login') {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === 'ForgotPassword') {
        const response = await axios.post(backendUrl + '/api/user/forgot-password', { email });
        if (response.data.success) {
          toast.success('Password reset instructions sent to your email');
          setCurrentState('Login'); // after successful, redirect to Login
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  return (
    <form onSubmit={onSumbitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' || currentState === 'Sign Up' ? (
        <>
          {currentState === 'Sign Up' && (
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' />
          )}
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' />
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' />
          
          <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p onClick={() => setCurrentState('ForgotPassword')} className='cursor-pointer'>Forget your password?</p>
            {
              currentState === 'Login'
              ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
              : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
            }
          </div>
        </>
      ) : (
        <>
          {/* Forgot Password */}
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter your registered Email' />
          <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Back to Login</p>
          </div>
        </>
      )}

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' && 'Sign In'}
        {currentState === 'Sign Up' && 'Sign Up'}
        {currentState === 'ForgotPassword' && 'Send Reset Link'}
      </button>
    </form>
  )
}

export default Login;
