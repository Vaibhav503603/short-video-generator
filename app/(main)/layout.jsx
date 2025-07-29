import React from 'react'
import AuthProvider from './provider'

function AuthLayout({ children }) {
  return (
    <div>
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  )
}

export default AuthLayout
