//Changes inputs to Generic inputs created by me


'use client'
import Button from '@/components/ui/Button';
import axiosInstance from '@/lib/utils/axios';
import Link from 'next/link';
import React, { useState } from 'react'

interface UserData{
    name: string,
    email: string,
    password: string
}


function RegisterForm() {
    const [formData, setFormData] = useState<UserData>({
        name:'',
        email: '',
        password:''
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
          }));
    }

    const handleSignup = async(e:React.FormEvent)=>{
        e.preventDefault();
        await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`,formData)
        .then(res =>{
            console.log(`Response is: `, res)
        })
        .catch(err =>{
            console.log(`Error on signup: `,err)

        })
    }

  return (
    // Added flex and min-h-screen to parent div to enable centering
    <div className='min-h-screen bg-neutral-50 flex items-center justify-center'>
      {/* Added container div for the content */}
      <div className='w-full max-w-md space-y-8 p-6'>
        {/* Header */}
        <div className='text-center text-neutral-700'>
          <h1 className='text-3xl font-bold'>Register</h1>
        </div>

        {/* Form */}
        <form className='space-y-6' onSubmit={handleSignup}>
          <div>
            <label htmlFor='name' className='text-neutral-600 block mb-2'>Name</label>
            <input 
              type='text' 
              name='name'
              id='name'
              placeholder='john doe'
              value={formData?.name}
              onChange={handleChange}
              className='w-full border rounded-lg px-4 py-2 placeholder:text-gray-500 text-black'
              required 
            />
          </div>

          <div>
            <label htmlFor='email' className='text-neutral-600 block mb-2'>Email</label>
            <input 
              name='email' 
              id='email'
              type='email' 
              placeholder='john@gmail.com'
              value={formData.email}
              onChange={handleChange}
              className='w-full border rounded-lg px-4 py-2 placeholder:text-gray-500 text-black'
              required 
            />
          </div>

          <div>
            <label htmlFor='password' className='text-neutral-600 block mb-2'>Password</label>
            <input 
              name='password' 
              id='password'
              type='password' 
              placeholder='Your password'
              value={formData.password}
              onChange={handleChange}
              className='w-full border rounded-lg px-4 py-2 placeholder:text-gray-500 text-black'
              required 
            />
          </div>

          <div className='text-center'>
                    <Link
                        href={'/login'}
                        className='underline hover:cursor-pointer text-primary-700'
                        >
                        Already have an Account?
                        </Link>
                </div> 
          
                <Button
                        size='md'
                        width='max'
                        variant='primary'>Login</Button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm