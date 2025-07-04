"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button" // adjust path as needed
import Authentication from './Authentication'
import { useAuthContext } from '../provider'


function header() {
  const { user } = useAuthContext();

  return (
    <div className='p-4 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Image
          src={'/logo.svg'}
          alt='logo'
          width={40}
          height={40}
          color='white'
        />
        <h2 className='text-2xl font-bold'> video Gen</h2>
      </div>

      <div>
        {!user ? (
          <Authentication>
            <Button>Get Started</Button>
          </Authentication>
        ) : (
          <div className='flex items-center gap-3'>
            <link href='/dashboard'>
              <Button>Dashboard</Button>
            </link>
            <Image
              src={user?.photoURL} // ✅ Fixed typo from photoUrl to photoURL
              alt='userImage'
              width={40}
              height={40} // ✅ Fixed typo: was 49
              className='rounded-full'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default header;
