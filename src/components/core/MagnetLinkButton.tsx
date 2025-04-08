import { api } from '@/trpc/react'
import { IconCloudDown, IconLoader } from '@tabler/icons-react'
import { type FC } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

type Props = {
  url: string
}

const MagnetLinkButton: FC<Props> = ({ url }) => {
  const { mutateAsync, isPending } = api.torrent.findMagnetLink.useMutation()

  const handleMagnetLink = async () => {
    toast.promise(() => mutateAsync({ url }), {
      loading: 'Trying to get magnet link...',
      success: (data) => {
        navigator.clipboard.writeText(data.magnet)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = data.magnet
        a.click()
        a.remove()
        return 'Magnet link copied to clipboard!'
      },
      error: (error) => error.message,
    })
  }

  return (
    <Button disabled={isPending} onClick={handleMagnetLink} className='flex items-center gap-2' variant='outline'>
      {isPending ? <IconLoader className='animate-spin' size={16} /> : <IconCloudDown size={16} />}
      Magnet Link
    </Button>
  )
}

export default MagnetLinkButton
