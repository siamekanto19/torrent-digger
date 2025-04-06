import '@/styles/globals.css'
import { type Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import { TRPCReactProvider } from '@/trpc/react'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Torrent Digger | Search Torrents Easily',
  keywords: ['torrent', 'torrents', 'torrent search', 'torrent magnet', 'torrent download'],
  description: 'Torrent Digger is a powerful torrent search engine that helps you find and download torrents quickly and easily.',
  authors: [{ name: 'Torrent Digger' }],
  creator: 'Torrent Digger',
  publisher: 'Torrent Digger',
}

const urbanist = Urbanist({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={urbanist.className}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster position='bottom-right' />
      </body>
    </html>
  )
}
