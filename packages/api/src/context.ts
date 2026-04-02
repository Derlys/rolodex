import { auth } from '@rolodex/auth'
import { env } from '@rolodex/env/server'
import { createSolanaClient } from '@rolodex/solana-client'
import type { Context as HonoContext } from 'hono'

export type CreateContextOptions = {
  context: HonoContext
}

export async function createContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  })

  const solana = createSolanaClient({
    url: env.SOLANA_ENDPOINT,
  })

  return {
    session,
    solana,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
