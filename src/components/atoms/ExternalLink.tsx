type ExternalLinkVariant = 'primary' | 'accent' | 'success'

type ExternalLinkProps = {
  href: string
  variant?: ExternalLinkVariant
  children: React.ReactNode
}

const variantClasses: Record<ExternalLinkVariant, string> = {
  primary: 'px-4 py-2 bg-[#182537] text-white rounded hover:bg-blue-700 transition',
  accent: 'px-4 py-2 bg-[#E89B4C] text-white rounded hover:bg-gray-900 transition',
  success: 'px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition',
}

export default function ExternalLink({
  href,
  variant = 'primary',
  children
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={variantClasses[variant]}
    >
      {children}
    </a>
  )
}
