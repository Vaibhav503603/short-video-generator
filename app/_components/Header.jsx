"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Authentication from './Authentication'
import { useAuthContext } from '../provider'
import Link from "next/link"

function Header() {
  const { user } = useAuthContext()

  console.log("User object:", user)
  console.log("User picture URL:", user?.pictureUrl)

  return (
    <div className="p-4 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="logo"
          width={40}
          height={40}
        />
        <h2 className="text-2xl font-bold">Video Gen</h2>
      </div>

      {/* Right: Auth / Dashboard */}
      <div className="flex items-center gap-3">
        {!user ? (
          <Authentication>
            <Button>Get Started</Button>
          </Authentication>
        ) : (
          <>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            {user?.pictureUrl && (
              <Image
                src={user.pictureUrl}
                alt="user avatar"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Header
