import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { getMagnetLink, getTorrents } from '@/server/lib/scraper'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const torrentRouter = createTRPCRouter({
  searchByKeyword: publicProcedure
    .input(
      z.object({
        keyword: z.string(),
        maxLimit: z.number().min(10).max(500).optional().default(10),
      }),
    )
    .query(async ({ input }) => {
      const torrents = await getTorrents(input.keyword, input.maxLimit)
      return { torrents }
    }),

  findMagnetLink: publicProcedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const magnet = await getMagnetLink(input.url)
      if (!magnet) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Magnet Link not found' })
      }
      return { magnet }
    }),
})
