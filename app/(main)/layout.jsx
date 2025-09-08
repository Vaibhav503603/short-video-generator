import React from 'react'
import DashboardProvider from './provider'

function AuthLayout({ children }) {
  return (
    <div>
      <DashboardProvider>
        {children}
      </DashboardProvider>
    </div>
  )
}

export default AuthLayout
