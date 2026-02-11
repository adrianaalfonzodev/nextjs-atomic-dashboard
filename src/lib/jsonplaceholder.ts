const BASE_URL = process.env.NEXT_PUBLIC_JSONPLACEHOLDER_API_URL

export type Post = {
  userId: number
  id?: number
  title: string
  body: string
}

async function http<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {})
    }
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} ${res.statusText} ${text}`)
  }

  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) return undefined as T

  return res.json()
}

export const getPosts = (limit = 10) =>
  http<Post[]>(`${BASE_URL}/posts`).then((data) =>
    Array.isArray(data) ? data.slice(0, limit) : []
  )
export const getPost = (id: number) => http<Post>(`${BASE_URL}/posts/${id}`)

export const createPost = (post: Post) =>
  http<Post>(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(post)
  })

export const updatePost = (id: number, post: Post) =>
  http<Post>(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post)
  })

export const patchPost = (id: number, patch: Partial<Post>) =>
  http<Post>(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch)
  })

export const deletePost = (id: number) =>
  http<void>(`${BASE_URL}/posts/${id}`, { method: 'DELETE' })
