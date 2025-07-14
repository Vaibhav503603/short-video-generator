"use client"
import { useAuthContext } from '@/app/provider'
import { useRouter } from 'next/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Sidebar } from 'lucide-react'
import React, { use } from 'react'
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useEffect } from 'react'

function DashboardProvider({children}) {

  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    user && CheckedUserAuthenticated();
  }, [user]);

  const CheckedUserAuthenticated = () => {
    if (!user) {
      router.replace('/');
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='w-full'>
        <AppHeader />
        <div className='p-10'>
        {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardProvider