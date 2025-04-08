import { MotionTableRow, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Torrent } from '@/types'
import { ArrowDown, ArrowUp, Circle, Cloud, HardDrive, Settings, Tag } from 'lucide-react'
import MagnetLinkButton from './core/MagnetLinkButton'
import { Skeleton } from './ui/skeleton'
import { IconLetterCase } from '@tabler/icons-react'
import { Fragment } from 'react'

type Props = {
  torrents?: Torrent[]
  loading: boolean
}

export default function TorrentTable({ torrents, loading }: Props) {
  return (
    <div className='border-t border-b'>
      <div className='[&>div]:max-h-[calc(100vh-3rem)]'>
        <Table className='[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b'>
          <TableHeader className='bg-background/90 sticky top-0 z-10 backdrop-blur-xs'>
            <TableRow className='hover:bg-transparent font-medium'>
              <TableHead className='w-1/2'>
                <div className='flex items-center gap-1.5'>
                  <IconLetterCase size={16} />
                  Name
                </div>
              </TableHead>
              <TableHead>
                <div className='flex items-center gap-1.5'>
                  <HardDrive size={16} absoluteStrokeWidth strokeWidth={1.5} />
                  Size
                </div>
              </TableHead>
              <TableHead>
                <div className='flex items-center gap-1.5'>
                  <ArrowUp size={16} absoluteStrokeWidth strokeWidth={1.5} />
                  Seeds
                </div>
              </TableHead>
              <TableHead>
                <div className='flex items-center gap-1.5'>
                  <ArrowDown size={16} absoluteStrokeWidth strokeWidth={1.5} />
                  Leeches
                </div>
              </TableHead>
              <TableHead>
                <div className='flex items-center gap-1.5'>
                  <Cloud size={16} absoluteStrokeWidth strokeWidth={1.5} />
                  Provider
                </div>
              </TableHead>
              <TableHead>
                <div className='flex items-center gap-1.5'>
                  <Settings size={16} absoluteStrokeWidth strokeWidth={1.5} />
                  Actions
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          {loading ? (
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className='w-1/3 md:w-1/2'>
                    <Skeleton className='w-full h-7 rounded-md' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-7 w-20 rounded-md' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-7 w-16 rounded-md' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-7 w-16 rounded-md' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-7 w-16 rounded-md' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-7 w-32 rounded-md' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <Fragment>
              {torrents?.length ? (
                <TableBody>
                  {torrents?.map((torrent, index) => (
                    <MotionTableRow initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }} key={torrent.link}>
                      <TableCell className='font-medium w-1/3 md:w-1/2'>
                        <p className='line-clamp-1'>{torrent.name}</p>
                      </TableCell>
                      <TableCell>{torrent.size}</TableCell>
                      <TableCell>{torrent.seeds}</TableCell>
                      <TableCell>{torrent.leeches}</TableCell>
                      <TableCell>{torrent.provider}</TableCell>
                      <TableCell>
                        <MagnetLinkButton url={torrent.link} />
                      </TableCell>
                    </MotionTableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody className='w-full'>
                  <TableRow className='h-[20rem]'>
                    <TableCell className='h-[20rem] text-center text-lg' colSpan={6}>
                      No Results
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Fragment>
          )}
        </Table>
      </div>
    </div>
  )
}
