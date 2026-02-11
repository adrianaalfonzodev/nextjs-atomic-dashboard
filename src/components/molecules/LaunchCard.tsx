import type { Launch } from '@/lib/spacex-api'
import ExternalLink from '@/components/atoms/ExternalLink'
import Image from 'next/image'

type LaunchCardProps = {
  launch: Launch
}

export default function LaunchCard({ launch }: LaunchCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#e7e7e7] p-6 flex flex-col md:flex-row items-center gap-6">
      {launch.links.patch.large && (
        <div className="relative w-48 h-48 flex-shrink-0 mx-auto md:mx-0">
          <Image
            src={launch.links.patch.large}
            alt={launch.name}
            fill
            className="object-contain"
            priority
          />
        </div>
      )}

      <div className="flex-1">
        <h2 className="text-3xl font-semibold mb-2">{launch.name}</h2>
        <p className="text-gray-600 mb-2">
          <strong>Fecha:</strong>{' '}
          {new Date(launch.date_utc).toLocaleString()}
        </p>
        <p
          className={`mb-4 font-semibold ${launch.success ? 'text-green-600' : 'text-red-600'}`}
        >
          Estado:{' '}
          {launch.success === null
            ? 'Desconocido'
            : launch.success
              ? 'Éxito'
              : 'Fallido'}
        </p>

        {launch.details && (
          <p className="mb-4 text-gray-700">{launch.details}</p>
        )}

        <div className="flex flex-wrap gap-4">
          {launch.links.webcast && (
            <ExternalLink href={launch.links.webcast} variant="primary">
              Ver webcast
            </ExternalLink>
          )}

          {launch.links.wikipedia && (
            <ExternalLink href={launch.links.wikipedia} variant="accent">
              Wikipedia
            </ExternalLink>
          )}

          {launch.links.article && (
            <ExternalLink href={launch.links.article} variant="success">
              Artículo
            </ExternalLink>
          )}
        </div>
      </div>
    </div>
  )
}
