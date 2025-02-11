'use client'
import React, { useState } from 'react'
import { ShieldPlus } from 'lucide-react' 
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import axiosInstance from '@/lib/utils/axios';

interface AdminFormData{
    username: string,
    email: string,
    password: string
}

function AddAdminForm() {
    const [formData, setFormData] = useState<AdminFormData>({
      username: '',
      email: '',
      password: ''
    });    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = async (e: React.FormEvent)=>{
      e.preventDefault();
      setIsSubmitting(true);
      try {
        const result = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/register`,formData)
      } catch (error: any) {
        if (error.response?.status === 409) {
          setError('An account with this email already exists.');
        } else if (error.response?.status === 401) {
          setError('Please fill in all required fields.');
        } else {
          setError('Something went wrong. Please try again later.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
      const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]:value
        }));
      setError('');
    }
  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-md space-y-6'>
        <div className='text-gray-600 grid place-items-center'>
            <ShieldPlus width={50} height={50}/>
            <h2 className='text-3xl font-bold'>Add Admin</h2>
        </div>
        <form 
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 text-black'>
          {error && 
            <div className='text-error text-center'>
              {error}
            </div>
          }
            <div className='w-full flex flex-col'>
                <label title='username'>Enter Username</label>
                <Input
                    id='username'
                    name='username'
                    placeholder='John Doe'
                    value={formData?.username}
                    width='full'
                    type='text'
                    size='md'
                    rounded='md'
                    onChange={handleChange}
                    required
                />
            </div>
          <div className='w-full flex flex-col '>
            <label id='email' >Enter Email</label>
            <Input
              id='email'
              name='email'
              placeholder='john@gmail.com'
              value={formData?.email}
              width='full'
              type='email'
              size='md'
              rounded='md'
              onChange={handleChange}
              required
            />
          </div>

          <div className='w-full flex flex-col '>
            <label id='password' >Enter Password</label>
            <Input
              id='password'
              name='password'
              placeholder=''
              value={formData?.password}
              width='full'
              type='password'
              size='md'
              rounded='md'
              onChange={handleChange}
              required
            />
          </div>
          <Button
            size='lg'
            variant='primary'
            width='lg'
            isLoading={isSubmitting}
            className='text-white self-center'
          >
            Add-Admin
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddAdminForm; 
