'use client'
import Button from '@/components/ui/Button'
import {signIn, useSession} from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Login{
    email: string,
    password: string
}

function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<Login>({
        email: '',
        password: ''
    })
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmiting] = useState(false);
    const {data:session, status} = useSession();
    
    useEffect(() => {
        if (status === 'authenticated' && session?.user?.role) {
            switch (session.user.role) {
                case 'ADMIN':
                    router.push('/admin/dashboard');
                    break;
                case 'MANAGER':
                    router.push('/team-manager/dashboard');
                    break;
                case 'USER':
                    router.push('/dashboard');
                    break;
            }
        }
    }, [session, status, router]);


    // Show loading state while checking session
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]:value
        }));
        setError('');
    }

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();
        setIsSubmiting(true);
        try {
            const result = await signIn('credentials',{
                email: formData.email,
                password: formData.password,
                redirect: false   // to avoid automatically redirect
            })
            if (!result?.ok) {
                setIsSubmiting(false);
                setError('Incorrect Email or password');
            }
        } catch (error) {
            setIsSubmiting(false);
            setError('Incorrect Email/Password');
        }
    }

  return (
    <div className='min-h-screen bg-neutral-50 flex items-center justify-center'>
        <div className='w-full max-w-md space-y-8 p-6'>
            <div className='text-center text-neutral-700 text-3xl font-bold'>
                <h1>Login</h1>
            </div>
            {error && (
                <div className=' w-full text-center text-error'>
                    <h4>{error}</h4>
                </div>
            )}

            <form 
            className='space-y-6 placeholder:text-gray-500'
            onSubmit={handleSubmit}
            >
                <div >
                    <label title='email' className='block text-neutral-600'>Email</label>
                    <input 
                        type='email' 
                        name='email'
                        id='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='john@gmail.com'
                        className='border p-2 w-full text-black' 
                        required />
                </div>
                <div >
                    <label title='password' className='block text-neutral-600'>Password</label>
                    <input 
                        type='password' 
                        name='password'
                        id='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Your password'
                        className='border p-2 w-full text-black' 
                        required />
                </div>
                <div className=' flex justify-between'>
                    <div></div>
                    <Link className='text-primary-700 underline hover: cursor-pointer'
                        href={"/forget-password"}
                    >
                        Forget password?
                        </Link>
                </div>
                <div className='text-center'>
                    <Link
                        href={'/register'}
                        className='underline hover:cursor-pointer text-primary-700'
                        >
                        Don't have an Account? Signup
                        </Link>
                </div>  
                <div >
                    <Button
                        size='md'
                        width='max'
                        variant='primary'
                        isLoading= {isSubmitting === true}
                        >Login</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginForm
