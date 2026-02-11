type LabelProps = {
  htmlFor?: string
  children: React.ReactNode
  className?: string
}

export default function Label({
  htmlFor,
  children,
  className = 'block text-sm font-medium text-gray-700 mb-1'
}: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  )
}
