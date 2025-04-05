export type TorrentProvider = '1337x' | 'rarbg' | 'limetorrent'

export type Torrent = {
  name: string
  link: string
  seeds: number
  leeches: number
  date: string
  size: string
  provider: TorrentProvider
}
