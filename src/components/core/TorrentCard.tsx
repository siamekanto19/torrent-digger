import type { Torrent } from '@/types'
import React, { useMemo, type FC } from 'react'
import { ArrowDown, ArrowUp, Circle, Loader2, Magnet } from 'lucide-react'
import { Button } from '../ui/button'
import { api } from '@/trpc/react'
import { toast } from 'sonner'

type Props = {
  torrent: Torrent
}

const TorrentCard: FC<Props> = ({ torrent }) => {
  const { mutateAsync, isPending } = api.torrent.findMagnetLink.useMutation()

  const handleMagnetLink = async () => {
    toast.promise(() => mutateAsync({ url: torrent.link }), {
      loading: 'Trying to get magnet link...',
      success: (data) => {
        navigator.clipboard.writeText(data.magnet)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = data.magnet
        a.download = `${torrent.name}.torrent`
        a.click()
        a.remove()

        return 'Magnet link copied to clipboard!'
      },
      error: (error) => error.message,
    })
  }

  return (
    <div className='p-3 rounded-md border flex items-center gap-3 text-sm font-medium'>
      <p className='line-clamp-1 w-[30%] lg:w-[40%]'>{torrent.name}</p>
      <div className='ml-auto text-left w-[10%]'>{torrent.size}</div>
      <div className='flex items-center gap-2 w-[20%]'>
        <div className='flex items-center gap-1'>
          <ArrowUp size={18} absoluteStrokeWidth strokeWidth={1.25} />
          {torrent.seeds}
        </div>
        <div className='flex items-center gap-1'>
          <ArrowDown size={18} absoluteStrokeWidth strokeWidth={1.25} />
          {torrent.leeches}
        </div>
      </div>
      <Button disabled={isPending} onClick={handleMagnetLink} className='ml-auto flex items-center gap-2 rounded-md' variant='outline' size='sm'>
        {isPending ? <Loader2 className='animate-spin' size={16} /> : <Magnet size={16} />}
        Magnet Link
      </Button>
    </div>
  )
}

export default TorrentCard
