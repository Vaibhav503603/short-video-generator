"use client"
import React, { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Home,
  FileVideo,
  Search,
  WalletCards
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Gem } from 'lucide-react'
import { useAuthContext } from '../../provider.js'


// Sidebar menu items
const menuItems = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Create New Video',
    url: '/create-new-video',
    icon: FileVideo,
  },
  {
    title: 'Explore',
    url: '/explore',
    icon: Search,
  },
  {
    title: 'Billing',
    url: '/billing',
    icon: WalletCards,
  }
]

function AppSidebar() {
    const path=usePathname();
    const {user}= useAuthContext();
    console.log(path)
    return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <div className='flex items-center gap-3 w-full justify-center mt-5'>
            <Image src='/logo.svg' alt='logo' width={40} height={40} />
            <h2 className='font-bold text-2xl'>Video Gen</h2>
          </div>
          <h2 className='text-lg text-gray-400 text-center mt-3'>
            AI Short Video Generator
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className='mx-3 mt-8'>
              <Link href="/create-new-video">
                <Button className="w-full">+ Create New Video</Button>
              </Link>
            </div>
            <SidebarMenu>
              {menuItems.map((menu, index) => (
                <SidebarMenuItem className="mt-3 mx-3" key={index}>
                  <SidebarMenuButton isActive={path==menu.url} className={"p-5"}>
                    <Link href={menu.url} className="flex items-center gap-4 p-3">
                      <menu.icon className="w-5 h-5" />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
            <div className='p-5 border rounded-lg mb-6 bg-gray-800'>
                <div className='flex items-center justify-between'>
                    <Gem className='text-gray-400'/>
                    <h2 className='text-gray-400'>{user?.credits} Credits Left</h2>
                </div>
                <Button className="w-full mt-3">Buy More Credits</Button>
            </div>
        </SidebarFooter> 
              
    </Sidebar>
  )
}

export default AppSidebar
