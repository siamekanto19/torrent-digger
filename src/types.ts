export type TorrentProvider = '1337x' | 'rarbg' | 'limetorrent'

export type Categories = 'Movies' | 'TV' | 'Games' | 'Applications' | 'Music' | 'Other' | 'XXX'

export type Torrent = {
  name: string
  link: string
  seeds: number
  leeches: number
  date: string
  size: string
  provider: TorrentProvider
  category?: Categories
}
