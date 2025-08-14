"use client"
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import React, { useMemo } from 'react'
import  Provider  from './provider';

function ConvexClientProvider({children}) {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || 'http://127.0.0.1:3210';

    const convex = useMemo(() => {
        return new ConvexReactClient(convexUrl);
    }, [convexUrl]);
  
  return (
    <div>
        <ConvexProvider client={convex}>
            <Provider>
                {children}
            </Provider>
        </ConvexProvider>
    </div>
  )
}

export default ConvexClientProvider