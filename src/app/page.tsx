'use client'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Home() {
  const [keyword, setKeyword] = useState('')

  const handleAutoSearch = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const searchKeyword = keyword.trim()
      if (searchKeyword) {
        window.location.href = `/search/?q=${searchKeyword}`
      }
    }
  }

  const handleSearch = () => {
    const searchKeyword = keyword.trim()
    if (searchKeyword) {
      window.location.href = `/search/?q=${searchKeyword}`
    }
  }

  return (
    <div className='min-h-screen x-container flex flex-col items-center justify-center'>
      <div className='flex items-center text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-emerald-700'>
        <h1>Torrent Digger</h1>
      </div>
      <div className='w-full flex flex-col items-center pt-8'>
        <div className='w-full md:w-10/12 lg:w-2/3 mx-auto relative h-14 flex items-center'>
          <Input
            onKeyUp={handleAutoSearch}
            className='w-full h-14 !text-lg !font-medium px-5 rounded-full shadow-none border-primary border-[1.5px]'
            value={keyword}
            placeholder='Enter keyword...'
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleSearch} disabled={!keyword.length} className='bg-primary size-14 rounded-full absolute right-0 flex justify-center items-center cursor-pointer hover:opacity-90'>
            <Search className='text-white' size={22} absoluteStrokeWidth strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
