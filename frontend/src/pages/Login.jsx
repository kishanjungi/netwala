import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        if (currentState === 'Sign up') {
            const response = await axios.post(
              backendUrl + '/api/users/register',
              { name, email, password }
            );

            if (response.data.success) {
              toast.success("Registration successful. Please verify your email.");
              setCurrentState('Login'); // move user to login page
            } else {
              toast.error(response.data.message);
            }
          }

      else {
        const response = await axios.post(backendUrl + '/api/users/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
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

  return (
    <><form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl '>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? '' : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder='Name'
          className='w-full px-3 py-2 border border-gray-800 '
          required />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder='Email'
        className='w-full px-3 py-2 border border-gray-800 '
        required />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder='Password'
        className='w-full px-3 py-2 border border-gray-800 '
        required={currentState === 'Login' || currentState === 'Sign up'} />

      <div className='w-full flex justify-between text-sm mt-[-8px'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'Login'
          ? <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer'>Create account</p>
          : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login here</p>}
      </div>

      <button className='bg-black text-white font-light px-12 mt-4 py-4 rounded'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>

      {/* --- Google Login Button --- */}

    </form><div className="flex flex-col items-center mt-6 gap-2">
  <p className="text-sm text-gray-600">
    {currentState === "Login"
      ? "Or sign in with Google"
      : "Or sign up with Google"}
  </p>
      <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const response = await axios.post(
                  backendUrl + "/api/users/google-login",
                  {
                    token: credentialResponse.credential
                  }
                );

                if (response.data.success) {
                  setToken(response.data.token);
                  localStorage.setItem("token", response.data.token);
                  toast.success("Logged in with Google");
                }
              } catch (error) {
                console.log(error);
                toast.error("Google login failed");
              }
            }}
            onError={() => {
              toast.error("Google Login Failed");
            }}
          />

      </div></>
  )
}

export default Login;
