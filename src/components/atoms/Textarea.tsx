type TextareaProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  className?: string
}

export default function Textarea({
  value,
  onChange,
  placeholder = '',
  rows,
  className = 'mt-1 w-full rounded border border-gray-300 px-3 py-2 min-h-[120px]'
}: TextareaProps) {
  return (
    <textarea
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  )
}
