import Label from '@/components/atoms/Label'
import Textarea from '@/components/atoms/Textarea'

type TextareaFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function TextareaField({
  label,
  value,
  onChange,
  placeholder = ''
}: TextareaFieldProps) {
  return (
    <label className="block">
      <span className="text-xs text-gray-500">{label}</span>
      <Textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  )
}
