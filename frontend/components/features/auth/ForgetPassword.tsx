'use client'
import axiosInstance from '@/lib/utils/axios';
import React, { useCallback, useState } from 'react'
import Loading from '../../ui/Loading';
import {ArrowLeftIcon} from '@radix-ui/react-icons'
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';


function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmiting] = useState(false);

    const handleSubmit =  useCallback((e:React.FormEvent)=>{
        e.preventDefault();
        setIsSubmiting(true);
        setSuccess('');
        axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/resetRequest`,{
            email:email
        })
        .then(data =>{
            setError('');
            setSuccess('Email has been  sent!');
            setIsSubmiting(false);
        })
        .catch(err =>{
            setSuccess('');
            setError('Invalide Email Not Found');
            setIsSubmiting(false);
        })
    },[]);

  return (
    <div className='min-h-screen bg-neutral-50 relative'> {/* Add relative here */}
        <div className='absolute top-4 left-4'> 
            <Link 
                href="/login"
                className='bg-neutral-900 p-2 rounded-lg hover:bg-neutral-800 inline-flex items-center justify-center' // Add these classes
            >
                <ArrowLeftIcon className="text-white w-5 h-5" /> 
            </Link>
        </div>
        <div className='flex items-center justify-center min-h-screen'>  {/* Wrap your content */}
            <div className='w-full max-w-md space-y-6'>
                <div className=' text-center space-y-4'>
                    <h1 className='font-bold text-3xl text-neutral-700'>Reset Password</h1>
                    <h3 className='text-neutral-600'>Enter Email To Reset!</h3>
                </div>
                {success && (
                    <div className='text-success text-center'>
                        <h3>{success}</h3>
                        <h3>Check your Indox</h3>
                    </div>
                )}
                {error && (
                    <div className='text-error text-center'>
                        <h3>{error}</h3>
                    </div>
                )}
                <form className='space-y-4 px-4 sm:px-0' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <label htmlFor='email' className='text-neutral-600'>Email</label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete='email'
                            required ={true}
                            width='full'
                            size='md'
                            rounded='md' 
                            />
                    </div>
                <Button
                    isLoading={isSubmitting === true}
                    variant='primary'
                    width='lg'
                    size='md'
                    className='mx-auto block'
                    >Reset</Button>
                </form>  
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword
