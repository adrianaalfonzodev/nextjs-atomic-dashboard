'use client'

import { useEffect, useState } from 'react'
import { fetchLatestLaunch } from '@/lib/spacex-api'
import type { Launch } from '@/lib/spacex-api'
import PostList from '@/components/organisms/PostList'
import LaunchCard from '@/components/molecules/LaunchCard'
import { useRouter } from 'next/navigation'
import type { Post } from '@/lib/jsonplaceholder'
import { getPosts, deletePost } from '@/lib/jsonplaceholder'
import { toast } from 'sonner'

export default function HomePage() {
  const [launch, setLaunch] = useState<Launch | null>(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState<Post | null>(null)

  useEffect(() => {
    fetchLatestLaunch()
      .then((data) => setLaunch(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setPostsLoading(true)
    getPosts()
      .then((data) => setPosts(data.slice(0, 20)))
      .catch((err) => {
        console.error(err)
        toast.error('Error cargando posts')
      })
      .finally(() => setPostsLoading(false))
  }, [])

  const router = useRouter()

  const onSelect = (p: Post) => {
    setSelected(p)
  }

  const onEdit = (p: Post) => {
    router.push(`/dashboard/posts?edit=${p.id}`)
  }

  const onDelete = async (id: number) => {
    if (!confirm('¿Eliminar este post?')) return
    setSaving(true)
    try {
      await deletePost(id)
      setPosts((s) => s.filter((x) => x.id !== id))
      if (selected?.id === id) {
        setSelected(null)
      }
      toast.success('Post eliminado')
    } catch (err) {
      console.error(err)
      toast.error('Error al eliminar')
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10">Cargando lanzamiento de SpaceX...</p>
    )
  if (!launch)
    return (
      <p className="text-center mt-10 text-red-500">Error cargando datos</p>
    )

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-2">Bienvenido, explorador 🚀</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:mr-4">
          <p className="my-6 text-gray-600 mb-6 text-justify">
            Estás en el panel principal del centro de mando. Aquí verás los
            datos más recientes de exploración espacial. Esta sección muestra el
            lanzamiento más reciente realizado por <strong>SpaceX</strong>,
            incluyendo enlaces para ver el webcast oficial, leer artículos y
            aprender más en Wikipedia.
          </p>

          <LaunchCard launch={launch} />
        </div>

        <aside className="space-y-4 md:mx-4">
          <PostList
            posts={posts}
            selectedId={selected?.id ?? null}
            loading={postsLoading || saving}
            onSelect={onSelect}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </aside>
      </div>
    </div>
  )
}
