
import React from 'react'
import { Button } from './button'
import Link from 'next/link'

const Navbar = async () => {
  return (
    <nav className='flex justify-between items-center py-3 px-4 fixed top-0 left-0 right-0 z-50 bg-slate-100'>
      <Link href="/" className='text-xl font-bold'>
      Home
      </Link>

      <div className='flex gap-2 justify-center'>
        <Link href="/signup">
        <Button variant="default">Sign In</Button>
        </Link>
        <Link href="/login">
        <Button variant="default">Login</Button>
        </Link>
      </div>
    </nav>
  )
}

export  {Navbar}