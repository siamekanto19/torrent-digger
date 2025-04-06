'use client'
import Navbar from '@/components/core/Navbar'
import TorrentCard from '@/components/core/TorrentCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/trpc/react'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { Fragment } from 'react'

const SearchPage = () => {
  const params = useSearchParams()
  const keyword = params.get('q')

  const { data, isLoading } = api.torrent.searchByKeyword.useQuery({
    keyword: keyword as string,
  })

  if (isLoading) {
    return (
      <Fragment>
        <div className='x-container'>
          <div className='text-3xl font-bold text-primary h-16 flex items-center'>Search Results</div>
          <div className='py-5 flex flex-col gap-4'>
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className='px-2 py-3 w-full rounded-md border flex items-center gap-3'>
                <Skeleton className='size-6 rounded-md' />
                <Skeleton className='w-80 rounded-md h-6' />
                <Skeleton className='w-28 rounded-md h-6 ml-auto' />
                <Skeleton className='w-28 rounded-md h-6 ml-auto' />
                <Skeleton className='w-28 rounded-md h-6 ml-auto' />
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className='x-container'>
        <div className='text-3xl font-bold text-primary h-16 flex items-center'>Search Results</div>
        <ScrollArea className='h-[calc(100vh-8rem-4rem)]'>
          <div className='py-5 flex flex-col gap-4'>{data?.torrents?.map((torrent) => <TorrentCard key={torrent.link} torrent={torrent} />)}</div>
        </ScrollArea>
      </div>
    </Fragment>
  )
}

export default SearchPage
