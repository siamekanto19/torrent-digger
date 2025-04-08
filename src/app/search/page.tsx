'use client'
import TorrentTable from '@/components/torrent-table'
import { Input } from '@/components/ui/input'
import { api } from '@/trpc/react'
import { Search } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { Fragment } from 'react'
import { useDebounceValue } from 'usehooks-ts'

const SearchPage = () => {
  const [keyword, setKeyword] = useQueryState('keyword', { defaultValue: '' })
  const [debounceKeyword] = useDebounceValue(keyword, 500)

  const { data, isLoading } = api.torrent.searchByKeyword.useQuery({
    keyword: debounceKeyword,
    maxLimit: 100,
  })

  return (
    <Fragment>
      <div className='w-full h-12 drop-shadow-lg'>
        <div className='w-1/2 h-12 relative flex items-center'>
          <input placeholder='Enter Keyword...' className='w-full h-14 !text-base pr-4 pl-10 border-0 focus:outline-none' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <Search absoluteStrokeWidth strokeWidth={1.5} className='absolute left-3 text-muted-foreground' size={18} />
        </div>
      </div>
      <TorrentTable loading={isLoading} torrents={data?.torrents} />
    </Fragment>
  )
}

export default SearchPage
