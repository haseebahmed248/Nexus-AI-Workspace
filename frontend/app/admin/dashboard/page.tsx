'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

function page() {
    const handleSubmit =async ()=>{
        await signOut();
    }
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleSubmit}>Signout</button>
    </div>
  )
}

export default page
