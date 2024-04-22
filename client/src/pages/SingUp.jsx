import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SingUp() {
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
          This is a demo project. You can sign up with your email and password or with Google.
        </p>
        </div>

        {/*right side*/}
        <div className='flex-1'>
          <form className='flex flex-col gap-4 '>  
            <div>
              <Label value='your username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div>
              <Label value='your email' />
              <TextInput type='text' placeholder='name@company.com' id='email' />
              
            </div>
            <div>
              <Label value='your password' />
              <TextInput ype='text' placeholder='Password' id='password' />
            
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>Sign Up</Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
