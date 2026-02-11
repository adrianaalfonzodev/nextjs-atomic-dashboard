type ButtonVariant = 'primary' | 'danger' | 'success' | 'info' | 'outline' | 'social'

type ButtonProps = {
  variant?: ButtonVariant
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'button transition-opacity duration-200',
  danger: 'px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors',
  success: 'px-3 py-2 rounded bg-green-600 text-white disabled:opacity-50',
  info: 'px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50',
  outline: 'px-3 py-2 rounded border border-gray-300 disabled:opacity-50',
  social: 'social-button relative w-full',
}

export default function Button({
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  children
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${variantClasses[variant]} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
