type NavItemProps = {
  label: string
  href: string
  icon: React.ReactNode
  active: boolean
  onClick: (href: string) => void
  displayLabel?: string
}

export default function NavItem({
  label,
  href,
  icon,
  active,
  onClick,
  displayLabel
}: NavItemProps) {
  const text = displayLabel ?? (label[0].toUpperCase() + label.slice(1))

  return (
    <button
      type="button"
      onClick={() => onClick(href)}
      className={`text-left px-4 py-2 rounded-lg flex w-full ${
        active
          ? 'bg-[#182537] text-white'
          : 'text-gray-700 hover:bg-blue-100'
      }`}
    >
      {icon}
      {text}
    </button>
  )
}
