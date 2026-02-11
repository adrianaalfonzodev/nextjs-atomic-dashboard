export interface Launch {
  name: string
  date_utc: string
  success: boolean | null
  details?: string | null
  rocket: string
  links: {
    patch: {
      small?: string | null
      large?: string | null
    }
    webcast?: string | null
    wikipedia?: string | null
    article?: string | null
  }
}

export async function fetchLatestLaunch(): Promise<Launch> {
  const url = process.env.NEXT_PUBLIC_SPACEX_API_URL

  if (!url) {
    throw new Error('SPACEX_API_URL is not defined')
  }

  const res = await fetch(url, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Error fetching SpaceX launch')
  }

  return res.json()
}
