"use client"
import { useAuthContext } from '@/app/provider'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import Image from 'next/image'

function AppHeader() {
  const { user } = useAuthContext()

  return (
    <div className='p-3 flex justify-between items-center'>
      <SidebarTrigger />

      {user?.photoURL ? (
        <Image
          src={user.photoURL}
          alt='user'
          width={40}
          height={40}
          className='rounded-full object-cover'
        />
      ) : (
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-white">
          {user?.name?.[0] || "?"}
        </div>
      )}
    </div>
  )
}

export default AppHeader
