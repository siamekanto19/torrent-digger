import * as cheerio from 'cheerio'
import type { Torrent, TorrentProvider } from '@/types'

const getQueryUrl = (keyword: string, provider: TorrentProvider, page: number): string => {
  if (provider === '1337x') {
    const baseUrl = 'https://1337x.to/search/'
    const formattedKeyword = encodeURIComponent(keyword).replace(/%20/g, '+')
    return new URL(`${formattedKeyword}/${page}/`, baseUrl).toString()
  }

  if (provider === 'rarbg') {
    const formattedKeyword = encodeURIComponent(keyword).replace(/%20/g, '+')
    const url = `https://rargb.to/search/${page}/?search=${formattedKeyword}&order=seeders&by=DESC`
    return url
  }

  if (provider === 'limetorrent') {
    const formattedKeyword = encodeURIComponent(keyword).replace(/%20/g, '+')
    const url = `https://limetorrent.net/search.php?catname=&q=${formattedKeyword}&orderby=DESC&order=seeders`
    return url
  }

  return ''
}

export const getTorrents = async (keyword: string, limit: number, providers?: TorrentProvider[]) => {
  let page = 1
  let results = []
  const sources: TorrentProvider[] = providers ? providers : ['1337x', 'rarbg', 'limetorrent']
  let isLimeTorrentSearchDone = false

  while (results.length < limit) {
    if (sources.includes('1337x') && page % 2 !== 0) {
      const url = getQueryUrl(keyword, '1337x', page)
      const pageResults: Torrent[] = []
      try {
        const response = await fetch(url)
        const body = await response.text()

        const $ = cheerio.load(body)

        $('.table-list tbody tr').each((index: any, element: any) => {
          const name = $(element).find('.coll-1.name a:nth-child(2)').text().trim()
          const link = $(element).find('.coll-1.name a:nth-child(2)').attr('href')
          const seeds = $(element).find('.coll-2.seeds').text().trim()
          const leeches = $(element).find('.coll-3.leeches').text().trim()
          const date = $(element).find('.coll-date').text().trim()
          const size = $(element).find('.coll-4.size').contents().first().text().trim()
          const providerName = '1337x'
          const torrentLink = `https://1337x.to${link}`

          pageResults.push({ name, link: torrentLink, seeds, leeches, date, size, provider: providerName })
        })

        if (pageResults.length < 1) {
          break
        }

        results.push(...pageResults)
      } catch (error) {
        console.error(`Error fetching data from page ${page}:`, error)
      }
    }

    if (sources.includes('rarbg') && page % 2 === 0) {
      const url = getQueryUrl(keyword, 'rarbg', page)
      const pageResults: Torrent[] = []
      try {
        const response = await fetch(url)
        const body = await response.text()
        const $ = cheerio.load(body)

        $('tr.lista2').each((index, element) => {
          const name = $(element).find('td.lista:nth-child(2) a').first().text().trim()
          const link = $(element).find('td.lista:nth-child(2) a').first().attr('href') || ''
          const category = $(element).find('td.lista:nth-child(3)').text().trim()
          const date = $(element).find('td.lista:nth-child(4)').text().trim()
          const size = $(element).find('td.lista:nth-child(5)').text().trim()
          const seeds = $(element).find('td.lista:nth-child(6)').text().trim()
          const leeches = $(element).find('td.lista:nth-child(7)').text().trim()
          const uploader = $(element).find('td.lista:nth-child(8)').text().trim()

          pageResults.push({
            name,
            link: `https://rargb.to${link}`,
            category,
            date,
            size,
            seeds,
            leeches,
            provider: 'rarbg',
          })
        })

        if (pageResults.length < 1) {
          break
        }
        results.push(...pageResults)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (sources.includes('limetorrent') && !isLimeTorrentSearchDone && page % 3 === 0) {
      const url = getQueryUrl(keyword, 'limetorrent', page)
      const pageResults: Torrent[] = []
      try {
        const response = await fetch(url)
        const body = await response.text()
        const $ = cheerio.load(body)
        $('tbody.torsearch tr').each((index, row) => {
          const name = $(row).find('.tt-name a').eq(1).text().trim()
          const link = $(row).find('.tt-name a').eq(1).attr('href')
          const date = $(row).find('.tdnormal').first().text().trim()
          const size = $(row).find('.tdnormal').eq(1).text().trim()
          const seeds = parseInt($(row).find('.tdseed').text().trim(), 10)
          const leeches = parseInt($(row).find('.tdleech').text().trim(), 10)

          pageResults.push({
            name,
            link,
            date,
            size,
            seeds,
            leeches,
            provider: 'limetorrent',
          })
        })

        results.push(...pageResults)
        isLimeTorrentSearchDone = true
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    page++ // go to next page
  }

  return results
}

export const getMagnetLink = async (url: string) => {
  try {
    const response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)

    const magnetLink = $('a[href^="magnet:"]').attr('href')

    return magnetLink || null
  } catch (error) {
    console.error(`Error fetching magnet link from ${url}:`, error)
    return null
  }
}
