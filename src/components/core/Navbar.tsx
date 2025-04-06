import React from 'react'
import Logo from './Logo'
import { Search } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='x-container h-16 flex items-center gap-4 border-b-[1.25px] border-primary/50'>
      <Logo />
      <Search size={24} className='ml-auto text-primary' />
    </nav>
  )
}

export default Navbar
