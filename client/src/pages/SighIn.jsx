import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SingIn() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector( state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelChange= (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (data.success === false) {
        
        dispatch(signInFailure(data.message));
        
      }
      console.log(data); // Log response data
      if (res.ok) {
      
        dispatch(signInSuccess(data));
        navigate('/');
      }
      
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left side*/}
        <div className='flex-1'>
        <Link
            to="/"
            className=' font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-700 rounded-lg text-white'>Irumi's</span>
            Blog
        </Link>
        <p className='text-sm mt-5'>
          This is a demo project. You can sign in with your email and password or with Google.
        </p>
        </div>

        {/*right side*/}
        <div className='flex-1'>
          <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>  
            
            <div>
              <Label value='your email' />
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handelChange} />
              
            </div>
            <div>
              <Label value='your password' />
              <TextInput type='password' placeholder='********' id='password' onChange={handelChange}/>
            
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : ('Sign In')
  
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

