import Image from 'next/image'
import React from 'react'

function header() {
  return (
    <div>

        <Image src={'/logo.svg'}
          alt='logo'
          width={30}
          height={30}
          color='white'
        />
    </div>
  )
}

export default header
