type IconButtonVariant = 'default' | 'danger'

type IconButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  icon: React.ReactNode
  title?: string
  variant?: IconButtonVariant
  disabled?: boolean
}

const variantClasses: Record<IconButtonVariant, string> = {
  default: 'p-1 rounded hover:bg-gray-100',
  danger: 'p-1 rounded hover:bg-gray-100 text-red-600',
}

export default function IconButton({
  onClick,
  icon,
  title,
  variant = 'default',
  disabled = false
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={variantClasses[variant]}
      title={title}
      disabled={disabled}
    >
      {icon}
    </button>
  )
}
