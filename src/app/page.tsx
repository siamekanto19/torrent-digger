'use client'
import { api } from '@/trpc/react'
import React from 'react'
import { toast } from 'sonner'

function Home() {
  const { data, isLoading } = api.torrent.searchByKeyword.useQuery({
    keyword: 'mia malkova',
    maxLimit: 250,
  })

  const { mutateAsync } = api.torrent.findMagnetLink.useMutation()

  const handleMagnetLink = (url: string) => {
    toast.promise(() => mutateAsync({ url }), {
      loading: 'Trying to find Magnet Link...',
      success: () => `Magnet Link copied to your clipboard`,
      error: `Could not find Magnet Link`,
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col gap-2 text-sm'>
        <div className='bg-yellow-400'>{data?.torrents.length}</div>
        {data?.torrents.map((tor) => (
          <div className='text-lg font-semibold' key={tor.link}>
            {tor.name} <div>-- {tor.provider} ---</div>
            <button onClick={() => handleMagnetLink(tor.link)} className='bg-red-500'>
              magnet
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
