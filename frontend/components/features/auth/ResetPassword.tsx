//here is the issue the token that is being sent is some user which i have logged in not this current token so solve this issue update the api

'use client'
import axiosInstance from '@/lib/utils/axios';
import React, { useCallback, useEffect, useState } from 'react'
import Loading from '../../ui/Loading';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface ResetProps{
    token: string
}

const ResetPassword = () =>{
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmiting] = useState(false);
    const [passwordConfirmError,setPasswordConfirmError] = useState('');


    useEffect(()=>{
        console.log("token:", token)
        if(confirmPassword != password){
            setPasswordConfirmError('Password doesn\'t match');
        }else{
            setPasswordConfirmError('');
        }
    },[password,confirmPassword]);

    const handleSubmit =  useCallback((e:React.FormEvent)=>{
        e.preventDefault();
        setIsSubmiting(true);

        
        console.log('data', password)
        console.log('data2', confirmPassword)
        axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/api/resetPassword`,{
            password:password
        })
        .then(data =>{
            setError('');
            setSuccess('Password has been changed');
            setIsSubmiting(false);
        })
        .catch(err =>{
            setSuccess('');
            setError('Password Field is required');
            setIsSubmiting(false);
        })
    },[]);

  return (
    <div className='min-h-screen bg-neutral-50 flex items-center justify-center'>
        <div className='w-full max-w-md space-y-6'>
            <div className=' text-center space-y-4'>
                <h1 className='font-bold text-3xl text-neutral-700'>Reset Password</h1>
                <h3 className='text-neutral-600'>Enter New Password</h3>
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
            {
                passwordConfirmError &&(
                    <div className='text-error text-center'>
                    <h3>{passwordConfirmError}</h3>
                </div>
                )
            }
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div className='space-y-2'>
                    <label htmlFor='password' className='text-neutral-600'>Password</label>

                    <Input
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete='password'
                        width='full'
                        required={true}
                        rounded='md'
                        size='md'
                        />
                </div>
                <div className='space-y-2'>
                    <label htmlFor='confirmpassword' className='text-neutral-600'>Confirm Password</label>
                    <Input
                        id='confirmpassword'
                        name='confirmpassword'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        autoComplete='confirmpassword'
                        width='full'
                        error={passwordConfirmError !== ''}
                        required={true}
                        rounded='md'
                        size='md'
                        />
                </div>
                    <Button 
                        disabled = {passwordConfirmError != ''}
                        isLoading = {isSubmitting === true}
                        variant='primary'
                        width='lg'
                        size='md'
                        >
                            Reset
                        </Button>
            </form>  
      </div>
    </div>
  )
}

export default ResetPassword
